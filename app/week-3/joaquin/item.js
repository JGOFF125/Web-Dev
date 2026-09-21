export default function Item({ name, quantity, category }) {
  return (
    <li className="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-dashed border-stone-300 py-4">
      <div>
        <h2 className="text-lg font-semibold text-stone-900">
          {name}
        </h2>

        <p className="mt-1 text-sm text-stone-600">
          Quantity: {quantity}
        </p>
      </div>

      <p className="text-right text-xs font-semibold uppercase tracking-wide text-amber-700">
        {category}
      </p>
    </li>
  );
}