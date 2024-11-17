"use client";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState("");
  const [farewell, setFarewell] = useState("");

  const handleGreet = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8080/greet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setGreeting(data);
    } catch (error) {
      console.error("Error fetching greeting:", error);
    }
  };

  const handleGoodbye = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8080/goodbye", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setFarewell(data);
    } catch (error) {
      console.log("Error fetching farewell:", error);
    }
  };

  return (
    <main>
      <h1>Greet or Say Goodbye</h1>

      <form onSubmit={handleGreet}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
        />
        <button type="submit">Greet</button>
      </form>

      <form onSubmit={handleGoodbye}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
        />
        <button type="submit">Say Goodbye</button>
      </form>

      {greeting && <p>Greeting: {greeting}</p>}
      {farewell && <p>Farewell: {farewell}</p>}
    </main>
  );
}
