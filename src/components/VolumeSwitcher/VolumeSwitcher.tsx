import { FC } from 'react';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import clsx from 'clsx';

import { VolumeOff } from '@/components/icons/VolumeOff';
import { VolumeOn } from '@/components/icons/VolumeOn';

import { appIsVolumeEnabledSelector } from '@/store/selectors/appSelectors';
import { appSliceActions } from '@/store/slices/appSlice';

import s from './VolumeSwitcher.module.scss';

interface VolumeSwitcherProps {
  className?: string;
}

const VolumeSwitcher: FC<VolumeSwitcherProps> = ({ className }) => {
  const dispatch = useAppDispatch();

  const isVolumeEnabled = useAppSelector(appIsVolumeEnabledSelector);

  const handleSwitchVolumeClick = () => {
    dispatch(appSliceActions.switchVolume());
  };

  return (
    <button onClick={handleSwitchVolumeClick} className={clsx(className, s.wrapper)} type="button">
      {isVolumeEnabled ? (
        <i>
          <VolumeOn />
        </i>
      ) : (
        <i>
          <VolumeOff />
        </i>
      )}
    </button>
  );
};

export { VolumeSwitcher };
