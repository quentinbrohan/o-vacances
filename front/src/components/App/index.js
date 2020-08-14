// == Import npm
import React, {
  useEffect,
  Suspense,
  lazy,
} from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify-redux';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet';

// == Import
// Layout
import Footer from 'src/components/Footer';
import Header from 'src/containers/Header';
import PrivateRoute from 'src/utils/PrivateRoute';
// Pages
import Contact from 'src/components/Contact';
import Signin from 'src/containers/Signin';
import Login from 'src/containers/Login';
import Profile from 'src/containers/Profile';
import Trip from 'src/containers/Trip';
import ErrorPage from 'src/components/ErrorPage';
import TripEdit from 'src/containers/TripEdit';
import LegacyMentions from 'src/components/LegacyMentions';
import Loading from 'src/components/Loading';
// TEMPO: For direct integration in Trip component
import TripAuth from 'src/containers/Trip/TripAuth';

import './styles.scss';

// Lazy Loading
const HomeUser = lazy(() => import('src/containers/HomeUser'));
const Activities = lazy(() => import('src/containers/Activities'));
const TripForm = lazy(() => import('src/containers/TripForm'));
const ActivityForm = lazy(() => import('src/components/ActivityForm'));
const Team = lazy(() => import('src/components/Team'));
const HomeVisitor = lazy(() => import('src/components/HomeVisitor'));

// == Composant
const App = ({
  isAuthenticated,
  checkAuth,
}) => {
  checkAuth();

  useEffect(() => {
    checkAuth();
  }, [isAuthenticated]);

  return (
    <div className="app">
      <Helmet titleTemplate="%s - O'Vacances" defaultTitle="O'Vacances">
        <title>O'Vacances</title>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="O'Vacances est là pour t'aider à planifier tes vacances en groupe !
          Que tu sois un Fabigeon, un ninja ou bien juste humain, créez ton voyage,
          invite tes amis, Mme Michu, l'équipe O'Clock. Prépare tes activités et suggère des choses
          à faire avec ta team. Enfile ton slip Gaétan et tu es fin prêt, ça va être \'feun\' !
          Application React ⚛."
          // content="Avec O'Vacances, partir en vacances en groupe n'a jamais été aussi facile !
          // Créer votre voyage, inviter vos amis, voir/suggérer des suggestions/activités.
          // Application React. O'Clock, apothéose - Excalibur."
        />
      </Helmet>
      <Header />
      <div className="container">
        <ToastContainer />
        <Suspense fallback={<Loading />}>
          <Switch>
            {isAuthenticated
              ? (
                <Route
                  exact
                  path="/"
                  component={HomeUser}
                />
              )
              : (
                <Route
                  exact
                  path="/"
                  component={HomeVisitor}
                />
              )}
            <Route
              path="/tripAuth"
              component={TripAuth}
            />
            <Route
              path="/contact"
              component={Contact}
            />
            <Route
              path="/loading"
              component={Loading}
            />
            <Route
              path="/equipe"
              render={() => <Team />}
            />
            <Route
              path="/mentions-legales"
              component={LegacyMentions}
            />
            <Route
              path="/signin"
              component={Signin}
            />
            <Route
              path="/login"
              component={Login}
            />
            <PrivateRoute
              exact
              path="/mon-profil"
              component={Profile}
              isAuthenticated={isAuthenticated}
            />
            <Route
              exact
              path="/voyage/:id"
              component={Trip}
            />
            <PrivateRoute
              exact
              path="/voyage/:id/activites"
              component={Activities}
              isAuthenticated={isAuthenticated}
            />
            <PrivateRoute
              path="/mes-voyages"
              component={HomeUser}
              isAuthenticated={isAuthenticated}
            />
            <PrivateRoute
              path="/creer-un-voyage"
              component={TripForm}
              isAuthenticated={isAuthenticated}
            />
            <PrivateRoute
              path="/modifier-un-voyage/:id"
              component={TripEdit}
              isAuthenticated={isAuthenticated}
            />
            <Route
              path="/ajouter-une-activite"
              component={ActivityForm}
            />
            <Route component={ErrorPage} />
          </Switch>
        </Suspense>
      </div>
      <Footer />
    </div>
  );
};

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  checkAuth: PropTypes.func.isRequired,
};

// == Export
export default App;
