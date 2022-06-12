import { useState, useEffect } from 'react'
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from 'react-icons/fa'

function App() {
  const url = 'https://randomuser.me/api/'
  const defaultImage = 'https://randomuser.me/api/portraits/men/23.jpg'

  // common conventions
  const [isLoading, setIsLoading] = useState(true)
  const [randomPerson, setRandomPerson] = useState(null)
  const [title, setTitle] = useState('name')
  const [value, setValue] = useState('random person')

  const fetchRandomPerson = async () => {
    setIsLoading(true)
    const response = await fetch(url)
    const data = await response.json()
    // let's have a look at the API
    const person = data.results[0]
    // destructure values
    const {
      phone,
      email,
      login: { password },
      name: { first, last },
      dob: { age },
      picture: { large: image },
      location: {
        street: { number, name },
      },
    } = person
    // es6 feature
    const newPerson = {
      image,
      phone,
      email,
      password,
      age,
      street: `${number} ${name}`,
      name: `${first} ${last}`,
    }

    setRandomPerson(newPerson)
    setIsLoading(false)
    setTitle('name')
    setValue(newPerson.name)
  }

  useEffect(() => {
    fetchRandomPerson()
  }, [])

  const handleValue = (e) => {
    if (e.target.classList.contains('icon')) {
      const newValue = e.target.dataset.id
      setTitle(newValue)
      setValue(randomPerson[newValue])
    }
  }

  return (
    
    <main>		
      <div className='block bcg-black'>
					<div className='title'>
						<h1 >Profiles App</h1>
						<h3>From Html to Api Rest </h3>
					</div>
      </div>
      <div className='block'>
        <div className='container'>
          <img
            src={(randomPerson && randomPerson.image) || defaultImage}
            alt='random user'
            className='user-img'
          />
          <div className='left'>
            <button className='btn' type='button' onClick={fetchRandomPerson}>
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M872 474H286.9l350.2-304c5.6-4.9 2.2-14-5.2-14h-88.5c-3.9 0-7.6 1.4-10.5 3.9L155 487.8a31.96 31.96 0 0 0 0 48.3L535.1 866c1.5 1.3 3.3 2 5.2 2h91.5c7.4 0 10.8-9.2 5.2-14L286.9 550H872c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path></svg>
          </button>
          </div>

          <div className='right'>
             <button className='btn' type='button' onClick={fetchRandomPerson}>
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 0 0 0-48.4z"></path></svg>
              </button>
          </div>

          <div>
          <p className='user-title'>my {title} is </p>
          <p className='user-value'>{value}</p>
          <div className='values-list'>
              <button className='icon' data-id='name' onMouseOver={handleValue}>
                <FaUser />
              </button>
              <button className='icon' data-id='email' onMouseOver={handleValue}>
                <FaEnvelopeOpen />
              </button>
              <button className='icon' data-id='age' onMouseOver={handleValue}>
                <FaCalendarTimes />
              </button>
              <button className='icon' data-id='street' onMouseOver={handleValue}>
                <FaMap />
              </button>
              <button className='icon' data-id='phone' onMouseOver={handleValue}>
                <FaPhone />
              </button>
              <button
                className='icon'
                data-id='password'
                onMouseOver={handleValue}
              >
                <FaLock />
              </button>

            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
