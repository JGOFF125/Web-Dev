export default function Item({ name, quantity, category }) {
  return (
    <li className="flex items-center justify-between bg-white rounded-lg shadow-sm px-4 py-3 border border-emerald-100">
      <div>
        <p className="text-emerald-900 font-medium">{name}</p>
        <p className="text-emerald-600 text-sm">{category}</p>
      </div>
      <span className="bg-emerald-100 text-emerald-800 text-sm font-semibold px-3 py-1 rounded-full">
        x{quantity}
      </span>
    </li>
  );
}
