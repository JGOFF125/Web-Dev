import NewItem from "./new-item";

export default function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#eef3f7] px-6">
      <div className="w-full max-w-md">
        <header className="mb-6 text-center">
          <h1 className="text-4xl font-bold text-[#1d2b3a]">
            Adil Khan
          </h1>

          <p className="mt-2 text-lg text-[#5b6b7c]">
            Week 4 Assignment
          </p>
        </header>

        <NewItem />
      </div>
    </main>
  );
}