import React, { Fragment, Component } from "react";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import jwtDecode from "jwt-decode";


let authenticated;
let userID = "";
const token = localStorage.LoginToken;

if (token) {
  const decodedToken = jwtDecode(token);
  axios.defaults.headers.common["Authorization"] = localStorage.LoginToken;
  console.log(`userID: ${decodedToken.user_id}`);
  userID = decodedToken.user_id;
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = "/login";
    authenticated = false;
  } else {
    authenticated = true;
  }
}

class NewPost extends Component {
  state = {
    userID: userID,
    open: false,
    body: "",
    errors: {},
  };

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("/postNew", { body: this.state.body })
      //in case of error
      .catch((err) => console.log(err));

    this.setState({ open: false });
  };

  render() {
    return (
      <Fragment>
        <button onClick={this.handleOpen}>new matching post</button>
        <p>userID: {this.state.userID}</p>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <button tip="Close" onClick={this.handleClose}>
            close
          </button>
          <DialogTitle>Start matching here</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="body"
                type="text"
                label="new post"
                multiline
                rows="3"
                placeholder=""
                //error={errors.body ? true : false}
                //helperText={errors.body}
                //className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <button
                type="submit"
                variant="contained"
                color="primary"
                //className={classes.submitButton}
                //disabled={loading}
              >
                Submit
              </button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

export default NewPost;
