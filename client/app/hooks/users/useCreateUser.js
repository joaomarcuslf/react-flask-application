import { usePost } from '../../helpers/simple-http-hook';

const useCreateUser = (loadingState = false) => usePost(`users`, loadingState);

export default useCreateUser;
