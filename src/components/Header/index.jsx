import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CodeIcon from '@material-ui/icons/Code';
import { Link } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Register from '../../features/Auth/components/Register';
import Login from '../../features/Auth/components/Login';
import { Badge, Box, IconButton, Menu, MenuItem } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { logout } from '../../features/Auth/userSlice';
import MailIcon from '@material-ui/icons/Mail';
import { cartItemsCountSelector } from '../../features/Cart/selector';
import { useHistory } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: 'none',
    color: 'white',
  },
  dialog: {
    minWidth: '420px',
  },
  icon: {
    color: 'white',
  },
}));

const MODE = {
  LOGIN: 'login',
  REGISTER: 'register',
};

export default function Header() {
  const loggedInUser = useSelector((state) => state.user.current);
  const isLoggedIn = !!loggedInUser.id;
  const [open, setOpen] = React.useState(false);
  const [mode, setMode] = React.useState(MODE.LOGIN);
  const [anchorEl, setAnchorEl] = useState(null);
  const cartItemsCount = useSelector(cartItemsCountSelector);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //handle open/close menu icon
  const handleUserClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserClose = () => {
    setAnchorEl(null);
  };

  //handle logout
  function handleLogoutClick() {
    const action = logout();
    dispatch(action);
  }

  function handleCartClick() {
    history.push('/cart');
  }


  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <CodeIcon />
          <Typography variant="h6" className={classes.title}>
            <Link to="  " className={classes.link}>
              Ez Shop
            </Link>
          </Typography>
          <Link to="products" className={classes.link}>
            <Button color="inherit">Home</Button>
          </Link>
          <Link to="todos" className={classes.link}>
            <Button color="inherit">Todo</Button>
          </Link>
          <Link to="album" className={classes.link}>
            <Button color="inherit">Album</Button>
          </Link>
          {!isLoggedIn && (
            <Button color="inherit" onClick={handleClickOpen}>
              Login
            </Button>
          )}

          <IconButton aria-label="show 4 new mails" color="inherit" onClick={handleCartClick}>
            <Badge badgeContent={cartItemsCount} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {isLoggedIn && (
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleUserClick}>
              <IconButton>
                <AccountCircleIcon className={classes.icon}></AccountCircleIcon>
              </IconButton>
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleUserClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        getContentAnchorEl={null}
      >
        <MenuItem onClick={handleUserClose}>Profile</MenuItem>
        <MenuItem onClick={handleUserClose}>My account</MenuItem>
        <MenuItem
          onClick={() => {
            handleLogoutClick();
            handleUserClose();
          }}
        >
          Logout
        </MenuItem>
      </Menu>

      <Dialog
        disableBackdropClick
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        className={classes.dialog}
      >
        <DialogContent>
          <DialogContentText>
            {mode === MODE.REGISTER && (
              <>
                <Register closeDialog={handleClose} />
                <Box>
                  <Button textAlign="center" onClick={() => setMode(MODE.LOGIN)}>
                    Already have an account. Login here
                  </Button>
                </Box>
              </>
            )}
            {mode === MODE.LOGIN && (
              <>
                <Login closeDialog={handleClose} />
                <Box>
                  <Button textAlign="center" onClick={() => setMode(MODE.REGISTER)}>
                    Don't have ab account. Register here
                  </Button>
                </Box>
              </>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
