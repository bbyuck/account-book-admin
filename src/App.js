import { useScrollToTop } from "hooks/use-scroll-to-top";
import Layout from "layouts/Layout";
import { Route, Routes } from "react-router-dom";
import ThemeProvider from "theme";

function App() {
  useScrollToTop();

  return (
    <ThemeProvider>
      <Routes>
        <Route path="*" element={<Layout />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
