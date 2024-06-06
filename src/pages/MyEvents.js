import React, { useEffect, useState } from "react";
import axios from 'axios';
import { store } from "../Main.js";
import Event from "../components/Event";

export default function MyEvents() {
	const [isSignedIn, setSignedIn] = store.useState("signedIn", {
		default: false,
	});

	const [type, setType] = useState("RSVP'd");
	const [filter, setFilter] = useState('');
	const [createdEvents, setCreatedEvents] = useState([]);
	const [rsvpedEvents, setRsvpedEvents] = useState([]);
	const [filteredEvents, setFilteredEvents] = useState([]);

	useEffect(() => {
		const fetchCreatedEvents = async () => {
			try {
				const response = await axios.get('/api/createdEvents');
				setCreatedEvents(response.data.createdEvents);
				console.log('Created Events:', response);
			} catch (error) {
				console.error('Error fetching created events:', error);
			}
		};

		const fetchAttendedEvents = async () => {
			try {
				const response = await axios.get('/api/attendedEvents');
				setRsvpedEvents(response.data.attendedEvents);
				console.log('RSVP\'d Events:', response);
			} catch (error) {
				console.error('Error fetching RSVP\'d events:', error);
			}
		};

		fetchCreatedEvents();
		fetchAttendedEvents();
	}, [type]);

	useEffect(() => {
		if (type === "RSVP'd") {
			if (rsvpedEvents && rsvpedEvents.length > 0)
				setFilteredEvents(rsvpedEvents);
			else
				setFilteredEvents([]);
		} else {
			if (createdEvents && createdEvents.length > 0)
				setFilteredEvents(createdEvents);
			else
				setFilteredEvents([]);
		}
	}, [createdEvents, rsvpedEvents]);

	if (!isSignedIn) {
		return (
			<div className="block my-5">
				<p>Please sign in.</p>
			</div>
		);
	}

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
				{
					filteredEvents.filter((event) => {
						let title = event.title ? event.title.toLowerCase() : '';
						let location = event.location ? event.location.toLowerCase() : '';
						return title.includes(filter.toLowerCase()) || location.includes(filter.toLowerCase());
					}).map((event) => (
						<Event key={event._id} eventData={event} />
					))
				}
			</div>
		</div>
	);
}