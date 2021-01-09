import { useGet } from '../../helpers/simple-http-hook';

const useFetchUser = (userId, loadingState = false) =>
  useGet(`user/${userId}`, loadingState);

export default useFetchUser;
