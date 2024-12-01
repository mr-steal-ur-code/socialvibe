import { FormEvent, useState } from "react";
import { useAuth } from "../../providers/AuthContext";
import {
	Container,
	Box,
	Typography,
	Alert,
	TextField,
	Button,
} from "@mui/material";

const login: React.FC = () => {
	const { emailAndPasswordLogin } = useAuth();
	const [error, setError] = useState("");

	const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
		event?.preventDefault();

		const data = new FormData(event?.target as HTMLFormElement);
		const formData: { email: string; password: string } = {
			email: "",
			password: "",
		};
		for (const [key, value] of data.entries()) {
			if (key in formData) {
				formData[key as keyof typeof formData] = value as string;
			}
		}
		const res = await emailAndPasswordLogin(
			formData?.email,
			formData?.password
		);
		if (!res.success) {
			setError(res.response);
		}
	};

	return (
		<Container component="main" maxWidth="xs">
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Typography component="h1" variant="h5">
					Socialvibe Log in
				</Typography>{" "}
				{error && <Alert severity="error">{error}</Alert>}
				<Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Log In
					</Button>
				</Box>
			</Box>
		</Container>
	);
};

export default login;
