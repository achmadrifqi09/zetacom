"use client";

import Button from "@/components/Button";
import Input from "@/components/Input/Input";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import useToggle from "@/hook/use-toggle";
import { loginValidationSchema } from "@/validation/auth-validation";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
    const [showPassword, setShowPassword] = useToggle(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const res = await signIn("credentials", {
                ...loginForm.values,
                redirect: false,
            });

            if (res.error) {
                setErrorMessage("Email or password wrong");
                return;
            }

            router.push("/");
        } catch (err) {
            setErrorMessage("Ops, something went wrong when login");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const res = await signIn("google");
            if (res?.error) {
                console.log(res.error);
            }
        } catch (err) {
            console.log(err);
        }

        // if (res?.error) {
        //     setErrorMessage("Email or password wrong");
        // }
        // console.log(res);
        // router.push("/");
    };

    const loginForm = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: loginValidationSchema,
        onSubmit: handleSubmit,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        loginForm.setFieldValue(name, value);

        if (errorMessage != null) setErrorMessage(null);
    };

    return (
        <>
            <h3 className="text-xl font-bold">Login</h3>
            <form onSubmit={loginForm.handleSubmit}>
                <Input onChange={handleChange} name="email" label="Email" type="email" error={loginForm.errors.email} />
                <div className="relative">
                    <Input
                        onChange={handleChange}
                        label="Password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        error={loginForm.errors.password}
                    />
                    <button
                        type="button"
                        className="absolute top-[26px] rounded-e-lg right-[2px] text-sm px-4 py-[9px] bg-white text-slate-500"
                        onClick={setShowPassword}
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                </div>
                {errorMessage && <span className="text-red-500 text-sm block">{errorMessage}</span>}
                <div className="mt-16 space-y-4">
                    <Button isFullWidth={true} type="submit" disabled={loading || errorMessage != null}>
                        {loading ? "Please wait ..." : "Login"}
                    </Button>
                    <Button isFullWidth={true} variant="outline" action={handleGoogleLogin}>
                        <div className="relative w-4 h-4">
                            <FcGoogle className="w-6 h-6 absolute -top-[5px] right-0.5" />
                        </div>
                        Google
                    </Button>
                </div>
            </form>
            <span className="block text-center mt-6 text-slate-500">
                Don't have an account ?
                <Link href="/auth/register" className="text-indigo-500 font-medium">
                    {" "}
                    Register
                </Link>
            </span>
        </>
    );
};

export default Login;
