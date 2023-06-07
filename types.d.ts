import { Dispatch, SetStateAction } from 'react';

type useStakingProps = {
  balance?: number;
  setBalance: Dispatch<SetStateAction<undefined | number>>;
};
