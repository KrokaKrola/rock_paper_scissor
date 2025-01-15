import { FC } from 'react';

interface FixedPointNumberProps {
  number?: number;
  precision?: number;
}

const FixedPointNumber: FC<FixedPointNumberProps> = ({ number, precision = 0 }) => {
  if (!number && number !== 0) {
    return null;
  }

  if (Number.isNaN(number)) {
    return '0';
  }

  const numberInStringFormat = number.toString();

  if (numberInStringFormat.includes('.')) {
    return number.toFixed(precision);
  }

  return numberInStringFormat;
};

export { FixedPointNumber };
