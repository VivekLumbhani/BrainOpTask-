
import './App.css';
import HomeScreen from './components/HomeScreen';
import LoginScreen from './components/LoginScreen';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import RegisterForm from './components/RegisterForm';
import PostSomething from './components/PostSomething';


function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<LoginScreen/>}/>
        <Route path='/register' element={<RegisterForm/>}/>
        <Route path='/home' element={<HomeScreen/>}/>
        <Route path='/post' element={<PostSomething/>}/>


      </Routes>
    </Router>
    
    </>
  );
}

export default App;
