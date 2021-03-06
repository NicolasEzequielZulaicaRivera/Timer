import { useMemo } from "react";
import { connect } from "react-redux";
import type { ConnectedProps, RootState, AppDispatch } from "../../store/hooks";
import { addEvent, clearEvents } from "../../store/eventsSlice";
import { calculateDisplayEvents } from "../../events/functions";

import EventBlock from "./EventBlock";
import Controls from "./Controls";

import { Event } from "../../events/types";
import styles from "./EventTimeline.module.scss";

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type EventTimelineProps = PropsFromRedux & {};

const EventTimeline = ({
  events,
  addEvent,
  clearEvents,
}: EventTimelineProps) => {
  // const { events, loading } = useEvents();
  const displayEvents = useMemo(() => calculateDisplayEvents(events), [events]);
  return (
    <div className={styles.EventTimeline}>
      <Controls
        fullEvents={displayEvents}
        addEvent={addEvent}
        clearEvents={clearEvents}
      />
      <div className={styles.Events}>
        {displayEvents.map((e, i) => (
          <EventBlock key={i} event={e} />
        ))}
      </div>
    </div>
  );
};

function mapStateToProps(state: RootState) {
  return {
    events: state.events.events,
  };
}

function mapDispatchToProps(dispatch: AppDispatch) {
  return {
    addEvent: (event: Event) => dispatch(addEvent(event)),
    clearEvents: () => dispatch(clearEvents()),
  };
}

export default connector(EventTimeline);
