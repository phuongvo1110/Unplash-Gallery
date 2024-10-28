import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PhotoList from "./components/PhotoList/PhotoList";
import PhotoDetail from './components/PhotoDetail/PhotoDetail';
function App() {
  return (
    <Router basename='/Unplash-Gallery'>
      <Routes>
        <Route path='/' element={<PhotoList/>}/>
        <Route path='/photos/:id' element={<PhotoDetail/>}/>
      </Routes>
    </Router>
  );
}

export default App;
