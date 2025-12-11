import { useState } from 'react';
import './style.css';

function List({ list, removeTask, toggleComplete, editTask, updateTaskTags }) { 

    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState('');

    const handleEditStart = (task) => {
        setEditingId(task.id);
        setEditText(task.text);
    };

    const handleEditSave = (id) => {
        if (editText.trim()) {
            editTask(id, editText.trim());
        }
        setEditingId(null);
    };

    const handleKeyDown = (e, id) => {
        if (e.key === 'Enter') {
            handleEditSave(id);
        }
        if (e.key === 'Escape') {
            setEditingId(null);
        }
    };

    return (
        <ul className="tasks-list">
            {list.map(i => {
                const date = new Date(i.date);
                const datePast = date.getTime() - Date.now() < 0;
                const isOverdue = i.date && datePast && !i.isCompleted;
                const itemClass = `task-item ${isOverdue ? 'past' : 'future'} ${i.isCompleted ? 'completed' : ''}`;

                return (
                    <li key={i.id} className={itemClass}>
                        
                        <input
                            type="checkbox"
                            checked={i.isCompleted || false}
                            onChange={() => toggleComplete(i.id)}
                            className="task-checkbox"
                            title={i.isCompleted ? "Отменить выполнение" : "Отметить как выполненную"}
                        />

                        {editingId === i.id ? ( 
                            <input
                                type="text"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                onBlur={() => handleEditSave(i.id)} 
                                onKeyDown={(e) => handleKeyDown(e, i.id)}
                                autoFocus
                                className="task-edit-input"
                            />
                        ) : (
                            <span 
                                className="task-text" 
                                title={i.text}
                                onDoubleClick={() =>
                                    handleEditStart(i)} 
                            >
                                {i.text}
                            </span>
                        )}

                        {i.tags && i.tags.length > 0 && (
                            <div className="task-tags">
                                {i.tags.map(tag => (
                                    <span key={tag} className="task-tag-badge">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                        
                        <div className="task-controls">
                            {i.date && <span className="task-date">{i.date}</span>}
                            {editingId !== i.id && (
                                <button
                                    className="edit-btn"
                                    onClick={() => handleEditStart(i)}
                                    aria-label={`Редактировать задачу: ${i.text}`}
                                >
                                    Edit
                                </button>
                            )}
                            <button
                                className="remove-btn"
                                onClick={() => removeTask(i.id)}
                                aria-label={`Удалить задачу: ${i.text}`}
                            >
                                ×
                            </button>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}

export default List;