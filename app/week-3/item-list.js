import Item from "./item";

const items = [
    { name: "milk, 4 L 🥛", quantity: 1, category: "Dairy" },
    { name: "bread 🍞", quantity: 2, category: "Bakery" },
    { name: "eggs, dozen 🥚", quantity: 2, category: "Dairy" },
    { name: "bananas 🍌", quantity: 6, category: "Produce" },
    { name: "broccoli 🥦", quantity: 3, category: "Produce" },
    { name: "chicken breasts, 1 kg 🍗", quantity: 1, category: "Meat" },
    { name: "pasta sauce 🍝", quantity: 3, category: "Canned Goods" },
    { name: "spaghetti, 454 g 🍝", quantity: 2, category: "Dry Goods" },
    { name: "toilet paper, 12 pack 🧻", quantity: 1, category: "Household" },
    { name: "paper towels, 6 pack 🧻", quantity: 1, category: "Household" },
    { name: "dish soap 🍽️", quantity: 1, category: "Household" },
    { name: "hand soap 🧼", quantity: 4, category: "Household" },
];

export default function ItemList() {
    return (
        <ul className="space-y-3">
            {items.map((item) => (
                <Item
                    key={item.name}
                    name={item.name}
                    quantity={item.quantity}
                    category={item.category}
                />
            ))}
        </ul>
    );
}