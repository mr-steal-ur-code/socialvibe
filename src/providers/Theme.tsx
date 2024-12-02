import { createTheme } from "@mui/material/styles";

const Theme = createTheme({
	palette: {
		primary: {
			main: "#3f51b5",
		},
		secondary: {
			main: "#124294",
		},
		text: {
			primary: "rgba(255, 255, 255, 0.87)",
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: "none",
				},
			},
		},
		MuiTextField: {
			defaultProps: {
				sx: {
					"& .MuiOutlinedInput-root": {
						"& fieldset": {
							borderColor: "white",
						},
						"&.Mui-focused fieldset": {
							borderColor: "white",
						},
					},
				},
			},
		},
		MuiInputLabel: {
			styleOverrides: {
				root: {
					color: "rgba(255, 255, 255, 0.87)",
					"&.Mui-focused": {
						color: "rgba(255, 255, 255, 0.87)",
					},
				},
			},
		},
	},
});

export default Theme;
