import ToDoItem from "./ToDoItem";
import AddItem from "./AddItem";
import "./lists.css";


function ItemsList({items, onItemSubmitted, onItemDeleted}) {
    return (
        <ul className="vertical-list">
            <AddItem onSubmit={onItemSubmitted} />
            {
                items.map(item => (
                    <li key={"ToDoItem#" + item.id}>
                        <ToDoItem item={item} onEdit={onItemSubmitted} onDelete={onItemDeleted}/>
                    </li>
                ))
            }
        </ul>
    );
}


export default ItemsList;