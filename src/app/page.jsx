"use client";

import Button from "@/components/Button";

import { signOut } from "next-auth/react";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <h3>Home Page</h3>
            <Button action={signOut}>Sign OUt</Button>
        </main>
    );
}
