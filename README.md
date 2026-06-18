# Thriving In Place Website Project

A semantic, responsive, and accessible web presence for the **Thriving In Place** initiative. This project serves as a digital repository for information regarding zoning reform, urban sustainability, and community-led advocacy. It integrates two powerful interactive spatial policy tools alongside detailed regional case studies.

## 🎯 Project Overview

This website transforms research findings from the "Thriving In Place" guide into an easily digestible, web-based format. The content is designed to be accessible, targeting a high school graduate reading level, with a focus on visual storytelling through modern CSS. 

Additionally, it embeds the **Compact Urban Form Estimation Tool (CUFET)** and the **Gentle Density Simulator** directly as nested web applications, served in a unified Docker container and routed using Nginx.

## 🚀 Key Features

- **Single-Page Overview**: A comprehensive summary of core principles (Upzoning, Walkability, Equity) at `index.html`.
- **Detailed Case Studies**: Deep dives into specific urban success stories in `minneapolis.html` and `toronto.html`, complete with custom back-to-overview action buttons.
- **Interactive Policy Tools**:
  - **🏙️ GHG Estimation Tool (CUFET)**: Interactive calculator running regression models based on country fixed-effects and size bands to predict Vehicle Kilometers Traveled (VKT) and road transport greenhouse gas emission mitigations from compact urban forms.
  - **🏡 Gentle Density Simulator**: Visual neighborhood transformation simulator driven by CUFET elasticity values showing the environmental, social, and aesthetic impact of step-by-step upzoning.
- **AI-Generated Imagery**: Contextual illustrations and photos in `assets/` detailing walkable neighborhoods, multiplexes, backyard accessory dwelling units (ADUs), laneway suites, and citizen advocacy.
- **Unified Nginx Routing & Dockerization**: A containerized architecture that bundles the static website and the two web applications under a single reverse proxy.

## 🛠️ Tech Stack & Architecture

- **Frontend Core**: Semantic HTML5, Vanilla CSS3 (Custom properties/Grid/Flexbox), and Vanilla JavaScript.
- **Libraries**: Chart.js for data visualization in the GHG tool.
- **Nginx**: Configured as a reverse proxy and static file server running on port `8080`.
- **Docker**: Single container wrapping Nginx and the code bases for easy deployment.

---

## 📂 Repository Structure

```text
├── index.html              # Main landing page & project summary
├── minneapolis.html        # Detailed case study: Minneapolis 2040 Plan
├── toronto.html            # Detailed case study: Toronto EHON initiative
├── Dockerfile              # Container configuration (ports, config copy)
├── nginx.conf              # Nginx server configuration and reverse proxy mapping
├── assets/                 # All visual assets (illustrations and AI-generated images)
│   ├── walkable_neighborhood.png
│   ├── missing_middle.png
│   ├── adu_backyard.png
│   ├── minneapolis_skyline.jpg
│   ├── gentle_density_housing.jpg
│   ├── transit_oriented_development.jpg
│   ├── toronto_skyline.jpg
│   ├── laneway_garden_suite.jpg
│   └── community_advocacy.jpg
├── ghg-tool/               # GHG Estimation Tool (CUFET) Webapp
│   ├── index.html          # Webapp main HTML
│   ├── index.css           # Webapp styles
│   ├── app.js              # Webapp calculation & charting logic
│   └── cufet_data_compact.json  # Regression elasticity lookup database
├── housing-tool/           # Gentle Density Simulator Webapp
│   ├── index.html          # Webapp main HTML
│   ├── index.css           # Webapp styles
│   ├── app.js              # Webapp calculation & styling logic
│   └── cufet_data_compact.json  # Localized lookup database
├── SUMMARY.md              # Raw source material for content generation
├── Thriving_In_Place...     # Original research PDF (reference only)
├── AGENTS.md               # Documentation for AI agent integration
└── README.md               # Project documentation
```

---

## 💻 Running the Project Locally

To launch the entire platform (overview pages + tools) in a localized environment, follow these steps:

1. **Prerequisite**: Ensure you have Docker installed.
2. **Build the Docker Image**:
   ```bash
   docker build -t thriving-in-place-web .
   ```
3. **Run the Container**:
   ```bash
   docker run -d -p 8080:8080 --name thriving-web thriving-in-place-web
   ```
4. **Access the Site**: Open `http://localhost:8080` in your web browser. 

*Note: If you make changes to the code or static assets, rebuild the image using `--no-cache` to ensure the updates are copied into the container:*
```bash
docker build --no-cache -t thriving-in-place-web .
```

---

## 🤖 Agent Instructions

This repository is designed to be operated within an **AI Coding Agent Harness**.

- **Precise Replacements**: Use code-modification tools rather than full file overrides to modify contents.
- **Cache-Busting**: When updating stylesheet or script assets for `ghg-tool` or `housing-tool`, make sure to update version parameter tags (e.g., `index.css?v=2`) in their respective `index.html` files to bypass aggressive browser caching.
- **Consistency**: Brand new pages or sub-components must adopt established CSS variables inside the stylesheets.
