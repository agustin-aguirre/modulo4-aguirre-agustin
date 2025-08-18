import { render, screen, fireEvent } from "@testing-library/react";
import EditItemForm from "../src/components/EditItemForm";

describe("EditItemForm", () => {

    const mockItem = { id: 123, title: "Título inicial", completed: false };


    test("1. Renderiza con el título del item por defecto", () => {
        render(<EditItemForm item={mockItem} onSubmit={() => {}} onCancel={() => {}} />);
        const input = screen.getByLabelText(/título/i);

        expect(input.value).toBe("Título inicial");
    });


    test("2. Permite modificar el título", () => {
        render(<EditItemForm item={mockItem} onSubmit={() => {}} onCancel={() => {}} />);
        
        const input = screen.getByLabelText(/título/i);
        fireEvent.change(input, { target: { value: "Nuevo título" } });

        expect(input.value).toBe("Nuevo título");
    });


    test("3. Envía el formulario con el objeto esperado", () => {
        const mockOnSubmit = jest.fn();
        render(<EditItemForm item={mockItem} onSubmit={mockOnSubmit} onCancel={() => {}} />);

        const input = screen.getByLabelText(/título/i);
        fireEvent.change(input, { target: { value: "Título actualizado" } });

        const form = screen.getByTestId("edit-item-form");
        fireEvent.submit(form);

        expect(mockOnSubmit).toHaveBeenCalledWith({
            id: 123,
            title: "Título actualizado",
            completed: false,
        });

        expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    });
});