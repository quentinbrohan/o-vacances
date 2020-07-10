export default LoadImage = (url) => {
  const reader = new FileReader();

  return(
  reader.onload = (r) => {
    console.log(r.target.result);
  };
  reader.readAsDataURL(url[0]);
  )
};
