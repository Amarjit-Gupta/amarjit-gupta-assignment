import AddUser from "./components/AddUser";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import AllUser from "./components/AllUser";
import EditUser from "./components/EditUser";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path={"/"} element={<AllUser/>}/>
      <Route path={"/adduser"} element={<AddUser/>}/>
       <Route path={"/editUser/:id"} element={<EditUser/>}/>
      </Routes>

    </BrowserRouter>
    </>
  );
};
export default App;