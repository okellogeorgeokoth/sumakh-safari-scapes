import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Safaris from "./pages/Safaris";
import SafariDetails from "./pages/Safaris"; // New component
import Destinations from "./pages/Destinations";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Contact from "./pages/Contact";
import BookNow from "./pages/BookNow";
import ScrollToTop from "./components/ScrollToTop"; // Recommended addition

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider delayDuration={300}>
      <Toaster />
      <Sonner position="top-right" richColors />
      <BrowserRouter>
        <ScrollToTop /> {/* Auto-scroll to top on route change */}
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/safaris" element={<Safaris />} />
          <Route path="/safaris/:tourId" element={<SafariDetails />} /> {/* Added dynamic route */}
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/booknow" element={<BookNow />} />
          {/* Protected/Admin routes could be added here */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;