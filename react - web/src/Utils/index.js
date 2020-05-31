export function isEmail(email) {
  if (email === ""
    || email.indexOf('@') === -1
    || email.indexOf('.') === -1) {
    return false;
  } else {
    return true;
  }
}