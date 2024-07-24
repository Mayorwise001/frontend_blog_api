import About from './components/about';
import Login from './components/login';
import PublishedJobs from './components/publishedjobs'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Logout from './components/logout'

function Routed(){
    return(
        <Router>
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/about' element={<About/>}/>
                <Route path='/published-jobs' element={<PublishedJobs/>}/>
                <Route path='/logout' element={<Logout/>}/>
            </Routes>
        </Router>

    )
}
export default Routed