import { forwardRef, RefCallback, useEffect, useState } from "react";
import Alert from "./components/Alert";
import TextInput from "./components/TextInput";

// import React, { useEffect, useMemo, useState } from "react";
// import { H2, H4, H7, P3, S2, S3, S4 } from "@/components/ui/Text";
// import useTranslation from "next-translate/useTranslation";
// import { useTheme } from "styled-components";
// import * as S from "./style";
import axios from "axios";
import { RefCallBack, useForm } from "react-hook-form";

function App() {
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        // setValue,
        reset,
    } = useForm();

    const [form, setForm] = useState<{ [key in string]: any }>({});

    // const [name, setName] = useState("");
    // const [lastname, setLastName] = useState("");
    // const [phone, setPhone] = useState("");
    // const [privateNumber, setPrivateNumber] = useState("");
    // const [monthlyPay, setMonthlyPay] = useState("");

    const perMonth = 500000 / (24 * 12);
    const totalPay = 500000 + 0;

    const handleForm = (name: string, value: string) => {
        setForm({ ...form, [name]: value });
    };

    // useEffect(() => {
    //     const soso: RefCallBack = () => {};
    //     const soso = { current: 55 };
    //     const { onBlur, onChange, name, ref } = register("zaza", {
    //         required: true,
    //     });
    //     ref(soso);
    //     console.log(onBlur, onChange, name, ref(soso));
    // }, []);

    const onSubmit = (data: any, e: any) => {
        console.log(data, form);
        setLoading(true);
        axios
            .post(
                "https://httpbin.org/post",
                { ...data, monthlyPayment: perMonth, totalPayment: totalPay },
                {
                    headers: { "Content-Type": "application/json" },
                }
            )
            .then((_results) => {
                setLoading(false);
                setForm({});
                reset();
                console.log(_results);
            });

        //     const formData = {
        //         name: data["name"],
        //         lastname: data["lastname"],
        //         phone_number: Number(data["phone_number"]),
        //         personal_no: Number(data["personal_no"]),
        //         monthly_income: Number(data["monthly_income"]),
        //         monthlyPayment: 1,
        //         totalPayment: 1,
        //     };
        //     setLoading(true);
        //     axios
        //         .post("https://httpbin.org/post", formData, {
        //             headers: { "Content-Type": "application/json" },
        //         })
        //         .then((_results) => {
        //             setLoading(false);
        //             setName("");
        //             setLastName("");
        //             setPhone("");
        //             setPrivateNumber("");
        //             setMonthlyPay("");
        //             setValue("name", "");
        //             setValue("lastname", "");
        //             setValue("personal_no", "");
        //             setValue("monthly_income", "");
        //             setValue("phone", "");
        //         });
    };

    return (
        <div className="App">
            <button onClick={() => setShowAlert(true)}>Open Alert</button>
            <Alert
                title="Alert title"
                show={showAlert}
                onClose={() => setShowAlert(false)}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    {loading && (
                        <div style={{ color: "white", backgroundColor: "red" }}>
                            LOADING
                        </div>
                    )}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "14px",
                            marginBottom: "24px",
                        }}
                    >
                        <TextInput
                            readonly
                            name="monthly_payment"
                            label="ყოველთვიური შესატანი"
                            value={`${Math.round(perMonth).toLocaleString()} ₾`}
                        />
                        <TextInput
                            readonly
                            name="total_payment"
                            label="სულ გადასახდელი"
                            value={`${Math.round(totalPay).toLocaleString()} ₾`}
                        />
                        <TextInput
                            // name="name"
                            // callback={(_: any, value: any) => setName(value)}
                            // register={register}
                            label="სახელი"
                            value={form?.name}
                            errorMessage="შეიყვანეთ სახელი"
                            invalid={!!errors?.name}
                            registerInput={{
                                ...register("name", {
                                    required: true,
                                    onChange: ({ target }) =>
                                        handleForm(target.name, target.value),
                                }),
                            }}
                        />
                        <TextInput
                            // name="lastname"
                            label="გვარი"
                            value={form?.lastname}
                            errorMessage="შეიყვანეთ გვარი"
                            invalid={!!errors?.lastname}
                            registerInput={{
                                ...register("lastname", {
                                    required: true,
                                    onChange: ({ target }) =>
                                        handleForm(target.name, target.value),
                                }),
                            }}
                            // validationData={{
                            //     required: true,
                            // }}
                            // callback={(_: any, value: any) =>
                            //     setLastName(value)
                            // }
                            // register={register}
                            // errors={errors}
                        />
                        <TextInput
                            value={form?.personal_no}
                            label="პირადი ნომერი"
                            errorMessage="შეიყვანეთ პირადი ნომერი"
                            invalid={!!errors?.personal_no}
                            registerInput={{
                                ...register("personal_no", {
                                    required: true,
                                    maxLength: 11,
                                    minLength: 11,
                                    pattern: /^\d*$/,
                                    onChange: ({ target }) =>
                                        handleForm(target.name, target.value),
                                }),
                            }}
                            // validationData={{
                            //     required: true,
                            //     maxLength: 11,
                            //     minLength: 11,
                            //     pattern: /^\d*$/,
                            // }}
                            // callback={(_: any, value: any) =>
                            //     setPrivateNumber(value)
                            // }
                            // register={register}
                            // errors={errors}
                        />
                        <TextInput
                            value={form?.monthly_income}
                            label="ყოველთვიური შემოსავალი"
                            errorMessage="შეიყვანეთ ყოველთვიური შემოსავალი"
                            invalid={!!errors?.monthly_income}
                            registerInput={{
                                ...register("monthly_income", {
                                    required: true,
                                    pattern: /^\d*(\.\d+)?$/,
                                    onChange: ({ target }) =>
                                        handleForm(target.name, target.value),
                                }),
                            }}
                            // validationData={{
                            //     required: true,
                            //     pattern: /^\d*(\.\d+)?$/,
                            // }}
                            // callback={(_: any, value: any) =>
                            //     setMonthlyPay(value)
                            // }
                            // register={register}
                            // errors={errors}
                        />
                        <TextInput
                            value={form?.phone_number}
                            label="ტელეფონის ნომერი"
                            errorMessage="შეიყვანეთ ტელეფონის ნომერი"
                            invalid={!!errors?.phone_number}
                            registerInput={{
                                ...register("phone_number", {
                                    required: true,
                                    pattern: /^(995)?(79\d{7}|5\d{8})$/,
                                    onChange: ({ target }) =>
                                        handleForm(target.name, target.value),
                                }),
                            }}
                            // validationData={{
                            //     required: true,
                            //     pattern: /^(995)?(79\d{7}|5\d{8})$/,
                            // }}
                            // callback={(_: any, value: any) => setPhone(value)}
                            // register={register}
                            // errors={errors}
                        />
                    </div>
                    <button type="submit">გაგზავნა</button>
                </form>
            </Alert>
        </div>
    );
}

export default App;
