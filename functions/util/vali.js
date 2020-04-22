//helper function to check if an input is empty or not
const isEmpty = (string) => {
  if (string.trim() === "") {
    return true;
  } else {
    return false;
  }
};
//check is an email address is in correct format
const isEmail = (email) => {
  const emailEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(emailEx)) {
    return true;
  } else {
    return false;
  }
};

exports.valiSignup = (data) => {
  //TODO validate inputs
  //1. all inputs are not empty and is a valid email format
  //2. valid email format
  //3. pass and confirm matches
  let errors = {};

  //check email
  if (isEmpty(data.email)) {
    errors.email = "Error: Email is empty";
  } else if (!isEmail(data.email)) {
    errors.email = "Error: Email is not in correct format";
  }

  //check pass
  if (isEmpty(data.password) && isEmpty(data.confirmPassword)) {
    errors.password = "Error: Password/confirm is empty";
  }
  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Error: Passwords don't match";
  }

  //chekc user name/handel
  if (isEmpty(data.handel)) {
    errors.handel = "Error: Username can't be empty";
  }

  return {
    errors,
    //check if any aboue errors occur
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

exports.valiLogin = (data) => {
  let errors = {};

  //check if pass and email is empty
  if (isEmpty(data.email)) {
    errors.email = "Error: Email is empty";
  }
  if (isEmpty(data.password)) {
    errors.password = "Error: Password is empty";
  }
  return {
    errors,
    //check if any aboue errors occur
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

exports.valiUserInfo = (data) => {
  let userInfomation = {};

  if (!isEmpty(data.location.trim())) {
    userInfomation.location = data.location;
  }
  if (!isEmpty(data.bio.trim())) {
    userInfomation.bio = data.bio;
  }
  if (!isEmpty(data.priceLow.trim())) {
    userInfomation.priceLow = data.priceLow;
  }
  if (!isEmpty(data.priceHigh.trim())) {
    userInfomation.priceHigh = data.priceHigh;
  }
  if (!isEmpty(data.range.trim())) {
    userInfomation.range = data.range;
  }
  if (!isEmpty(data.age.trim())) {
    userInfomation.age = data.age;
  }
  if (!isEmpty(data.gender.trim())) {
    userInfomation.gender = data.gender;
  }

  return userInfomation;
};
