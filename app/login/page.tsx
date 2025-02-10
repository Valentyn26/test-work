"use client";

import Input from "@/components/UI/Input";
import { useAuth } from "@/context/authContext";
import { IUser } from "@/types/user";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Login() {
    const { isLoggedIn, setIsLoggedIn } = useAuth();
    const router = useRouter();

    const [user, setUser] = useState<IUser>({
        username: "",
        password: ""
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        fetch('https://fakestoreapi.com/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: user.username,
                password: user.password
            })
        })
            .then(res => res.json())
            .then(json => {
                setIsLoggedIn(true);
                router.replace('/');

            })
            .catch(error => console.log('Error:', error))
    }

    return (
        <main className="h-screen flex justify-center items-center">
            <section className="flex flex-col gap-y-5 shadow-lg bg-white p-12 border border-gray-200 rounded-lg w-xl">
                <Input type="text" name="username" onChange={handleChange} value={user.username}>
                    Username
                </Input>
                <Input type="password" name="password" onChange={handleChange} value={user.password}>
                    Password
                </Input>
                <button onClick={handleSubmit} type="submit"
                    className="self-center border border-gray- px-3 py-2 rounded-lg w-[150px] bg-blue-400"
                >
                    Login
                </button>
            </section>
        </main>
    );
}
