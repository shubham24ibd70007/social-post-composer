import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

function TestCalendarEvent({ onClick }) {
  return (
    <button onClick={onClick}>
      Instagram Test Post
    </button>
  );
}

describe("Calendar User Interaction", () => {
  test("user can click a scheduled post", async () => {
    const user = userEvent.setup();

    const handleClick = vi.fn();

    render(
      <TestCalendarEvent
        onClick={handleClick}
      />
    );

    const post = screen.getByRole(
      "button",
      {
        name: "Instagram Test Post",
      }
    );

    await user.click(post);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});