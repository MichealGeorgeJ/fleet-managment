import { defineTable } from "./helpers";

export class SessionEvents {

    static readonly sessionEvents = defineTable("session_events", {
        id: 'id',
        sessionId: 'session_id',
        eventType: 'event_type',
        createdAt: 'created_at'
    });

}