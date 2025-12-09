import { useState } from "react"

const TagSelector = ({ allTags, selectedTags, onTagToggle }) => {
    return (
        <div style={{marginTop: '10px', padding: '10px', borderTop: '1px solid var(--color-border)'}}>
            <p style={{margin: '0 0 5px 0', fontSize: '0.9em', color: 'var(--color-text)'}}>Выберите теги:</p>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '5px'}}>
                {allTags.map(tag => (
                    <button
                        key={tag}
                        type="button" 
                        onClick={() => onTagToggle(tag)}
                        style={{
                            padding: '4px 8px',
                            borderRadius: '12px',
                            border: '1px solid var(--color-border)',
                            cursor: 'pointer',
                            backgroundColor: selectedTags.includes(tag) ? '#42e987' : 'var(--color-input-bg)',
                            color: selectedTags.includes(tag) ? 'white' : 'var(--color-text)',
                            transition: 'all 0.2s'
                        }}
                    >
                        {tag}
                    </button>
                ))}
            </div>
        </div>
    );
};

const AddTaskForm = ({addTask, allTags = []}) =>{

    const [userInput, setUserInput] = useState("")
    const [newDate, setNewDate] = useState("");
    const [selectedTags, setSelectedTags] = useState([]); 

    const handleChange = (e) =>{
        setUserInput(e.target.value)
    }
    const handleDateChange = (e) => {
        setNewDate(e.target.value);
    }
    
    const handleTagToggle = (tag) => {
        setSelectedTags(prevTags => 
            prevTags.includes(tag) 
                ? prevTags.filter(t => t !== tag) 
                : [...prevTags, tag]
        );
    }

    const submit = (e) =>{
        e.preventDefault()
        if (!userInput.trim()) return;
        

        addTask({ 
            text: userInput, 
            date: newDate, 
            tags: selectedTags 
        }); 
        
        setUserInput("")
        setNewDate("")
        setSelectedTags([]) 
    }
    
    return (
        <form action ="" onSubmit={submit} style={{display: 'flex', flexDirection: 'column', gap: '10px', padding: '15px', 
            border: `1px solid var(--color-border)`, borderRadius: '8px', marginBottom: '20px'}}>
            <input 
            type = "text" 
            placeholder = "feed my dog"
            value={userInput}
            onChange={handleChange}
            style={{padding: '8px', borderRadius: '4px', border: `1px solid var(--color-border)`,
                   backgroundColor: 'var(--color-input-bg)', color: 'var(--color-text)'}}
            />
            <input 
                    type="date" 
                    value={newDate}
                    onChange={handleDateChange}
                    style={{padding: '8px', borderRadius: '4px', border: `1px solid var(--color-border)`,
                           backgroundColor: 'var(--color-input-bg)', color: 'var(--color-text)'}}
                />
            

            <TagSelector 
                allTags={allTags} 
                selectedTags={selectedTags} 
                onTagToggle={handleTagToggle} 
            />
            
            <input type="submit" value="add" style={{padding: '10px', cursor: 'pointer', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px'}}/>
        </form>
    )
}
export default AddTaskForm