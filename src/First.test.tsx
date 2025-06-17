import { render, screen } from "@testing-library/react";
import { First } from "./First";

describe('First tests', () => {
    it('Should render component', () => {
        render(<First />)
        expect(true).toBeTruthy();

        const heading = screen.getByRole('heading');
        expect(heading).toBeInTheDocument();
    })
})