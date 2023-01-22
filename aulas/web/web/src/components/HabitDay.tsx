import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';
import { ProgressBar } from './ProgressBar';
import dayjs from 'dayjs';
import { HabitsList } from './HabitsList';
import { useState } from 'react';

interface HabitDayProps {
  date: Date
  defaultCompleted?: number
  amount?: number
}

export function HabitDay({ defaultCompleted = 0, amount = 0, date }: HabitDayProps) {
  
  const [completed, setCompleted] = useState(defaultCompleted)

  const comlpetedPercentage = amount > 0 ? Math.round((completed / amount) * 100) : 0

  const dayAndMonth = dayjs(date).format('DD/MM')
  const dayOfWeek = dayjs(date).format('dddd')
  

  function handleCompletedChanged(completed: number) {
    setCompleted(completed)
 
  }


  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx("w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-500 focus:ring-offset-2 focus:ring-offset-background", {
          'bg-zinc-900 border-zinc-800': comlpetedPercentage === 0,
          'bg-red-900 border-red-500': comlpetedPercentage > 0 && comlpetedPercentage < 20,
          'bg-red-800 border-red-500': comlpetedPercentage >= 20 && comlpetedPercentage < 40,
          'bg-red-700 border-red-500': comlpetedPercentage >= 40 && comlpetedPercentage < 60,
          'bg-red-600 border-red-500': comlpetedPercentage >= 60 && comlpetedPercentage < 80,
          'bg-red-500 border-red-400': comlpetedPercentage >= 80,
        })}
      />

      <Popover.Portal>
        <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
          <span className="font-semibold text-zinc-400">{dayOfWeek}</span>
          <span className="mt-1 font-extrabold leading-tight text-3xl">{dayAndMonth}</span>

          <ProgressBar progress={comlpetedPercentage} />

          <HabitsList date={date} onCompletedChanged={handleCompletedChanged}/>
          

          <Popover.Arrow height={8} width={16} className='fill-zinc-900' />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}