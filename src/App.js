import AdminAlert from "components/alert";
import AdminConfirm from "components/confirm";
import { useScrollToTop } from "hooks/use-scroll-to-top";
import AdminRouter from "routes/AdminRouter";
import ThemeProvider from "theme";

export default function App() {
  useScrollToTop();

  return (
    <ThemeProvider>
      <AdminConfirm />
      <AdminAlert />
      <AdminRouter />
    </ThemeProvider>
  );
}
