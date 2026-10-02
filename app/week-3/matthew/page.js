import ItemList from "./item-list";

export default function Page() {
    return (
        <main className="min-h-screen bg-gray-100 p-8">
            <div className="mx-auto max-w-2xl rounded-xl bg-white p-6 shadow-md">
                <h1 className="mb-6 text-3xl font-bold text-gray-900">Shopping List</h1>
                <ItemList />
            </div>
        </main>
    );
}