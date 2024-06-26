import { useScrollToTop } from "hooks/use-scroll-to-top";
import AdminRouter from "routes/AdminRouter";
import ThemeProvider from "theme";

function App() {
  useScrollToTop();

  return (
    <ThemeProvider>
      <AdminRouter />
    </ThemeProvider>
  );
}

export default App;
