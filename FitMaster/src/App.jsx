import { useState, useEffect } from 'react';
import UserList from "./UserList.jsx";
import './App.css';
import UserForm from "./UserForm.jsx";
import Page1 from "./Page1.jsx";
import Page2 from "./Page2.jsx";


function App() {
    const [users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
       fetchUsers()
    }, []);

    const fetchUsers = async () => {
        const response = await fetch("http://127.0.0.1:5000/api/users");
        const data = await response.json();
        setUsers(data.users);
        console.log(data.users);
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentUser({});
    }

    const onUpdate = () => {
        closeModal();
        fetchUsers();
    }

    const openCreateModal = () => {
        if (!isModalOpen) setIsModalOpen(true);
    }

    const openEditModal = (user) => {
        if (isModalOpen) return
        setCurrentUser(user)
        setIsModalOpen(true);

    }
  return (<>
      <UserList users={users} updateUser={openEditModal} updateCallback={onUpdate} />
          <button onClick={openCreateModal}>Create New Contact</button>
          {isModalOpen && <div className="modal">
              <div className="modal-content">
                  <span className="close" onClick={closeModal}>&times;</span>
                  <UserForm existingUser={currentUser} updateCallback={onUpdate} />
              </div>
          </div>

          }
  </>
  );
}

export default App