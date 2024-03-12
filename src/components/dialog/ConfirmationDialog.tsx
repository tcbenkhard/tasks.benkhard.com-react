import {Dialog} from "./Dialog";
import {PropsWithChildren} from "react";

export interface ConfirmationDialogProps extends PropsWithChildren {
    onConfirm: () => void
    onCancel: () => void
}

export const ConfirmationDialog = ({children, onConfirm, onCancel}: ConfirmationDialogProps) => {
    return (
        <Dialog onClickOutside={onCancel}>
            <div className="content">
                {children}
            </div>
            <div className="controls">
                <button onClick={onConfirm}>Yes</button>
                <button onClick={onCancel}>No</button>
            </div>
        </Dialog>
    )
}