import { AuthContextProvider } from "./_utils/auth-context";

export const metadata = {
  title: "My groceries | Week 9",
  description: "Shopping lists and meal ideas with GitHub sign-in",
};

export default function Layout({ children }) {
  return <AuthContextProvider>{children}</AuthContextProvider>;
}
