# NOVITHON HACKATHON

A premium, high-fidelity responsive landing page for the **Novithon Hackathon**—a national-level 48-hour student hackathon featuring ₹1,00,000 cash prizes, participation certificates, goodies, and career-advancing internship opportunities at tech giants like Google, Amazon, TCS, ISRO, Wipro, Infosys, and Capgemini.

## Project Structure

```
├── index.html       # Main landing page with responsive widgets and FAQ
├── style.css        # Vanilla CSS style tokens, layouts, animations & theme overrides
├── main.js          # Core JS controller (timer, modal togglers, autoplay force)
├── admin.html       # Admin Portal console to audit localStorage registrations
├── assets/          
│   ├── bg_video.mp4         # Background particle/space loop video
│   └── astronaut_hero.jpg  # Hero graphic astronaut asset
└── .gitignore       # System file rules
```

## Features

- **Ambient Video Background**: Sourced ambient space video optimized for cover stretching and overlay brightness mask for text readability.
- **Autoplay Security Bypass**: Custom force play handling to guarantee background motion works instantly on modern browser security engines.
- **Countdown Timer**: Launch clock counting down to the event kickoff.
- **Form Checkout Wizard**: Local mock step-by-step registration modal logic with verification shaking animations (currently redirected directly to Google Forms for live submissions).
- **Admin Dashboard Portal**: Auditing board accessible in footer links to manage database stats, filter entries, insert mock applications, and download CSV spreadsheets.
- **Dual-Theme Support**: Futuristic space dark mode and crisp white-station studio light mode toggles.
- **Responsive Flexbox/Grid Grid System**: Full fluid compatibility across mobile viewports, tablets, and wide screens.
