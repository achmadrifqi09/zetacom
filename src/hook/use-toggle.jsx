"use client";
import { useState } from "react";

const useToggle = (initialValue = false) => {
    const [toggle, setToggle] = useState(initialValue);
    const handleToggle = () => setToggle(!toggle);

    return [toggle, handleToggle];
};

export default useToggle;
