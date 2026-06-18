# Agents Documentation

This directory contains documentation and instructions for AI agents interacting with, maintaining, or developing this repository.

## Supported Agent Capabilities

Agents are equipped to perform the following operations within this workspace:

### 1. Content Generation & Expansion
- **Summarization & Extraction**: Parse and distill research data from source PDFs or Markdown files.
- **Tone Adjustment**: Reformat structural text to meet specific target personas (e.g., policy advocates) or reading levels (e.g., "High School Graduate").

### 2. Web Development & Deployment
- **HTML/CSS Generation**: Generate semantic, highly-accessible HTML5 and modern CSS3 incorporating the design tokens in `:root` variables.
- **Navigation & Routing**: Maintain multi-page linking integrity.
- **Nginx Reverse Proxy Management**: Update and manage `nginx.conf` routing configuration to direct traffic to nested web applications.
- **Docker Orchestration**: Rebuild and test containerized releases (`Dockerfile`) to guarantee clean deployment.

### 3. Image Generation & Asset Management
- **Contextual Visualization**: Generate and store illustrative graphics (e.g., ADUs, walkable neighborhoods, density models) in the `assets/` directory.
- **Integration**: Insert responsive image blocks with descriptive `alt` tags and stylized `image-caption` typography.

### 4. Code & Data Maintenance
- **Regression Elasticities**: Manage database profile settings (`cufet_data_compact.json`) used by calculations in the tools. Ensure schemas remain intact.
- **Cache-Busting Integration**: Whenever edits are made to stylesheets (`index.css`) or scripts (`app.js`) inside subdirectories like `/ghg-tool/` or `/housing-tool/`, increment the query-parameter version strings (e.g., `index.css?v=2` or `app.js?v=2`) in their respective HTML headers. This prevents browsers from serving stale cache copies.

---

## Technical Workflows

### 1. Cache-Busting Procedure
Whenever a stylesheet or script is modified within `/ghg-tool/` or `/housing-tool/`:
1. Open the tool's `index.html` file.
2. Locate the asset imports:
   ```html
   <link rel="stylesheet" href="index.css?v=X">
   <script src="app.js?v=Y"></script>
   ```
3. Increment the version variable `X` or `Y` (e.g., from `v=2` to `v=3`).
4. Rebuild the Docker container to verify rendering.

### 2. Docker Rebuild Pattern
Always test containerized routing locally after modifying HTML, CSS, JS, or config files:
1. Stop and remove the existing container:
   ```bash
   docker stop thriving-web && docker rm thriving-web
   ```
2. Delete the old image to save space:
   ```bash
   docker rmi thriving-in-place-web
   ```
3. Rebuild from scratch with the `--no-cache` parameter:
   ```bash
   docker build --no-cache -t thriving-in-place-web .
   ```
4. Start the container in detached mode on port `8080`:
   ```bash
   docker run -d -p 8080:8080 --name thriving-web thriving-in-place-web
   ```
5. Run a validation check (e.g. `curl -I http://localhost:8080/`) to verify status is 200 OK.
