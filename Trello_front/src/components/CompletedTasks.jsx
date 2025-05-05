import React, { useState } from 'react';
import axios from 'axios';


const CompletedTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCompletedTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const userId = localStorage.getItem('user_id');
      
      if (!userId) {
        throw new Error('User ID not found in localStorage');
      }

      const response = await axios.get(`http://localhost:8080/api/boards/completedTasks/${userId}`);
      setTasks(response.data);
      setIsModalOpen(true); // Открываем модальное окно после загрузки
    } catch (err) {
      setError(err.message);
      console.error('Error fetching completed tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ margin: '20px' }}>
      
      <button 
        onClick={fetchCompletedTasks}
        disabled={loading}
        style={{
          padding: '10px 15px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        {loading ? 'Loading...' : 'Get My Completed Tasks'}
      </button>

      {error && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          Error: {error}
        </div>
      )}

      {/* Модальное окно */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          color:'black',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999, // Очень высокий z-index чтобы быть поверх всех элементов
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            width: '80%',
            maxWidth: '600px',
            maxHeight: '80vh',
            overflow: 'auto',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            // position: 'relative'
          }}>
            <button 
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'none',
                border: 'none',
                fontSize: '1.2rem',
                cursor: 'pointer',
                color: '#666'
              }}
            >
              ×
            </button>
            
            {tasks.length > 0 ? (
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {tasks.map(task => (
                  <li key={task.id} style={{ 
                    padding: '10px', 
                    borderBottom: '1px solid #eee',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <span>{task.title}</span>
                    {task.completed && (
                      <span style={{ 
                        marginLeft: '10px',
                        color: 'green',
                        fontSize: '0.8em'
                      }}>
                        ✓ Completed
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No completed tasks found</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompletedTasks;