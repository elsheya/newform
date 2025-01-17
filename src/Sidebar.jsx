import React from 'react';
    import {
      FilePlus,
      Users,
      LayoutDashboard,
      Lock,
      Menu,
    } from 'lucide-react';

    const Sidebar = ({ activeView, setActiveView, isAdmin, setIsAdmin, handleLogout, isSidebarOpen, toggleSidebar }) => {
      return (
        <aside
          className={`bg-secondary-dark p-4 transition-all duration-300 flex flex-col ${
            isSidebarOpen ? 'w-64' : 'w-16'
          }`}
        >
          <nav className="flex flex-col">
          <button onClick={toggleSidebar} className="text-white focus:outline-none mb-4 flex justify-center items-center">
              <Menu size={28}  className={`${isSidebarOpen ? 'mr-2' : ''}`}/>
              {isSidebarOpen && 'Menu'}
            </button>
            <button
              onClick={() => {
                setActiveView('form');
              }}
              className={`flex items-center py-2 px-4 hover:bg-gray-700 rounded ${
                activeView === 'form' ? 'bg-gray-700' : ''
              } ${isSidebarOpen ? 'justify-start' : 'justify-center'}`}
            >
              <FilePlus className={`${isSidebarOpen ? 'mr-2' : ''}`} size={24} />
              {isSidebarOpen && 'Form'}
            </button>
            <button
              onClick={() => setActiveView('userDashboard')}
              className={`flex items-center py-2 px-4 hover:bg-gray-700 rounded ${
                activeView === 'userDashboard' ? 'bg-gray-700' : ''
              } ${isSidebarOpen ? 'justify-start' : 'justify-center'}`}
            >
              <Users className={`${isSidebarOpen ? 'mr-2' : ''}`} size={24} />
              {isSidebarOpen && 'User Dashboard'}
            </button>
            {isAdmin ? (
              <button
                onClick={() => setActiveView('adminDashboard')}
                className={`flex items-center py-2 px-4 hover:bg-gray-700 rounded ${
                  activeView === 'adminDashboard' ? 'bg-gray-700' : ''
                } ${isSidebarOpen ? 'justify-start' : 'justify-center'}`}
              >
                <LayoutDashboard className={`${isSidebarOpen ? 'mr-2' : ''}`} size={24} />
                {isSidebarOpen && 'Admin Dashboard'}
              </button>
            ) : (
              <button
                onClick={() => setActiveView('adminLogin')}
                className={`flex items-center py-2 px-4 hover:bg-gray-700 rounded ${
                  activeView === 'adminLogin' ? 'bg-gray-700' : ''
                } ${isSidebarOpen ? 'justify-start' : 'justify-center'}`}
              >
                <Lock className={`${isSidebarOpen ? 'mr-2' : ''}`} size={24} />
                {isSidebarOpen && 'Admin Login'}
              </button>
            )}
            {isAdmin && isSidebarOpen && (
              <button
                onClick={handleLogout}
                className="block py-2 px-4 hover:bg-gray-700 rounded"
              >
                Logout
              </button>
            )}
          </nav>
        </aside>
      );
    };

    export default Sidebar;
