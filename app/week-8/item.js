export default function Item({ name, quantity, category, onSelect }) {
  return (
    <li
      onClick={onSelect}
      className="flex cursor-pointer items-center justify-between rounded-lg border border-emerald-100 bg-white px-4 py-3 shadow-sm hover:bg-emerald-100"
    >
      <div>
        <p className="font-medium text-emerald-900">{name}</p>
        <p className="text-sm capitalize text-emerald-600">{category}</p>
      </div>
      <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-800">
        x{quantity}
      </span>
    </li>
  );
}