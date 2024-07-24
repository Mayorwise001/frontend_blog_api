
import Login from './components/login';
import PublishedJobs from './components/publishedjobs'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Logout from './components/logout'
import ChangePassword from './components/change-passwords';
import ProtectedRoute from './components/protectedroute';
import AllUsers from './components/allusers';
import AddCategory from './components/addcategory';
import AddJob from './components/addjob';


function Routed(){
    return(
        <Router>
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/logout' element={<Logout/>}/>
                <Route path="/change-password" element={<ProtectedRoute />}>
                    <Route index element={<ChangePassword />} />
                    <Route/>
                    </Route> 
                <Route path="/published-jobs" element={<PublishedJobs />}>
                    <Route index element={<ChangePassword />} />
                    <Route/>
                    </Route> 
                <Route path="/allusers" element={<ProtectedRoute />}>
                    <Route index element={<AllUsers />} />
                    <Route/>
                    </Route> 
                <Route path="/addcategory" element={<ProtectedRoute />}>
                    <Route index element={<AddCategory />} />
                    <Route/>
                    </Route> 
                <Route path="/addjob" element={<ProtectedRoute />}>
                    <Route index element={<AddJob />} />
                    <Route/>
                    </Route> 
            </Routes>
        </Router>

    )
}
export default Routed