import { createTheme } from "@mui/material/styles";

const Theme = createTheme({
	palette: {
		primary: {
			main: "#3f51b5",
		},
		secondary: {
			main: "#f50057",
		},
		// ... other palette customizations
	},
	components: {
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
		// ... other component customizations
	},
});

export default Theme;
