let cookies = new Map();
const getItemFromCookie = (itemName) => {
  if (Object.keys(cookies).length === 0) {
    const docCookies = document.cookies.split(";");
    for (let cookie of docCookies) {
      const [cookieName, value] = cookie.split("=");
      cookies.set(cookieName, value);
    }
  }
  return cookies.get(itemName);
};

export default getItemFromCookie