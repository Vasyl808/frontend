import '../styles/admin.scss';
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import error_handler from '../utils/utils'

function Admin() {
  const [isOpen, setIsOpen] = useState(false);
  const [UserList, setUserList] = useState([]);
  const [isOpen1, setIsOpen1] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  function handleClick() {
    setIsOpen(!isOpen);
  }

  function handleClick1() {
    setIsOpen1(!isOpen1);
  }

  async function handleLogout(event) {
    event.preventDefault();
    window.localStorage.clear();
    window.location.href = '/login';
  }

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    const headers = new Headers();
    headers.set('Authorization', `Basic ${token}`);
    headers.set('content-type', 'application/json');
    fetch('http://127.0.0.1:5000/api/v1/user-list', {
      method: 'GET',
      headers,
    })
      .then(async response => {
        if (!response.ok) {
          const error = await response.text();
          throw new Error(error);
        }
        return response.json();
      })
      .then(data => {setUserList(data);})
      .catch(error => error_handler(error));
  }, []);

    
  const filterUser = (searchText, listOfUser) => {
    if (!searchText || !listOfUser) {
      return listOfUser;
    }
    return listOfUser.filter(({ username }) =>
      username.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  const filteredUsers = filterUser(searchTerm, UserList);

  return (
    <>
      <section className="common__section">
        <div className='text-center'>
          <h1>Admin Panel</h1>
        </div>
      </section>

      <div className="admin">
        <div className="admin__wrapper">
          <h2 className="admin__title">
            Admin Panel
          </h2>
          <div className="admin__btns">
            <button className="admin__btn">
                <Link to='/add'>Add item</Link>
            </button>
            <button className="admin__btn">
                <Link to='/update'>Update item</Link>
            </button>
            <button className="admin__btn">
                <Link to="/shopping-list">Shopping list</Link>
            </button>
            <button className="admin__btn">
                <Link to="/category">Category list</Link>
            </button>
            <button className="admin__btn" onClick={handleClick}>User list</button>
            <button className="admin__btn" onClick={handleClick1}>Admin list</button>
            <button className="admin__btn" onClick={handleLogout}>
              <a href=''>Log out</a>
            </button>
            {isOpen && (
        <div className="overlay">
          <div className="modal">
            <div className="modal-content">
            <input
          autoFocus
          type="text"
          autoComplete="off"
          placeholder="Find user by username"
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-100 text-stone-900 placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-sm py-2 px-3 shadow-lg focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm mx-auto"
          srtyle={{
            width: '600px',
          }}
        />
              <ul>
                {filteredUsers.length === 0 ? (<h2 className='fs-4 text-center'>No item</h2>) : (
          <div className="list__wrapper">
          {filteredUsers.map((user, index) => (
            <li><Link to={`/user/${user.id}`} className='link'>Username: {user.username}</Link></li>        
          ))}
        </div>
        )}
              </ul>
              <button onClick={handleClick}>Close</button>
            </div>
          </div>
        </div>
      )}
      {isOpen1 && (
        <div className="overlay">
          <div className="modal">
            <div className="modal-content">
            <input
          autoFocus
          type="text"
          autoComplete="off"
          placeholder="Find user by username"
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-100 text-stone-900 placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-sm py-2 px-3 shadow-lg focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm mx-auto"
          srtyle={{
            width: '600px',
          }}
        />
              <ul>
                {filteredUsers.length === 0 ? (<h2 className='fs-4 text-center'>No item</h2>) : (
          <div className="list__wrapper">
          {filteredUsers.filter(user => user.userstatus === 'pharmacist').map((user, index) => (
            <li><Link to={`/user/${user.id}`} className='link'>Admin username: {user.username}</Link></li>        
          ))}
        </div>
        )}
              </ul>
              <button onClick={handleClick1}>Close</button>
            </div>
          </div>
        </div>
      )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;