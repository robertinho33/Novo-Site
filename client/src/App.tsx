import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ShopProvider } from "@/contexts/ShopContext";
import { ReviewsProvider } from "@/contexts/ReviewsContext";
import Account from "@/pages/Account";
import Catalog from "@/pages/Catalog";
import Checkout from "@/pages/Checkout";
import Home from "@/pages/Home";
import Influencers from "@/pages/Influencers";
import NotFound from "@/pages/NotFound";
import Product from "@/pages/Product";
import Tracking from "@/pages/Tracking";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

function Router() {
  return <Switch>
    <Route path="/" component={Home} />
    <Route path="/catalogo" component={Catalog} />
    <Route path="/produto/:slug" component={Product} />
    <Route path="/checkout" component={Checkout} />
    <Route path="/rastreio" component={Tracking} />
    <Route path="/influenciadores" component={Influencers} />
    <Route path="/conta" component={Account} />
    <Route path="/404" component={NotFound} />
    <Route component={NotFound} />
  </Switch>;
}

export default function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="light"><ReviewsProvider><ShopProvider><TooltipProvider><Toaster position="bottom-right" /><Router /></TooltipProvider></ShopProvider></ReviewsProvider></ThemeProvider></ErrorBoundary>;
}
