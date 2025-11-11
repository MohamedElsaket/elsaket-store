import Cookies from "js-cookie";

export default function getUserId() {
  const userId = Cookies.get("user_id");

  if (userId) {
    return userId;
  } else {
    return false;
  }
}
