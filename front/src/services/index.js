export const handleErrorLogin = (error) => {
  switch (error.response.status) {
    case 401:
      this.redirectTo(document, '/');
      break;
    case 404:
      this.redirectTo(document, '/404');
      break;
    default:
      this.redirectTo(document, '/500');
      break;
  }
};
