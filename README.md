✅ Step 1: Repeating the Problem Statement
"Okay, so as I understand it, the task is to fetch a list of products from an API, display them in a list, and allow the user to filter the products in real-time using a search input. The list should update based on what the user types. Please let me know if I'm missing anything before I start."

✅ Step 2: Start Coding with Step-by-Step Explanation
1. Setting Up Basic React Component
"I'll begin by creating a functional component using React and setting up the basic states needed: one for loading, one for the items fetched, and one for search text."

```
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const url = "https://fakestoreapi.com/products";
  const [loading, setLoading] = useState(true);
  const [dataItems, setDataItems] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [searchText, setSearchText] = useState("");
```

"Here:

loading is for showing a loading state while data is being fetched.

dataItems is the list to be shown on screen — this may be filtered.

allItems keeps the original unfiltered data.

searchText stores the current text typed in the search bar."

2. Using useEffect to Fetch Data

```
  useEffect(() => {
    try {
      async function getData() {
        const res = await fetch(url);
        const data = await res.json();
        setDataItems(data);
        setAllItems(data);
        setLoading(false); 
      }
      getData();
    } catch (error) {
      console.log(error.message);
    }
  }, []);
```

"I’m using the useEffect hook to make a network request when the component mounts. I’m fetching product data from the API, storing it in both allItems and dataItems, and then updating the loading state."

3. Handling the Search Input

```
  function filterItems(e) {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    const filteredItems = allItems.filter(item =>
      item.title.toLowerCase().includes(value)
    );
    setDataItems(filteredItems);
  }
```

"This is the filtering function. I take the input value and convert it to lowercase to make the search case-insensitive. Then I use .filter() on the original allItems array so that each filter is based on the full dataset. I check if the title includes the search text and update the displayed list using setDataItems."

4. Conditional Rendering for Loading

```
  if (loading) {
    return <p>Loading...</p>;
  }
```

"While the data is still being fetched, I display a simple loading message."

5. Returning the JSX UI

```
  return (
    <>
      <input
        type='text'
        placeholder='Type to search...'
        value={searchText}
        onChange={filterItems}
      />
      <ul>
        {dataItems.map((item, index) => (
          <li key={index}>{item.title}</li>
        ))}
      </ul>
    </>
  );
}
```

"Here's the UI. I have:

A text input with an onChange handler that triggers filtering.

A list that maps over dataItems and displays the product titles."

✅ Step 3: Wrapping Up and Mentioning Improvements
"So that completes the basic functionality. The list updates in real-time as the user types. To make this more robust, I could add:

Debounce to limit API filtering calls.

Highlight matched text.

Sorting functionality.

Loading spinner or error handling UI."

🧠 Bonus Tips for Interviews:
Be proactive: Offer improvements once done.

Think aloud: Don’t stay silent when thinking — express your choices.

Stay calm if errors come up: Debug live and explain what you're checking.