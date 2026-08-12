import React, {
  memo,
  useMemo,
  useCallback,
} from "react";

import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import {
  draftsSelectors,
  updateDraftAsync,
} from "../redux/slices/postSlice";

function Scheduled() {
  const dispatch = useDispatch();

  // Get drafts from Redux
  const drafts = useSelector(
    draftsSelectors.selectAll
  );

  // Memoized scheduled posts
  const scheduledPosts = useMemo(() => {
    return drafts.filter(
      (post) =>
        post.schedule &&
        post.schedule !== ""
    );
  }, [drafts]);

  // Memoized calendar events
  const events = useMemo(() => {
    return scheduledPosts.map((post) => ({
      id: String(post.id),

      title:
        post.text?.length > 25
          ? `${post.text.substring(0, 25)}...`
          : post.text ||
            `${post.platform} Post`,

      start: post.schedule,

      extendedProps: {
        platform: post.platform,
        text: post.text,
        image: post.image,
      },
    }));
  }, [scheduledPosts]);

  // Stable click function
  const handleEventClick = useCallback(
    (info) => {
      const event = info.event;

      const platform =
        event.extendedProps.platform;

      const text =
        event.extendedProps.text ||
        "No content";

      alert(
        `Platform: ${platform}\n\nPost: ${text}\n\nScheduled: ${event.start.toLocaleString()}`
      );
    },
    []
  );

  // Stable drag/drop function
  const handleEventDrop = useCallback(
    (info) => {
      const id = Number(info.event.id);

      const newSchedule =
        info.event.start.toISOString();

      const post = drafts.find((draft) => draft.id === id);
      if (!post) return;

      dispatch(updateDraftAsync({
        id,
        post: { ...post, schedule: newSchedule },
      }))
        .unwrap()
        .then(() => toast.success("Schedule Updated"))
        .catch(() => toast.error("Failed to update schedule"));
    },
    [dispatch, drafts]
  );

  return (
    <motion.div
      className="page glass"
      initial={{
        opacity: 0,
        y: 40,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      style={{
        padding: "30px",
      }}
    >
      <h1>Content Calendar</h1>

      <p
        className="subtitle"
        style={{
          marginBottom: "30px",
        }}
      >
        Plan and manage your scheduled posts
      </p>

      <FullCalendar
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
        ]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right:
            "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={events}
        editable={true}
        selectable={true}
        eventClick={handleEventClick}
        eventDrop={handleEventDrop}
        height="auto"
        dayMaxEvents={true}
        nowIndicator={true}
      />
    </motion.div>
  );
}

export default memo(Scheduled);
