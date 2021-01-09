import { useDelete } from '../../helpers/simple-http-hook';

const useRemoveUser = (userId, loadingState = false) =>
  useDelete(`user/${userId}`, loadingState);

export default useRemoveUser;
