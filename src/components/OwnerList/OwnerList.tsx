import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Owner, useOwners } from '../../hooks'
import Modal from '../Modal'
import OwnerCard from './OwnerCard'

const OwnerList = () => {
  const [owners, { loading, error }] = useOwners()
  const [currentOwner, setCurrentOwner] = useState<Omit<Owner, 'id'>>()
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isLoading }
  } = useForm<{ year: number }>()
  const isOld = useMemo(() => currentOwner?.car?.year && currentOwner.car.year < 2000, [currentOwner])

  const handleCloseModal = () => {
    setCurrentOwner(undefined)
  }

  const getClickOwnerHandler = (owner: Omit<Owner, 'id'>) => () => {
    reset({ year: owner.car.year })
    setCurrentOwner(owner)
  }

  const onSubmit = ({ year }: { year: number }) => {
    if (currentOwner) {
      currentOwner.car.year = year
      setCurrentOwner({ ...currentOwner })
    }
  }

  return (
    <div className='p-10 md:p-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4'>
      {error ? <div className='text-error text-xl'>Error: {error.message}</div> : null}
      {loading
        ? [
            { id: 1, first_name: '', last_name: '' },
            { id: 2, first_name: '', last_name: '' },
            { id: 3, first_name: '', last_name: '' },
            { id: 4, first_name: '', last_name: '' },
            { id: 5, first_name: '', last_name: '' },
            { id: 6, first_name: '', last_name: '' }
          ].map(({ id, ...placeholder }) => <OwnerCard key={id} {...placeholder} loading />)
        : owners?.map(({ id, ...owner }) => <OwnerCard key={id} {...owner} onClick={getClickOwnerHandler(owner)} />)}
      {!!currentOwner && (
        <Modal isOpen onClose={handleCloseModal} name='owner-detail-modal' dismissible>
          <form data-testid='car-year-form' onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
            <div className='w-[280px]'>
              <div className='text-2xl font-bold mb-4'>
                {currentOwner?.first_name} {currentOwner?.last_name}
              </div>
              <div className='text-sm text-neutral-400 space-y-1'>
                <div className='flex items-center break-all'>
                  <span className='text-xs w-16'>Birthday:</span>
                  <span className='flex-1'>{currentOwner?.birthdate}</span>
                </div>
                <div className='flex items-center break-all'>
                  <span className='text-xs w-16'>Industry:</span>
                  <span className='flex-1'> {currentOwner?.employer.industry}</span>
                </div>
                <div className='flex items-center break-all'>
                  <span className='text-xs w-16'>Car make:</span>
                  <span className='flex-1'> {currentOwner?.car.make}</span>
                </div>
                <div
                  data-testid='car-year-field'
                  className={`flex items-center break-all ${isOld ? 'text-error font-bold' : ''}`}
                >
                  <span className='text-xs w-16'>Car year:</span>
                  <input
                    type='text'
                    disabled={isLoading}
                    data-testid='car-year-input'
                    aria-label='Car year'
                    defaultValue={currentOwner?.car.year}
                    placeholder='year'
                    className='input input-xs input-bordered'
                    {...register('year', {
                      required: 'Car year is required',
                      pattern: {
                        value: /^\d{4}$/,
                        message: 'Incorrect year format'
                      }
                    })}
                  />
                </div>
                <p className='text-xs text-error mt-2 min-h-[16px] ml-16'>{errors.year?.message}</p>
              </div>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}

export default OwnerList
