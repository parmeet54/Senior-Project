/*

  Signup form template used from Material-UI: https://material-ui.com/getting-started/templates/, 
  https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sign-up

*/

import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import propTypes from "prop-types";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

class signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmpw: "",
      handle: "",
      errors: {},
    };
  }

  handleSignup = (event) => {
    event.preventDefault();

    axios
      .post("/signup", {
        email: this.state.email,
        password: this.state.password,
        confirmPassword: this.state.confirmpw,
        handel: this.state.handle,
      })
      .then((res) => {
        //console.log(result.data);
        localStorage.setItem("LoginToken", `Bearer ${res.data}`);
        axios.defaults.headers.common["Authorization"] = `Bearer ${res.data}`;
      })
      .then(() => {
        this.props.history.push("/home");
      })

      .catch((error) => {
        this.setState({
          errors: error.response.data,
        });
      });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const classes = useStyles;
    const { errors } = this.state;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h3" align={"justify"}>
            Roommate Match
          </Typography>
          <br />
          <br />
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon color="secondary" />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form
            className={classes.form}
            onSubmit={this.handleSignup}
            noValidate
          >
            <Grid container spacing={1}></Grid>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              helperText={errors.email}
              error={errors.error ? true : false}
              value={this.state.error}
              onChange={this.handleChange}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="handle"
              label="Enter Username"
              type="text"
              id="handle"
              helperText={errors.handle}
              error={errors.handel ? true : false}
              value={this.state.handle}
              onChange={this.handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              helperText={errors.password}
              error={errors.password ? true : false}
              value={this.state.password}
              onChange={this.handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirmpw"
              label="Confirm Password"
              type="password"
              id="confirmpw"
              helperText={errors.confirmPassword}
              error={errors.confirmPassword ? true : false}
              value={this.state.confirmpw}
              onChange={this.handleChange}
            />

            {errors.general && (
              <Typography variant="body2" color="error">
                {errors.general}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        {/* <Box mt={8}></Box> */}
      </Container>
    );
  }
}

signup.propTypes = {
  classes: propTypes.object.isRequired,
};

export default signup;
