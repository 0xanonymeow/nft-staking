import {
  MILLISECONDS_IN_DAY,
  MILLISECONDS_IN_HOUR,
  MILLISECONDS_IN_MINUTE,
  MILLISECONDS_IN_SECOND,
} from '@/constants/time';

export const getDiffTime = (start: Date, period: number) => {
  const end = new Date(start.getTime());
  end.setDate(end.getDate() + period);

  const now = new Date();
  const diffTime = end.getTime() - now.getTime();

  return diffTime;
};

export const getEndsIn = (start: Date, period: number) => {
  const diffTime = getDiffTime(start, period);

  const days = Math.floor(diffTime / MILLISECONDS_IN_DAY);
  const hours = Math.floor(
    (diffTime % MILLISECONDS_IN_DAY) / MILLISECONDS_IN_HOUR,
  );
  const minutes = Math.floor(
    (diffTime % MILLISECONDS_IN_HOUR) / MILLISECONDS_IN_MINUTE,
  );
  const seconds = Math.floor(
    (diffTime % MILLISECONDS_IN_MINUTE) / MILLISECONDS_IN_SECOND,
  );

  const endsIn = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;

  return {
    endsIn,
    diffTime,
  };
};
