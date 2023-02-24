import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
const ScrollToTop = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return props.children;
};

const withRouter = (Component) => (props) => {
  const location = useLocation();

  return <Component {...props} location={location} />;
};

export default withRouter(ScrollToTop);
