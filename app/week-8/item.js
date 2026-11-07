export default function Item({ name, quantity, category, onSelect }) {
  return (
    <li
      onClick={onSelect}
      className="p-3 m-2 bg-slate-800 rounded-md max-w-sm cursor-pointer hover:bg-slate-700"
    >
      <p className="text-lg font-semibold text-white">{name}</p>
      <p className="text-sm text-slate-300">
        Buy {quantity} in <span className="capitalize">{category}</span>
      </p>
    </li>
  );
}