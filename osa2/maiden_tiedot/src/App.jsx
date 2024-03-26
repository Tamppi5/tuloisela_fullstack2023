import { useState, useEffect } from 'react'
import axios from 'axios'

const FilterCountries = ({value, onFC}) => {
  return (
    <form>
      <div>
        find countries: <input value = {value} onChange = {onFC}/>
      </div>
    </form>
  )
}

const ShowCountries = ({value, countries}) => {
  console.log(countries)
  const countryList = countries.filter(country => country.name.common.includes(value))
  console.log(countryList)
  if (countryList.length > 10) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  }
  return (
    <div>
      <ul>
        {countryList
        .map(country =>
        <div key={country.tId}>
          <li>{country.name.common}</li>
        </div>
        )}
      </ul>
    </div>
  )
}

const App = () => {
  const [value, setValue] = useState('')
  const [rates, setRates] = useState({})
  const [countries, setCountries] = useState([])
  const[country, setCountry] = useState(null)

  useEffect(() => {
      console.log('fetching countries...')
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          console.log("promise fulfilled")
          setCountries(response.data)
        })
  }, [])

  const handleFilterChange = (event) => {
    //console.log(event.target.value)
    setValue(event.target.value)
  }

  const onSearch = (event) => {
    event.preventDefault()
    s(value)
  }

  return (
    <div>
      <FilterCountries value={value} onFC={handleFilterChange}/>
      <ShowCountries value={value} countries={countries}/>
    </div>
  )
}

export default App
