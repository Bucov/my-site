export function Footer() {
    const footer = document.createElement('footer');
    footer.className = 'footer';

    footer.innerHTML = `
        <span id="time-random"></span>
        <p>Лука Бошњак 2026</p>
    `;

    const clock = footer.querySelector<HTMLSpanElement>('#time-random');

    const cities = [
        { city: 'Belgrade', zone: 'Europe/Belgrade' },
        { city: 'Tokyo', zone: 'Asia/Tokyo' },
        { city: 'London', zone: 'Europe/London' },
        { city: 'Paris', zone: 'Europe/Paris' },
        { city: 'New York', zone: 'America/New_York' },
        { city: 'Los Angeles', zone: 'America/Los_Angeles' },
        { city: 'Dubai', zone: 'Asia/Dubai' },
        { city: 'Sydney', zone: 'Australia/Sydney' },
        { city: 'Toronto', zone: 'America/Toronto' },
        { city: 'Berlin', zone: 'Europe/Berlin' },
        { city: 'Rome', zone: 'Europe/Rome' },
        { city: 'Ulaanbaatar', zone: 'Asia/Ulaanbaatar' },
        { city: 'Moscow', zone: 'Europe/Moscow' },
        { city: 'Cairo', zone: 'Africa/Cairo' },
        { city: 'Lagos', zone: 'Africa/Lagos' },
        { city: 'Johannesburg', zone: 'Africa/Johannesburg' },
        { city: 'Nairobi', zone: 'Africa/Nairobi' },
        { city: 'Casablanca', zone: 'Africa/Casablanca' },
        { city: 'Addis Ababa', zone: 'Africa/Addis_Ababa' },
        { city: 'Dakar', zone: 'Africa/Dakar' },
        { city: 'Accra', zone: 'Africa/Accra' },
        { city: 'Kinshasa', zone: 'Africa/Kinshasa' },
        { city: 'Tunis', zone: 'Africa/Tunis' },
        { city: 'Shanghai', zone: 'Asia/Shanghai' },
        { city: 'Mumbai', zone: 'Asia/Kolkata' },
        { city: 'Jakarta', zone: 'Asia/Jakarta' },
        { city: 'Seoul', zone: 'Asia/Seoul' },
        { city: 'Bangkok', zone: 'Asia/Bangkok' },
        { city: 'Singapore', zone: 'Asia/Singapore' },
        { city: 'Hong Kong', zone: 'Asia/Hong_Kong' },
        { city: 'Kuala Lumpur', zone: 'Asia/Kuala_Lumpur' },
        { city: 'Manila', zone: 'Asia/Manila' },
        { city: 'Tehran', zone: 'Asia/Tehran' },
        { city: 'Baghdad', zone: 'Asia/Baghdad' },
        { city: 'Riyadh', zone: 'Asia/Riyadh' },
        { city: 'Karachi', zone: 'Asia/Karachi' },
        { city: 'Dhaka', zone: 'Asia/Dhaka' },
        { city: 'Ho Chi Minh City', zone: 'Asia/Ho_Chi_Minh' },
        { city: 'Madrid', zone: 'Europe/Madrid' },
        { city: 'Amsterdam', zone: 'Europe/Amsterdam' },
        { city: 'Stockholm', zone: 'Europe/Stockholm' },
        { city: 'Vienna', zone: 'Europe/Vienna' },
        { city: 'Brussels', zone: 'Europe/Brussels' },
        { city: 'Zurich', zone: 'Europe/Zurich' },
        { city: 'Warsaw', zone: 'Europe/Warsaw' },
        { city: 'Prague', zone: 'Europe/Prague' },
        { city: 'Budapest', zone: 'Europe/Budapest' },
        { city: 'Mexico City', zone: 'America/Mexico_City' },
        { city: 'Chicago', zone: 'America/Chicago' },
        { city: 'Vancouver', zone: 'America/Vancouver' },
        { city: 'Miami', zone: 'America/New_York' },
        { city: 'Houston', zone: 'America/Chicago' },
        { city: 'Denver', zone: 'America/Denver' },
        { city: 'Phoenix', zone: 'America/Phoenix' },
        { city: 'Havana', zone: 'America/Havana' },
        { city: 'Panama City', zone: 'America/Panama' },
        { city: 'Sao Paulo', zone: 'America/Sao_Paulo' },
        { city: 'Buenos Aires', zone: 'America/Argentina/Buenos_Aires' },
        { city: 'Lima', zone: 'America/Lima' },
        { city: 'Bogota', zone: 'America/Bogota' },
        { city: 'Santiago', zone: 'America/Santiago' },
        { city: 'Caracas', zone: 'America/Caracas' },
        { city: 'Montevideo', zone: 'America/Montevideo' },
        { city: 'Guayaquil', zone: 'America/Guayaquil' },
        { city: 'La Paz', zone: 'America/La_Paz' },
        { city: 'Auckland', zone: 'Pacific/Auckland' },
        { city: 'Melbourne', zone: 'Australia/Melbourne' },
        { city: 'Perth', zone: 'Australia/Perth' },
        { city: 'Brisbane', zone: 'Australia/Brisbane' },
        { city: 'Suva', zone: 'Pacific/Fiji' },
        { city: 'Honolulu', zone: 'Pacific/Honolulu' },
        { city: 'Anchorage', zone: 'America/Anchorage' },
        { city: 'McMurdo Station', zone: 'Antarctica/McMurdo' },
        { city: 'Reykjavik', zone: 'Atlantic/Reykjavik' }
    ];

    const randomIndex = Math.floor(Math.random() * cities.length);
    const selectedCity = cities[randomIndex];

    function updateClock() {
        const time = new Intl.DateTimeFormat('en-GB', {
            timeZone: selectedCity.zone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        }).format(new Date());

        if (clock) {
            clock.textContent = `Time in ${selectedCity.city} [${time}]`;
        }
    }

    updateClock();
    setInterval(updateClock, 1000);


    // === Scroll‑based opacity ===
    function updateFooterOpacity() {
        // If the page isn’t scrollable, always show the footer
        if (document.body.scrollHeight <= window.innerHeight) {
            footer.style.opacity = '1';
            return;
        }

        // Distance from the bottom of the viewport to the bottom of the page
        const distanceFromBottom =
            document.body.scrollHeight - window.innerHeight - window.scrollY;

        // How far above the bottom we want the footer to start fading in
        // Adjust this value (in pixels) 
        const fadeThreshold = 250;

        // Map distance to opacity: 0 when distance >= threshold, 1 when distance = 0
        let opacity = 1 - distanceFromBottom / fadeThreshold;
        opacity = Math.max(0, Math.min(1, opacity));

        footer.style.opacity = String(opacity);
    }

    // Throttle the scroll handler for performance
    let ticking = false;
    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateFooterOpacity();
                ticking = false;
            });
            ticking = true;
        }
    }

    // Initial check + listen to scroll & resize
    updateFooterOpacity();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateFooterOpacity);

    return footer;
}