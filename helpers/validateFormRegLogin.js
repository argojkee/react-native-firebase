export default checkFields = (isRegistrationForm, user) => {
  const { login, email, password } = user;
  if (isRegistrationForm) {
    if (!login || !email || !password) return false;
  } else {
    if (!email || !password) return false;
  }

  return true;
};
