import { useScrollToTop } from "hooks/use-scroll-to-top";
import DashboardLayout from "layouts";
import { Route, Routes } from "react-router-dom";
import ThemeProvider from "theme";

function App() {
  useScrollToTop();

  return (
    <ThemeProvider>
      <Routes>
        <Route path="*" element={<DashboardLayout />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
