import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();


  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto p-6 bg-gradient-to-r from-blue-50 to-purple-50">
      <h2 className="text-2xl font-bold mb-4">Your Cart 🛒</h2>

      {cart.length === 0 ? (
        <p className="text-gray-600 text-lg">Your cart is empty.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cart.map((item) => (
              <div key={item.id} className="p-4 border shadow-md flex items-center gap-4 rounded-md">
                
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md" />

               
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-700">${item.price.toFixed(2)}</p>
                  <p className="text-gray-500">Quantity: {item.quantity}</p>
                </div>

               
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

         
          <div className="mt-6 text-lg font-bold">
            Total: <span className="text-blue-500">${totalPrice.toFixed(2)}</span>
          </div>

          <button onClick={() => navigate("/checkoutform")} className="mt-4 w-full py-2 bg-green-500 text-white rounded-md text-lg hover:bg-green-600 transition">
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default CartPage;
