import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import Page from "../app/week-10/shopping-list/page";

const mocks = vi.hoisted(() => ({
  auth: { user: { uid: "joaquin" }, loading: false, pending: false, error: "", logOut: vi.fn() },
  getItems: vi.fn(),
  addItem: vi.fn(),
  deleteItem: vi.fn(),
}));

vi.mock("../app/week-10/_utils/auth-context", () => ({ useUserAuth: () => mocks.auth }));
vi.mock("../app/week-10/_services/shopping-list-service", () => ({ getItems: mocks.getItems, addItem: mocks.addItem, deleteItem: mocks.deleteItem }));

beforeEach(() => {
  mocks.auth.user = { uid: "joaquin" };
  mocks.auth.loading = false;
  mocks.getItems.mockReset().mockResolvedValue([]);
  mocks.addItem.mockReset();
  mocks.deleteItem.mockReset();
});
afterEach(cleanup);

function addMilk() {
  fireEvent.change(screen.getByLabelText(/Item name/), { target: { value: "Milk" } });
  fireEvent.change(screen.getByLabelText("Category"), { target: { value: "dairy" } });
  fireEvent.click(screen.getByRole("button", { name: /Add to list/ }));
}

test("groceries wait for the account to load and remain after a page remount", async () => {
  let finishLoad;
  mocks.getItems.mockImplementationOnce(() => new Promise((resolve) => { finishLoad = resolve; }));
  mocks.addItem.mockResolvedValue("firestore-id");
  const view = render(<Page />);
  expect(screen.getByRole("button", { name: /Add to list/ }).disabled).toBe(true);
  await waitFor(() => expect(mocks.getItems).toHaveBeenCalledWith("joaquin"));
  finishLoad([]);
  await screen.findByText("A fresh start");
  addMilk();
  await screen.findByText("Milk added to your list");
  expect(mocks.addItem).toHaveBeenCalledWith("joaquin", { name: "Milk", quantity: 1, category: "dairy" });
  expect(screen.getByLabelText(/Item name/).value).toBe("");
  expect(screen.getByLabelText("Category").value).toBe("produce");
  view.unmount();
  mocks.getItems.mockResolvedValue([{ id: "firestore-id", name: "Milk", quantity: 1, category: "dairy" }]);
  render(<Page />);
  await screen.findByText("Milk");
  expect(mocks.getItems).toHaveBeenCalledTimes(2);
});

test("a rejected save preserves the form and a retry saves only once", async () => {
  mocks.addItem.mockRejectedValueOnce(new Error("offline"));
  render(<Page />);
  await screen.findByText("A fresh start");
  addMilk();
  await screen.findByRole("alert");
  expect(screen.getByLabelText(/Item name/).value).toBe("Milk");
  expect(screen.getByLabelText("Category").value).toBe("dairy");
  expect(screen.queryByText("Milk added to your list")).toBe(null);
  let finishSave;
  mocks.addItem.mockImplementationOnce(() => new Promise((resolve) => { finishSave = resolve; }));
  const button = screen.getByRole("button", { name: /Add to list/ });
  fireEvent.click(button);
  fireEvent.click(button);
  expect(mocks.addItem).toHaveBeenCalledTimes(2);
  expect(screen.getByRole("button", { name: /Saving/ }).disabled).toBe(true);
  finishSave("saved-once");
  await screen.findByText("Milk added to your list");
  expect(screen.getAllByText("Milk")).toHaveLength(1);
});

test("a loading failure shows a retry instead of an empty list", async () => {
  mocks.getItems.mockRejectedValueOnce(new Error("permission-denied"));
  render(<Page />);
  await screen.findByRole("alert");
  expect(screen.queryByText("A fresh start")).toBe(null);
  expect(screen.getByRole("button", { name: /Add to list/ }).disabled).toBe(true);
  fireEvent.click(screen.getByRole("button", { name: "Try again" }));
  await screen.findByText("A fresh start");
  expect(screen.getByRole("button", { name: /Add to list/ }).disabled).toBe(false);
});

