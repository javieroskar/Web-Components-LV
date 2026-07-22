import { useState } from 'react';

export default function Counter() {
	const [count, setCount] = useState(0);

	return (
		<div className="flex items-center gap-4 rounded-lg border border-slate-300 p-4">
			<button
				className="rounded-md bg-slate-900 px-3 py-1 text-white hover:bg-slate-700"
				onClick={() => setCount((c) => c - 1)}
			>
				-
			</button>
			<span className="min-w-[2ch] text-center text-lg font-semibold">{count}</span>
			<button
				className="rounded-md bg-slate-900 px-3 py-1 text-white hover:bg-slate-700"
				onClick={() => setCount((c) => c + 1)}
			>
				+
			</button>
		</div>
	);
}
