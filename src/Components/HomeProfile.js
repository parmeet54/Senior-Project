import React, { Component, Fragment } from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import EditProfile from "./EditProfile";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import MuiLink from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
// Icons
import LocationOn from "@material-ui/icons/LocationOn";

import CalendarToday from "@material-ui/icons/CalendarToday";
import EditIcon from "@material-ui/icons/Edit";
import EmailIcon from "@material-ui/icons/Email";
import WcIcon from "@material-ui/icons/Wc";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import PinDropIcon from "@material-ui/icons/PinDrop";

import CircularProgress from "@material-ui/core/CircularProgress";

import axios from "axios";

const styles = {
  paper: {
    padding: 20,
    elevation: 3,
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%",
      },
    },
    "& .profile-image": {
      width: 200,
      height: 200,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%",
    },
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle",
      },
      "& a": {
        color: "#00bcd4",
      },
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0",
    },
  },
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px",
    },
  },
};

class HomeProfile extends Component {
  state = {};

  handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    axios.post("/user/profileImage", formData).catch((err) => console.log(err));
    //
    //this.props.uploadImage(formData);
  };
  handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };
  render() {
    const {
      classes,
      authenticated,
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
        age,
        range,
      },
    } = this.props;

    let profileMarkup = createdAt ? (
      <Paper className={classes.paper} elevation={3}>
        <div className={classes.profile}>
          <EditProfile info={this.props} />
          <div className="image-wrapper">
            <img src={imageUrl} alt="profile" className="profile-image" />
            <input
              type="file"
              id="imageInput"
              hidden="hidden"
              onChange={this.handleImageChange}
            />
            <Button
              tip="Edit profile picture"
              onClick={this.handleEditPicture}
              btnClassName="button"
            >
              <EditIcon color="primary" />
            </Button>
          </div>
          <hr />
          <div className="profile-details">
            <MuiLink
              component={Link}
              to={`/user/${handel}`}
              color="primary"
              variant="h5"
            >
              {handel}
            </MuiLink>
            <hr />
            {bio && <Typography variant="body2">{bio}</Typography>}
            <hr />
            {location && (
              <Fragment>
                <LocationOn color="primary" /> <span>{location}</span>
                <hr />
              </Fragment>
            )}
            {email && (
              <Fragment>
                <EmailIcon color="primary" />{" "}
                <a href="" target="_blank" rel="noopener noreferrer">
                  {email}
                </a>
                <hr />
              </Fragment>
            )}
            <div>
              <CalendarToday color="primary" />{" "}
              <span>Joined {dayjs(createdAt).format("MMM DD YYYY")}</span>
              <hr />
            </div>
            <div>
              <WcIcon color="primary" />{" "}
              <span color="primary">Gender: {gender}</span>
              <ArrowForwardIosIcon color="primary" /> <span>Age: {age}</span>
              <hr />
            </div>
            <div>
              <AttachMoneyIcon color="primary" />{" "}
              <span>
                Budget: ${priceLow} - ${priceHigh}
              </span>
              <hr />
            </div>
            <div>
              <PinDropIcon color="primary" />{" "}
              <span>Distance: {range} miles</span>
            </div>
          </div>
        </div>
      </Paper>
    ) : (
      <CircularProgress color="secondary" />
    );

    return profileMarkup;
  }
}

export default withStyles(styles)(HomeProfile);
