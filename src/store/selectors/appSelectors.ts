import { AppState } from '@/store/store';

const appIsVolumeEnabledSelector = ({ app }: AppState) => app.isVolumeEnabled;

export { appIsVolumeEnabledSelector };
