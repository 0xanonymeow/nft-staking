import { REWARDS } from '@/constants/staking';
import { useStakingProps } from '@/types';
import { getEndsIn } from '@/utils/datetime';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const getEndsInInterval = (
  start: Date,
  period: number,
  setEndsIn: Dispatch<SetStateAction<string>>,
  setDiffTime: Dispatch<SetStateAction<number>>,
) => {
  const { endsIn, diffTime } = getEndsIn(start, period);

  if (diffTime < 0) {
    setEndsIn('ended');
    setDiffTime(0);

    return diffTime;
  }

  setEndsIn(endsIn);
  setDiffTime(diffTime);

  return diffTime;
};

export const useStaking = ({
  balance,
  setBalance,
}: useStakingProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState<
    undefined | number
  >();
  const [isStaked, setIsStaked] = useState(false);
  const [reward, setReward] = useState(0);
  const [start, setStart] = useState<string | Date>('');
  const [endsIn, setEndsIn] = useState('');
  const [diffTime, setDiffTime] = useState(0);

  const onSetPeriod = (period: number) => setSelectedPeriod(period);
  const onStake = () => {
    const now = new Date();
    const reward = REWARDS[selectedPeriod as number];

    setIsStaked(true);
    setReward(reward);
    setSelectedPeriod(selectedPeriod);
    setStart(now);

    const { endsIn, diffTime } = getEndsIn(
      now,
      selectedPeriod as number,
    );
    setEndsIn(endsIn);
    setDiffTime(diffTime);

    localStorage.setItem(
      'nft-staking',
      JSON.stringify({
        start: now,
        period: selectedPeriod,
        isStaked: true,
        reward,
      }),
    );
  };
  const onUnstake = async () => {
    let proceed = true;
    let penalty = false;
    if (diffTime > 0) {
      const { isConfirmed } = await Swal.fire({
        title: 'Caution!',
        text: 'Do you want to unstake now? If you do, you will incur a penalty of -5C.',
        icon: 'warning',
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Proceed',
        showCancelButton: true,
      });
      proceed = isConfirmed;
      penalty = isConfirmed;
    }
    if (proceed) {
      setBalance((balance as number) + reward);
      setEndsIn('');
      setIsStaked(false);
      setReward(0);
      setSelectedPeriod(undefined);
      setStart('');

      localStorage.setItem('nft-staking-balance', String(balance));
      localStorage.removeItem('nft-staking');

      const message = `${
        penalty ? String(reward - 5) : reward
      } C has been added to your balance`;

      toast.success(message);
    }
  };

  useEffect(() => {
    const data = localStorage.getItem('nft-staking');
    if (data) {
      const parsedData = JSON.parse(data);
      if (parsedData.isStaked) {
        setIsStaked(true);
        setReward(parsedData.reward);
        setSelectedPeriod(parsedData.period);
        setStart(new Date(parsedData.start));
      }
    }
  }, []);

  useEffect(() => {
    if (!isStaked) return;

    getEndsInInterval(
      start as Date,
      selectedPeriod as number,
      setEndsIn,
      setDiffTime,
    );

    const interval = setInterval(() => {
      const diffTime = getEndsInInterval(
        start as Date,
        selectedPeriod as number,
        setEndsIn,
        setDiffTime,
      );

      if (diffTime < 0) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, [isStaked, start, selectedPeriod]);

  return {
    selectedPeriod,
    isStaked,
    reward,
    endsIn,
    diffTime,
    onSetPeriod,
    onStake,
    onUnStake: onUnstake,
  };
};
