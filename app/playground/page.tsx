'use client';
import { useState } from 'react';

export default function PlaygroundPage() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  function handleClick() {
    setCount(count + 1);
  }
  console.log('rendered', count);

  function handleInputClick(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }
  return (
    <main className="p-8">
      <div>
        <button
          className="rounded bg-blue-600 px-4 py-2 m-1 text-white"
          onClick={handleClick}
        >
          Clicked {count} times
        </button>
        <button
          className="rounded bg-gray-600 px-4 py-2 m-1 text-white"
          onClick={() => setCount(0)}
        >
          Reset
        </button>
      </div>
      <div>
        <input
          type="text"
          className="rounded border px-4 py-2 m-1"
          onChange={handleInputClick}
          value={name}
        />
        <p>Hello, {name}</p>
      </div>
    </main>
  );
}
