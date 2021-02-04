import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import 'react-toastify/dist/ReactToastify.css';
import { BackButton } from 'src/components/elements/Button';
import Footer from 'src/components/Footer';
import Header from 'src/components/Header';
import ScrollToTop from 'src/components/ScrollToTop';
import { history } from 'src/index';
import './basicLayout.scss';

const BasicLayout = ({ children }) => {
  const [isInsideTripURL, setIsInsideTripURL] = useState(false);

  useEffect(
    () => history.listen((location) => {
      setIsInsideTripURL(
        location.pathname.includes('/voyage/')
            || location.pathname.includes('/modifier-un-voyage/'),
      );
    }),
    [history],
  );

  return (
    <div className="app">
      <Helmet titleTemplate="%s - O'Vacances" defaultTitle="O'Vacances">
        <title>O'Vacances</title>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="O'Vacances est là pour t'aider à planifier tes vacances en groupe!
          Que tu sois un Fabigeon, un ninja ou bien juste un humain; créez ton voyage,
          invite tes amis, Mme Michu, l'équipe O'Clock. Prépare tes activités et suggère des choses
          à faire avec ta team. Enfile ton slip Gaétan et tu es fin prêt, ça va être 'feun'!"
        />
      </Helmet>
      <Header />
      <ScrollToTop />

      <div className="container">
        {isInsideTripURL && <BackButton className="back-button" />}
        {children}
      </div>
      <Footer />
    </div>
  );
};
export default BasicLayout;

BasicLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
