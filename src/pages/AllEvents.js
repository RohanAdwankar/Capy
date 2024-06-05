import React, { useState, useEffect } from "react";
import axios from "axios";
import Event from "../components/Event";
import Loading from "../components/Loading"

require("../components/globalVariables");

export default function AllEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");

  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [numTotalEvents, setNumTotalEvents] = useState(0);
  const [eventNumRangeStart, setEventNumRangeStart] = useState(1);
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios
      .get(`/api/events/${page}`)
      .then((response) => {
        setEvents(response.data.events);
        setHasPrevPage(response.data.hasPrevPage);
        setHasNextPage(response.data.hasNextPage);
        setNumTotalEvents(response.data.numEvents);
        setEventNumRangeStart(response.data.start);
        setLoading(false);
        console.log(response.data);
      })
      .catch((err) => {
        console.error("Error fetchinge events:", err);
        setError(err);
        setLoading(false);
      });
  }, [page]);

  function gotoNextPage() {
    setPage(page + 1)
    setLoading(true)
  }

  function gotoPrevPage() {
    setPage(page - 1)
    setLoading(true)
  }

  if (loading) return <Loading />;
  if (error) return <p>Error loading events.</p>;

  return (
    <div className="justify-center items-center h-full mt-5">
      <div className="flex flex-row items-center justify-center">
        <div>
          {hasPrevPage && <button className="bg-black text-white rounded-full p-2 px-5 mr-10 hover:bg-gray-500" onClick={gotoPrevPage}>Previous</button>}
        </div>
        <div>
          Showing {eventNumRangeStart + 1}-{eventNumRangeStart + events.length + 1} of {numTotalEvents} events
        </div>
        <div>
          {hasNextPage && <button className="bg-black text-white rounded-full p-2 px-5 ml-10 hover:bg-gray-500" onClick={gotoNextPage}>Next</button>}
        </div>
      </div>
      <div className="flex m-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event) => <Event key={event._id} eventData={event} />)}
        </div>
      </div>
    </div>
  );
}
