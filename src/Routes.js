import About from './components/about';
import Login from './components/login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function Routed(){
    return(
        <Router>
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/about' element={<About/>}/>
            </Routes>
        </Router>

    )
}
export default Routed