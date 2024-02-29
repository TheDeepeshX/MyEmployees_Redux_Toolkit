import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import AddEmployee from './components/AddEmployee';
import DisplayAllEmployee from './components/DisplayAllEMployee';
function App() {
  return (
    <div>
     <Router>
        <Routes>
          <Route element={<AddEmployee/>} path='/Addemployee'/> 
          <Route element={<DisplayAllEmployee/>} path='/Displayallemployee'/> 
        </Routes>
     </Router>
    </div>
  );
}

export default App;
