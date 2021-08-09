// Source
// https://stackoverflow.com/questions/36904185/react-router-scroll-to-top-on-every-transition
import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

function ScrollToTop({ history, children }) {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    }
  }, []);

  return <>{children}</>;
}

export default withRouter(ScrollToTop);