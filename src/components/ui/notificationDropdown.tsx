import IconButton from "@mui/material/IconButton/IconButton";
import Menu from "@mui/material/Menu";
import { useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Box, ListItemButton, Typography } from "@mui/material";

const notificationDropdown: React.FC = () => {
	const notifications: any[] = [];
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
				<NotificationsIcon />
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
				{notifications?.length ? (
					notifications?.map((notification) => (
						<ListItemButton sx={{ minWidth: "300px" }}>
							{notification}
						</ListItemButton>
					))
				) : (
					<Box sx={{ p: 2 }}>
						<Typography variant="body2" color="textSecondary">
							No Notifications
						</Typography>
					</Box>
				)}
			</Menu>
		</div>
	);
};

export default notificationDropdown;
