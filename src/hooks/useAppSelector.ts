import { useSelector } from 'react-redux';

import { AppState } from '@/store/store';

export const useAppSelector = useSelector.withTypes<AppState>();
