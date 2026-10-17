import NewItem from './new-item';

export default function Page() {
    return (
        <main className="min-h-screen bg-[#ddf6fe] p-8 text-black">
            <div className="mx-auto max-w-2xl rounded-xl bg-white p-6 shadow-md">
                <NewItem />
            </div>
        </main>
    );
}