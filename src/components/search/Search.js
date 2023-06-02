import React from 'react'
import { AsyncPaginate } from 'react-select-async-paginate'
import {GEO_API_url,getApiOptions} from '../Api'
function Search({onSearchChange}) {
    const[search,setSearch]=React.useState(null)
    const handelOnchange=(searchData)=>{
        setSearch(searchData)
        onSearchChange(searchData)
    }
    const loadOptions=(inputValue)=>{
        return  fetch(`${GEO_API_url}/cities?minPopulation=1000&namePrefix=${inputValue}`, getApiOptions)
        .then(response =>response.json())
        .then(response =>{
            return{
                options:response.data.map((city)=>{
                    return{
                        value:`${city.latitude} ${city.longitude}`,
                        label:`${city.name},${city.countryCode}`
                    }
                    
                })
                
            }
        })
        
        .catch(err => console.error(err));

    }
  return (
    <AsyncPaginate
        placeholder="Search for city"
        debounceTimeout={600}
        value={search}
        onChange={handelOnchange}
        loadOptions={loadOptions}
    />
  )
}

export default Search