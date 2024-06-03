import React, { useEffect, useState } from "react";
import axios from 'axios';
import Event from "../components/Event";

export default function MyEvents() {
	const [type, setType] = useState("RSVP'd");
	const [filter, setFilter] = useState('');
	const [createdEvents, setCreatedEvents] = useState([]);
	const [rsvpedEvents, setRsvpedEvents] = useState([]);

	useEffect(() => {
		const fetchCreatedEvents = async () => {
			try {
				const response = await axios.get('/api/createdEvents');
				setCreatedEvents(response.data.createdEvents);
			} catch (error) {
				console.error('Error fetching created events:', error);
			}
		};

		const fetchAttendedEvents = async () => {
			try {
				const response = await axios.get('/api/attendedEvents');
				setRsvpedEvents(response.data.attendedEvents);
			} catch (error) {
				console.error('Error fetching RSVP\'d events:', error);
			}
		};

		fetchCreatedEvents();
		fetchAttendedEvents();
	}, []);

	const filteredEvents = type === "RSVP'd"
		? rsvpedEvents.filter(event => event.title.toLowerCase().includes(filter.toLowerCase()))
		: createdEvents.filter(event => event.title.toLowerCase().includes(filter.toLowerCase()));

	return (
		<div className="block my-5">
			<div className="flex justify-center mb-5">
				<div className="mr-20">
					<select className="rounded bg-gray-100 p-2 pl-5 mb-2 w-full h-full" onChange={(e) => { setType(e.target.value) }}>
						<option value="RSVP'd">RSVP'd Events</option>
						<option value="your">Created Events</option>
					</select>
				</div>
				<div className="flex">
					<input type="text" placeholder={`Search ${type} events`} className="rounded bg-gray-100 p-2 pl-5 mb-2 w-full h-full"
						onChange={(e) => { setFilter(e.target.value) }}
					/>
					<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">
						Search
					</button>
				</div>
			</div>
			<div>
				{filteredEvents.map(event => (
					<Event key={event._id} eventData={event}/>
				))}
			</div>
		</div>
	);
}