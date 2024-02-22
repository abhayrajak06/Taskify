import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import Tasks from "./pages/Tasks";
import PageNotFound from "./pages/PageNotFound";
import CreateTask from "./pages/CreateTask";
import UpdateTask from "./pages/UpdateTask";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/all-tasks" element={<Tasks />} />
        <Route path="/*" element={<PageNotFound />} />
        <Route path="/create-task" element={<CreateTask />} />
        <Route path="/update-task/:tId" element={<UpdateTask />} />
      </Routes>
      <Toaster />
      <Footer />
    </>
  );
}

export default App;
