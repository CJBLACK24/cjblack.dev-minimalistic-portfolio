import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BorderMagicButton } from "./border-magic-button";

describe("BorderMagicButton", () => {
  it("renders children correctly", () => {
    render(<BorderMagicButton>Click me</BorderMagicButton>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <BorderMagicButton className="custom-class">Click me</BorderMagicButton>
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });
});
