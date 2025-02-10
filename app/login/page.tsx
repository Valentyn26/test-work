"use client";

import { IUser } from "@/types/user";
import { useState } from "react";


export default function Login() {
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
            .then(json => console.log(json))
            .catch(error => console.log('Error:', error))
    }

    return (
        <main className="h-screen flex justify-center items-center">
            <section className="flex flex-col gap-y-5 shadow-lg bg-white p-12 border border-gray-200 rounded-lg w-xl">
                <label className="flex flex-col">
                    Username
                    <input onChange={handleChange} type="text" name="username" value={user.username}
                        className="border border-gray- px-3 py-2 rounded-lg focus:outline-none focus:border-gray-500"
                    />
                </label>
                <label className="flex flex-col">
                    Password
                    <input onChange={handleChange} type="password" name="password" value={user.password}
                        className="border border-gray- px-3 py-2 rounded-lg focus:outline-none focus:border-gray-500"
                    />
                </label>
                <button onClick={handleSubmit} type="submit"
                    className="self-center border border-gray- px-3 py-2 rounded-lg w-[150px] bg-blue-400"
                >
                    Login
                </button>
            </section>
        </main>
    );
}
