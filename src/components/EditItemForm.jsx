import { useState } from "react";


function EditItemForm({item, onSubmit, onCancel}) {
    const [enteredTitle, setEnteredTitle] = useState(item?.title ?? "");

    function handleOnSubmit(e) {
        e.preventDefault();
        onSubmit({id: item?.id ?? 0, title: enteredTitle, completed: false})
    }

    return (
        <div className="item-container edit-item-form">
            <form onSubmit={handleOnSubmit} data-testid="edit-item-form">
                <div>
                    <label htmlFor="titulo">Título:</label>
                    <input 
                        id="titulo"
                        type="text" 
                        value={enteredTitle} 
                        autoFocus={true}
                        onChange={e => setEnteredTitle(e.target.value)}
                    />
                </div>
                <div>
                    <input type="submit" value="Guardar"/>
                    <button onClick={onCancel}>Cancelar</button>
                </div>
            </form>
        </div>
    );
}


export default EditItemForm;