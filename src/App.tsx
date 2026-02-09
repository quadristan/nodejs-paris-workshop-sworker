import { useState, useEffect, useCallback } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const useCount = () => {
  const [count, setCount] = useState(0);
  const [loading, setLoaing] = useState(false);

  const refetch = useCallback(async () => {
    setLoaing(true);
    try {
      const reply = await fetch("/sw/count");
      const json = await reply.json();
      const newCount = json.count as number;
      setCount(newCount);
    } finally {
      setLoaing(false);
    }
  }, [setLoaing]);

  const increase = async () => {
    await fetch("/sw/count/increase", { method: "POST" });
    await refetch();
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { count, loading, refetch, increase };
};

function App() {
  const { count, increase, loading } = useCount();
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <button onClick={increase}>count is {count}</button>
        )}
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
