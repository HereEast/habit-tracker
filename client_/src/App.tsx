import { useState } from "react";

export function App() {
  const [count, setCount] = useState(0);

  const a = 5;

  return (
    <>
      <h1 className="font-sans">Vite + React</h1>
      <div>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="">Click on the Vite and React logos to learn more</p>
    </>
  );
}
