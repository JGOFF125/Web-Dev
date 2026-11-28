import styles from "./shopping-list.module.css";

export default function Item({ name, quantity, category, onSelect, selected, onRemove, removing, removeDisabled }) {
  return (
    <li className={`${styles.selectableItem} ${selected ? styles.selectedItem : ""}`}>
      <button type="button" disabled={removeDisabled} onClick={onSelect} aria-pressed={selected} className={styles.itemButton}>
        <span className={styles.itemText}>
          <span className={styles.itemName}>{name}</span>
          <span className={styles.itemQuantity}>Quantity: {quantity}</span>
        </span>
        <span className={styles.categoryBadge}>{category}</span>
      </button>
      <button
        type="button"
        className={styles.removeButton}
        onClick={onRemove}
        disabled={removeDisabled}
        aria-label={`${removing ? "Removing" : "Remove"} ${name}`}
      >
        {removing ? "Removing…" : "Remove"}
      </button>
    </li>
  );
}
