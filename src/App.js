import EmpForm from "./components/Employee"
import SaveEmployee from "./components/SaveEmployee";
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
function App() {
  return (
    <div className='app'>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmpForm />}/>
      <Route path="/save" element={<SaveEmployee />} /> 
          </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
