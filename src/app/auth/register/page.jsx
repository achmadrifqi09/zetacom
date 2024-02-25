"use client";

import Button from "@/components/Button";
import Input from "@/components/Input/Input";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import useToggle from "@/hook/use-toggle";
import { useFormik } from "formik";
import { registerValidationSchema } from "@/validation/auth-validation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";

const Register = () => {
    const [showPassword, setShowPassword] = useToggle(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const res = await axios.post("/api/auth/register", registerForm.values, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });

            if (!res.data.success) {
                setErrorMessage("Register failed");
            }

            const resLogin = await signIn("credentials", {
                email: registerForm.values.email,
                password: registerForm.values.password,
                redirect: false,
            });

            if (resLogin.error) {
                setErrorMessage("Email or password wrong");
                return;
            }
            router.push("/");
        } catch (err) {
            if (err?.response?.data) setErrorMessage(err.response.data.error.message);
        } finally {
            setLoading(false);
        }
    };

    const registerForm = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
        },
        validationSchema: registerValidationSchema,
        onSubmit: handleSubmit,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        registerForm.setFieldValue(name, value);

        if (errorMessage != null) setErrorMessage(null);
    };

    const handleGoogleLogin = async () => {
        try {
            await signIn("google");
            router.push("/");
        } catch {
            setErrorMessage("Ops, something went wrong when login");
        }
    };

    return (
        <>
            <h3 className="text-xl font-semibold">Register</h3>
            <form onSubmit={registerForm.handleSubmit}>
                <Input onChange={handleChange} label="Name" name="name" error={registerForm.errors.name} />
                <Input
                    onChange={handleChange}
                    name="email"
                    label="Email"
                    type="email"
                    error={registerForm.errors.email}
                />
                <div className="relative">
                    <Input
                        onChange={handleChange}
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        error={registerForm.errors.password}
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
                    <Button isFullWidth={true} disabled={loading || errorMessage != null} type="submit">
                        {loading ? "Please wait ..." : "Register"}
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
                Already have an account ?
                <Link href="/auth/login" className="text-indigo-500 font-medium">
                    {" "}
                    Login
                </Link>
            </span>
        </>
    );
};

export default Register;
