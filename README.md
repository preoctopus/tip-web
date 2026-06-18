# Thriving In Place Website Project

A semantic, responsive, and accessible web presence for the **Thriving In Place** initiative. This project serves as a digital repository for information regarding zoning reform, urban sustainability, and community-led advocacy.

## 🎯 Project Overview

This website transforms research findings from the "Thriving In Place" guide (including case studies on Minneapolis and Toronto) into an easily digestible, web-based format. The content is designed to be accessible, targeting a high school graduate reading level, with a focus on visual storytelling through modern CSS.

## 🚀 Key Features

- **Single-Page Overview**: A comprehensive summary of core principles (Upzoning, Walkability, Equity) at `index.html`.
- **Detailed Case Studies**: Deep dives into specific urban success stories in `minneapolis.html` and `toronto.html`.
- **AI-Generated Imagery**: Contextual images including city skylines, architectural visualizations of gentle density housing, transit-oriented development, laneway suites, and community advocacy.
- **Responsive Design**: Optimized for both desktop and mobile viewing using a "Mobile-First" approach and CSS Flexbox/Grid.
- **Interactive Navigation**: Smooth-scrolling Table of Contents (TOC) and persistent navigation bars for easy site traversal.
- **Design System**: A purpose-built color palette inspired by urban greenery and sustainable infrastructure:
    - **Primary**: Forest Green (`#2d5a27`)
    - **Secondary/Accent**: Terracotta (`#e2725b`)
    - **Background**: Warm Cream (`#faf9f6`)

## 🛠️ Tech Stack

- **HTML5**: Semantic structure for SEO and accessibility.
- **CSS3**: Custom properties (variables), Grid, and Flexbox for modern layout management.
- **Google Fonts**: Utilizing 'Inter' for readability and 'Lora' for editorial elegance.
- **Automation-Ready**: Designed to be managed and updated by AI coding agents via precise text replacement.

## 📂 Repository Structure

```text
├── index.html          # Main landing page & project summary
├── minneapolis.html    # Detailed case study: Minneapolis 2040 Plan
├── toronto.html        # Detailed case study: Toronto EHON initiative
├── assets/             # All visual assets (illustrations and AI-generated images)
│   ├── walkable_neighborhood.png
│   ├── missing_middle.png
│   ├── adu_backyard.png
│   ├── minneapolis_skyline.jpg
│   ├── gentle_density_housing.jpg
│   ├── transit_oriented_development.jpg
│   ├── toronto_skyline.jpg
│   ├── laneway_garden_suite.jpg
│   └── community_advocacy.jpg
├── SUMMARY.md          # Raw source material for content generation
├── Thriving_In_Place... # Original research PDF (reference only)
├── AGENTS.md           # Documentation for AI agent integration
└── README.md           # Project documentation
```

## 🤖 Agent Instructions

This repository is specifically designed to be operated within an **AI Coding Agent Harness** (like pi). 

### Editing Guidelines
- Use **precise text replacement** (`edit` tool) rather than overwriting entire files whenever possible to maintain structural integrity.
- When updating copyright or metadata, target specific `<footer>` or `<meta>` tags.
- Ensure that any new pages created follow the established CSS variable pattern for consistent branding.
- When adding images, use the `section-image` or `hero-image` CSS classes and include descriptive `alt` text and an `image-caption` paragraph.

### Content Maintenance
- All text expansion should adhere to the "High School Graduate" reading level.
- Maintain the link integrity between the main overview and the case study pages.
