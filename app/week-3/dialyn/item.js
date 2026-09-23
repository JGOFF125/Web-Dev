export default function Item({ name, quantity, category }) {
  return (
    <li className="p-3 m-2 bg-slate-800 rounded-lg max-w-sm">
      <h3 className="text-lg font-bold text-emerald-300">{name}</h3>
      <p className="text-sm text-slate-300">
        Buy {quantity} in {category}
      </p>
    </li>
  );
}