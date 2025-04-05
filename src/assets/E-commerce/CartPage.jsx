import { useCart } from "./CartContext";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cart, removeFromCart, addToCart, decreaseQuantity } = useCart();
  const navigate = useNavigate();

 
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
              <div
                key={item.id}
                className="p-4 border shadow-md flex justify-between items-center"
              >
                
                <div>
                  <h3 className="text-lg">{item.name}</h3>
                  <p>₹{item.price}</p>
                  <p className="text-gray-500">Quantity: {item.quantity}</p>

              
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => addToCart(item)} 
                      className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>

              
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>

        
          <div className="mt-6 text-lg font-bold">
            Total: <span className="text-blue-500">₹{totalPrice}</span>
          </div>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => navigate("/checkout")}
            className="mt-4"
          >
            Proceed to Checkout
          </Button>
        </>
      )}
    </div>
  );
};

export default CartPage;
