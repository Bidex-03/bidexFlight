import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import GlobalStyles from "./styles/GlobalStyles";
import Home from "./components/Home";
import BookTicket from "./components/BookTicket";
import BoardingPass from "./components/BoardingPass";
import AdminDashboard from "./components/AdminDashboard";
import NotFound from "./components/NotFound";
import SignUp from "./authentication/SignUp";
import SignIn from "./authentication/SignIn";
import { Toaster } from "react-hot-toast";
import RootLayout from "./ui/RootLayout";
import ProtectedRoute from "./ui/ProtectedRoute";
import Profile from "./components/Profile";
import About from "./components/About";
import Bookings from "./components/Bookings";
import Contact from "./components/Contact";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <GlobalStyles />
      <Router>
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <RootLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate replace to="home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/book-ticket" element={<BookTicket />} />
            <Route path="/book-flight/:flightId" element={<BookTicket />} />
            <Route path="/boarding-pass" element={<BoardingPass />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 5000 },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--background-color)",
            color: "var(--primary-color)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
