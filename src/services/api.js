import axios from "axios";
import { ToDoItem } from "../models/todoItem";

export { getById }

const ENDPOINT = "https://jsonplaceholder.typicode.com/todos?userId=";


async function apiGet(endpoint, config) {
    try {
        return (await axios.get(endpoint, config));
    }
    catch (error) {
        throw error;
    }
}


async function getById(id) {
    const result = await apiGet(ENDPOINT + id);
    return result.data.map(data => new ToDoItem({...data}))
}