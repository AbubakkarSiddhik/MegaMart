import { useNavigate } from 'react-router-dom';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Box,
  Typography 
} from '@mui/material';
import LockPersonIcon from '@mui/icons-material/LockPerson';

export const LoginPrompt = ({ open, onClose }) => {
  const navigate = useNavigate();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <LockPersonIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
        <DialogTitle sx={{ fontWeight: 'bold', px: 0 }}>
          Join Our Community
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Sign in to save items to your wishlist, track orders, and enjoy personalized recommendations.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', flexDirection: 'column', gap: 1 }}>
          <Button 
            onClick={() => navigate('/account')}
            fullWidth
            variant="contained"
            size="large"
            sx={{ mb: 1 }}
          >
            Sign In
          </Button>
          <Button 
            onClick={onClose}
            fullWidth
            variant="outlined"
            size="large"
          >
            Continue Browsing
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};