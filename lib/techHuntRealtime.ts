type BroadcastPayload = Record<string, unknown>;

export async function broadcastTechHuntEvent(
  _eventName: string,
  _payload: BroadcastPayload,
) {
  return;
}

export function isRealtimeEnabled() {
  return false;
}
