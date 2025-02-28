import { useState } from "react";

export function App() {
  const [count, setCount] = useState(0);

  const a = 5;

  return (
    <>
      <h1 className="m-10 p-4 font-sans">Vite + React</h1>
      <div className="px-4 py-2 text-white sm:px-8 sm:py-3">
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
