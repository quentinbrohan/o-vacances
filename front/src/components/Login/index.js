import React from 'react';

const Login = () => (
  <div className="Login">
    <h1>Bon retour parmis nous.</h1>
    <div className="login-form">
      <form>
        <div>
          <input type="text" placeholder="Email" />
        </div>
        <div>
          <input type="text" placeholder="Mot de passe" />
        </div>
        <div>
          <button type="submit">CONNEXION</button>
        </div>
      </form>
    </div>
    <div className="login-layout">
      <p>J'ai oublié mon mot de passe</p>
      <hr />
      <p>Pas encore de compte? <a>Inscription</a></p>
    </div>
  </div>
);

export default Login;
