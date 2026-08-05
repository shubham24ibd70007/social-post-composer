import {
  describe,
  test,
  expect,
} from "vitest";

describe("Scheduled Post Calendar", () => {

  const drafts = [
    {
      id: 1,
      platform: "Instagram",
      text: "Instagram Test Post",
      schedule: "2026-08-10T18:00:00",
    },

    {
      id: 2,
      platform: "Facebook",
      text: "Facebook Draft",
      schedule: "",
    },
  ];

  test("filters only scheduled posts", () => {
    const scheduledPosts = drafts.filter(
      (post) =>
        post.schedule &&
        post.schedule !== ""
    );

    expect(scheduledPosts).toHaveLength(1);

    expect(
      scheduledPosts[0].platform
    ).toBe("Instagram");
  });

  test("converts scheduled post into calendar event", () => {
    const scheduledPosts = drafts.filter(
      (post) => post.schedule
    );

    const events = scheduledPosts.map(
      (post) => ({
        id: String(post.id),
        title: post.text,
        start: post.schedule,
      })
    );

    expect(events[0].title).toBe(
      "Instagram Test Post"
    );

    expect(events[0].start).toBe(
      "2026-08-10T18:00:00"
    );
  });

  test("unscheduled draft is not displayed", () => {
    const scheduledPosts = drafts.filter(
      (post) => post.schedule
    );

    const facebookPost =
      scheduledPosts.find(
        (post) =>
          post.platform === "Facebook"
      );

    expect(facebookPost).toBeUndefined();
  });

});