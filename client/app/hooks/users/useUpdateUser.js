import { usePut } from '../../helpers/simple-http-hook';

const useUpdateUser = (userId, loadingState = false) =>
  usePut(`user/${userId}`, loadingState);

export default useUpdateUser;
