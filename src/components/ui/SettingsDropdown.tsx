import IconButton from "@mui/material/IconButton/IconButton";
import Menu from "@mui/material/Menu";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Divider, ListItemIcon, MenuItem } from "@mui/material";
import { useAuth } from "../../providers/AuthContext";
import LogoutIcon from "@mui/icons-material/Logout";

const SettingsDropdown: React.FC = () => {
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
			<IconButton
				color="inherit"
				onClick={handleMenuOpen}
				size="small"
				sx={{ ml: 2 }}
			>
				<MenuIcon />
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

export default SettingsDropdown;
