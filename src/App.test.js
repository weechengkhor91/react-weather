import { act } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "./App";

const mockWeatherData = {
  name: "London",
  main: {
    temp: 30.45,
    temp_min: 29.1,
    temp_max: 32.8,
    humidity: 65,
  },
  weather: [{ main: "Clear", icon: "01d" }],
};

describe("App Component", () => {
  it("render theme mode", () => {
    render(<App />);

    //find the theme mode text content
    const themeModeText = screen.getByText("Theme Mode");
    expect(themeModeText).toBeInTheDocument();
  });
});
