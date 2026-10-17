import ItemList from "./item-list";

export default function Page() {
    return (
        <main className="min-h-screen bg-slate-950 p-4">
            <h1 className="text-3x1 font-bold text-emerald-400 m-2">Shopping List</h1>
            <ItemList />
        </main>
    );
}