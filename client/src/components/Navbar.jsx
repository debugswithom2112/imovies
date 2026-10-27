import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Film, Ticket, User as UserIcon, Shield, LogOut, Compass, Sparkles, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="glass-nav-container">
      <div className="container">
        <header className="glass-nav-pill d-flex align-items-center justify-content-between">
          {/* Brand Logo & Name */}
          <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none">
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #ff1e42 0%, #b8050e 100%)',
                boxShadow: '0 0 15px rgba(255, 30, 66, 0.6)',
              }}
            >
              <Film size={18} color="#ffffff" />
            </div>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.45rem',
                fontWeight: 800,
                letterSpacing: '-0.5px',
              }}
            >
              <span className="text-white">I</span>
              <span style={{ color: 'var(--cinema-red)' }}>Movies</span>
            </span>
          </Link>

          {/* Centered Navigation Pills */}
          <nav className="d-none d-md-flex align-items-center gap-1 bg-black bg-opacity-30 p-1 rounded-pill border border-white border-opacity-10">
            <Link
              to="/"
              className={`px-3 py-1 rounded-pill text-decoration-none small fw-semibold transition-all ${
                isActive('/') ? 'bg-white bg-opacity-15 text-white shadow-sm' : 'text-secondary hover-text-white'
              }`}
            >
              Home
            </Link>
            <Link
              to="/movies"
              className={`px-3 py-1 rounded-pill text-decoration-none small fw-semibold transition-all d-flex align-items-center gap-1 ${
                isActive('/movies') ? 'bg-white bg-opacity-15 text-white shadow-sm' : 'text-secondary hover-text-white'
              }`}
            >
              <Compass size={14} />
              Explore Shows
            </Link>
            {isAdmin && (
              <Link
                to="/admin"
                className={`px-3 py-1 rounded-pill text-decoration-none small fw-semibold transition-all d-flex align-items-center gap-1 ${
                  isActive('/admin') ? 'bg-warning bg-opacity-20 text-warning' : 'text-warning'
                }`}
              >
                <Shield size={14} />
                Admin
              </Link>
            )}
          </nav>

          {/* User Profile / Auth Actions */}
          <div className="d-flex align-items-center gap-2">
            {isAuthenticated ? (
              <div className="dropdown">
                <button
                  className="btn btn-cinema-outline btn-cinema-pill dropdown-toggle d-flex align-items-center gap-2 border-0 bg-white bg-opacity-10 py-1 px-3"
                  type="button"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                    style={{
                      width: 26,
                      height: 26,
                      background: 'linear-gradient(135deg, #ffb800 0%, #ff1e42 100%)',
                      fontSize: '0.75rem',
                    }}
                  >
                    {user?.name ? user.name[0].toUpperCase() : 'U'}
                  </div>
                  <span className="fw-semibold text-white small d-none d-sm-inline">{user?.name}</span>
                  {isAdmin && (
                    <span className="badge bg-danger ms-1" style={{ fontSize: '0.6rem' }}>
                      ADMIN
                    </span>
                  )}
                  <ChevronDown size={13} className="text-secondary" />
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end shadow-lg py-2 mt-2"
                  aria-labelledby="userDropdown"
                  style={{
                    backgroundColor: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 16,
                    minWidth: 210,
                  }}
                >
                  <li>
                    <Link
                      to="/my-bookings"
                      className="dropdown-item d-flex align-items-center gap-2 text-white py-2"
                      style={{ fontSize: '0.9rem' }}
                    >
                      <Ticket size={16} color="var(--cinema-red)" />
                      My Bookings
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/profile"
                      className="dropdown-item d-flex align-items-center gap-2 text-white py-2"
                      style={{ fontSize: '0.9rem' }}
                    >
                      <UserIcon size={16} color="var(--cinema-gold)" />
                      Profile Settings
                    </Link>
                  </li>
                  {isAdmin && (
                    <>
                      <li><hr className="dropdown-divider border-secondary opacity-25" /></li>
                      <li>
                        <Link
                          to="/admin"
                          className="dropdown-item d-flex align-items-center gap-2 text-warning py-2"
                          style={{ fontSize: '0.9rem' }}
                        >
                          <Shield size={16} />
                          Admin Console
                        </Link>
                      </li>
                    </>
                  )}
                  <li><hr className="dropdown-divider border-secondary opacity-25" /></li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="dropdown-item d-flex align-items-center gap-2 text-danger py-2 w-100 border-0 bg-transparent"
                      style={{ fontSize: '0.9rem' }}
                    >
                      <LogOut size={16} />
                      Log Out
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="d-flex align-items-center gap-2">
                <Link to="/login" className="btn btn-cinema-outline btn-cinema-pill py-1 px-3 small">
                  Sign In
                </Link>
                <Link to="/register" className="btn btn-cinema btn-cinema-pill py-1 px-3 small shadow-sm">
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </header>
      </div>
    </div>
  );
};

export default Navbar;
