import {useCallback} from "react";
import './Dialog.scss'

interface DialogProps extends React.PropsWithChildren {
    onClickOutside: () => void
}
export const Dialog = ({children, onClickOutside}: DialogProps) => {
    const handleCloseClicked = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation()
            onClickOutside()
        },
        [onClickOutside],
    );

    return (
        <div className="dialog" onClick={handleCloseClicked}>
            <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}