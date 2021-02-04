import React, { useEffect, useState } from 'react';
import { Check, Edit2, XSquare } from 'react-feather';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { success as toastSuccess } from 'react-toastify-redux';
import Button from 'src/components/elements/Button';
import FormInput from 'src/components/FormInput';
import Loading from 'src/components/Loading';
import { useEditUserInfoMutation, useGetCurrentUserInfoQuery } from 'src/services/user';
import { rulesEmail, rulesFirstname, rulesLastname } from 'src/utils/form';
import ModalAvatarInput from './ModalAvatarInput';
import './profile.scss';

const Profile = () => {
  const dispatch = useDispatch();

  const {
    firstname, lastname, email, avatar,
  } = useSelector((state) => state.user);

  const [isDisabled, setDisabled] = useState(true);

  const { data: user, isLoading, isFetching } = useGetCurrentUserInfoQuery();
  const [editUserInfo] = useEditUserInfoMutation();

  const [editError, setEditError] = useState('');

  const defaultValues = {
    firstname: '',
    lastname: '',
    email: '',
  };

  const {
    register, handleSubmit, errors, reset,
  } = useForm({
    defaultValues: user
      ? {
        firstname: user.firstname || firstname,
        lastname: user.lastname || lastname,
        email: user.email || email,
      }
      : defaultValues,
    shouldFocusError: true,
  });

  useEffect(() => {
    if (firstname || lastname || email || avatar) {
      reset({
        firstname,
        lastname,
        email,
      });
    }
    else if (user) {
      reset({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      });
    }
  }, [user]);

  const onSubmit = (formValues) => {
    editUserInfo(formValues)
      .then((response) => {
        if (response.data) {
          dispatch(toastSuccess('Profil mis à jour.'));
        }
      })
      .catch((err) => {
        if (err) {
          setEditError(err.error.data.message);
        }
      });
  };

  if (isLoading || isFetching) {
    return <Loading />;
  }

  if (user) {
    return (
      <main className="profile">
        <Helmet>
          <title>Mon profil</title>
          <meta name="description" content="Mon profil" />
        </Helmet>
        <h1>Mon profil</h1>
        <div className="profile-container">
          <div className="profile-avatar-default">
            <ModalAvatarInput
              register={register}
              error={errors.profileAvatarInput}
              avatar={avatar}
            />
            <div className="profile-avatar-default-information">
              <form id="rhf-form" className="rhf-form" onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                  id="firstname"
                  name="firstname"
                  type="text"
                  label="Prénom"
                  placeholder="Prénom"
                  disabled={isDisabled}
                  register={register(rulesFirstname)}
                  error={errors.firstname}
                />
                <FormInput
                  id="lastname"
                  name="lastname"
                  type="text"
                  label="Nom"
                  placeholder="Nom"
                  disabled={isDisabled}
                  register={register(rulesLastname)}
                  error={errors.lastname}
                />
                <FormInput
                  id="email"
                  name="email"
                  type="email"
                  label="Email"
                  placeholder="Email"
                  disabled={isDisabled}
                  register={register(rulesEmail)}
                  error={errors.email}
                />

                <div className="cta-form">
                  {!isDisabled && (
                    <>
                      <Button
                        color="secondary"
                        loading={isLoading}
                        onClick={() => {
                          setDisabled(true);
                          reset();
                        }}
                      >
                        <XSquare className="icon cancel" /> Annuler
                      </Button>
                      <Button
                        type="submit"
                        color="secondary"
                        loading={isLoading}
                        onClick={() => {
                          setDisabled(true);
                          handleSubmit(onSubmit)();
                        }}
                      >
                        <Check className="icon confirm" /> Confirmer
                      </Button>
                    </>
                  )}
                </div>
              </form>
              {isDisabled && (
                <Button color="secondary" loading={isLoading} onClick={() => setDisabled(false)}>
                  <Edit2 className="icon edit" /> Modifier
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
    );
  }

  return <div>Erreur dans le chargement du profil.</div>;
};

export default Profile;
