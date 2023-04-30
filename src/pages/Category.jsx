//import '../styles/admin.scss';
import { useEffect, useState } from 'react';
import React from 'react';
import error_handler from '../utils/utils'

function Category(){
    const [CategoryList, setCategoryList] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [UpdateName, setUpdateName] = useState('')
    const [UpdateDescription, setUpdateDescription] = useState('')
    const [UpdateId, setUpdateId] = useState(null)

  useEffect(() => {
    getCategoryList();
  }, []);


  const handleEditClick_false = () => {
    setEditMode(false);
    setUpdateName(null);
    setUpdateDescription(null);
    setUpdateId(null);
  };

  function getCategoryList() {
    // Отримання таблиці із списком продуктів з сервера
    //const headers = new Headers();
    //const token = window.localStorage.getItem('token');
    //headers.set('Authorization', 'Basic ' + token);
    //headers.set('content-type', 'application/json');
    fetch('http://127.0.0.1:5000/api/v1/pharmacy/category-list')
      .then(async response => {
        if (!response.ok) {
          const error = await response.text();
          throw new Error(error);
        }
        return response.json();
      })
      .then((data) => {
        setCategoryList(data);
      })
      .catch((error) => {
        error_handler(error);
        console.error('Error fetching products', error);
      });
  }

  function add_category(body) {
    const headers = new Headers();
    const token = window.localStorage.getItem('token');
    headers.set('Authorization', 'Basic ' + token);
    headers.set('content-type', 'application/json');
    fetch('http://127.0.0.1:5000/api/v1/category', {
      method: 'POST',
      body: JSON.stringify(body),
      headers,
    })
    .then(async (response) => {
        if (response.ok) {
            getCategoryList();
        } else {
          throw new Error(await response.text());
        }
      })
      .catch((error) => {
        error_handler(error)
      });
  }

  function update_category(body) {
    const headers = new Headers();
    const token = window.localStorage.getItem('token');
    headers.set('Authorization', 'Basic ' + token);
    headers.set('content-type', 'application/json');
    fetch('http://127.0.0.1:5000/api/v1/category/' + UpdateId, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers,
    })
    .then(async (response) => {
        if (response.ok) {
            setEditMode(false);
            setUpdateName(null);
            setUpdateDescription(null);
            setUpdateId(null);
            window.location.reload();
        } else {
          throw new Error(await response.text());
        }
      })
      .catch((error) => {
        error_handler(error)
      });
  }

  function set_update(id){
    const category = CategoryList.find(category => category.id_category === Number(id))
    setUpdateName(category.category_name);
    setUpdateDescription(category.description);
    setUpdateId(id);
    setEditMode(true);
  }

  const update_start = async (event) => {
    event.preventDefault();
    const form = event.target.closest('form');
    if (form.checkValidity()) {
      const name = form.elements.name;
      const description = form.elements.description;
      const entry = {
        category_name: name.value,
        description: description.value,
      };
      update_category(entry)
    }
  };

  function deleteCategoryById(id) {
    const token = window.localStorage.getItem('token');
    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + token);
    headers.set('content-type', 'application/json');
    fetch('http://127.0.0.1:5000/api/v1/category/' + id, {
      method: 'DELETE',
      headers,
    })
      .then(async (response) => {
        if (response.ok) {
            getCategoryList();
        } else {
          throw new Error(await response.text());
        }
      })
      .catch((error) => {
        error_handler(error)
      });
  }

  const buttonHandler = async (event) => {
    event.preventDefault();
    const form = event.target.closest('form');
    if (form.checkValidity()) {
      const name = form.elements.name;
      const description = form.elements.description;
      const entry = {
        category_name: name.value,
        description: description.value,
      };
      add_category(entry)
    }
  };

    return (<>
        <section class="common__section">
          <div class='text-center'>
              <h1 id='title-user'>Category list</h1>
          </div>
      </section>

      <div class="panel">
          <div class="panel__wrapper">
              <div class="panel__main">
              <div className="delete">
        {
        CategoryList.length === 0 ? (<h2 className='fs-4 text-center'>No item</h2>) : (
        <table id="table" className="bordered">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {CategoryList.map((product) => (
              <tr key={product.id_category}>
                <td>
                    {product.id_category}
                </td>
                <td>{product.category_name}</td>
                <td>{product.description}</td>
                <td>
                  <div>
                    <i
                      data-testid="start_delete"
                      className="fa-solid fa-trash"
                      onClick={() => deleteCategoryById(product.id_category)}
                    ></i>
                  </div>
                </td>
                <td>
                  <button data-testid="start_update" onClick={() => set_update(product.id_category)} className="update__btn">
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        )
        }
      </div>
            </div>
            {editMode ? (
              <div class="panel__info">
              <div className="login">
                  <form className="login__wrapper" onSubmit={update_start}>
                        <h2 className="login__title">Edit category</h2>
                        <div className="login__username-block">
                            <div className="login__username">Name</div>
                            <input required type="text" data-testid="update_name" id="name" defaultValue={UpdateName} className="login__input" />
                        </div>
                        <div className="login__password-block">
                            <div className="login__username">Description</div>
                            <input required type="text" data-testid="update_description" id="description"  defaultValue={UpdateDescription} className="login__input" />
                        </div>
                        <button type="submit" data-testid="update_btn" className="login__btn">Submit</button>
                        <button onClick={handleEditClick_false} className="login__btn">Reject</button>
                        </form>
                  </div>
              </div>) : (<div class="panel__info">
              <div className="login">
                  <form className="login__wrapper" onSubmit={buttonHandler}>
                        <h2 className="login__title">Add category</h2>
                        <div className="login__username-block">
                            <div className="login__username">Name</div>
                            <input required type="text" data-testid="add_name" id="name" defaultValue={''} className="login__input" />
                        </div>
                        <div className="login__password-block">
                            <div className="login__username">Description</div>
                            <input required type="text" data-testid="add_description" id="description" defaultValue={''}  className="login__input" />
                        </div>
                        <button type="submit" data-testid="add_btn" className="login__btn">Add</button>
                        </form>
                  </div>
              </div>)}
          </div>
      </div>
  </>)
}

export default Category;