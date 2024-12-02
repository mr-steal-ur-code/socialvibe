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
} from "@mui/material";

const Register: React.FC = () => {
	const { emailLoginCreate } = useAuth();
	const [error, setError] = useState("");

	const handleRegistration = async (event: FormEvent<HTMLFormElement>) => {
		event?.preventDefault();
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
		const res = await emailLoginCreate(formData?.email, formData?.password);
		if (!res.success) {
			setError(res.response);
		}
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
					Create a new Socialvibe account
				</Typography>{" "}
				{error && <Alert severity="error">{error}</Alert>}
				<Box
					component="form"
					onSubmit={handleRegistration}
					noValidate
					sx={{ mt: 1 }}
				>
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
						sx={{ fontSize: "1.5rem", fontWeight: 600, mt: 3, mb: 2 }}
					>
						Create account
					</Button>
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
					href="/login"
					color="success"
				>
					Login
				</Button>
			</Box>
		</Container>
	);
};

export default Register;
