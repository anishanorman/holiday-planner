import { Holidays } from "../components/Holidays/Holidays";

export const Dashboard = () => {
	return (
		<div className="flex flex-col items-center gap-6 p-6">
			<a
				href="/holidays/new"
				className="bg-cyan-600 text-white px-3 py-1 rounded-full hover:bg-cyan-700 flex items-center gap-1 transition-transform hover:scale-105"
			>
				<span className="material-symbols-outlined text-2xl">add</span>
				<span className="translate-y-px">New holiday</span>
			</a>
			<Holidays />
		</div>
	);
};
