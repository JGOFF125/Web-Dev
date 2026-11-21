export default function Item({ id, name, category, quantity, selectedItemId, onSelect }) {
    const isSelected = selectedItemId === id;

    return (
        <li>
            <button
                type="button"
                className={`w-full rounded-lg border border-gray-200 p-4 text-left shadow-sm ${isSelected ? "bg-yellow-200" : "bg-white"}`}
                onClick={onSelect}
                aria-pressed={isSelected}
            >
                <h2 className="text-lg font-semibold text-gray-900">{name}</h2>
                <p className="text-sm text-gray-600">Category: {category}</p>
                <p className="text-sm text-gray-600">Quantity: {quantity}</p>
            </button>
        </li>
    );
}