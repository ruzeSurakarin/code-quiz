import React, { useEffect, useState } from 'react'
import axios from 'axios'

const IndexPage = () => {
  const [dataList, setDataList] = useState([])
  const [filter, setFilter] = useState('')

  const fetchData = async () => {
    const options = {
      method: 'GET',
      url: 'https://api.publicapis.org/categories',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }

    const response = await axios(options)

    if (response && response.status === 200) {
      setDataList(response.data)
      console.log(response.data)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleFilterChange = event => {
    setFilter(event.target.value)
  }

  return (
    <div>
      filter:
      <input type="text" value={filter} onChange={handleFilterChange} />
      <table>
        <tbody>
          {dataList
            .filter(data => data.toLowerCase().includes(filter.toLowerCase()))
            .map((data, idx) => (
              <tr key={idx}>
                <td>{data}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default IndexPage
