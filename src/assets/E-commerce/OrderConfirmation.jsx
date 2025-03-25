import { Link } from "react-router-dom";

const OrderConfirmation = () => {
  return (
    <div className="max-w-lg mx-auto p-6 mt-20 bg-white shadow-lg rounded-lg text-center bg-gradient-to-r from-blue-50 to-purple-50">
      <h2 className="text-3xl font-bold text-green-600">🎉 Thank You for Your Order!</h2>
      <p className="mt-2 text-gray-600">Your order has been placed successfully.</p>
      <p className="mt-1 text-gray-500">We will send you a confirmation email shortly.</p>

      <div className="mt-6">
        <Link to="/">
          <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
