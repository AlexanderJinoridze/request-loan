import React, {
    useState,
    FC,
    useEffect,
    ChangeEventHandler,
    FocusEvent,
    useRef,
    RefObject,
    EventHandler,
    FocusEventHandler,
    Ref,
    MutableRefObject,
} from "react";
import * as S from "./TextInput.sc";
import {
    ChangeHandler,
    FieldErrors,
    FieldValues,
    RefCallBack,
    UseFormRegister,
} from "react-hook-form";

type TextInputProps = {
    inputSize?: "regular" | "small";
    name?: string;
    value?: string;
    label?: string;
    postfix?: string;
    placeholder?: string;
    errorMessage?: string;
    disabled?: boolean;
    readonly?: boolean;
    invalid?: boolean;
    onChange?: ChangeEventHandler;
    onFocus?: FocusEventHandler;
    onBlur?: FocusEventHandler;
    inputRef?: Ref<any>;
    registerInput?: {
        name: string;
        onChange: ChangeHandler;
        onBlur: ChangeHandler;
        ref: RefCallBack;
    };
};

const TextInput: FC<TextInputProps> = ({
    inputSize = "regular",
    name,
    value = "",
    label = "",
    postfix = "",
    placeholder = "",
    errorMessage = "",
    disabled = false,
    readonly = false,
    invalid = false,
    onChange,
    onFocus,
    onBlur,
    inputRef,
    registerInput,
}) => {
    // const [value, setValue] = useState(value);
    const [focus, setFocus] = useState(false);
    // const [validationProps, setValidationProps] = useState({});
    // const isInvalid = Object.hasOwn(errors, name);

    // useEffect(() => {
    //     if (!register) {
    //         return;
    //     }

    //     setValidationProps(
    //         register(name, {
    //             ...validationData,
    //             onChange: (event) => {
    //                 let input = event.target;
    //                 setValue(input.value);
    //                 if (callback) {
    //                     callback(input.name, input.value);
    //                 }
    //             },
    //             onBlur: () => setIsFocused(false),
    //         })
    //     );
    // }, []);

    return (
        <S.TextInput>
            <S.InputBlock
                isFocused={focus}
                isDisabled={disabled}
                isInvalid={invalid}
            >
                <S.Input
                    inputSize={inputSize}
                    type="text"
                    name={registerInput?.name ?? name}
                    value={value}
                    placeholder={placeholder}
                    disabled={disabled}
                    readOnly={readonly}
                    onChange={registerInput?.onChange ?? onChange}
                    onBlur={(event: FocusEvent<HTMLInputElement>) => {
                        registerInput?.onBlur(event) ?? onBlur?.(event);
                        setFocus(false);
                    }}
                    onFocus={(event: FocusEvent<HTMLInputElement>) => {
                        onFocus?.(event);
                        setFocus(true);
                    }}
                    ref={registerInput?.ref ?? inputRef}
                />
                {label ? (
                    <S.Label active={value !== "" || placeholder !== ""}>
                        {label}
                    </S.Label>
                ) : null}
                {postfix ? <S.Affix>{postfix}</S.Affix> : null}
            </S.InputBlock>
            {invalid ? <S.ErrorMessage>{errorMessage}</S.ErrorMessage> : null}
        </S.TextInput>
    );
};

export default TextInput;
