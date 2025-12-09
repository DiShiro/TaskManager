import { useState, useEffect } from "react"; 
import { v4 as uuidv4 } from "uuid";
import List from "./List";
import AddTaskForm from "./AddTaskForm";
import TagManager from "./TagManager"; 

const STORAGE_KEY = 'taskManagerTasks';
const TAGS_STORAGE_KEY = 'taskManagerAllTags'; 

function TaskManager(){
   const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem(STORAGE_KEY);
        try {
            return savedTasks ? JSON.parse(savedTasks) : [];
        } catch {
            return [];
        }
    });
    const [allTags, setAllTags] = useState(() => {
        const savedTags = localStorage.getItem(TAGS_STORAGE_KEY);
        try {
            return savedTags ? JSON.parse(savedTags) : [];
        } catch {
            return [];
        }
    });

    const [searchQuery, setSearchQuery] = useState(''); 
    
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }, [tasks]);
    
    useEffect(() => {
        localStorage.setItem(TAGS_STORAGE_KEY, JSON.stringify(allTags));
    }, [allTags]); 
    
    const addTag = (newTag) => {
        if (newTag.trim() && !allTags.includes(newTag.trim())) {
            setAllTags([...allTags, newTag.trim()]);
        }
    };

    const removeTag = (tagToRemove) => {
        setAllTags(allTags.filter(tag => tag !== tagToRemove));
    };
    
    const updateTaskTags = (id, newTags) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, tags: newTags } : t));
    };
    
    const addTask =  ({ text, date, tags = [] }) =>{
        if (!text.trim()) return; 
        
        const newTask ={
            id: uuidv4(),
            text,
            date,
            isCompleted: false,
            tags: tags, 
        }
        setTasks([newTask, ...tasks]);
    }

    const removeTask = (id) =>{
        setTasks(tasks.filter(task => task.id !== id));
    }

    const toggleComplete = (id) => {
        setTasks(
            tasks.map(task =>
                task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
            )
        );
    }
    
    const editTask = (id, newText) => {
        setTasks(
            tasks.map(task =>
                task.id === id ? { ...task, text: newText } : task
            )
        );
    }

    const filteredTasks = tasks.filter(task => 
        task.text.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return(
        <div>
            <h3>Task manager</h3>
            <TagManager 
                tags={allTags} 
                onAddTag={addTag} 
                onRemoveTag={removeTag} 
            />
            <input 
                type="text"
                placeholder="Поиск по задачам..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                    padding: '8px', 
                    borderRadius: '4px', 
                    border: `1px solid var(--color-border)`,
                    backgroundColor: 'var(--color-input-bg)', 
                    color: 'var(--color-text)',
                    width: '100%',
                    boxSizing: 'border-box', 
                    marginBottom: '20px' 
                }}
            />
            <AddTaskForm 
                addTask={addTask} 
                allTags={allTags}
            />
            
            {filteredTasks.length > 0 ? (
                <List 
                    list={filteredTasks} 
                    removeTask={removeTask}
                    toggleComplete={toggleComplete}
                    editTask={editTask} 
                    updateTaskTags={updateTaskTags}
                />
            ) : (
                <p>{searchQuery ? "Задачи не найдены." : "Список задач пуст."}</p>
            )}
        </div>
    )
}
export default TaskManager