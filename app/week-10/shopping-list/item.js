export default function Item({ item, isSelected, onSelect }) {
  return (
    <li>
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={isSelected}
        className={`w-full rounded border p-4 text-left ${
          isSelected ? "border-blue-700 bg-blue-100" : "border-gray-200 bg-white"
        }`}
      >
        <span className="block font-semibold">{item.name}</span>
        <span className="text-sm text-gray-700">
          {item.category} | Quantity: {item.quantity}
        </span>
      </button>
    </li>
  );
}