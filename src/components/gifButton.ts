// gifButton.ts

export interface GifSources {
    /** Before any hover – the very first idle */
    idle: string;
    /** Shown while hovering (before click) */
    hover: string;
    /** Idle state after you've hovered at least once (and didn't click) */
    angryIdle: string;
    /** Shown after clicking – permanently locked until page reload */
    clicked: string;
}

export function initGifButton(sources: GifSources) {
    const wrapper = document.querySelector<HTMLDivElement>('.gif-button-wrapper');
    if (!wrapper) return;

    const container = wrapper.querySelector<HTMLDivElement>('.gif-container');
    if (!container) return;

    const img = container.querySelector<HTMLImageElement>('.gif-main');
    if (!img) return;

    const socials = wrapper.querySelector<HTMLDivElement>('.gif-socials');
    if (!socials) return;

    let isClicked = false;        // true after first click → lock everything
    let hasEverHovered = false;   // becomes true on first mouseenter, never resets

    // ── Hover logic (only before click) ──────────────────────
    container.addEventListener('mouseenter', () => {
        if (isClicked) return;               // lock after click – do nothing
        hasEverHovered = true;               // remember you hovered at least once
        img.src = sources.hover;
    });

    container.addEventListener('mouseleave', () => {
        if (isClicked) return;               // lock after click – do nothing

        // After the very first hover, idle becomes angry; otherwise original idle
        img.src = hasEverHovered ? sources.angryIdle : sources.idle;
    });

    // ── Click: lock, show socials, switch to clicked GIF ─────
    container.addEventListener('click', (e) => {
        e.stopPropagation();
        if (isClicked) return;               // already locked

        isClicked = true;
        container.classList.add('clicked');   // kills the glow (CSS handles it)
        img.src = sources.clicked;
        socials.classList.add('visible');
    });

    // Close socials when clicking outside (still keeps clicked state)
    document.addEventListener('click', (e) => {
        if (!wrapper.contains(e.target as Node)) {
            socials.classList.remove('visible');
        }
    });

    // Start with the default idle image
    img.src = sources.idle;
}