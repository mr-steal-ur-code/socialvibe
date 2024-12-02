import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router";
import { useAuth } from "../../providers/AuthContext";
// import SettingsIcon from "@mui/icons-material/Settings";

const AvatarDropdown: React.FC = () => {
	const user: { avatar: string } = { avatar: "" };
	const { logout } = useAuth();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<IconButton onClick={handleMenuOpen} size="small" sx={{ ml: 2 }}>
				<Avatar
					src={user?.avatar ? user?.avatar : "/svg/account_circle.svg"}
					sx={{ width: 32, height: 32 }}
				/>
			</IconButton>

			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleMenuClose}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "right",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
			>
				<Link to="/profile">
					<MenuItem
						onClick={handleMenuClose}
						sx={{ color: "#333", fontWeight: "500" }}
					>
						<ListItemIcon>
							<Avatar
								src={user?.avatar ? user?.avatar : "/svg/account_circle.svg"}
								sx={{
									width: 24,
									height: 24,
									background: "#999",
								}}
							/>
						</ListItemIcon>
						Profile
					</MenuItem>
				</Link>
				{/* <MenuItem
					sx={{ color: "#333", fontWeight: "500" }}
					onClick={handleMenuClose}
				>
					<ListItemIcon>
						<SettingsIcon fontSize="small" />
					</ListItemIcon>
					Settings
				</MenuItem> */}
				<Divider />
				<MenuItem
					sx={{ color: "#333", fontWeight: "500" }}
					onClick={() => {
						logout();
						handleMenuClose();
					}}
				>
					<ListItemIcon>
						<LogoutIcon fontSize="small" />
					</ListItemIcon>
					Logout
				</MenuItem>
			</Menu>
		</div>
	);
};

export default AvatarDropdown;
