import { render, screen } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async"; // Dodaj import HelmetProvider
import Home from "@/ts/views/Home/Home";

describe('Home Component', () => {
    it('should render text Hello World in Home component', () => {
        render(
            <HelmetProvider>
                <Home />
            </HelmetProvider>
        );

        // Sprawdź, czy komponent Home jest renderowany
        const welcomeElement = screen.getByText(/Hello World/i); // Użyj regex, aby nie było problemów z wielkością liter
        expect(welcomeElement).toBeInTheDocument();
    });
});
