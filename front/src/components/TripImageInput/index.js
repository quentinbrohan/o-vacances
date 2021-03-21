/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types';
import React, { useEffect, useState, useRef } from 'react';
import FormInput from 'src/components/FormInput';
import { API_URL } from 'src/constants';
import './tripImageInput.scss';
import Button from 'src/components/elements/Button';
import { HelpCircle } from 'react-feather';
import Loading from '../Loading';

const TRIP_TYPES = [
  {
    value: 'countryside',
    label: 'Campagne',
  },
  {
    value: 'beach',
    label: 'Plage',
  },
  {
    value: 'mountain',
    label: 'Montagne',
  },
  {
    value: 'foreigner',
    label: "A l'étranger",
  },
  {
    value: 'camping',
    label: 'Camping',
  },
  {
    value: 'sports',
    label: 'Sports',
  },
];

const TripImageInput = ({
  register, error, image, isEditForm, setValue,
}) => {
  // const [imagePreviewUrl, setImagePreviewurl] = useState('');
  // const [currentImagePath, SetCurrentImagePath] = useState('');
  const [isEditImageMode, setIsEditImageMode] = useState(false);

  const [currentLoadedImageUrl, setCurrentLoadedImageUrl] = useState('');
  const [loadedImageUrl, setLoadedImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // const onChange = (e) => {
  //   const file = e?.target?.files;
  //   // if (image) {
  //   // SetCurrentImagePath(image);
  //   // }
  //   if (file) {
  //     // SetCurrentImagePath('');
  //     setImagePreviewurl(URL.createObjectURL(file[0]));
  //   }
  // };

  const onClick = () => {
    if (isEditImageMode) {
      setLoadedImageUrl('');
      // setImagePreviewurl('');
      setIsEditImageMode(false);
    }
    else {
      setIsEditImageMode(true);
    }
  };

  useEffect(() => {
    if (image) {
      // onChange(image);
      // SetCurrentImagePath(image);
      setCurrentLoadedImageUrl(image);
      setValue('tripImageInput', image);
    }
  }, [image]);

  const onClickFetch = (tripType) => {
    setIsLoading(true);
    fetch(`https://source.unsplash.com/1920x1080/?${tripType}`).then((res) => {
      setIsLoading(false);
      setLoadedImageUrl(res.url);
      setValue('tripImageInput', res.url);
    });
  };

  return (
    <div className="tripFormImage-input">
      {currentLoadedImageUrl && isEditForm && (
        <>
          <label>Couverture actuelle</label>
          <img src={currentLoadedImageUrl} alt="Prévisualisation" className="preview" />
        </>
      )}
      {image && (
        <div className="change-image-check">
          <input
            type="checkbox"
            onClick={onClick}
            checked={isEditImageMode}
            name="editTripImageInput"
          />
          <span>Changer de photo</span>
        </div>
      )}
      {isEditImageMode || !isEditForm ? (
        <>
          <FormInput
            id="tripImageInput"
            name="tripImageInput"
            label="Photo de couverture / Type de voyage"
            type="text"
            // accept="image/*"
            hidden
            register={register}
            error={error}
            // onChange={onChange}
          />
          {loadedImageUrl && (
            <img
              src={loadedImageUrl}
              alt="Prévisualisation"
              className="preview"
              loading={isLoading}
            />
          )}
          <div className="tripType-group">
            {TRIP_TYPES.map((tripType) => (
              <div className="tripType-item" key={tripType.value}>
                <input
                  id={tripType.value}
                  type="radio"
                  key={tripType.value}
                  value={tripType.value}
                  name="tripType"
                  disabled={isLoading}
                  onClick={() => onClickFetch(tripType.value)}
                />
                <label name={tripType.value} htmlFor={tripType.value}>
                  {tripType.label}
                </label>
              </div>
            ))}
            <div className="extra">
              {' '}
              <HelpCircle className="extra-icon" /> Cliquer pour changer l'image
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};
TripImageInput.propTypes = {
  register: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired,
  image: PropTypes.string,
  isEditForm: PropTypes.bool.isRequired,
  setValue: PropTypes.func.isRequired,
};

TripImageInput.defaultProps = {
  image: '',
};

export default TripImageInput;
