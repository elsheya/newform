import React, { useState, useEffect } from 'react';
    import {
      Calendar,
      Hash,
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
      FilePlus,
      Users,
      LayoutDashboard,
      Lock,
    } from 'lucide-react';
    import FormComponent from './FormComponent';
    import UserDashboard from './UserDashboard';
    import AdminDashboard from './AdminDashboard';
    import AdminLogin from './AdminLogin';

    const App = () => {
      const [formData, setFormData] = useState({
        dateTime: new Date().toLocaleString(),
        ticketNumber: Math.floor(Math.random() * 1000000),
        callerName: '',
        callerPhone: '',
        callerEmail: '',
        areaOfConcern: '',
        description: '',
        status: 'Open',
        adminNote: '',
        adminName: '',
      });
      const [submittedForms, setSubmittedForms] = useState(() => {
        const storedForms = localStorage.getItem('submittedForms');
        return storedForms ? JSON.parse(storedForms) : [];
      });
      const [activeView, setActiveView] = useState('form');
      const [editingIndex, setEditingIndex] = useState(null);
      const [hoveredTicketIndex, setHoveredTicketIndex] = useState(null);
      const [isAdmin, setIsAdmin] = useState(false);
      const [loginPassword, setLoginPassword] = useState('');
      const [loginError, setLoginError] = useState('');
      const [searchQuery, setSearchQuery] = useState('');
      const [filteredForms, setFilteredForms] = useState([]);
      const [ticketCounts, setTicketCounts] = useState({
        open: 0,
        inProgress: 0,
        closed: 0,
      });

      useEffect(() => {
        localStorage.setItem('submittedForms', JSON.stringify(submittedForms));
      }, [submittedForms]);

      useEffect(() => {
        if (activeView === 'userDashboard') {
          if (searchQuery) {
            const filtered = submittedForms.filter(
              (form) =>
                form.ticketNumber.toString().includes(searchQuery) ||
                form.callerName.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredForms(filtered);
          } else {
            setFilteredForms(submittedForms);
          }
        }
      }, [searchQuery, submittedForms, activeView]);

      useEffect(() => {
        if (activeView === 'userDashboard') {
          const counts = submittedForms.reduce(
            (acc, form) => {
              if (form.status === 'Open') {
                acc.open++;
              } else if (form.status === 'In progress') {
                acc.inProgress++;
              } else if (form.status === 'Closed') {
                acc.closed++;
              }
              return acc;
            },
            { open: 0, inProgress: 0, closed: 0 }
          );
          setTicketCounts(counts);
        }
      }, [submittedForms, activeView]);

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        if (editingIndex !== null) {
          const updatedForms = [...submittedForms];
          updatedForms[editingIndex] = formData;
          setSubmittedForms(updatedForms);
          setEditingIndex(null);
        } else {
          setSubmittedForms([...submittedForms, formData]);
        }
        setFormData({
          dateTime: new Date().toLocaleString(),
          ticketNumber: Math.floor(Math.random() * 1000000),
          callerName: '',
          callerPhone: '',
          callerEmail: '',
          areaOfConcern: '',
          description: '',
          status: 'Open',
          adminNote: '',
          adminName: '',
        });
      };

      const validatePhoneNumber = (number) => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(number);
      };

      const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };

      const areaOfConcernOptions = [
        { value: 'Routing', label: 'Routing', icon: <MapPin className="text-blue-500" /> },
        { value: 'Safety', label: 'Safety', icon: <Shield className="text-red-500" /> },
        { value: 'Bus stop', label: 'Bus stop', icon: <Bus className="text-green-500" /> },
        { value: 'Bus driver', label: 'Bus driver', icon: <UserCircle className="text-yellow-500" /> },
        { value: 'Technical support', label: 'Technical support', icon: <Wrench className="text-purple-500" /> },
        { value: 'Administration', label: 'Administration', icon: <Building className="text-indigo-500" /> },
      ];

      const statusOptions = [
        { value: 'Open', label: 'Open', color: 'text-green-500' },
        { value: 'In progress', label: 'In progress', color: 'text-yellow-500' },
        { value: 'Closed', label: 'Closed', color: 'text-red-500' },
      ];

      const adminNames = ['Yasser Elsheikh', 'William Smith'];

      const handleEditForm = (index) => {
        if (submittedForms[index].status === 'Closed') {
          return;
        }
        setFormData(submittedForms[index]);
        setActiveView('form');
        setEditingIndex(index);
      };

      const handleDeleteForm = (index) => {
        const updatedForms = submittedForms.filter((_, i) => i !== index);
        setSubmittedForms(updatedForms);
      };

      const handleAdminLogin = () => {
        if (loginPassword === 'admin123') {
          setIsAdmin(true);
          setActiveView('adminDashboard');
          setLoginError('');
        } else {
          setLoginError('Invalid password');
        }
      };

      const handleLogout = () => {
        setIsAdmin(false);
        setActiveView('form');
      };

      return (
        <div className="flex flex-col min-h-screen bg-gradient-radial text-white">
          <header className="bg-secondary-dark p-4 flex justify-between items-center">
            <div className="flex items-center">
              <span className="mr-4 sm:hidden">
                <Calendar className="inline-block mr-1 text-primary-light" size={18} />
                {new Date().toLocaleDateString()}
              </span>
              <span className="sm:hidden">
                <Hash className="inline-block mr-1 text-primary-light" size={18} />
                {formData.ticketNumber}
              </span>
            </div>
            <nav className="flex space-x-4">
              <button
                onClick={() => setActiveView('form')}
                className={`flex items-center py-2 px-4 hover:bg-gray-700 rounded ${
                  activeView === 'form' ? 'bg-gray-700' : ''
                }`}
              >
                <FilePlus className="mr-2" size={18} />
                <span className="ml-1 hidden sm:inline">Form</span>
              </button>
              <button
                onClick={() => setActiveView('userDashboard')}
                className={`flex items-center py-2 px-4 hover:bg-gray-700 rounded ${
                  activeView === 'userDashboard' ? 'bg-gray-700' : ''
                }`}
              >
                <Users className="mr-2" size={18} />
                <span className="ml-1 hidden sm:inline">User Dashboard</span>
              </button>
              {isAdmin ? (
                <button
                  onClick={() => setActiveView('adminDashboard')}
                  className={`flex items-center py-2 px-4 hover:bg-gray-700 rounded ${
                    activeView === 'adminDashboard' ? 'bg-gray-700' : ''
                  }`}
                >
                  <LayoutDashboard className="mr-2" size={18} />
                  <span className="ml-1 hidden sm:inline">Admin Dashboard</span>
                </button>
              ) : (
                <button
                  onClick={() => setActiveView('adminLogin')}
                  className={`flex items-center py-2 px-4 hover:bg-gray-700 rounded ${
                    activeView === 'adminLogin' ? 'bg-gray-700' : ''
                  }`}
                >
                  <Lock className="mr-2" size={18} />
                  <span className="ml-1 hidden sm:inline">Admin Login</span>
                </button>
              )}
              {isAdmin && (
                <button
                  onClick={handleLogout}
                  className="flex items-center py-2 px-4 hover:bg-gray-700 rounded"
                >
                  <span className="ml-1 hidden sm:inline">Logout</span>
                </button>
              )}
            </nav>
          </header>
          <div className="flex-1 p-8 flex justify-center items-start">
            {activeView === 'form' && (
              <FormComponent
                formData={formData}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                validatePhoneNumber={validatePhoneNumber}
                validateEmail={validateEmail}
                areaOfConcernOptions={areaOfConcernOptions}
                statusOptions={statusOptions}
                editingIndex={editingIndex}
                adminNames={adminNames}
              />
            )}
            {activeView === 'userDashboard' && (
              <UserDashboard
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                ticketCounts={ticketCounts}
                filteredForms={filteredForms}
                hoveredTicketIndex={hoveredTicketIndex}
                setHoveredTicketIndex={setHoveredTicketIndex}
              />
            )}
            {activeView === 'adminDashboard' && isAdmin && (
              <AdminDashboard
                submittedForms={submittedForms}
                handleEditForm={handleEditForm}
                handleDeleteForm={handleDeleteForm}
              />
            )}
            {activeView === 'adminLogin' && !isAdmin && (
              <AdminLogin
                loginPassword={loginPassword}
                setLoginPassword={setLoginPassword}
                handleAdminLogin={handleAdminLogin}
                loginError={loginError}
              />
            )}
          </div>
        </div>
      );
    };

    export default App;
