import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { auth } from '../components/firebase';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Popup from '../components/Popup';

export default function Events() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState('');
  const [comment, setComment] = useState('');
  const [popup, setPopup] = useState({ message: '', type: 'error', isVisible: false });
  const [eventForm, setEventForm] = useState({
    title: '',
    date: '',
    location: '',
    telescope: '',
    description: '',
    visibility: 'public',
    maxAttendees: ''
  });
  useEffect(()=>{
    window.scrollTo(0, 0);
fetchLocalEvents();
  },[]);

  const getToken = async () => {
    const user = auth.currentUser;
    return user ? await user.getIdToken() : sessionStorage.getItem('token');
  };

  // Fetch local events based on location
const fetchLocalEvents = async () => {
  try {
    setLoading(true);
    
    // Build query string conditionally
    const query = location ? `?location=${encodeURIComponent(location)}` : '';
    const res = await axios.get(`https://stargaze-x-backend-avinashshetty123s-projects.vercel.app/api/events/local${query}`);
    
    // Filter out past events, only show upcoming events
    const now = new Date();
    const upcomingEvents = (res.data.events || []).filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= now;
    });
    
    setEvents(upcomingEvents);
  } catch (err) {
    console.error('Failed to fetch local events:', err);
    setPopup({ message: 'Failed to fetch events. Please try again.', type: 'error', isVisible: true });
  } finally {
    setLoading(false);
  }
};


  // Fetch events the user has joined
  const fetchJoinedEvents = async () => {
    try {
      const token = await getToken();
      if (!token) return;
      
      const res = await axios.get('https://stargaze-x-backend-avinashshetty123s-projects.vercel.app/api/events/joined', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Filter out past events, only show upcoming events
      const now = new Date();
      const upcomingJoinedEvents = (res.data || []).filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= now;
      });
      
      setJoinedEvents(upcomingJoinedEvents);
    } catch (err) {
      console.error('Failed to fetch joined events:', err);
      setPopup({ message: 'Failed to fetch your events. Please try again.', type: 'error', isVisible: true });
    }
  };

  // Fetch event details
  const fetchEventDetails = async (eventId) => {
    try {
      const res = await axios.get(`https://stargaze-x-backend-avinashshetty123s-projects.vercel.app/api/events/${eventId}`);
      setSelectedEvent(res.data);
    } catch (err) {
      console.error('Failed to fetch event details:', err);
      setPopup({ message: 'Failed to load event details. Please try again.', type: 'error', isVisible: true });
    }
  };

  // Create a new event
  const createEvent = async (e) => {
    e.preventDefault();
    try {
      const token = await getToken();
      if (!token) {
        navigate('/login');
        return;
      }
      
      await axios.post(
        'https://stargaze-x-backend-avinashshetty123s-projects.vercel.app/api/events/create',
        eventForm,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Reset form and refresh events
      setEventForm({
        title: '',
        date: '',
        location: '',
        telescope: '',
        description: '',
        visibility: 'public',
        maxAttendees: ''
      });
      
      setPopup({ message: 'Event created successfully!', type: 'success', isVisible: true });
      fetchJoinedEvents();
      if (location === eventForm.location) {
        fetchLocalEvents();
      }
    } catch (err) {
      console.error('Failed to create event:', err);
      setPopup({ message: 'Failed to create event. Please try again.', type: 'error', isVisible: true });
    }
  };

  // Join an event
  const joinEvent = async (eventId) => {
    try {
      // Check if event is full before attempting to join
      const eventToJoin = events.find(e => e.id === eventId) || 
                         (selectedEvent && selectedEvent.id === eventId ? selectedEvent : null);
      
      if (eventToJoin && eventToJoin.maxAttendees && eventToJoin.attendeeCount >= eventToJoin.maxAttendees) {
        setPopup({ message: 'This event is full. No more registrations are allowed.', type: 'error', isVisible: true });
        return;
      }
      
      const token = await getToken();
      if (!token) {
        navigate('/login');
        return;
      }
      
      await axios.post(
        `https://stargaze-x-backend-avinashshetty123s-projects.vercel.app/api/events/join/${eventId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setPopup({ message: 'Successfully joined the event!', type: 'success', isVisible: true });
      fetchJoinedEvents();
      if (selectedEvent && selectedEvent.id === eventId) {
        fetchEventDetails(eventId);
      }
    } catch (err) {
      console.error('Failed to join event:', err);
      // Check if error is due to event being full
      if (err.response && err.response.status === 400 && err.response.data.message?.includes('full')) {
        setPopup({ message: 'This event is full. No more registrations are allowed.', type: 'error', isVisible: true });
      } else {
        setPopup({ message: 'Failed to join event. Please try again.', type: 'error', isVisible: true });
      }
    }
  };

  // Leave an event
  const leaveEvent = async (eventId) => {
    try {
      const token = await getToken();
      if (!token) return;
      
      await axios.post(
        `https://stargaze-x-backend-avinashshetty123s-projects.vercel.app/api/events/leave/${eventId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setPopup({ message: 'You have left the event', type: 'success', isVisible: true });
      fetchJoinedEvents();
      if (selectedEvent && selectedEvent.id === eventId) {
        fetchEventDetails(eventId);
      }
    } catch (err) {
      console.error('Failed to leave event:', err);
      setPopup({ message: 'Failed to leave event. Please try again.', type: 'error', isVisible: true });
    }
  };

  // Cancel an event (creator only)
  const cancelEvent = async (eventId) => {
    try {
      const token = await getToken();
      if (!token) return;
      
      await axios.delete(
        `https://stargaze-x-backend-avinashshetty123s-projects.vercel.app/api/events/${eventId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setPopup({ message: 'Event has been cancelled', type: 'success', isVisible: true });
      fetchJoinedEvents();
      setSelectedEvent(null);
    } catch (err) {
      console.error('Failed to cancel event:', err);
      setPopup({ message: 'Failed to cancel event. Please try again.', type: 'error', isVisible: true });
    }
  };

  // Add a comment to an event
  const addComment = async (eventId) => {
    if (!comment.trim()) {
      setPopup({ message: 'Comment cannot be empty', type: 'error', isVisible: true });
      return;
    }
    
    try {
      const token = await getToken();
      if (!token) {
        navigate('/login');
        return;
      }
      
      await axios.post(
        `https://stargaze-x-backend-avinashshetty123s-projects.vercel.app/api/events/${eventId}/comments`,
        { text: comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setComment('');
      fetchEventDetails(eventId);
    } catch (err) {
      console.error('Failed to add comment:', err);
      setPopup({ message: 'Failed to add comment. Please try again.', type: 'error', isVisible: true });
    }
  };

  // Load joined events on component mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken();
      if (token) {
        fetchJoinedEvents();
      }
    };
    
    checkAuth();
  }, []);

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  // Check if user is attending an event
  const isAttending = (event) => {
    const userId = auth.currentUser?.uid;
    return userId && event.attendees && event.attendees.includes(userId);
  };

  // Input field styling
  const inputClass = "w-full p-2 rounded bg-gray-800 text-white border border-gray-600 placeholder-gray-400";

  return (
    <div className="max-w-6xl mx-auto p-6 pt-24 text-white">
      <Popup 
        message={popup.message}
        type={popup.type}
        isVisible={popup.isVisible}
        onClose={() => setPopup({ ...popup, isVisible: false })}
      />
      <motion.h1 
        className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent font-['Orbitron']"
        style={{
          background: 'linear-gradient(to right, #39FF14, #0FE9D8, #00D7FF)',
          WebkitBackgroundClip: 'text',
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Local Celestial Events
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Create Event & Joined Events */}
        <div className="lg:col-span-1 space-y-6">
          {/* Create Event Form */}
          <motion.div 
            className="border-2 border-blue-600 bg-gray-900 p-6 rounded-xl shadow-md"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-4">🌠 Create Event</h2>
            <form onSubmit={createEvent} className="space-y-3">
              <input
                type="text"
                placeholder="Event Title"
                value={eventForm.title}
                onChange={(e) => setEventForm({...eventForm, title: e.target.value})}
                className={inputClass}
                required
              />
              <input
                type="datetime-local"
                value={eventForm.date}
                onChange={(e) => setEventForm({...eventForm, date: e.target.value})}
                className={inputClass}
                required
              />
              <input
                type="text"
                placeholder="Location"
                value={eventForm.location}
                onChange={(e) => setEventForm({...eventForm, location: e.target.value})}
                className={inputClass}
                required
              />
              <input
                type="text"
                placeholder="Telescope (optional)"
                value={eventForm.telescope}
                onChange={(e) => setEventForm({...eventForm, telescope: e.target.value})}
                className={inputClass}
              />
              <textarea
                placeholder="Description"
                value={eventForm.description}
                onChange={(e) => setEventForm({...eventForm, description: e.target.value})}
                className={`${inputClass} min-h-[100px]`}
                required
              />
              <div className="flex gap-3">
                <select
                  value={eventForm.visibility}
                  onChange={(e) => setEventForm({...eventForm, visibility: e.target.value})}
                  className={inputClass}
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
                <input
                  type="number"
                  placeholder="Max Attendees (optional)"
                  value={eventForm.maxAttendees}
                  onChange={(e) => setEventForm({...eventForm, maxAttendees: e.target.value})}
                  className={inputClass}
                  min="1"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white w-full"
              >
                Create Event
              </button>
            </form>
          </motion.div>

          {/* Joined Events */}
          <motion.div 
            className="border-2 border-blue-600 bg-gray-900 p-6 rounded-xl shadow-md"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-4">🔭 My Upcoming Events</h2>
            {joinedEvents.length === 0 ? (
              <p className="text-gray-400">You haven't joined any upcoming events.</p>
            ) : (
              <ul className="space-y-2">
                {joinedEvents.map(event => (
                  <li 
                    key={event.id} 
                    className="bg-gray-800 p-3 rounded cursor-pointer hover:bg-gray-700"
                    onClick={() => fetchEventDetails(event.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{event.title}</h3>
                        <p className="text-sm text-gray-400">{formatDate(event.date)}</p>
                        <p className="text-sm">{event.location}</p>
                      </div>
                      {event.isCreator && (
                        <span className="bg-purple-900 text-xs px-2 py-1 rounded">Creator</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        </div>

        {/* Middle Column - Find Local Events */}
        <motion.div 
          className="border-2 border-blue-600 lg:col-span-1 bg-gray-900 p-6 rounded-xl shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-4">🌍 Find Upcoming Events</h2>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={`${inputClass} flex-grow`}
            />
            <button
              onClick={fetchLocalEvents}
              className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-white"
            >
              Search
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 b   border-purple-500"></div>
            </div>
          ) : events.length > 0 ? (
            <ul className="space-y-2 max-h-[500px] overflow-y-auto">
              {events.map(event => (
                <li 
                  key={event.id} 
                  className="bg-gray-800 p-3 rounded cursor-pointer hover:bg-gray-700"
                  onClick={() => fetchEventDetails(event.id)}
                >
                  <h3 className="font-medium">{event.title}</h3>
                  <p className="text-sm text-gray-400">{formatDate(event.date)}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs bg-gray-700 px-2 py-1 rounded">
                      {event.attendeeCount} {event.attendeeCount === 1 ? 'attendee' : 'attendees'}
                      {event.maxAttendees && (
                        <span> / {event.maxAttendees} max</span>
                      )}
                    </span>
                    {event.maxAttendees && event.attendeeCount >= event.maxAttendees ? (
                      <span className="bg-red-600 text-xs px-2 py-1 rounded">
                        Full
                      </span>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          joinEvent(event.id);
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-xs px-2 py-1 rounded"
                      >
                        Join
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : location ? (
            <p className="text-gray-400">No upcoming events found in this location.</p>
          ) : (
            <p className="text-gray-400">Enter a location to find events.</p>
          )}
        </motion.div>

        {/* Right Column - Event Details */}
        <motion.div 
          className="border-2 border-blue-600 lg:col-span-1 bg-gray-900 p-6 rounded-xl shadow-md"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-4">✨ Event Details</h2>
          
          {selectedEvent ? (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">{selectedEvent.title}</h3>
              <p className="text-gray-300">{selectedEvent.description}</p>
              
              <div className="bg-gray-800 p-3 rounded">
                <p><strong>Date:</strong> {formatDate(selectedEvent.date)}</p>
                <p><strong>Location:</strong> {selectedEvent.location}</p>
                {selectedEvent.telescope && (
                  <p><strong>Telescope:</strong> {selectedEvent.telescope}</p>
                )}
                <p><strong>Visibility:</strong> {selectedEvent.visibility}</p>
                {selectedEvent.maxAttendees && (
                  <div className="flex items-center mt-1">
                    <p><strong>Capacity:</strong> {selectedEvent.attendees?.length || 0} / {selectedEvent.maxAttendees}</p>
                    {selectedEvent.attendees && selectedEvent.attendees.length >= selectedEvent.maxAttendees && (
                      <span className="ml-2 bg-red-600 text-white text-xs px-2 py-1 rounded">Full</span>
                    )}
                  </div>
                )}
              </div>
              
              {/* Weather and Celestial Objects */}
              {selectedEvent.weather && (
                <div className="bg-gray-800 p-3 rounded">
                  <h4 className="font-semibold">Weather Forecast</h4>
                  <p>{selectedEvent.weather.description}</p>
                  <p>Temperature: {selectedEvent.weather.temperature}°C</p>
                  <p>Cloud Cover: {selectedEvent.weather.cloudCover}%</p>
                </div>
              )}
              
              {selectedEvent.celestialObjects && selectedEvent.celestialObjects.length > 0 && (
                <div className="bg-gray-800 p-3 rounded">
                  <h4 className="font-semibold">Visible Celestial Objects</h4>
                  <ul className="list-disc pl-5">
                    {selectedEvent.celestialObjects.map((obj, i) => (
                      <li key={i}>{obj.name} - {obj.type}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Attendees */}
              <div className="bg-gray-800 p-3 rounded">
                <h4 className="font-semibold">Attendees ({selectedEvent.attendees?.length || 0})</h4>
                <ul className="mt-2">
                  {selectedEvent.attendees?.map(attendee => (
                    <li key={attendee.uid} className="text-sm">
                      {attendee.name}
                      {attendee.uid === selectedEvent.createdBy && (
                        <span className="ml-2 text-xs bg-purple-900 px-1 rounded">Creator</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Comments */}
              <div className="bg-gray-800 p-3 rounded">
                <h4 className="font-semibold">Comments</h4>
                {selectedEvent.comments && selectedEvent.comments.length > 0 ? (
                  <ul className="mt-2 space-y-2 max-h-[200px] overflow-y-auto">
                    {selectedEvent.comments.map(comment => (
                      <li key={comment.id} className="bg-gray-700 p-2 rounded text-sm">
                        <p>{comment.text}</p>
                        <p className="text-xs text-gray-400">{formatDate(comment.createdAt)}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-400">No comments yet.</p>
                )}
                
                <div className="mt-3 flex gap-2">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className={`${inputClass} flex-grow text-sm`}
                  />
                  <button
                    onClick={() => addComment(selectedEvent.id)}
                    className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white text-sm"
                  >
                    Post
                  </button>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-2">
                {auth.currentUser?.uid === selectedEvent.createdBy ? (
                  <button
                    onClick={() => cancelEvent(selectedEvent.id)}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white flex-1"
                  >
                    Cancel Event
                  </button>
                ) : isAttending(selectedEvent) ? (
                  <button
                    onClick={() => leaveEvent(selectedEvent.id)}
                    className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded text-white flex-1"
                  >
                    Leave Event
                  </button>
                ) : selectedEvent.maxAttendees && selectedEvent.attendees && 
                   selectedEvent.attendees.length >= selectedEvent.maxAttendees ? (
                  <div className="bg-gray-600 px-4 py-2 rounded text-white flex-1 text-center">
                    Event Full
                  </div>
                ) : (
                  <button
                    onClick={() => joinEvent(selectedEvent.id)}
                    className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white flex-1"
                  >
                    Join Event
                  </button>
                )}
              </div>
            </div>
          ) : (
            <p className="text-gray-400">Select an event to view details.</p>
          )}
        </motion.div>
      </div>
    </div>
  );
}