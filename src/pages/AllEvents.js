import React, { useState, useEffect } from "react";
import axios from 'axios';
import Event from "./Event";

export default function AllEvents() {
	const [events, setEvents] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		axios.get('http://localhost:3002/api/events')
			.then(response => {
				setEvents(response.data);
				setLoading(false);
			})
			.catch(err => {
				console.error('Error fetchinge events:', err);
				setError(err);
				setLoading(false);
			})
	}, []);

	if (loading) return <p>Loading events...</p>
	if (error) return <p>Error loading events.</p>
	
    return (
		<div className="flex justify-center items-center h-full m-4">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{events.map(event => (
					<Event key={event._id} eventData={event} />
				))}
			</div>
		</div>
    );
}