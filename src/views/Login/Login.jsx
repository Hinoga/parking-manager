import React, { useState } from 'react'

import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core'

import { useUser } from 'context/user'

import Button from '../../components/CustomButtons/Button'
import { snackMessage } from '../../variables/alert/alerts'

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://hinoga.me/">
        Hinoga
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://images.unsplash.com/photo-1532217635-b45271b1aab6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.success.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const classes = useStyles();

  const [formCreateUser, setFormCreateUser] = useState({
    email: '',
    password: '',
    phone: '',
    fullName: ''
  })
  const [formLogin, setLogin] = useState({ email: '', password: '' })

  const [user, dispatchUser] = useUser()

  const onChangeFormCreateUser = ev => {
    const value = ev.target.value
    const name = ev.target.name

    setFormCreateUser(prev => ({
      ...prev,
      [name]: value
    }))
  }
  const onChangeFormLogin = ev => {
    const value = ev.target.value
    const name = ev.target.name

    setLogin(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const createUser = async () => {
    try {
      await dispatchUser.register(formCreateUser)
      snackMessage(
        'Felicidades!',
        'La cuenta ha sido creada exitosamente',
        'success'
      )
    } catch (error) {
      snackMessage(
        'Ups!',
        'Ha ocurrido un error al intentar crear la cuenta',
        'error'
      )
    }
  }

  const login = async (ev) => {
    try {
      ev.preventDefault()
      await dispatchUser.login(formLogin)
    } catch (error) {
      snackMessage(
        'Ups!',
        'Ha ocurrido un error al intentar iniciar sesión',
        'error'
      )
    }
  }

  return (
    <Grid container component="main" className={classes.root}>
    <CssBaseline />
    <Grid item xs={false} sm={4} md={7} className={classes.image} />
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={login}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formLogin.email}
            onChange={onChangeFormLogin}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formLogin.password}
            onChange={onChangeFormLogin}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Recuérdame"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            color='success'
          >
            Iniciar sesión
          </Button>
          <Box mt={5}>
            {/* <Copyright /> */}
          </Box>
        </form>
      </div>
    </Grid>
  </Grid>
  )
}

export default Login
