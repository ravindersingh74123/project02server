import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/homepage";
import Log from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Server1 from "./pages/home/server1";
import Server2 from "./pages/home/server2";
import Server3 from "./pages/home/server3";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";

function App() {
	const { authUser } = useAuthContext();
	return (
		<div className='p-4 h-screen flex items-center justify-center'>
			<Routes>
				
				<Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} /> 
				<Route path='/server1' element={ authUser ? <Server1 /> : <Navigate to={"/login"} />} />
				<Route path='/server2' element={ authUser ? <Server2 /> : <Navigate to={"/login"} />} />
				<Route path='/server3' element={ authUser ? <Server3 /> : <Navigate to={"/login"} />} />
				<Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
				<Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />
				
				{/* <Route path='/' element={ <Home /> } /> 
				<Route path='/server1' element={ <Server1/>} /> */}
			</Routes>
			<Toaster />
		</div>
	);
}

export default App;
