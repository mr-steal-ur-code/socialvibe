import { FormEvent, useState } from "react";
import { useAuth } from "../../providers/AuthContext";
import {
	Container,
	Box,
	Typography,
	Alert,
	TextField,
	Button,
	Divider,
	Link,
} from "@mui/material";

const login: React.FC = () => {
	const { emailAndPasswordLogin } = useAuth();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
		event?.preventDefault();
		setLoading(true);
		setError("");
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
		setLoading(false);
	};

	return (
		<Container component="main" maxWidth="lg">
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Typography component="h1" variant="h5">
					Log into Socialvibe
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
						disabled={loading}
						type="submit"
						fullWidth
						variant="contained"
						sx={{
							fontSize: "1.5rem",
							fontWeight: 600,
							mt: 3,
							mb: 2,
						}}
					>
						Log In
					</Button>
				</Box>
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						mt: 2,
					}}
				>
					<Link href="/password-reset" variant="body1" color="warning">
						Forgot Password?
					</Link>
				</Box>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						mt: 2,
						mb: 2,
					}}
				>
					<Divider
						sx={{
							border: "1px solid white",
							width: "100px",
						}}
					/>
					<Typography sx={{ mx: 1 }} variant="caption">
						OR
					</Typography>
					<Divider
						sx={{
							border: "1px solid white",
							width: "100px",
						}}
					/>
				</Box>
				<Button
					sx={{ padding: "1rem", fontSize: "1.1rem" }}
					variant="contained"
					href="/register"
					color="success"
				>
					Create new account
				</Button>
			</Box>
		</Container>
	);
};

export default login;
