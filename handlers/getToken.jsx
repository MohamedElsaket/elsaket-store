import Cookies from "js-cookie";

export default function getToken() {
  const token = Cookies.get("access_token");
  if (token) {
    return token;
  } else {
    return false;
  }
}
