type Track = {
    track: string;
    artist: string;
    live: boolean;
};

export function NowPlaying(): HTMLSpanElement {
    const wrapper = document.createElement("span");
    wrapper.className = "now-playing";

    const container = document.createElement("span");
    container.className = "np-container";

    const inner = document.createElement("span");
    inner.className = "np-text";

    container.appendChild(inner);
    wrapper.appendChild(container);

    async function fetchNowPlaying(skipCache = false) {
        try {
            const cacheKey = "lastfm_now_playing";
            const cacheTimeKey = "lastfm_now_playing_ts";

            // 🔹 CACHE
            if (!skipCache) {
                const cached = sessionStorage.getItem(cacheKey);
                const cachedTs = sessionStorage.getItem(cacheTimeKey);

                if (cached && cachedTs && Date.now() - Number(cachedTs) < 30000) {
                    updateUI(JSON.parse(cached));
                    return;
                }
            }

            // 🔹 FETCH
            const res = await fetch(
                `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=bucovListens&api_key=0e72a231020a1a5bec443a48adf0623f&format=json&limit=1`
            );

            const data = await res.json();
            const track = data?.recenttracks?.track?.[0];

            if (track) {
                const live = track["@attr"]?.nowplaying === "true";

                const np: Track = {
                    track: track.name,
                    artist: track.artist["#text"],
                    live,
                };

                // 🔹 UPDATE
                updateUI(np);

                // 🔹 SAVE CACHE
                sessionStorage.setItem(cacheKey, JSON.stringify(np));
                sessionStorage.setItem(cacheTimeKey, String(Date.now()));
            } else {
                updateUI(null);
            }
        } catch {
            updateUI(null);
        }
    }

    function updateUI(track: Track | null) {
        if (!track) {
            inner.textContent = "No music";
            return;
        }

        const text = track.live
            ? `[now playing] ${track.track} [by] ${track.artist}`
            : `[last played] ${track.track} [by] ${track.artist}`;

        inner.textContent = text;

        //  marquee logic
        requestAnimationFrame(() => {
            const needsMarquee = inner.scrollWidth > container.clientWidth;

            if (needsMarquee) {
                // Snimi originalni tekst pre duplikacije
                const separator = '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0';
                const single = text + separator;
                inner.textContent = single + single; // tačno duplo

                // Postavi duration na osnovu dužine teksta
                const duration = single.length * 0.18; // ~0.18s po karakteru
                inner.style.setProperty('--marquee-duration', `${duration}s`);
                inner.classList.add('marquee');
            } else {
                inner.classList.remove('marquee');
            }
        });
    }

    // 🔹 INIT
    fetchNowPlaying();

    // 🔹 AUTO REFRESH
    setInterval(() => fetchNowPlaying(true), 30000);

    return wrapper;
}