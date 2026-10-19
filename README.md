# DB IMPEX — Official Website

> **Security & Safety Solutions for Every Environment**
> Official Redesigned Production Website for [DB IMPEX](https://dbimpex.in/), Ahmedabad, Gujarat, India.

---

## Overview

DB IMPEX is a premier provider of industrial security solutions, surveillance technologies, and life-safety engineering services established in 2018 by security experts with over 15 years of law enforcement and government contracting experience.

This repository contains the complete redesigned website built with a modern corporate white-and-blue aesthetic, high performance, full responsiveness, accessible UI, and dual `.html` / `.php` server support.

---

## Features & Highlights

- **Complete Verified Product Catalog (54 items):**
  - CCTV & Surveillance Systems (12 models)
  - Fire Detection & Alarm Systems (17 models)
  - Fire Hydrant & Suppression Hardware (8 models)
  - Access Control, Biometrics & Motorized Boom Barriers
  - ATM Banking Security Modules (Udar-T-2, Udar-STG, SH-VTG, SH-VT)
  - Homeland Defense Screening & Scanners (Dual-Energy X-Ray Baggage, NLJD, Explosive Detectors, DFMD, UVSS)
- **Comprehensive Services:**
  - ATT & ESS (Advance Technology & E-Security Solutions)
  - Annual Maintenance Contracts (AMC)
  - Certified X-Ray Baggage Radiation Leakage Reports & Calibrations
  - Central & Remote CMS Surveillance Monitoring
- **Official Branding & Design:**
  - High-resolution DB IMPEX logo and circular shield emblem favicon
  - Modern typography powered by `Inter` and `Outfit`
  - Interactive Quote Modal with automatic product pre-fill on every item
  - Live category filter pills and instant search in product directory
  - Responsive Video Gallery with authentic operational demonstrations
- **Form Handling & Lead Protection:**
  - Production PHP mailer (`send_form_email.php`)
  - Built-in honeypot anti-spam defense
  - Fail-safe local JSON lead logger (`leads_log.json`) so no customer inquiry is ever lost
  - Direct WhatsApp click-to-chat (`+91 8320383785`) and click-to-call (`+91 8320383785`)
- **Technical SEO & Quality:**
  - Schema.org structured data (`SecurityService`)
  - XML sitemap (`sitemap.xml`) and `robots.txt`
  - 100% responsive across mobile, tablet, and desktop

---

## Directory Structure

```text
├── index.html / index.php               # Homepage
├── about-us.html / about-us.php         # Company Profile & Heritage
├── services.html / services.php         # Engineering Capabilities & AMC
├── products.html / products.php         # Master Product Directory
├── cctv-camera.html / cctv-camera.php   # CCTV Category Page
├── fire-detection.html / .php           # Fire Detection Category Page
├── fire-hydrant.html / .php             # Fire Hydrant Category Page
├── access-control.html / .php           # Access Control & Barriers
├── atm-security.html / .php             # ATM Security Category Page
├── homeland-security.html / .php       # Homeland Defense Category Page
├── gallery.html / gallery.php           # Video Demonstration Gallery
├── contact-us.html / contact-us.php     # Office Locations & Contact Form
├── enquiry-now.html / enquiry-now.php   # Technical RFP / Inquiry Form
├── 404.html / 404.php                   # Custom Branded 404 Page
├── send_form_email.php                  # Form Processor & Lead Logger
├── sitemap.xml                          # Search Engine Sitemap
├── robots.txt                           # Web Crawlers Policy
├── favicon.ico                          # Multi-size Favicon
└── assets/
    ├── css/style.css                    # Production CSS Design System
    ├── js/main.js                       # Interactive JavaScript
    └── images/                          # Authentic Product & Brand Media
```

---

## Deployment Instructions

1. **Static Web Server (Nginx, Apache, Cloudflare Pages, GitHub Pages):**
   - The `.html` files work statically out-of-the-box.
2. **PHP Web Hosting (cPanel, LiteSpeed, Apache, Nginx + PHP-FPM):**
   - Both `.html` and `.php` files are included.
   - `send_form_email.php` will handle form submissions and send alerts to `sales@dbimpex.in`.

---

## Headquarters & Contact

- **Corporate Office:** 606, Shivalik Satyamev, Bopal Approach, SP Ring Road, Ahmedabad – 380058, Gujarat, India
- **Registered Office:** B-508, Baleshwar Krupa, Bopal, Ahmedabad
- **Service Center:** B/S Kabir Mobile, Bopal Main Road, Bopal, Ahmedabad
- **Phone:** +91 8320383785
- **WhatsApp:** +91 8320383785
- **Email:** sales@dbimpex.in
- **Website:** [https://dbimpex.in/](https://dbimpex.in/)
