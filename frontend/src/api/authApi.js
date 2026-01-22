import API from "./api";

/* REGISTER */
export const registerUser = (formData) => {
  return API.post("/auth/register", formData);
};

/* LOGIN */
export const loginUser = (formData) => {
  return API.post("/auth/login", formData);
};
