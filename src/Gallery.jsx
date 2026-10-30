import { useEffect, useRef, useState } from 'react';
import galleryManifest from '../public/gallery/gallery_manifest.json';
import './Gallery.css';

const clips = [...galleryManifest].sort((a, b) => a.order - b.order);
const mediaUrl = (path) => `/gallery/${path}`;

function PlayIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 11 7-11 7Z" fill="currentColor" /></svg>;
}

function ArrowIcon({ previous = false }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d={previous ? 'm14 6-6 6 6 6' : 'm10 6 6 6-6 6'} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function GalleryPlayer({ initialIndex, onClose }) {
  const [index, setIndex] = useState(initialIndex);
  const [muted, setMuted] = useState(false);
  const [failed, setFailed] = useState(false);
  const dialogRef = useRef(null);
  const videoRef = useRef(null);
  const touchRef = useRef(null);
  const clip = clips[index];

  useEffect(() => {
    const dialog = dialogRef.current;
    const returnFocus = document.activeElement;
    const scrollY = window.scrollY;
    const body = document.body;
    const originalStyle = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      overflow: body.style.overflow,
    };
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.width = '100%';
    body.style.overflow = 'hidden';
    dialog.showModal();
    return () => {
      dialog.close();
      Object.assign(body.style, originalStyle);
      window.scrollTo({ top: scrollY, behavior: 'instant' });
      returnFocus?.focus({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    // Native controls remain available if a browser requires another tap for sound.
    video.play().catch(() => {});
    return () => {
      video.pause();
      if (!video.isConnected) {
        video.removeAttribute('src');
        video.load();
      }
    };
  }, [index]);

  const navigate = (direction) => {
    videoRef.current?.pause();
    setFailed(false);
    setIndex((current) => (current + direction + clips.length) % clips.length);
  };

  const close = () => {
    videoRef.current?.pause();
    onClose();
  };

  const onTouchStart = (event) => {
    const touch = event.touches[0];
    const bounds = event.currentTarget.getBoundingClientRect();
    // Leave native playback/scrubbing controls free of swipe navigation.
    touchRef.current = event.touches.length === 1 && touch.clientY < bounds.bottom - 70
      ? { x: touch.clientX, y: touch.clientY }
      : null;
  };

  const onTouchEnd = (event) => {
    const start = touchRef.current;
    touchRef.current = null;
    if (!start || !event.changedTouches[0]) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.4) navigate(dx < 0 ? 1 : -1);
  };

  return (
    <dialog
      ref={dialogRef}
      className="wedwow-gallery-dialog"
      aria-labelledby="gallery-player-title"
      aria-describedby="gallery-player-description"
      onCancel={(event) => { event.preventDefault(); close(); }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) close();
      }}
      onKeyDown={(event) => {
        if (event.target.tagName === 'VIDEO' || event.altKey || event.ctrlKey || event.metaKey) return;
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault();
          navigate(event.key === 'ArrowLeft' ? -1 : 1);
        }
      }}
    >
      <div className="wedwow-gallery-player-header">
        <p id="gallery-player-title">{clip.title}</p>
        <button type="button" className="wedwow-gallery-icon-button" aria-label="Close video" onClick={close} autoFocus>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
        </button>
      </div>
      <div className="wedwow-gallery-player-stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} onTouchCancel={() => { touchRef.current = null; }}>
        <video
          key={clip.video}
          ref={videoRef}
          src={mediaUrl(clip.video)}
          poster={mediaUrl(clip.poster)}
          aria-label={clip.title}
          controls
          playsInline
          autoPlay
          preload="metadata"
          muted={muted}
          onVolumeChange={(event) => setMuted(event.currentTarget.muted)}
          onError={() => setFailed(true)}
        >
          Your browser does not support this video.
        </video>
        {failed && <div className="wedwow-gallery-player-error" role="alert">
          <p>This video could not load. Please try again.</p>
          <button type="button" onClick={() => {
            setFailed(false);
            videoRef.current.load();
            videoRef.current.play().catch(() => {});
          }}>Retry video</button>
        </div>}
      </div>
      <div className="wedwow-gallery-player-controls">
        <button type="button" className="wedwow-gallery-icon-button" aria-label="Previous video" onClick={() => navigate(-1)}><ArrowIcon previous /></button>
        <p className="wedwow-gallery-player-count" aria-live="polite" aria-atomic="true">{index + 1} / {clips.length}</p>
        <button type="button" className="wedwow-gallery-sound" aria-label={muted ? 'Turn sound on' : 'Mute video'} aria-pressed={!muted} onClick={() => setMuted((current) => !current)}>
          Sound {muted ? 'off' : 'on'}
        </button>
        <button type="button" className="wedwow-gallery-icon-button" aria-label="Next video" onClick={() => navigate(1)}><ArrowIcon /></button>
      </div>
      <p id="gallery-player-description" className="wedwow-gallery-player-description">{clip.description}{clip.ai_generated === true ? ' · AI visual concept' : ''}</p>
      <p className="wedwow-gallery-swipe-hint">Swipe left or right to explore</p>
    </dialog>
  );
}

export default function Gallery() {
  const [expanded, setExpanded] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  return (
    <main className="page-wrap wedwow-gallery-page">
      <section className="wedwow-gallery-section" aria-labelledby="gallery-heading">
        <header className="wedwow-gallery-intro">
          <p className="section-label">THE WEDWOW EXPERIENCE</p>
          <h1 id="gallery-heading">See the possibilities.</h1>
          <p className="wedwow-gallery-description">Explore how personalised LED wristbands can bring colour, energy and connection to weddings, parties and celebrations.</p>
          <p className="wedwow-gallery-disclosure">This collection includes event footage and AI-generated visual concepts. AI-generated scenes are for illustrative purposes.</p>
        </header>

        <ul id="wedwow-video-grid" className={`wedwow-gallery-grid${expanded ? ' is-expanded' : ''}`} aria-label="WedWow videos">
          {clips.map((clip, index) => (
            <li key={clip.video} className="wedwow-gallery-item">
              <button type="button" className="wedwow-gallery-card" aria-label={`Play ${clip.title}`} aria-haspopup="dialog" onClick={() => setSelectedIndex(index)}>
                <span className="wedwow-gallery-thumbnail">
                  <img src={mediaUrl(clip.poster)} width="540" height="960" alt={clip.description} loading="lazy" decoding="async" />
                  <span className="wedwow-gallery-play"><PlayIcon /></span>
                  {clip.ai_generated === true && <span className="wedwow-gallery-ai-label">AI visual concept</span>}
                </span>
                <span className="wedwow-gallery-caption">{clip.title}</span>
              </button>
            </li>
          ))}
        </ul>

        <button type="button" className="btn-outline wedwow-gallery-view-all" aria-expanded={expanded} aria-controls="wedwow-video-grid" onClick={() => setExpanded((current) => !current)}>{expanded ? 'Show Fewer Videos' : 'View All Videos'} {!expanded && <span aria-hidden="true">(10)</span>}</button>

        <div className="wedwow-gallery-cta">
          <a href="/enquiry" className="btn-primary">Get a Quote</a>
        </div>
      </section>
      {selectedIndex !== null && <GalleryPlayer initialIndex={selectedIndex} onClose={() => setSelectedIndex(null)} />}
    </main>
  );
}
