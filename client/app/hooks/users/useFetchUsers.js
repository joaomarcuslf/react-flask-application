import { useGet } from '../../helpers/simple-http-hook';

const useFetchUsers = (loadingState = false) => useGet('users', loadingState);

export default useFetchUsers;
