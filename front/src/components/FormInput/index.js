import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import Loading from 'src/components/Loading';
import { useGetActivitiesCategoriesQuery } from 'src/services/trip';
import './formInput.scss';

const MAX_CHARS = 750;

const FormInput = ({
  register, error, label, id, ...inputProps
}) => {
  const [charsCount, setCharsCount] = useState(0);
  const charsCounter = (event) => {
    const currentText = event.target.value;
    if (charsCount <= MAX_CHARS) {
      setCharsCount(currentText.length);
    }
  };

  return (
    <div className="form-input-item">
      <label htmlFor={id}>{label}</label>
      {inputProps.type === 'textarea' && (
        <textarea
          ref={register}
          id={id}
          aria-invalid={!!error}
          {...inputProps}
          onChange={charsCounter}
          maxLength={MAX_CHARS}
        />
      )}
      {inputProps.type !== 'textarea' && inputProps.type !== 'select' && (
        <input ref={register} id={id} aria-invalid={!!error} {...inputProps} />
      )}
      {inputProps?.type === 'textarea' && (
        <div className="chars-counter">{`${charsCount}/${MAX_CHARS}`}</div>
      )}
      {inputProps.type === 'select' && (
        <ControlledSelect
          id={id}
          name={inputProps.name}
          currentCategory={inputProps.currentCategory}
          placeholder={inputProps.placeholder}
          control={inputProps.control}
          setValue={inputProps.setValue}
        />
      )}
      {error && <div className="error">{error.message}</div>}
    </div>
  );
};

FormInput.propTypes = {
  register: PropTypes.func.isRequired,
  error: PropTypes.object,
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
};

FormInput.defaultProps = {
  label: '',
  error: {},
};

export default FormInput;

const ControlledSelect = ({
  name, id, placeholder, currentCategory, control, setValue,
}) => {
  const { data: categories } = useGetActivitiesCategoriesQuery();

  useEffect(() => {
    if (currentCategory) {
      setValue(name, currentCategory);
    }
  }, []);

  const handleChange = (change) => {
    setValue(name, Number(change.target.value), {
      shouldDirty: true,
    });
  };

  if (categories) {
    return (
      <Controller
        name={name}
        control={control}
        defaultValue={categories[1]}
        render={() => (
          <select
            name={name}
            id={id}
            defaultValue={currentCategory?.id || categories[1]}
            onChange={handleChange}
          >
            <option default disabled>
              {placeholder}
            </option>
            {categories.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        )}
      />
    );
  }

  return <Loading small />;
};

ControlledSelect.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  currentCategory: PropTypes.shape({
    id: PropTypes.number,
    image: PropTypes.string,
    name: PropTypes.string,
  }),
  control: PropTypes.object.isRequired,
  setValue: PropTypes.func.isRequired,
};

ControlledSelect.defaultProps = {
  currentCategory: {
    id: null,
    image: null,
    name: null,
  },
};

export const FormError = ({ errorMessage }) => <div className="error">{errorMessage}</div>;

FormError.propTypes = {
  errorMessage: PropTypes.string,
};

FormError.defaultProps = {
  errorMessage: '',
};
