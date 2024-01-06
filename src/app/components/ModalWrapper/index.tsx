import { ReactNode } from "react";
import { createPortal } from "react-dom";

export default function ModalWrapper({ children }: { children: ReactNode }) {
    return createPortal(
        <div className="min-h-dvh min-w-full max-h-dvh max-w-full absolute flex flex-col top-0 left-0 z-50">
            {children}
        </div>,
        document.getElementById("modal-wrapper")!
    );
}
