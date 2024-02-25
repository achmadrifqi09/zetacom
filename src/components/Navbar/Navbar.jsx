"use client";
import Button from "../Button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
    const session = useSession();

    const router = useRouter();
    return (
        <nav className="bg-white fixed top-0 right-0 left-0 shadow-sm">
            <div className="max-w-screen-xl mx-auto py-4 px-6 md:px-8 flex justify-between items-center gap-6">
                <Link href="/">
                    <h3 className="font-bold text-3xl text-slate-700">
                        Zeta<span className="text-indigo-500">com</span>
                    </h3>
                </Link>
                <ul className="flex gap-4">
                    {session.status === "unauthenticated" && (
                        <>
                            <li>
                                <Button isLink={true} url="/auth/login" variant="primary" size="sm">
                                    Login
                                </Button>
                            </li>
                            <li>
                                <Button isLink={true} url="/auth/register" variant="outline" size="sm">
                                    Register
                                </Button>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
