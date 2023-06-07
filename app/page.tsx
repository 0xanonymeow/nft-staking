'use client';

import { PERIODS, REWARDS } from '@/constants/staking';
import { useBalance } from '@/hooks/useBalance';
import { useStaking } from '@/hooks/useStaking';
import { map } from 'lodash';

export default function Home() {
  const { balance, setBalance } = useBalance();
  const {
    selectedPeriod,
    isStaked,
    reward,
    endsIn,
    diffTime,
    onSetPeriod,
    onStake,
    onUnStake,
  } = useStaking({
    balance,
    setBalance,
  });

  return (
    <main className="flex min-h-screen flex-col items-center gap-24 p-24">
      <p className="text-4xl font-bold">NFT Staking</p>
      <div className="flex gap-2 items-center">
        <span>balance</span>
        {balance && (
          <>
            <span className="font-bold">{balance}</span>
            <span>C</span>
          </>
        )}
      </div>
      <div className="z-10 w-full max-w-5xl items-center justify-center font-mono text-sm lg:flex">
        <div className="flex flex-col gap-4 w-[520px] border-2 border-solid rounded-md p-8 bg-slate-200">
          <div className="flex gap-2 items-center">
            <span>period</span>
            <div className="flex gap-2 items-center">
              {map(PERIODS, (period) => (
                <button
                  key={period}
                  type="button"
                  className={`rounded-md w-16 py-2 ${
                    selectedPeriod === period
                      ? 'btn-period-selected'
                      : isStaked
                      ? 'btn-disabled'
                      : 'btn-period'
                  } w-16  duration-200 transition-colors bg-gray`}
                  onClick={() => onSetPeriod(period)}
                  disabled={isStaked}
                >
                  <p className="text-white ">{period}</p>
                </button>
              ))}{' '}
              days
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <span>reward</span>
            {selectedPeriod && (
              <>
                <span className="font-bold">
                  {isStaked ? reward : REWARDS[selectedPeriod]}
                </span>
                <span>C</span>
              </>
            )}
          </div>
          <div
            className={`flex gap-2 items-center ${
              isStaked ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <span>ends in</span>
            <span className="font-bold">{endsIn}</span>
          </div>
          <button
            type="button"
            className={`rounded-md ${
              !selectedPeriod
                ? 'btn-disabled'
                : isStaked
                ? diffTime > 0
                  ? 'btn-unstake'
                  : 'btn-claim'
                : 'btn-stake'
            } duration-200 transition-colors py-2 mt-8`}
            onClick={() => (isStaked ? onUnStake() : onStake())}
            disabled={!selectedPeriod}
          >
            <p className="font-bold">
              {isStaked
                ? diffTime > 0
                  ? 'UNSTAKE'
                  : 'CLAIM'
                : 'STAKE'}
            </p>
          </button>
        </div>
      </div>
    </main>
  );
}
