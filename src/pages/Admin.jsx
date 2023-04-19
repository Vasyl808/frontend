import '../styles/admin.scss';
import { Link } from "react-router-dom";
import React from 'react';

function Admin() {
  async function handleLogout(event) {
    event.preventDefault();
    window.localStorage.clear();
    window.location.href = '/login';
  }

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
            <button className="admin__btn" onClick={handleLogout}>
              <a href=''>Log out</a>
            </button>
            <button className="admin__btn">
                <Link to="/shopping-list">Shopping list</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;