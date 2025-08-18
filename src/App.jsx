import { useState, useEffect } from "react";
import { getById } from "./services/api";
import AppHeader from "./components/AppHeader";
import ItemsList from "./components/ItemsList";
import AppFooter from "./components/AppFooter";
import './App.css';
import "./font-styles.css";


function App() {

	const [items, setItems] = useState([]);
    const [maxId, setMaxId] = useState(items.reduce((max, item) => Math.max(max, item.id), 0));
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);


	useEffect(() => {
        const getItems = async () => {
			setIsLoading(true);
			try {
				const loadedItems = await getById(1);
				setItems(loadedItems.sort((item1, item2) => item2.id - item1.id));
				setMaxId(loadedItems[0].id);
				setIsLoading(false);
			}
			catch (e) {
				setError(e);
			}
        }
        getItems();
    }, []);


	function onItemSubmitted(submittedItem) {
		const isNewItem = submittedItem.id === 0;
		if (isNewItem) {
            submittedItem.id = maxId + 1;
            setMaxId(submittedItem.id);
			setItems([submittedItem, ...items]);
        }
		else {
			const targetIndex = items.findIndex(item => item.id === submittedItem.id);
			const before = items.slice(0, targetIndex);
  			const after = items.slice(targetIndex + 1);
			setItems([...before, submittedItem, ...after]);
		}

	}

	function onItemDeleted(deletedItem) {
		setItems([...(items.filter(item => item.id !== deletedItem.id))]);
	}

	function renderLoadSeq() {
		if (error) {
			return <h2>Hubo un error al cargar las notas: {error.message}</h2>;
		}
		if (isLoading) {
			return <h2>Cargando ...</h2>
		}
		return <ItemsList items={items} onItemSubmitted={onItemSubmitted} onItemDeleted={onItemDeleted}/>
	}


	return (
		<>
			<AppHeader />
			<div style={{display: "flex", justifyContent: "center"}}>
				<div style={{width: "75dvw"}}>
					{renderLoadSeq()}
				</div>
			</div>
			<AppFooter />
		</>
	);
}


export default App;