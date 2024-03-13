import React, {useCallback, useEffect, useState} from 'react';
import './App.scss';
import {OverviewPage} from "./pages/OverviewPage";
import {LoginPage} from "./pages/LoginPage";
import {TaskClient} from "./client/task-client";

interface AuthTokenProps {
    accessToken?: string
    refreshToken?: string
}

export const AuthTokenContext = React.createContext<AuthTokenProps>({})

const taskClient = new TaskClient("https://2dw7xx67oj.execute-api.eu-west-1.amazonaws.com/prod");

export const App = () => {
    const [authToken, setAuthToken] = useState<AuthTokenProps>({});
    const [error, setError] = useState<string>();

    useEffect(() => {
        // check local storage
        const localStorageValue = window.localStorage.getItem('taskAuthToken')
        if(localStorageValue) {
            const parsedValue = JSON.parse(localStorageValue)
            setAuthToken(parsedValue)
        }
        // login if no token
    }, [setAuthToken]);

    const handleLoginClicked = useCallback(
        (username: string, password: string) => {
            taskClient.authenticate(username, password)
                .then((auth) => {
                    setAuthToken({
                        accessToken: auth.accessToken,
                        refreshToken: auth.refreshToken
                    })
                    window.localStorage.setItem('taskAuthToken', JSON.stringify(auth))
                })
                .catch(error => console.log(`Login failed: ${error}`))
        },
        [setAuthToken],
    );

  return (
    <div className="App">
        <AuthTokenContext.Provider value={authToken}>
            { authToken.accessToken ? <OverviewPage /> : <LoginPage onLoginClicked={handleLoginClicked} errorText={error} />}
        </AuthTokenContext.Provider>
    </div>
  );
}

