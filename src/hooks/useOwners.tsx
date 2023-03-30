import { useEffect, useState } from 'react'

export type Employer = {
  industry: string
}

export type Car = {
  make: string
  year: number
}

export type Owner = {
  id: number
  first_name: string
  last_name: string
  birthdate: string
  employer: Employer
  car: Car
}

interface Options {
  skip?: boolean
}

const DUMMY_DATA = [
  {
    id: 1,
    first_name: 'Dannye',
    last_name: 'Nannizzi',
    birthdate: '1998-02-11',
    employer: { industry: 'Homebuilding' },
    car: { make: 'Infiniti', year: 1994 }
  },
  {
    id: 2,
    first_name: 'Skyler',
    last_name: 'Pickburn',
    birthdate: '1960-06-30',
    employer: { industry: 'Major Banks' },
    car: { make: 'Chevrolet', year: 1997 }
  },
  {
    id: 3,
    first_name: 'Sybila',
    last_name: 'Ciccottini',
    birthdate: '1986-06-30',
    employer: { industry: 'Finance: Consumer Services' },
    car: { make: 'BMW', year: 2002 }
  },
  {
    id: 4,
    first_name: 'Ofelia',
    last_name: 'Skyppe',
    birthdate: '1985-10-04',
    employer: { industry: 'EDP Services' },
    car: { make: 'Ford', year: 1990 }
  },
  {
    id: 5,
    first_name: 'Jephthah',
    last_name: 'Ebbutt',
    birthdate: '1974-03-05',
    employer: { industry: 'Real Estate' },
    car: { make: 'Land Rover', year: 2011 }
  },
  {
    id: 6,
    first_name: 'Gayel',
    last_name: 'Showte',
    birthdate: '1979-04-25',
    employer: { industry: 'Agricultural Chemicals' },
    car: { make: 'Saab', year: 2011 }
  },
  {
    id: 7,
    first_name: 'Beret',
    last_name: 'Fludder',
    birthdate: '1959-10-19',
    employer: { industry: 'Broadcasting' },
    car: { make: 'Mercury', year: 1986 }
  },
  {
    id: 8,
    first_name: 'Cherida',
    last_name: 'Ciciura',
    birthdate: '1974-04-17',
    employer: { industry: 'n/a' },
    car: { make: 'Mazda', year: 2005 }
  },
  {
    id: 9,
    first_name: 'Cirillo',
    last_name: 'Dedham',
    birthdate: '1978-07-27',
    employer: { industry: 'EDP Services' },
    car: { make: 'Ford', year: 1987 }
  },
  {
    id: 10,
    first_name: 'Lanie',
    last_name: 'Mortel',
    birthdate: '1952-04-16',
    employer: { industry: 'Military/Government/Technical' },
    car: { make: 'Volvo', year: 2013 }
  }
]

function useOwners(options?: Options): [Owner[] | undefined, { loading: boolean; error?: Error; refetch: () => void }] {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()
  const [owners, setOwners] = useState<Owner[]>()

  const fetchCars = () => {
    setLoading(true)
    // For testing and local dev purpose
    if (process.env.NODE_ENV === 'development') {
      setTimeout(() => {
        setOwners(DUMMY_DATA)
        setLoading(false)
      }, 1000)
    } else {
      fetch('https://my.api.mockaroo.com/people_cars', { method: 'GET', headers: { 'X-API-Key': '5bdcb4f0' } })
        .then((resp) => resp.json())
        .then((json) => {
          setOwners(json)
        })
        .catch((error) => {
          setError(error)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }

  useEffect(() => {
    if (!options?.skip) {
      fetchCars()
    }
  }, [])

  return [owners, { loading, error, refetch: fetchCars }]
}

export { useOwners }
