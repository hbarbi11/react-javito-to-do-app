import React, { useState } from 'react';
import './style.css';

function ListItem({ item }) {
  const { done, name, future } = item;

  if (done) {
    return (
      <div>
        <input type="checkbox" id="customCheck1" checked />
        <label htmlFor="customCheck1">{name}</label>
      </div>
    );
  }
  return (
    <div>
      <input type="checkbox" id="customCheck1" unchecked />
      <label htmlFor="customCheck1">{name}</label>
    </div>
  );
}

function ListItemContainer({ item, setDone }) {
  const { id, done } = item;
  return (
    <div onClick={() => setDone(id, !done)}>
      <ListItem item={item} />
    </div>
  );
}

function List({ list, setDone }) {
  return (
    <div>
      {list.map(listItem => (
        <ListItemContainer
          item={listItem}
          setDone={setDone}
          key={listItem.id}
        />
      ))}
    </div>
  );
}

function AddItem({ onAddItem }) {
  const [newItem, setNewItem] = useState('');

  function add() {
    onAddItem(newItem);
    setNewItem('');
  }

  return (
    <div>
      <input
        type="text"
        value={newItem}
        onChange={e => setNewItem(e.target.value)}
      />
      <button onClick={add}>Hozzáadás</button>
    </div>
  );
}

function useCheckoutList() {
  const [index, setIndex] = useState(1);
  const [list, setList] = useState([]);

  function addItem(itemName) {
    const item = {
      id: index,
      name: itemName
    };
    setIndex(prevIndex => prevIndex + 1);

    setList(prevList => [item, ...prevList]);
  }

  function setDone(id, done) {
    setList(prevList => {
      return prevList.map(item => {
        if (item.id === id) {
          return {
            ...item,
            done
          };
        } else {
          return item;
        }
      });
    });
  }
  function clearDone() {
    setList(prevList => prevList.filter(item => !item.done));
  }
  return { list, addItem, setDone, clearDone };
}

export default function App() {
  const { list, addItem, setDone, clearDone } = useCheckoutList();

  return (
    <div>
      <h3>Todo App</h3>
      <AddItem onAddItem={addItem} />
      <div class="row justify-content-center">
        <div class="col" />
        <div class="col">
          {' '}
          <List list={list} setDone={setDone} />
        </div>
        <div class="col">
          <button onClick={clearDone}>Törlés</button>
        </div>
        <div class="col" />
      </div>
    </div>
  );
}
