export const validateRespone = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
};

export const isDate = (date: string) => {
  return date.match(/[0-9]+-[0-9]+-[0-9]+/);
};

export const validateInput = (input: string, textArea: string = "default") => {
  if (!input) throw Error("Account required.");

  if (!+input) throw Error("Account accepts only numbers.");

  if (!textArea) throw Error("Textarea required.");
};

export const validateSignUp = (
  username: string,
  email: string,
  password: string,
  password2: string
) => {
  validateUsername(username);
  validateEmail(email);
  validatPassword(password, password2);
};

export const validateLogin = (email: string, password: string) => {
  validateEmail(email);
  if (!password) throw Error("Password required.");
};

export const validateUsername = (username: string) => {
  if (!username) throw Error("Name required.");
};

export const validateEmail = (email: string) => {
  if (!email) throw Error("Email required.");
};

export const validatPassword = (password: string, password2: string) => {
  if (!password) throw Error("New password required.");
  if (!password2) throw Error("Confirmation password required.");

  if (password != password2)
    throw Error("The password confirmation does not match.");
};
