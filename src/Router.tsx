import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Posts from "./pages/Posts";
import Header from "./components/Header";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";
import FindFriends from "./pages/FindFriends";

const App = () => {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" Component={Posts} />
				<Route path="/find-friends" Component={FindFriends} />
				<Route path="/notifications" Component={Notifications} />
				<Route path="*" Component={NotFound} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
