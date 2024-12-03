import { Avatar, TextField } from "@mui/material";
import Box from "@mui/material/Box";

const AddPost: React.FC = () => {
	return (
		<Box
			sx={{
				background: "rgba(0,0,0,.1)",
				padding: "1rem",
				borderRadius: "6px",
				display: "flex",
				flexDirection: "row",
				gap: 2,
				alignItems: "center",
			}}
		>
			<Avatar src="/svg/account/circle " />
			<TextField
				slotProps={{ htmlInput: { maxLength: 200 } }}
				placeholder="What's on your mind?"
				fullWidth
				variant="filled"
			/>
		</Box>
	);
};

export default AddPost;
