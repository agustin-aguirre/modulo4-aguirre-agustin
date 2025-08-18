import { useState } from "react";
import EditItemForm from "./EditItemForm";
import "./items.css";


function ToDoItem({item, onEdit, onDelete}) {
    const [inEditMod, setInEditMode] = useState(false);

    function render() {
        if (inEditMod) {
            return (
                <EditItemForm 
                    item={item} 
                    onSubmit={(newItem) => {
                        setInEditMode(false);
                        onEdit(newItem);
                    }}
                    onCancel={() => setInEditMode(false)}
                />
            );
        }
        return <>
                <p 
                    className={"item-text " + (item.completed? "completed" : "not-completed")} 
                    onClick={(e) => onEdit({...item, completed: !item.completed})}
                >
                    {item.title}
                </p>
                <div className="item-options">
                    <button onClick={e => setInEditMode(true)}>{"Editar"}</button>
                    <button onClick={e => onDelete(item)}>{"Borrar"}</button>
                </div>
            </>
    }

    return (
        <div className="item-container item">
            {render()}
        </div>
    );
}


export default ToDoItem;