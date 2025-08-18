import { useState } from "react";
import EditItemForm from "./EditItemForm";
import "./items.css";


function AddItem({onSubmit}) {
    
    const [inEditMode, setInEditMode] = useState(false);

    function render() {
        if (inEditMode)  {
            return ( 
                <EditItemForm 
                    onSubmit={(newItem) => {
                        setInEditMode(false);
                        onSubmit(newItem);
                    }}
                    onCancel={() => setInEditMode(false)}
                />
            );
        }
        return (
            <button className="add-item-button" onClick={e => setInEditMode(true)} data-testid="add-item-btn">
                <p>
                    {" + Agregar Item" }
                </p>
            </button>
        );
    }


    return (
        <div className="item-container add-item">
            {render()}
        </div>
    );
}


export default AddItem;