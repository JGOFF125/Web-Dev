import styles from "./shopping-list.module.css";

export default function Item({ name, quantity, category, onSelect, selected }) {
  return (
    <li
      className={`${styles.selectableItem} ${selected ? styles.selectedItem : ""}`}
      onClick={onSelect}
    >
      <button type="button" aria-pressed={selected} className={styles.itemButton}>
        <span className={styles.itemText}>
          <span className={styles.itemName}>{name}</span>
          <span className={styles.itemQuantity}>Quantity: {quantity}</span>
        </span>
        <span className={styles.categoryBadge}>{category}</span>
      </button>
    </li>
  );
}
