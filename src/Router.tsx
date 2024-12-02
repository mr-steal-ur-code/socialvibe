import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import "./App.css";
import Posts from "./pages/Posts";
import Header from "./components/Header";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";
import FindFriends from "./pages/FindFriends";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import PasswordReset from "./pages/auth/PasswordReset";
import { useEffect, useState } from "react";
import { useAuth } from "./providers/AuthContext";
import Profile from "./pages/Profile";

const App = () => {
	const { isLoggedIn } = useAuth();
	const [isHeaderVisible, setIsHeaderVisible] = useState(true);
	const [prevScrollY, setPrevScrollY] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;

			if (currentScrollY > prevScrollY) {
				setIsHeaderVisible(false);
			} else {
				setIsHeaderVisible(true);
			}
			setPrevScrollY(currentScrollY);
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [prevScrollY]);

	return (
		<BrowserRouter>
			<Header isVisible={isHeaderVisible} />
			<div className="content">
				<Routes>
					<Route
						path="/"
						element={isLoggedIn ? <Posts /> : <Navigate to="/login" replace />}
					/>
					<Route
						path="/login"
						element={isLoggedIn ? <Navigate to="/" replace /> : <Login />}
					/>
					<Route path="/register" element={<Register />} />
					<Route path="/password-reset" element={<PasswordReset />} />
					<Route
						path="/find-friends"
						element={
							isLoggedIn ? <FindFriends /> : <Navigate to="/login" replace />
						}
					/>
					<Route
						path="/profile"
						element={
							isLoggedIn ? <Profile /> : <Navigate to="/login" replace />
						}
					/>
					<Route
						path="/notifications"
						element={
							isLoggedIn ? <Notifications /> : <Navigate to="/login" replace />
						}
					/>
					<Route path="*" element={<NotFound />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
};

export default App;
