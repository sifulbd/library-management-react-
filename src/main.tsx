import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import AppRoutes from "./routes/routes.tsx";
import { ThemeProvider } from "./providers/theme-provider.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Provider store={store}>
                <BrowserRouter>
                    <AppRoutes />
                </BrowserRouter>
            </Provider>
        </ThemeProvider>
    </StrictMode>
);
