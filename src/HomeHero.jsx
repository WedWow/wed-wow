import heroImage from '../Asset/wedwow-hero.webp';
import './HomeHero.css';

export default function HomeHero() {
  return (
    <section className="home-hero" id="home" aria-labelledby="home-hero-title">
      <div className="home-hero__media" aria-hidden="true">
        <img
          src={heroImage}
          alt=""
          width="1672"
          height="941"
          fetchPriority="high"
          loading="eager"
          decoding="async"
        />
      </div>

      <div className="home-hero__content">
        <h1 className="home-hero__title" id="home-hero-title">
          <span>Unforgettable</span>{' '}
          <span>Moments</span>{' '}
          <span className="home-hero__accent">Brighter Together</span>
        </h1>
        <p className="home-hero__description">
          Interactive lighting experiences that transform weddings, celebrations
          and events into unforgettable shared moments.
        </p>
        <div className="home-hero__actions">
          <a className="home-hero__quote" href="#enquiry">
            Get a Quote <span aria-hidden="true">→</span>
          </a>
          {/* Enable with a real video destination when the event film is ready. */}
          <button
            className="home-hero__video"
            type="button"
            disabled
            aria-describedby="home-hero-video-status"
          >
            <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor" aria-hidden="true">
              <path d="M1 1.5v11L10.5 7 1 1.5Z" />
            </svg>
            Watch Video
          </button>
        </div>
        <p className="home-hero__video-status" id="home-hero-video-status">
          Video coming soon
        </p>
      </div>
    </section>
  );
}
