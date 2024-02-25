const Input = (props) => {
    const { name, value, onChange = () => {}, type = "text", label, error } = props;
    const handleChange = (e) => {
        onChange(e);
    };
    return (
        <div className="my-5 space-y-1">
            <label htmlFor={name} className="text-sm text-slate-600 block">
                {label}
            </label>
            <input
                type={type}
                id={name}
                name={name}
                className="w-full border border-slate-300 px-4 py-2 rounded-lg focus:outline-indigo-300"
                onChange={(e) => handleChange(e)}
                autoComplete="on"
            />
            {error && <span className="text-sm block text-red-500">{error}</span>}
        </div>
    );
};

export default Input;
