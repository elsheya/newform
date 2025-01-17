import React from 'react';

    const AdminLogin = ({ loginPassword, setLoginPassword, handleAdminLogin, loginError }) => {
      return (
        <div className="bg-secondary-dark shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-primary-light">Admin Login</h2>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 text-white"
            />
          </div>
          {loginError && <p className="text-red-500 text-xs italic mb-4">{loginError}</p>}
          <div className="flex items-center justify-between">
            <button
              onClick={handleAdminLogin}
              className="bg-primary-light hover:bg-purple-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
          </div>
        </div>
      );
    };

    export default AdminLogin;
