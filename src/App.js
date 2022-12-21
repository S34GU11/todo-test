import './App.css';
import {useEffect, useState} from "react";

function App() {
  const [newItem, setNewItem] = useState('')
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [sort, setSort] = useState(false)

  useEffect(() => setLoading(true), [loading])

  const addItem = () => {

    const item = {
      id: Math.floor(Math.random() * 1000),
      todo: newItem,
      isDone: false,
      createdAt: new Date()
    }

    if (item.todo.length < 1) return

    setItems(oldItems => !sort ? [...oldItems, item] : [item, ...oldItems])
    setNewItem('')
  }

  const deleteItem = id => {
    const updatedItems = items.filter(item => item.id !== id)
    setItems(updatedItems)
  }

  const sortByNewFirst = () => {
    const newItemsFirst = items.sort((a, b) => b.createdAt - a.createdAt)
    setLoading(true)
    setSort(true)
    setItems(newItemsFirst)
  }

  const sortByOldFirst = () => {
    const oldItemsFirst = items.sort((a, b) => a.createdAt - b.createdAt)
    setLoading(true)
    setSort(false)
    setItems(oldItemsFirst)
  }

  //Ill fixed the keepCheckedOnTop rerender bug today
  const keepCheckedOnTop = () => {
    const keepOnTopItems = items.sort((a, b) => b.isDone - a.isDone)
    setLoading(true)
    setItems(keepOnTopItems)
  }

  return (
    <div className="App">
      <h1>Todo list App</h1>
      <input
          type="text"
          placeholder="Add an item..."
          value={newItem}
          onChange={e => setNewItem(e.target.value)}
      />
      <button onClick={addItem}>Add</button>
      <div>
        <button onClick={sortByNewFirst}>NewFirst</button>
        <button onClick={sortByOldFirst}>OldFirst</button>
        <button onClick={keepCheckedOnTop}>KeepCheckedOnTop</button>
      </div>
      <ul>
        {
          items.map(item => ((
              <li key={item.id}>
                <input
                    type="checkbox"
                    onChange={()=> item.isDone = !item.isDone}
                />
                {item.todo}
                <button onClick={() => deleteItem(item.id)}>X</button>
              </li>
          )))
        }
      </ul>
    </div>
  );
}

export default App;
