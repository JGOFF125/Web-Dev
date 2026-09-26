import ItemList from "./item-list";

export default function Page() {
  return (
    <main className="min-h-screen bg-emerald-50 flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold text-emerald-900 mb-6">
        Shopping List
      </h1>
      <ItemList />
    </main>
  );
}
