import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const navigate = useNavigate();
  const { cart, addToCart, decreaseQuantity, removeFromCart } = useCart();

  
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Your Cart 🛒</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-lg">Your cart is empty.</p>
        
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b py-4">
           
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />

           
              <div className="flex-1 ml-4">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-500">${item.price.toFixed(2)}</p>

                
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    disabled={item.quantity === 1}
                    className={`px-3 py-1 rounded-md ${
                      item.quantity === 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                    }`}
                  >
                    -
                  </button>
                  <span className="mx-3">{item.quantity}</span>
                  <button
                    onClick={() => addToCart(item)}
                    className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    +
                  </button>
                </div>
              </div>

            
              <button
                onClick={() => removeFromCart(item.id)}
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}

          
          <div className="mt-6 text-xl font-bold">
            Total: <span className="text-blue-500">${totalPrice.toFixed(2)}</span>
          </div>

          
          <button  onClick={() => navigate("/checkout")} className="mt-4 w-full py-2 bg-green-500 text-white rounded-md text-lg hover:bg-green-600 transition">
            Checkout
          </button>
          
        </div>
        
      )}
    </div>
  );
};

export default Cart;