test("switching accounts clears the previous list and ignores stale loads", async () => {
  let finishOldLoad;
  mocks.getItems.mockImplementationOnce(() => new Promise((resolve) => { finishOldLoad = resolve; }));
  const view = render(<Page />);
  mocks.auth.user = { uid: "classmate" };
  mocks.getItems.mockResolvedValue([{ id: "new", name: "Apples", quantity: 2, category: "produce" }]);
  view.rerender(<Page />);
  await screen.findByText("Apples");
  finishOldLoad([{ id: "old", name: "Milk", quantity: 1, category: "dairy" }]);
  await waitFor(() => expect(screen.queryByText("Milk")).toBe(null));
  expect(mocks.getItems).toHaveBeenLastCalledWith("classmate");
});

test("signed-out visitors cannot load groceries", () => {
  mocks.auth.user = null;
  render(<Page />);
  expect(screen.getByRole("link", { name: "Go to sign in" }).getAttribute("href")).toBe("/week-10");
  expect(mocks.getItems).not.toHaveBeenCalled();
});


test("removing a grocery waits for Firestore and stays removed after remount", async () => {
  mocks.getItems.mockResolvedValueOnce([{ id: "milk", name: "Milk", quantity: 1, category: "dairy" }]);
  let finishRemove;
  mocks.deleteItem.mockImplementationOnce(() => new Promise((resolve) => { finishRemove = resolve; }));
  const view = render(<Page />);
  const button = await screen.findByRole("button", { name: "Remove Milk" });
  fireEvent.click(button);
  fireEvent.click(button);
  expect(mocks.deleteItem).toHaveBeenCalledExactlyOnceWith("joaquin", "milk");
  expect(screen.getByRole("button", { name: "Removing Milk" }).disabled).toBe(true);
  expect(screen.getByText("Milk")).toBeTruthy();
  expect(screen.getByText("What’s for dinner?")).toBeTruthy();
  finishRemove();
  await screen.findByText("Milk removed from your list");
  expect(screen.queryByText("Milk")).toBe(null);
  await screen.findByText("A fresh start");
  view.unmount();
  mocks.getItems.mockResolvedValue([]);
  render(<Page />);
  await screen.findByText("A fresh start");
  expect(screen.queryByRole("button", { name: "Remove Milk" })).toBe(null);
});

test("a failed removal keeps the item and can be retried from a grouped list", async () => {
  mocks.getItems.mockResolvedValue([{ id: "milk", name: "Milk", quantity: 1, category: "dairy" }]);
  mocks.deleteItem.mockRejectedValueOnce(new Error("offline")).mockResolvedValueOnce(undefined);
  render(<Page />);
  await screen.findByText("Milk");
  fireEvent.click(screen.getByRole("button", { name: "Group by category" }));
  fireEvent.click(screen.getByRole("button", { name: "Remove Milk" }));
  await screen.findByRole("alert");
  expect(screen.getByText("Milk")).toBeTruthy();
  const button = screen.getByRole("button", { name: "Remove Milk" });
  expect(button.disabled).toBe(false);
  fireEvent.click(button);
  await screen.findByText("Milk removed from your list");
  expect(screen.queryByRole("alert")).toBe(null);
  expect(screen.queryByText("Milk")).toBe(null);
});


test("removing the selected ingredient clears its meal search", async () => {
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => ({ meals: [] }) }));
  mocks.getItems.mockResolvedValue([{ id: "milk", name: "Milk", quantity: 1, category: "dairy" }]);
  mocks.deleteItem.mockResolvedValue(undefined);
  try {
    render(<Page />);
    await screen.findByText("Milk");
    fireEvent.click(screen.getByRole("button", { name: /Milk\s*Quantity/ }));
    await screen.findByText("milk", { exact: true });
    fireEvent.click(screen.getByRole("button", { name: "Remove Milk" }));
    await screen.findByText("Milk removed from your list");
    await screen.findByText("What’s for dinner?");
  } finally {
    vi.unstubAllGlobals();
  }
});
