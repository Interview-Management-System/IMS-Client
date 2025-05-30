import {
    createViewDay,
    createViewMonthAgenda,
    createViewMonthGrid,
    createViewWeek
} from '@schedule-x/calendar'
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'
import { createEventModalPlugin } from '@schedule-x/event-modal'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import { ScheduleXCalendar, useCalendarApp } from '@schedule-x/react'
import ScheduleDetailComponent from './components/schedule-detail.component'

function InterviewListComponent() {
    const events = [
        {
            id: '1',
            title: 'gays',
            start: '2025-05-27 03:00',
            end: '2025-05-27 04:00',
            location: 'Conference Room A',
            description: 'Discuss project milestones',
            organizer: 'Alice Johnson',
            job: 'Software Engineer'
        }
    ]

    const calendar = useCalendarApp({
        views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
        events: events,
        plugins: [createEventsServicePlugin(), createDragAndDropPlugin(), createEventModalPlugin()]
    })

    return (
        <>
            <ScheduleXCalendar
                calendarApp={calendar}
                customComponents={{
                    eventModal: ScheduleDetailComponent
                }}
            />
        </>
    )
}

export default InterviewListComponent
