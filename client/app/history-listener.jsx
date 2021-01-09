import { useEffect } from 'react';

import { useHistory } from 'react-router-dom';

const HistoryListener = ({ children }) => {
  const history = useHistory();

  useEffect(() => {
    console.log('Location:', history.location.pathname);

    return history.listen((location) => {
      console.log('Location:', location.pathname);
    });
  }, [history]);

  return children;
};

export default HistoryListener;
