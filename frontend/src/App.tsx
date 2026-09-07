import { RouterProvider } from "react-router-dom";
import ThemeProvider from "./context/ThemeContext";
import router from "./router";
import AuthProvider from "./context/AuthContext";

function App() {

  return (
    <>
      <ThemeProvider >
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ThemeProvider>
    </>
  )
}

export default App;
