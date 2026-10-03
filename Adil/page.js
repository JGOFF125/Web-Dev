import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-12">
      <section className="mx-auto max-w-xl rounded-lg border border-slate-300 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
          Week 4 Assignment
        </p>

        <h1 className="mt-1 mb-8 text-4xl font-bold text-slate-900">
          Shopping Lists
        </h1>

        <ul>
          <li className="border-b border-slate-200 py-4">
            <p className="text-lg font-semibold text-slate-900">
              Joaquin Urbano
            </p>

            <Link
              href="/week-4/joaquin"
              className="mt-1 inline-block text-emerald-700 underline hover:text-emerald-900"
            >
              Joaquins Week 4 Assignment
            </Link>
          </li>

          <li className="border-b border-slate-200 py-4">
            <p className="text-lg font-semibold text-slate-900">
              Dialyn Villostas
            </p>

            <Link
              href="/week-4/dialyn"
              className="mt-1 inline-block text-emerald-700 underline hover:text-emerald-900"
            >
              Dialyn's Week 4 Assignment
            </Link>
          </li>
          <li className="border-b border-slate-200 py-4">
            <p className="text-lg font-semibold text-slate-900">Adil Khan</p>

            <Link
              href="/week-4/adil"
              className="mt-1 inline-block text-emerald-700 underline hover:text-emerald-900"
            >
              Adil's Week 4 Assignment
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
