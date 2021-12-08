import Axios from "axios";

export const getToken = () => {
  return localStorage.getItem("authtoken");
};

export const instanceAxios = Axios.create({
  headers: {
    authtoken: "",
    "Accept-Version": 1,
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json;charset=utf-8",
    "Access-Control-Expose-Headers": "authtoken",
  },
});

export function isAuthenticated() {
  return (
    localStorage.getItem("authtoken") &&
    localStorage.getItem("authtoken-expiration") > Date.now()
  );
}

export function logout() {
  localStorage.removeItem("authtoken");
  localStorage.removeItem("authtoken-expiration");
}
