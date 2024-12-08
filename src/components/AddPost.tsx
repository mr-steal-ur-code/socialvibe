import { Avatar, Button, Container, TextareaAutosize } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";

interface AddPostProps {
	onAddPost: (arg0: Post) => void;
}

const AddPost: React.FC<AddPostProps> = ({ onAddPost }) => {
	const [body, setBody] = useState("");

	const handleSubmit = () => {
		if (body.trim()) {
			const newPost = { id: Date.now().toString(), body };
			onAddPost(newPost);
			setBody("");
		}
	};

	const handlePostInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setBody(event?.target?.value);
	};

	return (
		<Container>
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
				<TextareaAutosize
					style={{ width: "100%", resize: "none" }}
					minRows={2}
					maxRows={10}
					placeholder="Share your thoughts?"
					onChange={handlePostInput}
					value={body}
				/>
			</Box>
			<Button fullWidth onClick={handleSubmit} variant="contained">
				Share
			</Button>
		</Container>
	);
};

export default AddPost;
