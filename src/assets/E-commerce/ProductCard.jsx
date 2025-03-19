import { useCart } from "./CartContext";
import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <Card className="w-full max-w-xs shadow-lg">
      <CardMedia component="img" height="140" image={product.image} alt={product.name} />
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Typography variant="body1" className="text-gray-500">${product.price}</Typography>
        <Button variant="contained" color="primary" className="mt-2 w-full" onClick={() => addToCart(product)}>
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
