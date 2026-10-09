import NewItem from './new-item';

export default function Page() {
    return (
        <main className="min-h-screen bg-gray-100 p-8">
            <div className="mx-auto max-w-2xl rounded-xl bg-white p-6 shadow-md">
                <NewItem />
            </div>
        </main>
    );
}