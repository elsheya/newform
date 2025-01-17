import React from 'react';
    import { Edit, Trash2 } from 'lucide-react';

    const AdminDashboard = ({ submittedForms, handleEditForm, handleDeleteForm }) => {
      return (
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4 text-primary-light">Admin Dashboard</h2>
          {submittedForms.length === 0 ? (
            <p>No forms submitted yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-secondary-dark shadow-md rounded">
                <thead>
                  <tr className="bg-gray-800">
                    <th className="py-2 px-4 border-b text-gray-300">Date/Time</th>
                    <th className="py-2 px-4 border-b text-gray-300">Ticket</th>
                    <th className="py-2 px-4 border-b text-gray-300">Name</th>
                    <th className="py-2 px-4 border-b text-gray-300">Phone</th>
                    <th className="py-2 px-4 border-b text-gray-300">Email</th>
                    <th className="py-2 px-4 border-b text-gray-300">Concern</th>
                    <th className="py-2 px-4 border-b text-gray-300">Status</th>
                    <th className="py-2 px-4 border-b text-gray-300">Admin Name</th>
                    <th className="py-2 px-4 border-b text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {submittedForms.map((form, index) => (
                    <tr key={index} className="hover:bg-gray-600">
                      <td className="py-2 px-4 border-b text-gray-300">{form.dateTime}</td>
                      <td className="py-2 px-4 border-b text-gray-300">{form.ticketNumber}</td>
                      <td className="py-2 px-4 border-b text-gray-300">{form.callerName}</td>
                      <td className="py-2 px-4 border-b text-gray-300">{form.callerPhone}</td>
                      <td className="py-2 px-4 border-b text-gray-300">{form.callerEmail}</td>
                      <td className="py-2 px-4 border-b text-gray-300">{form.areaOfConcern}</td>
                      <td className="py-2 px-4 border-b text-gray-300">{form.status}</td>
                      <td className="py-2 px-4 border-b text-gray-300">{form.adminName}</td>
                      <td className="py-2 px-4 border-b">
                        <button
                          onClick={() => handleEditForm(index)}
                          className="bg-primary-light hover:bg-purple-500 text-white font-bold py-1 px-2 rounded mr-2"
                        >
                          <Edit className="inline-block mr-1" size={14} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteForm(index)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                        >
                          <Trash2 className="inline-block mr-1" size={14} />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      );
    };

    export default AdminDashboard;
