import React, { useEffect, useState } from "react";
import axios from "axios";
import Event from "../components/Event";
import Loading from "../components/Loading";
import { store } from "../Main";

export default function UserEvents({ username }) {
  const [isSignedIn, setSignedIn] = store.useState("signedIn", {
    default: false,
  });
  const [signedInUsername, setSignedInUsername] = store.useState(
    "signedInUsername",
    { default: "" }
  );
  const [type, setType] = useState("RSVP'd");
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [createdEvents, setCreatedEvents] = useState([]);
  const [rsvpedEvents, setRsvpedEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    const fetchCreatedEvents = async () => {
      try {
        const response = await axios.get(`/api/createdEvents/${username}`);
        setCreatedEvents(response.data.createdEvents);
        console.log("Created Events:", response);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching created events:", error);
        setIsLoading(false);
      }
    };

    const fetchAttendedEvents = async () => {
      try {
        const response = await axios.get(`/api/attendedEvents/${username}`);
        setRsvpedEvents(response.data.attendedEvents);
        console.log("RSVP'd Events:", response);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching RSVP'd events:", error);
        setIsLoading(false);
      }
    };

    fetchCreatedEvents();
    fetchAttendedEvents();
  }, [type]);

  useEffect(() => {
    if (type === "RSVP'd") {
      if (rsvpedEvents && rsvpedEvents.length > 0)
        setFilteredEvents(rsvpedEvents);
      else setFilteredEvents([]);
    } else {
      if (createdEvents && createdEvents.length > 0)
        setFilteredEvents(createdEvents);
      else setFilteredEvents([]);
    }
  }, [createdEvents, rsvpedEvents]);

  if (!isSignedIn) return <p>Please sign in.</p>;
  if (isLoading) return <Loading />;

  return (
    <div className="block my-5">
      <div>
        <div className="mr-20">
          <select
            className="rounded bg-gray-100 p-2 pl-5 mb-2 w-full h-full"
            onChange={(e) => {
              setType(e.target.value);
            }}
          >
            <option value="RSVP'd">
              {username === signedInUsername ? "Your" : `${username}'s`} RSVP'd
              Events
            </option>
            <option value="Created">
              {username === signedInUsername ? "Your" : `${username}'s`} Created
              Events
            </option>
          </select>
        </div>
        <div className="flex">
          <input
            type="text"
            placeholder={`Search ${
              username === signedInUsername ? "your" : `${username}'s`
            } ${type} events`}
            className="rounded bg-gray-100 p-2 pl-5 mb-2 w-96 h-full"
            onChange={(e) => {
              setFilter(e.target.value);
            }}
          />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">
            Search
          </button>
        </div>
      </div>
      <div>
        {filteredEvents
          .filter((event) => {
            let title = event.title ? event.title.toLowerCase() : "";
            let location = event.location ? event.location.toLowerCase() : "";
            return (
              title.includes(filter.toLowerCase()) ||
              location.includes(filter.toLowerCase())
            );
          })
          .map((event) => (
            <div className="p-2">
              <Event key={event._id} eventData={event} />
            </div>
          ))}
      </div>
    </div>
  );
}
