import { useState } from "react";
import { TextField, Button, Typography, Box, Alert } from "@mui/material";
import { useAuth } from "../../providers/AuthContext";

const PasswordReset: React.FC = () => {
	document.title = "Recover Password";
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const { passwordReset } = useAuth();
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");

	const handlePasswordReset = async () => {
		setMessage("");
		if (!email.trim()) {
			return setMessage(
				"Please provide the email address associated with the account."
			);
		} else if (!emailRegex.test(email)) {
			return setMessage("Email address not valid");
		}
		const res = await passwordReset(email);
		setMessage(res?.response || "An error occurred.");
	};

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				gap: 2,
				margin: 2,
			}}
		>
			<Typography variant="h6">
				Forgot your password? Enter the email address associated with your
				account, and we'll send you instructions to reset it.
			</Typography>
			{message && <Alert severity="error">{message}</Alert>}
			<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
				<TextField
					type="email"
					label="Email"
					variant="outlined"
					fullWidth
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<Button
					fullWidth
					variant="contained"
					color="primary"
					onClick={handlePasswordReset}
				>
					Send
				</Button>
			</Box>
		</Box>
	);
};

export default PasswordReset;
