import React, { Fragment, Component } from "react";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

class NewPost extends Component {
  state = {
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
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          className={useStyles.submit}
          onClick={this.handleOpen}
        >
          new matching post
        </Button>
        {/* <p>userID: {this.props.userID}</p> */}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <button tip="Close" onClick={this.handleClose}>
            close
          </button>
          {/* <DialogTitle>Start matching here</DialogTitle> */}
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

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={useStyles.submit}
              >
                Submit
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

export default NewPost;
