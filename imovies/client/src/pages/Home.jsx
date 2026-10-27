import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { movieApi } from '../api/movieApi';
import MovieCard from '../components/MovieCard';
import {
  Search,
  Sparkles,
  Flame,
  Play,
  ArrowRight,
  ShieldCheck,
  Ticket,
  Clock,
  Star,
  Compass,
} from 'lucide-react';

const Home = () => {
  const [nowShowing, setNowShowing] = useState([]);
  const [comingSoon, setComingSoon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const navigate = useNavigate();

  const genres = ['All', 'Action', 'Sci-Fi', 'Drama', 'Adventure', 'Animation', 'Thriller'];

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const [showingRes, comingRes] = await Promise.all([
          movieApi.getMovies({ status: 'now_showing', limit: 8 }),
          movieApi.getMovies({ status: 'coming_soon', limit: 4 }),
        ]);

        if (showingRes.success) setNowShowing(showingRes.data);
        if (comingRes.success) setComingSoon(comingRes.data);
      } catch (err) {
        console.error('Error fetching home movies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/movies?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const filteredShowing =
    selectedGenre === 'All'
      ? nowShowing
      : nowShowing.filter((m) => m.genres?.includes(selectedGenre));

  // Spotlight movie for hero banner
  const spotlightMovie = nowShowing[0] || null;

  return (
    <div className="home-page pb-5">
      {/* Dynamic Wide Hero Showcase */}
      {spotlightMovie && (
        <section className="position-relative overflow-hidden mb-5">
          <div
            className="position-relative d-flex align-items-center"
            style={{
              minHeight: '78vh',
              backgroundImage: `linear-gradient(to right, #07090e 30%, rgba(7, 9, 14, 0.85) 60%, rgba(7, 9, 14, 0.45) 100%), radial-gradient(circle at 75% 25%, rgba(255, 30, 66, 0.25) 0%, transparent 60%), url(${spotlightMovie.posterUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center 25%',
            }}
          >
            <div className="container py-5 position-relative" style={{ zIndex: 2 }}>
              <div className="row align-items-center">
                <div className="col-lg-7 col-md-10">
                  {/* Floating Pill Tag */}
                  <div
                    className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-3 fw-bold small"
                    style={{
                      background: 'rgba(255, 30, 66, 0.15)',
                      border: '1px solid rgba(255, 30, 66, 0.35)',
                      color: 'var(--cinema-red)',
                    }}
                  >
                    <Flame size={14} /> SPOTLIGHT PREMIERE
                  </div>

                  <h1
                    className="display-4 fw-black text-white mb-3"
                    style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, lineHeight: 1.15 }}
                  >
                    {spotlightMovie.title}
                  </h1>

                  <p
                    className="lead text-secondary mb-4"
                    style={{ fontSize: '1.05rem', maxWidth: 600, lineHeight: 1.6 }}
                  >
                    {spotlightMovie.description}
                  </p>

                  {/* Highlights Row */}
                  <div className="d-flex flex-wrap align-items-center gap-2 mb-4">
                    <span
                      className="d-inline-flex align-items-center gap-1 px-3 py-1 rounded-pill text-warning fw-bold small"
                      style={{ background: 'rgba(255, 184, 0, 0.12)', border: '1px solid rgba(255, 184, 0, 0.3)' }}
                    >
                      <Star size={14} fill="var(--cinema-gold)" />
                      {spotlightMovie.rating.toFixed(1)} / 10
                    </span>
                    <span
                      className="d-inline-flex align-items-center gap-1 px-3 py-1 rounded-pill text-light small"
                      style={{ background: 'rgba(255, 255, 255, 0.08)' }}
                    >
                      <Clock size={13} className="text-secondary" />
                      {spotlightMovie.durationMin} mins
                    </span>
                    <span
                      className="px-3 py-1 rounded-pill text-light small"
                      style={{ background: 'rgba(255, 255, 255, 0.08)' }}
                    >
                      {spotlightMovie.language}
                    </span>
                    <span
                      className="px-3 py-1 rounded-pill text-secondary small"
                      style={{ background: 'rgba(255, 255, 255, 0.05)' }}
                    >
                      {spotlightMovie.genres?.join(', ')}
                    </span>
                  </div>

                  {/* Repositioned Hero Action Controls */}
                  <div className="d-flex flex-wrap gap-3 align-items-center">
                    <Link
                      to={`/movies/${spotlightMovie._id}`}
                      className="btn btn-cinema btn-lg px-4 py-2"
                    >
                      <Ticket size={18} />
                      <span>Book Seats Now</span>
                    </Link>
                    {spotlightMovie.trailerUrl && (
                      <a
                        href={spotlightMovie.trailerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-cinema-outline btn-lg px-4 py-2"
                      >
                        <Play size={16} fill="#ffffff" />
                        <span>Watch Trailer</span>
                      </a>
                    )}
                    <Link
                      to="/movies"
                      className="text-secondary small fw-semibold text-decoration-none d-flex align-items-center gap-1 ms-2"
                    >
                      <span>Explore all shows</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Floating Search & Quick Filter Capsule */}
      <div className="container mb-5">
        <div className="glass-panel p-3 p-md-4">
          <div className="row g-3 align-items-center">
            {/* Search Input */}
            <div className="col-lg-5">
              <form onSubmit={handleSearchSubmit} className="position-relative">
                <Search
                  size={18}
                  className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary"
                />
                <input
                  type="text"
                  className="form-control form-control-cinema ps-5"
                  placeholder="Quick search movies, cast, genres..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
            </div>

            {/* Quick Genre Selector Pills */}
            <div className="col-lg-7">
              <div className="d-flex gap-2 overflow-x-auto pb-1 align-items-center">
                {genres.map((genre) => (
                  <button
                    key={genre}
                    type="button"
                    onClick={() => setSelectedGenre(genre)}
                    className={`genre-pill ${selectedGenre === genre ? 'active' : ''}`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Now Showing Section */}
      <section className="container mb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <div className="d-flex align-items-center gap-2 text-danger fw-bold small text-uppercase mb-1">
              <Sparkles size={15} /> In Theatres Now
            </div>
            <h2 className="text-white fw-bold m-0">Now Showing</h2>
          </div>
          <Link
            to="/movies?status=now_showing"
            className="btn btn-cinema-outline btn-sm px-3 py-1"
          >
            <span>View All</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-danger" role="status"></div>
            <p className="text-secondary mt-3">Loading shows...</p>
          </div>
        ) : filteredShowing.length === 0 ? (
          <div className="glass-panel p-5 text-center text-secondary">
            No movies match this genre filter right now.
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {filteredShowing.map((movie) => (
              <div key={movie._id} className="col">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Coming Soon Section */}
      {comingSoon.length > 0 && (
        <section className="container mb-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <div className="d-flex align-items-center gap-2 text-warning fw-bold small text-uppercase mb-1">
                <Compass size={15} /> Upcoming Releases
              </div>
              <h2 className="text-white fw-bold m-0">Coming Soon</h2>
            </div>
            <Link
              to="/movies?status=coming_soon"
              className="btn btn-cinema-outline btn-sm px-3 py-1"
            >
              <span>View All</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {comingSoon.map((movie) => (
              <div key={movie._id} className="col">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Platform Features / Perks */}
      <section className="container">
        <div className="glass-panel p-4 p-md-5">
          <div className="row g-4 text-center">
            <div className="col-md-4">
              <div
                className="d-inline-flex p-3 rounded-circle mb-3"
                style={{
                  background: 'rgba(255, 30, 66, 0.15)',
                  color: 'var(--cinema-red)',
                  boxShadow: '0 0 20px rgba(255, 30, 66, 0.25)',
                }}
              >
                <Ticket size={28} />
              </div>
              <h5 className="text-white fw-bold mb-2">Atomic 5-Min Seat Hold</h5>
              <p className="text-secondary small mb-0">
                Zero race conditions. Once selected, your seats are locked exclusively to your account for 5 minutes during checkout.
              </p>
            </div>
            <div className="col-md-4">
              <div
                className="d-inline-flex p-3 rounded-circle mb-3"
                style={{
                  background: 'rgba(255, 184, 0, 0.15)',
                  color: 'var(--cinema-gold)',
                  boxShadow: '0 0 20px rgba(255, 184, 0, 0.25)',
                }}
              >
                <Sparkles size={28} />
              </div>
              <h5 className="text-white fw-bold mb-2">Instant QR Boarding Passes</h5>
              <p className="text-secondary small mb-0">
                Paperless digital e-tickets generated immediately with verified QR code scanning for contactless theater access.
              </p>
            </div>
            <div className="col-md-4">
              <div
                className="d-inline-flex p-3 rounded-circle mb-3"
                style={{
                  background: 'rgba(16, 185, 129, 0.15)',
                  color: '#10b981',
                  boxShadow: '0 0 20px rgba(16, 185, 129, 0.25)',
                }}
              >
                <ShieldCheck size={28} />
              </div>
              <h5 className="text-white fw-bold mb-2">Easy Cancellations</h5>
              <p className="text-secondary small mb-0">
                Cancel any booking up to 2 hours before showtime with one click for an immediate release and simulated refund.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
