import React from 'react';
    import {
      User,
      Phone,
      Mail,
      MapPin,
      Shield,
      Bus,
      UserCircle,
      Wrench,
      Building,
      FileText,
    } from 'lucide-react';

    const FormComponent = ({
      formData,
      handleInputChange,
      handleSubmit,
      validatePhoneNumber,
      validateEmail,
      areaOfConcernOptions,
      statusOptions,
      editingIndex,
      adminNames,
    }) => {
      return (
        <form
          onSubmit={handleSubmit}
          className="bg-secondary-dark shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-2xl"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-primary-light">Customer Service Form</h2>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2 flex items-center">
              <User className="inline-block mr-2 text-primary-light" size={18} />
              Caller Name
            </label>
            <input
              type="text"
              name="callerName"
              placeholder="Caller Name"
              value={formData.callerName}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2 flex items-center">
              <Phone className="inline-block mr-2 text-primary-light" size={18} />
              Caller Phone
            </label>
            <input
              type="tel"
              name="callerPhone"
              placeholder="Caller Phone"
              value={formData.callerPhone}
              onChange={handleInputChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 text-white ${
                formData.callerPhone && !validatePhoneNumber(formData.callerPhone)
                  ? 'border-red-500'
                  : ''
              }`}
              required
            />
            {!validatePhoneNumber(formData.callerPhone) && formData.callerPhone && (
              <p className="text-red-500 text-xs italic">Please enter a valid 10-digit phone number.</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2 flex items-center">
              <Mail className="inline-block mr-2 text-primary-light" size={18} />
              Caller Email
            </label>
            <input
              type="email"
              name="callerEmail"
              placeholder="Caller Email"
              value={formData.callerEmail}
              onChange={handleInputChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 text-white ${
                formData.callerEmail && !validateEmail(formData.callerEmail)
                  ? 'border-red-500'
                  : ''
              }`}
              required
            />
            {!validateEmail(formData.callerEmail) && formData.callerEmail && (
              <p className="text-red-500 text-xs italic">Please enter a valid email address.</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2">
              Area of Concern
            </label>
            <div className="flex flex-wrap">
              {areaOfConcernOptions.map((option) => (
                <label
                  key={option.value}
                  className={`inline-flex items-center mr-4 mb-2 cursor-pointer ${
                    formData.areaOfConcern === option.value ? 'font-bold' : ''
                  }`}
                >
                  <input
                    type="radio"
                    name="areaOfConcern"
                    value={option.value}
                    checked={formData.areaOfConcern === option.value}
                    onChange={handleInputChange}
                    className="hidden"
                    required
                  />
                  <span className="inline-flex items-center">
                    {option.icon}
                    <span className="ml-1">{option.label}</span>
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2 flex items-center">
              <FileText className="inline-block mr-2 text-primary-light" size={18} />
              Description
            </label>
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 text-white"
              rows="4"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 text-white"
              required
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value} className={option.color}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          {editingIndex !== null && formData.status === 'Closed' && (
            <>
              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2">
                  Admin Note
                </label>
                <textarea
                  name="adminNote"
                  placeholder="Admin Note"
                  value={formData.adminNote}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 text-white"
                  rows="3"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2">
                  Admin Name
                </label>
                <select
                  name="adminName"
                  value={formData.adminName}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 text-white"
                >
                  <option value="" disabled>
                    Select Admin
                  </option>
                  {adminNames.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-primary-light hover:bg-purple-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {editingIndex !== null ? 'Update' : 'Submit'}
            </button>
          </div>
        </form>
      );
    };

    export default FormComponent;
