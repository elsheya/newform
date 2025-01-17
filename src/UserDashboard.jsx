import React from 'react';
    import { Circle } from 'lucide-react';

    const UserDashboard = ({
      searchQuery,
      setSearchQuery,
      ticketCounts,
      filteredForms,
      hoveredTicketIndex,
      setHoveredTicketIndex,
    }) => {
      return (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-primary-light">User Dashboard</h2>
          <input
            type="text"
            placeholder="Search by ticket or name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 text-white mb-4"
          />
          <div className="flex justify-around mb-4">
            <div className="text-center">
              <p className="text-gray-300">Open</p>
              <p className="text-green-500 font-bold">{ticketCounts.open}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-300">In Progress</p>
              <p className="text-yellow-500 font-bold">{ticketCounts.inProgress}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-300">Closed</p>
              <p className="text-red-500 font-bold">{ticketCounts.closed}</p>
            </div>
          </div>
          {filteredForms.length === 0 ? (
            <p>No matching forms found.</p>
          ) : (
            <div className="flex flex-wrap justify-center">
              {filteredForms.map((form, index) => (
                <div
                  key={index}
                  className="bg-secondary-dark shadow-md rounded p-4 m-4 w-72 hover:shadow-lg transition-shadow duration-300 relative"
                  onMouseEnter={() => setHoveredTicketIndex(index)}
                  onMouseLeave={() => setHoveredTicketIndex(null)}
                >
                  <h3 className="text-lg font-semibold mb-2 text-primary-light">
                    Ticket: {form.ticketNumber}
                  </h3>
                  <p className="text-gray-300 mb-1">
                    <strong className="font-medium">Date/Time:</strong> {form.dateTime}
                  </p>
                  <p className="text-gray-300 mb-1">
                    <strong className="font-medium">Name:</strong> {form.callerName}
                  </p>
                  <p className="text-gray-300 mb-1">
                    <strong className="font-medium">Concern:</strong> {form.areaOfConcern}
                  </p>
                  <div className={`mt-2 font-medium ${
                      form.status === 'Open' ? 'text-green-500' :
                      form.status === 'In progress' ? 'text-yellow-500' : 'text-red-500'
                    }`}>
                    Status: {form.status}
                  </div>
                  {hoveredTicketIndex === index && form.adminNote && (
                    <div className="absolute left-0 top-full mt-2 p-2 bg-gray-800 border rounded shadow-md z-10">
                      <p className="text-sm text-white">{form.adminNote}</p>
                      <p className="text-xs mt-1 italic text-gray-400">Admin: {form.adminName}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    };

    export default UserDashboard;
