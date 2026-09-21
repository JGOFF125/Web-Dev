import ItemList from "./item-list";

export const metadata = {
  title: "Shopping List",
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#e9e3d8] px-4 py-10">
      <section className="mx-auto max-w-2xl border border-stone-300 bg-[#fffdf7] px-8 py-10 shadow-md">
        <header className="mb-6 border-b-2 border-stone-800 pb-4">
          <p className="text-sm uppercase tracking-widest text-stone-500">
            Joaquin&apos;s weekly groceries
          </p>

          <h1 className="mt-1 text-4xl font-bold text-stone-900">
            Shopping List
          </h1>
        </header>

        <ItemList />
      </section>
    </main>
  );
}