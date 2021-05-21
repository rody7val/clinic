export const getEventIndexById = (state, eventId) => {
	state.events.findIndex(event => {
    	console.log(event.id)
		return event.id.toString() === eventId.toString()
	})
}