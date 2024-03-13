import './LoginPage.scss'
import {useState} from "react";

export interface LoginPageProps {
    onLoginClicked: (username: string, password: string) => void
    errorText?: string
}
export const LoginPage = ({onLoginClicked, errorText}: LoginPageProps) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    return (
        <div className={'loginpage'}>
            <div className="loginpage-header">
                Tasks Login
            </div>
            <div className="loginpage-form">
                { errorText ?
                    <div className="loginpage-form--error">
                        {errorText}
                    </div> : '' }
                <input type="text" required={true} minLength={3} placeholder={'Username'} value={username} onChange={(event) => setUsername(event.target.value)}/>
                <input type="password" required={true} minLength={8} placeholder={'Password'} value={password} onChange={(event) => setPassword(event.target.value)}/>
                <div className="loginpage-form--controls">
                    <button>Register</button>
                    <button onClick={() => onLoginClicked(username!, password!)}>Login</button>
                </div>
            </div>
        </div>
    )
}