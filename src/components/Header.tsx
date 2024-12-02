import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PeopleIcon from "@mui/icons-material/People";
import HomeIcon from "@mui/icons-material/Home";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AvatarDropdown from "./ui/AvatarDropdown";
import NotificationDropdown from "./ui/notificationDropdown";
import SettingsDropdown from "./ui/SettingsDropdown";
import Avatar from "@mui/material/Avatar";

interface HeaderProps {
	isVisible: boolean;
}
const Header: React.FC<HeaderProps> = ({ isVisible }) => {
	const user: { avatar: string } = { avatar: "" };
	const theme = useTheme();
	const isWideScreen = useMediaQuery(theme.breakpoints.up("sm"));
	return (
		<Box>
			<AppBar
				sx={{
					flexGrow: 1,
					height:
						isVisible && !isWideScreen
							? "112px"
							: isWideScreen
							? "64px"
							: "0px",
					overflow: "hidden",
					transition: "height 0.3s ease-in-out",
				}}
				position="fixed"
			>
				<Toolbar
					sx={{
						display: "flex",
						justifyContent: isWideScreen ? "space-between" : "flex-start",
						flexDirection: isWideScreen ? "row" : "column",
					}}
				>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							gap: 2,
							width: isWideScreen ? "auto" : "100%",
							justifyContent: isWideScreen ? "flex-start" : "space-between",
							mt: isWideScreen ? 0 : 1,
						}}
					>
						<img
							width={isWideScreen ? "50px" : "30px"}
							src="/socialvibeIcon.png"
							alt="socialvibe Icon"
						/>
						{!isWideScreen && <SettingsDropdown />}
					</Box>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							gap: 2,
							width: isWideScreen ? "auto" : "100%",
							justifyContent: isWideScreen ? "flex-end" : "space-around",
							mt: isWideScreen ? 0 : 2,
						}}
					>
						<IconButton href="/" color="inherit">
							<HomeIcon />
						</IconButton>
						<IconButton href="/find-friends" color="inherit">
							<PeopleIcon />
						</IconButton>
						{isWideScreen ? (
							<NotificationDropdown />
						) : (
							<IconButton href="/notifications" color="inherit">
								<NotificationsIcon />
							</IconButton>
						)}
						{isWideScreen ? (
							<AvatarDropdown />
						) : (
							<IconButton
								href="/profile"
								color="inherit"
								aria-label="account of current user"
								aria-haspopup="false"
							>
								<Avatar
									src={user?.avatar ? user?.avatar : "/svg/account_circle.svg"}
									sx={{ width: 32, height: 32 }}
								/>
							</IconButton>
						)}
					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	);
};
export default Header;
