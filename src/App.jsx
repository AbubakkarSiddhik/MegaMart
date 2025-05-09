import React, { useEffect, useState, useContext } from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./assets/E-commerce/Navbar";
import HeroSection from "./assets/E-commerce/HeroSection";
import Shop from "./assets/E-commerce/Shop";
import ContactPage from "./assets/E-commerce/ContactPage";
import TestimonialsSection from "./assets/E-commerce/TestimonialsSection";
import AccountPage from "./assets/E-commerce/AccountPage";
import Categories from "./assets/E-commerce/Categories";
import ProductList from "./assets/E-commerce/ProductList";
import Cart from "./assets/E-commerce/Cart";
import CheckoutForm from "./assets/E-commerce/CheckoutForm";
import OrderConfirmation from "./assets/E-commerce/OrderConfirmation";
import Footer from "./assets/E-commerce/Footer";
import WhatsAppButton from "./assets/E-commerce/WhatsAppButton";
import AboutUsPage from "./assets/E-commerce/AboutUsPage ";
import Men from "./assets/E-commerce/men";
import Women from "./assets/E-commerce/Women";
import Accessories from "./assets/E-commerce/Accessories";
import Footwear from "./assets/E-commerce/Footwear";
import ReviewsPage from "./assets/E-commerce/ReviewsPage";
import Wishlist from "./assets/E-commerce/Wishlist";
import ProfilePage from "./assets/E-commerce/ProfilePage";
import ForgotPasswordPage from "./assets/E-commerce/ForgotPasswordPage";
import EditProfilePage from "./assets/E-commerce/EditProfilePage"; // New import
import OrdersPage from "./assets/E-commerce/OrdersPage"; // New import
import OwnerDashboard from "./assets/E-commerce/AdminDashboard"; // New import
import OrderDetail from "./assets/E-commerce/OrderDetail"; // New import
import { AuthProvider, AuthContext } from "./assets/E-commerce/AuthContext";

// ProtectedRoute component to handle authentication
const ProtectedRoute = ({ children, ownerOnly = false }) => {
  const { user } = useContext(AuthContext);
  console.log("ProtectedRoute user:", user); // Debug log
  if (!user) return <Navigate to="/account" />;
  if (ownerOnly && user.email !== "owner@gmail.com") return <Navigate to="/profile" />; // Check owner email
  return children;
};

// AppContent component to wrap routes and use context safely
const AppContent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([
    // { id: 1, name: "Laptop", price: 1200 },
    // { id: 2, name: "Smartphone", price: 800 },
    // { id: 3, name: "Headphones", price: 150 },
    // { id: 4, name: "Tablet", price: 600 },
  ]);

  const { user } = useContext(AuthContext); // Safe within AuthProvider
  useEffect(() => {
    console.log("App user state:", user); // Debug log
  }, [user]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="mt-20">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <Categories />
                <ProductList products={filteredProducts} searchQuery={searchQuery} />
              </>
            }
          />

          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<AboutUsPage />} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />

          <Route path="/contact" element={<ContactPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/reviews" element={<TestimonialsSection />} />

          <Route path="/checkoutform" element={<CheckoutForm />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/reviewspage" element={<ReviewsPage />} />
          <Route path="/men" element={<Men />} />
          <Route path="/women" element={<Women />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/Footwear" element={<Footwear />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/editprofilepage"
            element={
              <ProtectedRoute>
                <EditProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/orders"
            element={
              <ProtectedRoute>
                <OrdersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/owner-dashboard"
            element={
              <ProtectedRoute ownerOnly={true}>
                <OwnerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order/:orderId" // New route for order details
            element={
              <ProtectedRoute ownerOnly={true}>
                <OrderDetail />
              </ProtectedRoute>
            }
          />

          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/profilepage" element={<Navigate to="/profile" />} />
        </Routes>
      </div>
      <WhatsAppButton />
      <Footer />
    </>
  );
};

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
      {/* <MyContext.Provider value={user}>
        <Profile />
      </MyContext.Provider> */}

      {/* <center>
        <div>
          <h1 class="text-green-600 text-3xl font-bold">
            Scaling Effect
          </h1>
          <h3 class="text-xl text-black">
            Scale Animation on Hover using Tailwind CSS
          </h3>
        </div>
        <div>
          <div class="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div class="border-2 border-green-600 cursor-pointer py-6 rounded-lg 
                       transform transition duration-500 hover:scale-110">
              <h2 class="title-font font-medium text-3xl text-gray-900">
                Hover Me
              </h2>
            </div>
          </div>
        </div>
      </center> */}

      {/* Student Form UI */}
      {/* <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-5">
        <Card className="w-full max-w-md bg-opacity-30 backdrop-blur-lg bg-gray-800 border border-gray-700 shadow-2xl rounded-xl">
          <CardContent className="p-6">
            <Typography
              variant="h4"
              className="text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 font-bold mb-6"
            >
              Student Form 🚀
            </Typography>
            <form className="space-y-6" onSubmit={onSubmit}>
              <div className="flex flex-col">
                <label htmlFor="name" className="mb-2 text-lg font-semibold text-gray-500">
                  Name:
                </label>
                <TextField
                  id="name"
                  variant="outlined"
                  fullWidth
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="age" className="mb-2 text-lg font-semibold text-gray-500">
                  Age:
                </label>
                <TextField
                  id="age"
                  type="number"
                  variant="outlined"
                  fullWidth
                  required
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <Button variant="contained" type="submit" fullWidth">
                Add Student
              </Button>
            </form>
          </CardContent>
        </Card>
      </div> */}

      {/* Student List */}
      {/* <div className="flex justify-center mt-10">
        <div className="w-full max-w-4xl bg-gray-800 p-5 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center text-white mb-4">Student List 📋</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse border border-gray-700">
              <thead>
                <tr className="bg-gray-900 text-white">
                  <th className="px-4 py-2 border border-gray-700">ID</th>
                  <th className="px-4 py-2 border border-gray-700">Name</th>
                  <th className="px-4 py-2 border border-gray-700">Age</th>
                  <th className="px-4 py-2 border border-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.length > 0 ? students.map((student) => (
                  <tr key={student.id} className="bg-gray-700 text-white">
                    <td className="px-4 py-2">{student.id}</td>
                    <td className="px-4 py-2">{student.name}</td>
                    <td className="px-4 py-2">{student.age}</td>
                    <td className="px-4 py-2">
                      <button onClick={() => editStudent(student.id)}>Edit</button>
                      <button onClick={() => deleteStudent(student.id)}>Delete</button>
                    </td>
                  </tr>
                )) : <tr><td colSpan="4">No students found</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default App;
