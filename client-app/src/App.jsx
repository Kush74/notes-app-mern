import { Route, Routes } from "react-router-dom";
import "./App.css";
import { MainLayout } from "./components/layout/MainLayout";
import { Home } from "./components/Home";
import { NewNote } from "./components/NewNote";
import { EmptyLayout } from "./components/layout/EmptyLayout";
import { SignIn } from "./components/auth/SignIn";
import { SignUp } from "./components/auth/SignUp";

function App() {
  return (
    <Routes>
      <Route element={<EmptyLayout />}>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Route>

      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<NewNote />} />
      </Route>
    </Routes>
  );
}

export default App;
