import Link from "next/link";

export const metadata = {
  title: "Week 3 Shopping Lists",
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#e9e3d8] px-4 py-10">
      <section className="mx-auto max-w-2xl border border-stone-300 bg-[#fffdf7] px-8 py-10 shadow-md">
        <header className="mb-8 border-b-2 border-stone-800 pb-4">
          <p className="text-sm uppercase tracking-widest text-stone-500">
            Week 3 Assignment
          </p>

          <h1 className="mt-1 text-4xl font-bold text-stone-900">
            Shopping Lists
          </h1>
        </header>

        <ul>
          <li className="border-b border-dashed border-stone-300 py-4">
            <p className="text-lg font-semibold text-stone-900">
              Joaquin
            </p>

            <Link
              href="/week-3/joaquin"
              className="mt-1 inline-block text-amber-700 underline hover:text-amber-900"
            >
              Joaquin Shopping List 
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
}