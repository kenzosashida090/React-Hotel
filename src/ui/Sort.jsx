import { useSearchParams } from "react-router-dom"
import Select from "./Select"

/* eslint-disable react/prop-types */
function Sort({options}) {
    const [searchParams, setSearchParams] = useSearchParams()
    const sortBy = searchParams.get("sortBy") || "" //set a default value to the query in this case empty will select the first option
    function handleChange(e) {
      searchParams.set("sortBy",e.target.value)
      setSearchParams(searchParams)
    }
    return (
        <Select value={sortBy} options={options} type="white" onChange={handleChange}/>
    )
}

export default Sort
