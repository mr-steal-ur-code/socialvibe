import { createTheme } from "@mui/material/styles";

const Theme = createTheme({
	palette: {
		action: {
			disabledBackground: "#494949",
			disabled: "#949494",
		},
		primary: {
			main: "#3f51b5",
		},
		secondary: {
			main: "#b7b3b4",
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
