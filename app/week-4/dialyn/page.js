import NewItem from "./new-item";

export default function Page() {
    return (
        <main className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-8">
            <h1 className="text-3xl font-bold text-emerald-400 mb-6">Week 4: New Item</h1>
            <NewItem /> 
        </main>
    );
}