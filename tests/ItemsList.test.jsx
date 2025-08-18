import { render, screen, fireEvent } from "@testing-library/react";
import ItemsList from "../src/components/ItemsList";


describe("ItemsList", () => {

    const mockItems = [
        { id: 1, title: "Título 1", completed: false },
        { id: 2, title: "Título 2", completed: false },
        { id: 3, title: "Título 3", completed: true },
        { id: 4, title: "Título 4", completed: false },
        { id: 5, title: "Título 5", completed: true },
    ];

    test("1. Renderiza los títulos iniciales correctos", () => {
        
        render(<ItemsList items={mockItems} onItemSubmitted={() => {}} onItemDeleted={() => {}}/>);
        
        mockItems.forEach(item => {
            expect(screen.getByText(item.title)).toBeInTheDocument();
        });
    });

    test("2. Permite añadir un elemento", () => {
        const mockOnItemSubmitted = jest.fn();
        render(<ItemsList items={mockItems} onItemSubmitted={mockOnItemSubmitted} onItemDeleted={() => {}}/>);

        fireEvent.click(screen.getByTestId("add-item-btn"));

        fireEvent.change(
            screen.getByLabelText(/título/i), 
            { target: { value: "Título 6" } }
        );

        fireEvent.submit(screen.getByTestId("edit-item-form"));

        expect(mockOnItemSubmitted).toHaveBeenCalledWith({
            id: 0,
            title: "Título 6",
            completed: false
        });

        expect(mockOnItemSubmitted).toHaveBeenCalledTimes(1);
    });


    test("3. Permite eliminar un elemento por id", () => {
        const mockOnItemDelete = jest.fn();
        render(<ItemsList  items={mockItems} onItemSubmitted={() => {}} onItemDeleted={mockOnItemDelete}/>);

        fireEvent.click(screen.getAllByText(/borrar/i)[0]); 

        expect(mockOnItemDelete).toHaveBeenCalledWith({
            id: 1,
            title: "Título 1",
            completed: false
        });

        expect(mockOnItemDelete).toHaveBeenCalledTimes(1);
    })
});