import React, { PropsWithChildren, useEffect, useRef, FC } from "react";
import { createPortal } from "react-dom";
import * as S from "./Alert.sc";
import { motion, AnimatePresence } from "framer-motion";

type AlertProps = {
    show: boolean;
    title: string;
    onClose: () => void;
};

const Alert: FC<AlertProps & PropsWithChildren> = ({
    show,
    onClose,
    title,
    children,
}) => {
    const alertRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const clickOutsideHandler = (event: Event) => {
            if (
                alertRef.current &&
                !alertRef.current.contains(event.target as Element)
            ) {
                onClose();
            }
        };

        document.addEventListener("mousedown", clickOutsideHandler);
        return () => {
            document.removeEventListener("mousedown", clickOutsideHandler);
        };
    }, []);

    return createPortal(
        <AnimatePresence>
            {show && (
                <S.AlertBackground
                    as={motion.div}
                    initial={{ background: "rgba(0,0,0,0)" }}
                    animate={{ background: "rgba(0,0,0,0.8)" }}
                    exit={{ background: "rgba(0,0,0,0)" }}
                    transition={{ ease: "easeInOut" }}
                >
                    <S.Alert
                        as={motion.div}
                        ref={alertRef}
                        initial={{ scale: 0.2, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.2, opacity: 0 }}
                        transition={{ ease: "easeInOut" }}
                    >
                        <S.Header>
                            <h2>{title}</h2>
                            <S.CloseBtn onClick={() => onClose()}>X</S.CloseBtn>
                        </S.Header>
                        <S.Content>{children}</S.Content>
                    </S.Alert>
                </S.AlertBackground>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default Alert;
