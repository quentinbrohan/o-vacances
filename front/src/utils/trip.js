// export const loadImage = (url) => {
//   const reader = new FileReader();
import { getCurrentUserId } from 'src/utils/user';
import { useParams } from 'react-router-dom';
import { parseISO } from 'date-fns';

export const isCurrentUserTripCreator = (tripCreatorId) => {
  if (getCurrentUserId() === tripCreatorId) {
    return true;
  }
  return false;
};

export const getTripIdFromUrlParams = () => {
  const { id } = useParams();
  return Number(id);
};

export const isTripArchived = (tripStartDate, tripEndDate) => parseISO(tripStartDate) < new Date() || parseISO(tripEndDate) < new Date();
