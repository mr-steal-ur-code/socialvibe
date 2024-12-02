import { BrowserRouter, Route, Routes } from "react-router";
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

const App = () => {
	const [isHeaderVisible, setIsHeaderVisible] = useState(true);
	const [prevScrollY, setPrevScrollY] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;

			if (currentScrollY > prevScrollY) {
				console.log("hide:", currentScrollY > prevScrollY);
				setIsHeaderVisible(false);
			} else {
				console.log("show:", currentScrollY > prevScrollY);
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
					<Route path="/" Component={Posts} />
					<Route path="/login" Component={Login} />
					<Route path="/register" Component={Register} />
					<Route path="/password-reset" Component={PasswordReset} />
					<Route path="/find-friends" Component={FindFriends} />
					<Route path="/notifications" Component={Notifications} />
					<Route path="*" Component={NotFound} />
				</Routes>
			</div>
		</BrowserRouter>
	);
};

export default App;
