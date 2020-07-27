// export const loadImage = (url) => {
//   const reader = new FileReader();

//   return(
//   reader.onload = (r) => {
//     console.log(r.target.result);
//   },
//   reader.readAsDataURL(url[0]);
//   )
// };

export const checkIfCreator = (creator, currentUser) => {
  // Check in trip.creator if ID (creator) === currentUser ID
  if (creator.id === currentUser) {
    return true;
  }
  return false;
};
