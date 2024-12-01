import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PeopleIcon from "@mui/icons-material/People";
import HomeIcon from "@mui/icons-material/Home";

const Header: React.FC = () => {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="fixed">
				<Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
					<img width="50px" src="/socialvibeIcon.png" alt="Custom Icon" />
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
					>
						<MenuIcon />
					</IconButton>
				</Toolbar>
				<Toolbar sx={{ display: "flex", justifyContent: "space-around" }}>
					<IconButton href="/" color="inherit">
						<HomeIcon />
					</IconButton>
					<IconButton href="/find-friends" color="inherit">
						<PeopleIcon />
					</IconButton>
					<IconButton href="/notifications" color="inherit">
						<NotificationsIcon />
					</IconButton>
					<IconButton
						color="inherit"
						aria-label="account of current user"
						aria-controls="menu-appbar"
						aria-haspopup="true"
						onClick={() => {
							alert("Setup popover");
						}}
					>
						<AccountCircle />
					</IconButton>
				</Toolbar>
			</AppBar>
		</Box>
	);
};
export default Header;
