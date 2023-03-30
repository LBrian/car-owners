import { MouseEventHandler, useMemo } from 'react'
import type { Owner } from '../../hooks'

type Props = Pick<Owner, 'first_name' | 'last_name'> & {
  loading?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
}

const OwnerCard = ({ loading, first_name, last_name, onClick }: Props) => {
  const fullName = useMemo(() => `${first_name} ${last_name}`, [first_name, last_name])

  return (
    <button
      onClick={onClick}
      aria-label={fullName}
      data-testid={`owner-card-${first_name}`}
      className={`card bg-neutral text-neutral-content shadow-2xl items-center p-6 ${loading && 'animate-pulse'}`}
    >
      <div className='avatar placeholder'>
        <div className='bg-info text-info-content rounded-full w-24'>
          <span className='text-3xl'>{first_name.charAt(0)}</span>
        </div>
      </div>
      <div className='card-body items-center text-center'>
        <h2 className='card-title'>{fullName}</h2>
      </div>
    </button>
  )
}

export default OwnerCard
