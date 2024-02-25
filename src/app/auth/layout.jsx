const AuthLayout = ({ children }) => {
    return (
        <>
            <div className="max-w-screen-xl mx-auto px-6 md:px-8 flex h-dvh justify-center items-center">
                <div className="w-full md:w-2/4 xl:w-2/6 p-6 rounded-2xl h-max">{children}</div>
            </div>
        </>
    );
};

export default AuthLayout;
