import { Provider } from "react-redux";
import { Routes, Route } from "react-router-dom"
import './App.css';
import DashBoard from './pages/dashBoard/DashBoard';
import Signin from './pages/signin/Signin';
import Signup from './pages/signup/Signup';
import store from "./redux/Store";


function App() {
  return (
    
    <div className="App">
     <Provider store={store}>
     <Routes>
        <Route path="/" element={ <Signin/> } />
        <Route path="signup" element={ <Signup/>  } />
        <Route path="dashboard" element={ <DashBoard/>  } />
      </Routes>
      </Provider>
    </div>
  );
}

export default App;
