import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom"; // Import đúng từ react-router-dom
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "./context/CartContext.tsx";
import { FavouriteProvider } from "./context/FavouriteContext.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={new QueryClient()}>
      <CartProvider>
        <FavouriteProvider>
          <App />
        </FavouriteProvider>
      </CartProvider>
    </QueryClientProvider>
  </BrowserRouter>
);
