import { useEffect } from 'react';
import './App.css'
import { useState } from 'react';

function App() {

  const url = "https://fakestoreapi.com/products";
  const [loading, setLoading] = useState(true)
  const [dataItems, setDataItems] = useState([])
  const [allItems, setAllItems] = useState([])
  const [searchText, setSearchText] = useState("")

  useEffect(() => {
    try {
      async function getData(){
        const res = await fetch(url)
        const data = await res.json()
        // console.log(data)
        setDataItems(data)
        setAllItems(data)
        setLoading(false) 
      }
      getData()
    } catch (error) {
      console.log(error.message)
    }
  }, [])

  function filterItems(e){
    const value = e.target.value
    setSearchText(value)
    const filteredItems = allItems.filter((item,index) => item.title.toLowerCase().includes(value))
    console.log(filteredItems);
    setDataItems(filteredItems)
  }

  if(loading){
    return <p>Loading...</p>
  }

  console.log(" data ", dataItems)

  return (
    <>
      {/* Create a search bar component that filters a list of items as the user types. */}
      <input type='text' placeholder='Type to search...' onChange={(e) =>filterItems(e)}/>
      <ul>
      {
        dataItems.map((item, index) => (
           <li key={index}>{item.title}</li>
        ))
      }
      </ul>
    </>
  )
}

export default App
