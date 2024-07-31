import React, {useState, useEffect} from "react";
import {nanoid} from "nanoid";
import TodoItem from "./TodoItem";

function App() {
  // getting data from Local Storage
  const getLocalItems = () =>{
    const Item = localStorage.getItem("ToDoItems");
    if(Item){
      return JSON.parse(localStorage.getItem("ToDoItems"))
    }
    else return []
  }
  
  const [inputText, setInputText] = useState("");
  const [items, setItems] = useState(getLocalItems);
  const [toggleBtn, setToggleBtn] = useState(false);
  const [changedItemId, setChangedItemId] = useState(null);
  
  // adding data to Local Storage
  useEffect(() => {
    localStorage.setItem("ToDoItems", JSON.stringify(items))
  }, [items])
  
  
  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }

  function addItem(e) {
    e.preventDefault()
    if(!inputText) {
      alert("Please fill the Data first");
    }
    else if(toggleBtn && inputText) {
      const editItem = items.map((item) => {
        if(item.id === changedItemId) {
          return {...item, name: inputText}
        }
        return item;
      })
      setItems(editItem);
    }
    else {
      const newItem = {id: "todo-" + nanoid() ,name:inputText ,newName:"", completed: false};
      setItems(prevItems => {
        return [...prevItems, newItem];
      });
    }
    setToggleBtn(false);
    setInputText("");
  }

  function deleteItem(id) {
    setItems((prevItems) => {
      return prevItems.filter((item, index) => {
        return item.id !== id;
      });
    });
  }
  
  function toggleTaskCompleted(id) {
    setItems((prevItems) => {
      return prevItems.map((item, index) => {
        if(item.id === id)
          return Object.assign({},item, {completed: !item.completed})
        else 
          return item
      });
    });
  }

  function changeTodoItem(id) {
    // for changing the text of button
    setToggleBtn(true);

    // finding the item for renaming it for transfer that to input section
    const changedItem = items.find((item) => {
      return item.id === id;
    })
    // transferring to input section
    setInputText(changedItem.name) 

    //
    setChangedItemId(id);
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <form className="form" onSubmit={addItem}>
        <input onChange={handleChange} type="text" value={inputText}  autoFocus/>

        <button type="submit" id={"action-btn"} onClick={addItem}>

        {
          toggleBtn ? <span>"Edit"</span> : <span>"Add"</span>
        }
        </button>
      </form>
      <div>
        <ul>
          {items.map((todoItem, index) => (
            <TodoItem
                key = {index}
                id= {todoItem.id}
                name= {todoItem.name}
                todoList = {todoItem}
                onChecked= {deleteItem}
                isDone= {todoItem.completed}
                toggleTaskCompleted= {toggleTaskCompleted}
                changeTodoItem= {changeTodoItem}
               />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
