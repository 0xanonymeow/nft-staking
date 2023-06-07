import { useEffect, useState } from 'react';

export const useBalance = () => {
  const [balance, setBalance] = useState<undefined | number>();

  useEffect(() => {
    const balance = localStorage.getItem('nft-staking-balance');
    if (balance) setBalance(+balance);
    if (Number(balance) > 100) return;
    localStorage.setItem('nft-staking-balance', '100');
  }, []);

  return {
    balance,
    setBalance,
  };
};
