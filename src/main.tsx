import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./Router.tsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { AuthContextProvider } from "./providers/AuthContext.tsx";
import { ThemeProvider } from "@mui/material";
import Theme from "./providers/Theme.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<AuthContextProvider>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider theme={Theme}>
					<Router />
				</ThemeProvider>
				<ReactQueryDevtools />
			</QueryClientProvider>
		</AuthContextProvider>
	</StrictMode>
);
