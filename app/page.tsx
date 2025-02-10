"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState();

  useEffect(() => {
    fetch('https://fakestoreapi.com/users')
      .then(res => res.json())
      .then(json => console.log(json))
  }, []);

  console.log();

  return (
    <main>

    </main>
  );
}
