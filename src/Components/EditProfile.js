import React, { Component, Fragment } from "react";
import axios from "axios";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
// Icons
import EditIcon from "@material-ui/icons/Edit";

const styles = {};

class EditProfile extends Component {
  state = {
    open: false,
    bio: "",
    email: "",
    gender: "",
    handel: "",
    imageUrl: "",
    location: "",
    priceHigh: "",
    priceLow: "",
    userID: "",
    createdAt: "",
    range: "",
    age: "",
  };

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleSubmit = () => {
    // const newProfile = {
    //   bio: this.state.bio,
    //   range: this.state.range,
    //   location: this.state.location,
    //   bio: this.state.bio,
    //   priceLow: this.state.priceLow,
    //   priceHigh: this.state.priceHigh,
    //   gender: this.state.gender,
    //   age: this.state.age,
    // };
    // console.log(newProfile);
    axios
      .post("/user", {
        bio: this.state.bio,
        range: this.state.range,
        location: this.state.location,
        bio: this.state.bio,
        priceLow: this.state.priceLow,
        priceHigh: this.state.priceHigh,
        gender: this.state.gender,
        age: this.state.age,
      })
      //in case of error
      .catch((err) => console.log(err));
    this.handleClose();
  };
  render() {
    const {
      classes,
      info: {
        bio,
        email,
        gender,
        handel,
        imageUrl,
        location,
        priceHigh,
        priceLow,
        userID,
        createdAt,
        range,
        age,
      },
    } = this.props.info;
    //console.log({ info });
    return (
      <Fragment>
        <Button
          tip="Edit Details"
          onClick={this.handleOpen}
          btnClassName={classes.button}
        >
          <EditIcon color="primary" />
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Edit your profile</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name="bio"
                tpye="text"
                label="Bio"
                multiline
                rows="3"
                placeholder="A brif bio about yourself"
                className={classes.textField}
                value={this.state.bio}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="age"
                tpye="text"
                label="Age"
                placeholder="your age"
                className={classes.textField}
                value={this.state.age}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="gender"
                tpye="text"
                label="Gender"
                placeholder="male/female"
                className={classes.textField}
                value={this.state.gender}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="location"
                tpye="text"
                label="Location/City"
                placeholder="which city do you live"
                className={classes.textField}
                value={this.state.location}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="priceHigh"
                tpye="text"
                label="Budget High"
                placeholder="What's the high limit of your budget"
                className={classes.textField}
                value={this.state.priceHigh}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="priceLow"
                tpye="text"
                label="Budget Low"
                placeholder="What's the high limit of your budget"
                className={classes.textField}
                value={this.state.priceLow}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="range"
                tpye="text"
                label="Distance"
                placeholder="The distance range from the city you live"
                className={classes.textField}
                value={this.state.range}
                onChange={this.handleChange}
                fullWidth
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

export default withStyles(styles)(EditProfile);
