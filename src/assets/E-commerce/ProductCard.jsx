import { useCart } from "./CartContext";
import {
  ShoppingCart,
  FavoriteBorder,
  Favorite,
  LocalOffer,
  Star,
  CurrencyRupee
} from "@mui/icons-material";
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Button, 
  Chip,
  Box,
  Rating,
  Badge
} from "@mui/material";
import {
  ShoppingCart,
  FavoriteBorder,
  Favorite,
  LocalOffer,
  Star,
  CurrencyRupee
} from "@mui/icons-material";
import { useState } from "react";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Random rating for demo purposes 
  const rating = (Math.random() * 2 + 3).toFixed(1);
  const isNew = Math.random() > 0.7; // 30% chance to be "new"
  const isOnSale = Math.random() > 0.8; // 20% chance to be on sale

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`, {
      position: "bottom-right",
      autoClose: 2000,
      icon: <ShoppingCart />,
    });
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <Card 
      className="w-full max-w-xs relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: 6
        }
      }}
    >
      {/* Sale/New Badges */}
      <Box sx={{ position: 'absolute', top: 10, left: 10, zIndex: 1 }}>
        {isNew && (
          <Chip 
            label="NEW" 
            size="small" 
            color="success" 
            sx={{ fontWeight: 'bold', mr: 1 }} 
          />
        )}
        {isOnSale && (
          <Chip 
            label="SALE" 
            size="small" 
            color="error" 
            icon={<LocalOffer fontSize="small" />}
            sx={{ fontWeight: 'bold' }} 
          />
        )}
      </Box>

      {/* Favorite Button */}
      <Button
        sx={{
          position: 'absolute',
          top: 10,
          right: 10,
          zIndex: 1,
          minWidth: 'auto',
          p: 1,
          borderRadius: '50%',
          bgcolor: 'background.paper',
          '&:hover': {
            bgcolor: 'action.hover'
          }
        }}
        onClick={toggleFavorite}
      >
        {isFavorite ? (
          <Favorite color="error" />
        ) : (
          <FavoriteBorder color="action" />
        )}
      </Button>

      {/* Product Image */}
      <Badge
        badgeContent={isOnSale ? `${Math.round(Math.random() * 30 + 10)}% OFF` : null}
        color="error"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        sx={{ width: '100%' }}
      >
        <CardMedia
          component="img"
          height="200"
          image={product.image}
          alt={product.name}
          sx={{
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)'
          }}
        />
      </Badge>

      <CardContent>
        {/* Product Name */}
        <Typography 
          variant="h6" 
          component="div"
          sx={{
            fontWeight: 'bold',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {product.name}
        </Typography>

        {/* Rating */}
        <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
          <Rating
            value={parseFloat(rating)}
            precision={0.1}
            readOnly
            size="small"
            emptyIcon={<Star fontSize="inherit" sx={{ opacity: 0.5 }} />}
          />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            ({rating})
          </Typography>
        </Box>

        {/* Price */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <CurrencyRupee fontSize="small" color="primary" />
          <Typography 
            variant="h6" 
            color="primary"
            sx={{ fontWeight: 'bold', ml: 0.5 }}
          >
            {product.price.toLocaleString()}
          </Typography>
          {isOnSale && (
            <Typography 
              variant="body2" 
              color="text.disabled"
              sx={{ textDecoration: 'line-through', ml: 1 }}
            >
              ₹{(product.price * 1.2).toLocaleString()}
            </Typography>
          )}
        </Box>

        {/* Add to Cart Button */}
        <Button
          variant="contained"
          fullWidth
          startIcon={<ShoppingCart />}
          onClick={handleAddToCart}
          sx={{
            fontWeight: 'bold',
            py: 1,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)'
            }
          }}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
