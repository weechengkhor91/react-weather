import { act } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Form from "./Form";

describe("Form Component", () => {
  it("renders the form", async () => {
    await act(async () => {
      render(<Form />);
    });

    const searchTerm = screen.getByLabelText("Search");
    const buttonSubmit = screen.getByTestId("button-submit");
    const buttonSubmitIcon = buttonSubmit.querySelector(".btn-search-icon");

    expect(searchTerm).toBeInTheDocument();
    expect(buttonSubmit).toBeInTheDocument();
    expect(buttonSubmitIcon).toBeInTheDocument();
  });

  it("clear search term after submit form", async () => {
    const mockOnFetchData = jest.fn();
    await act(async () => {
      render(<Form onFetchData={mockOnFetchData} />);
    });

    const searchTerm = screen.getByLabelText("Search");
    const buttonSubmit = screen.getByTestId("button-submit");

    fireEvent.change(searchTerm, { target: { value: "Singapore" } });
    fireEvent.click(buttonSubmit);
    expect(mockOnFetchData).toHaveBeenCalledWith("Singapore");
  });
});
