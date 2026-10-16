/* WedWow font gallery. Adds choices without changing the existing designer features. */
(function () {
  'use strict';

  const library = [
    ['signature','Signature','Signature','cursive'],
    ['gf:Great Vibes','Great Vibes','Signature','cursive'],
    ['gf:Allura','Allura','Signature','cursive'],
    ['gf:Dancing Script','Dancing Script','Signature','cursive'],
    ['gf:Alex Brush','Alex Brush','Signature','cursive'],
    ['gf:Parisienne','Parisienne','Signature','cursive'],
    ['gf:Sacramento','Sacramento','Signature','cursive'],
    ['elegant','Elegant','Elegant','serif'],
    ['classic','Classic','Elegant','serif'],
    ['gf:Cormorant Garamond','Cormorant Garamond','Elegant','serif'],
    ['gf:Playfair Display','Playfair Display','Elegant','serif'],
    ['gf:Cinzel','Cinzel','Elegant','serif'],
    ['gf:Libre Baskerville','Libre Baskerville','Elegant','serif'],
    ['gf:DM Serif Display','DM Serif Display','Elegant','serif'],
    ['modern','Modern','Modern','sans-serif'],
    ['gf:Montserrat','Montserrat','Modern','sans-serif'],
    ['gf:Poppins','Poppins','Modern','sans-serif'],
    ['gf:Raleway','Raleway','Modern','sans-serif'],
    ['gf:Quicksand','Quicksand','Modern','sans-serif'],
    ['gf:Josefin Sans','Josefin Sans','Modern','sans-serif'],
    ['bold','Bold','Bold','sans-serif'],
    ['gf:Oswald','Oswald','Bold','sans-serif'],
    ['gf:Bebas Neue','Bebas Neue','Bold','sans-serif'],
    ['gf:Anton','Anton','Bold','sans-serif'],
    ['gf:Archivo Black','Archivo Black','Bold','sans-serif'],
    ['gf:Pacifico','Pacifico','Fun','cursive'],
    ['gf:Caveat','Caveat','Fun','cursive'],
    ['gf:Satisfy','Satisfy','Fun','cursive'],
    ['gf:Cookie','Cookie','Fun','cursive'],
    ['gf:Lobster','Lobster','Fun','cursive']
  ];

  const categories = ['All', 'Signature', 'Elegant', 'Modern', 'Bold', 'Fun'];
  const overlay = document.createElement('div');
  overlay.className = 'font-gallery-overlay';
  overlay.id = 'fontGalleryModal';
  overlay.hidden = true;
  overlay.innerHTML =
    '<div class="font-gallery-dialog" role="dialog" aria-modal="true" aria-labelledby="fontGalleryTitle">' +
      '<div class="font-gallery-header">' +
        '<div><div class="font-gallery-kicker">WEDWOW FONT STUDIO</div>' +
        '<h2 id="fontGalleryTitle">Find your perfect font</h2>' +
        '<p id="fontGalleryHelp">Choose a font to see your own words on the wristband.</p></div>' +
        '<button type="button" class="font-gallery-close" aria-label="Close font gallery">×</button>' +
      '</div>' +
      '<div class="font-gallery-tools">' +
        '<input type="search" class="font-gallery-search" aria-label="Search fonts" placeholder="Search by font name or style…">' +
        '<div class="font-gallery-categories" aria-label="Font categories"></div>' +
      '</div>' +
      '<div class="font-gallery-scroll"><div class="font-gallery-grid" id="fontGalleryGrid"></div>' +
        '<div class="font-gallery-empty" id="fontGalleryEmpty" hidden>No fonts match your search.</div></div>' +
      '<div class="font-gallery-custom">' +
        '<p class="font-gallery-custom-title">Have a different font in mind?</p>' +
        '<p class="font-gallery-custom-help">Request any font by name or paste a reference link. Your live preview will use a substitute font until we prepare your actual artwork proof.</p>' +
        '<div class="font-gallery-custom-row">' +
          '<input type="text" class="font-gallery-custom-input" maxlength="120" aria-label="Specific font name or reference link" placeholder="Font name or link, e.g. My wedding invitation font">' +
          '<button type="button" class="font-gallery-request">Request this font</button>' +
        '</div>' +
        '<div class="font-gallery-custom-status" role="status" aria-live="polite"></div>' +
      '</div>' +
    '</div>';
  document.body.appendChild(overlay);

  const grid = overlay.querySelector('#fontGalleryGrid');
  const empty = overlay.querySelector('#fontGalleryEmpty');
  const search = overlay.querySelector('.font-gallery-search');
  const categoryRow = overlay.querySelector('.font-gallery-categories');
  const custom = overlay.querySelector('.font-gallery-custom-input');
  const customStatus = overlay.querySelector('.font-gallery-custom-status');
  const closeButton = overlay.querySelector('.font-gallery-close');

  let targetLine = 1;
  let category = 'All';
  let previousFocus = null;
  let previousOverflow = '';
  let fontsPromise = null;

  function selectedFontValue() {
    return targetLine === 1 ? currentFont1 : currentFont2;
  }

  function fontSample() {
    return (targetLine === 1 ? line1in.value : line2in.value).trim() ||
      (targetLine === 1 ? 'Your special moment' : 'Your date or message');
  }

  function loadFontStylesheet() {
    if (fontsPromise) return fontsPromise;
    const families = library.filter(function (entry) {
      return entry[0].startsWith('gf:');
    }).map(function (entry) {
      return entry[1];
    }).sort();
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?' +
      families.map(function (name) {
        return 'family=' + encodeURIComponent(name).replace(/%20/g, '+');
      }).join('&') + '&display=swap';
    fontsPromise = new Promise(function (resolve, reject) {
      link.onload = resolve;
      link.onerror = function () { reject(new Error('The font library could not load. Please check your connection and try again.')); };
    });
    document.head.appendChild(link);
    fontsPromise.then(function () {
      if (document.fonts) document.fonts.ready.then(function () {
        updateText();
        renderFonts();
      });
    }).catch(function (error) {
      if (!overlay.hidden) customStatus.textContent = error.message;
      fontsPromise = null;
      link.remove();
    });
    return fontsPromise;
  }

  window.wedwowEnsureFonts = async function () {
    const selected = [currentFont1, currentFont2].filter(function (value) {
      return value.startsWith('gf:');
    });
    if (!selected.length) return;
    await loadFontStylesheet();
    if (document.fonts) {
      await Promise.all(selected.map(function (value) {
        return document.fonts.load('400 32px "' + value.slice(3) + '"', fontSample());
      }));
      await document.fonts.ready;
    }
    updateText();
  };

  function renderCategories() {
    categoryRow.replaceChildren();
    categories.forEach(function (name) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = name;
      btn.className = 'font-gallery-category' + (category === name ? ' active' : '');
      btn.setAttribute('aria-pressed', category === name ? 'true' : 'false');
      btn.addEventListener('click', function () {
        category = name;
        renderCategories();
        renderFonts();
      });
      categoryRow.appendChild(btn);
    });
  }

  function renderFonts() {
    const term = search.value.trim().toLocaleLowerCase();
    const matched = library.filter(function (entry) {
      return (category === 'All' || entry[2] === category) &&
        (entry[1] + ' ' + entry[2]).toLocaleLowerCase().includes(term);
    });
    grid.replaceChildren();
    empty.hidden = matched.length > 0;
    const example = fontSample();
    matched.forEach(function (entry) {
      const [value, name, style, fallback] = entry;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'font-gallery-option' + (selectedFontValue() === value ? ' selected' : '');
      btn.setAttribute('aria-label', 'Use ' + name + ' on line ' + targetLine);
      const label = document.createElement('span');
      label.className = 'font-gallery-option-name';
      label.textContent = name + ' · ' + style;
      const preview = document.createElement('span');
      preview.className = 'font-gallery-option-sample';
      preview.textContent = example;
      if (value.startsWith('gf:')) {
        preview.style.fontFamily = '"' + name + '",' + fallback;
      } else {
        preview.classList.add(value);
      }
      btn.append(label, preview);
      btn.addEventListener('click', function () { chooseFont(value, name); });
      grid.appendChild(btn);
    });
  }

  function chooseFont(value, label) {
    const select = targetLine === 1 ? font1 : font2;
    select.querySelectorAll('option[data-gallery-font]').forEach(function (opt) { opt.remove(); });
    if (!Array.from(select.options).some(function (option) { return option.value === value; })) {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = label.length > 65 ? label.slice(0, 62) + '…' : label;
      option.dataset.galleryFont = 'true';
      select.appendChild(option);
    }
    select.value = value;
    if (targetLine === 1) currentFont1 = value;
    else currentFont2 = value;
    if (typeof clearPresetSelection === 'function') clearPresetSelection();
    updateText();
    updateQuoteSummary();
    showCustomNote(targetLine, value);
    closeGallery();
    if (value.startsWith('gf:')) {
      loadFontStylesheet().then(function () {
        if (document.fonts) return document.fonts.load('400 32px "' + value.slice(3) + '"', fontSample());
      }).then(updateText).catch(function () {
        // The export step will report missing Google Fonts if loading fails.
      });
    }
  }

  function showCustomNote(line, value) {
    const note = document.getElementById('fontRequestNote' + line);
    if (!note) return;
    note.classList.toggle('show', value.startsWith('custom:'));
    note.textContent = value.startsWith('custom:')
      ? 'Requested font: ' + value.slice(7) + '. Preview uses a substitute. We will confirm the actual font in your artwork proof.'
      : '';
  }

  function openGallery(line, opener) {
    targetLine = line;
    category = 'All';
    search.value = '';
    custom.value = '';
    customStatus.textContent = '';
    previousFocus = opener;
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    overlay.hidden = false;
    overlay.querySelector('#fontGalleryTitle').textContent = 'Choose font for line ' + line;
    renderCategories();
    renderFonts();
    search.focus();
    loadFontStylesheet().catch(function () {});
  }

  function closeGallery() {
    if (overlay.hidden) return;
    overlay.hidden = true;
    document.body.style.overflow = previousOverflow;
    if (previousFocus && typeof previousFocus.focus === 'function') previousFocus.focus();
  }

  function requestCustomFont() {
    const name = custom.value.trim().replace(/\s+/g, ' ');
    if (!name) {
      customStatus.textContent = 'Please enter a font name or reference link.';
      custom.focus();
      return;
    }
    if (name.length > 120) {
      customStatus.textContent = 'Please keep the font name or link under 120 characters.';
      custom.focus();
      return;
    }
    chooseFont('custom:' + name, 'Custom request: ' + name);
  }

  document.querySelectorAll('.font-browse-button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      openGallery(Number(btn.dataset.fontLine), btn);
    });
  });
  closeButton.addEventListener('click', closeGallery);
  overlay.addEventListener('click', function (event) {
    if (event.target === overlay) closeGallery();
  });
  overlay.querySelector('.font-gallery-request').addEventListener('click', requestCustomFont);
  custom.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      requestCustomFont();
    }
  });
  search.addEventListener('input', renderFonts);

  document.addEventListener('keydown', function (event) {
    if (overlay.hidden) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      closeGallery();
    }
    if (event.key !== 'Tab') return;
    const focusable = Array.from(overlay.querySelectorAll('button:not([disabled]),input:not([disabled])'))
      .filter(function (element) { return element.offsetParent !== null; });
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault(); last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault(); first.focus();
    }
  });

  // Switching back to a built-in dropdown selection removes stale custom warnings.
  font1.addEventListener('change', function () { showCustomNote(1, font1.value); });
  font2.addEventListener('change', function () { showCustomNote(2, font2.value); });
})();
