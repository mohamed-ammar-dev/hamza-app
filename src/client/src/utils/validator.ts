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

export const validateLogin = (username: string, password: string) => {
  if (!username) throw Error("Email required.");

  if (!password) throw Error("Password required.");
};
