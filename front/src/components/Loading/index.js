import React from 'react';
import { ReactComponent as LoadingAnimation } from 'src/assets/svg/loading.svg';

import './loading.scss';

const Loading = () => (
  <div className="loading-container">
    <LoadingAnimation className="loading" />
  </div>
);

export default Loading;
