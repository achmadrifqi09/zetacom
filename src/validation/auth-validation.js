import * as yup from "yup";
const loginValidationSchema = yup.object().shape({
    email: yup
        .string()
        .email()
        .required()
        .min(4)
        .test("email validation", "error message", (value, validationContext) => {
            const { createError } = validationContext;
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!regex.test(value)) return createError({ message: "Invalid email format" });
            return true;
        }),

    password: yup.string().min(6).required(),
});

const registerValidationSchema = yup.object().shape({
    name: yup.string().min(4).required(),
    email: yup
        .string()
        .email()
        .required()
        .min(4)
        .test("email validation", "error message", (value, validationContext) => {
            const { createError } = validationContext;
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!regex.test(value)) return createError({ message: "Invalid email format" });
            return true;
        }),

    password: yup.string().min(6).required(),
});

export { loginValidationSchema, registerValidationSchema };
