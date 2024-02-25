import Link from "next/link";
const Button = (props) => {
    const {
        children,
        variant,
        isFullWidth,
        action,
        type = "button",
        disabled = false,
        size = "base",
        isLink = false,
        url,
    } = props;

    const buttonStyle = {
        link: "text-indigo-500 block",
        primary:
            "bg-indigo-500 text-white rounded-lg border border-indigo-500 hover:brightness-110 flex gap-2 items-center justify-center font-medium disabled:opacity-70",
        outline:
            "bg-white text-indigo-500 rounded-lg border border-indigo-500 hover:bg-indigo-50 flex gap-2 items-center justify-center font-medium disabled:opacity-70",
    };

    const buttonSize = {
        sm: "px-3 py-1.5 text-sm",
        base: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-md",
        "base-link": "p-0 text-sm",
    };

    return isLink ? (
        <Link
            href={url}
            className={`${buttonStyle[variant ?? "link"]} ${isFullWidth ? "w-full" : "w-max"} ${
                buttonSize[size ?? "base-link"]
            }`}
        >
            {children}
        </Link>
    ) : (
        <button
            type={type}
            onClick={action}
            disabled={disabled}
            className={`${buttonStyle[variant ?? "primary"]} ${isFullWidth ? "w-full" : "w-max"} ${
                buttonSize[size ?? "base"]
            }`}
        >
            {children}
        </button>
    );
};

export default Button;
