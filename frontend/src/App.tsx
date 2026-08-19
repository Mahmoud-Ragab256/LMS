import Header from "./components/Header";
import ThemeProvider from "./context/ThemeContext";
import Register from "./pages/Register";

function App() {

  return (
    <>
      <ThemeProvider >
        <Header />
        <Register />
      </ThemeProvider>
    </>
  )
}

export default App;
