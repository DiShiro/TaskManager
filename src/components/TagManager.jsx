import { useState } from 'react';

function TagManager({ tags, onAddTag, onRemoveTag }) {
    const [input, setInput] = useState('');
    
    const addTag = () => {
        const trimmedInput = input.trim();
        if (trimmedInput) {
            onAddTag(trimmedInput);
            setInput('');
        }
    };
    
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); 
            addTag();
        }
    };

    return (
        <div style={{marginBottom: '20px', padding: '15px', border: `1px solid var(--color-border)`, borderRadius: '8px'}}>
            <h4 style={{marginTop: 0}}>Управление тегами</h4>
            <div style={{display: 'flex', gap: '8px', marginBottom: '10px'}}>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Создать новый тег..."
                    style={{flexGrow: 1, padding: '8px', borderRadius: '4px', border: `1px solid var(--color-border)`,
                           backgroundColor: 'var(--color-input-bg)', color: 'var(--color-text)'}}
                />
                <button 
                    onClick={addTag} 
                    style={{padding: '8px 12px', background: '#42e987', color: 'white', border: 'none', borderRadius: '4px'}}
                    type="button"
                >+</button>
            </div>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '6px'}}>
                {tags.map(tag => (
                    <span
                        key={tag}
                        onClick={() => onRemoveTag(tag)}
                        style={{
                            padding: '4px 8px',
                            background: 'var(--color-input-bg)',
                            border: `1px solid var(--color-border)`,
                            borderRadius: '12px',
                            cursor: 'pointer',
                            fontSize: '0.9em',
                            color: 'var(--color-text)'
                        }}
                    >
                        {tag} ✕
                    </span>
                ))}
            </div>
        </div>
    );
}
export default TagManager;