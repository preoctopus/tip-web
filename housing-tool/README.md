# Gentle Density Simulator • Visual Neighborhood Transformation Tool

An interactive web application designed to simulate the physical, social, and environmental outcomes of progressive zoning reforms ("gentle density"). 

This tool visualizes the 4-stage gentle density zoning progression and uses the **CUFET (Compact Urban Form Estimation Tool)** Weighted Least Squares (WLS) regression models to calculate real-time reductions in Vehicle Miles/Kilometers Traveled (VMT/VKT) and annual transport carbon emissions ($CO_2e$) based on regional city elasticity profiles.

---

## 🌟 Core Features

1. **4-Stage Progressive Zoning Simulator**:
   * **Stage 1: Exclusive Single-Family Zoning (Baseline)**: Large single-detached homes with expansive lawns and driveways. 100% car dependency, zero street activity.
   * **Stage 2: Allow ADUs (Backyard Suites)**: Backyard cottages and garden suites appear as-of-right. Multi-generational living and supplementary rental income emerge.
   * **Stage 3: Allow Multiplexes & Townhouses (Missing Middle)**: Low-rise multi-unit buildings replace older single-family homes. Dedicated green-painted active mobility lanes and wide sidewalks are introduced.
   * **Stage 4: Mixed-Use Nodes + Reduced Parking**: A corner commercial cafe with apartments above emerges. Driveways shrink, replaced by street trees and storm-water bioswales. Vibrant street life (pedestrians, outdoor dining, active cycling).
2. **Metrics Dashboard**:
   * **Housing Units**: Tracks added units on the block.
   * **Affordability Proxy**: Summarizes the housing choices, entry-level prices, and transportation savings.
   * **VMT/VKT Reduction**: Dynamically calculated using the selected city size category's density elasticity.
   * **Walkability Score**: Illustrates transit-accessibility and proximity.
   * **Aging in Place Score**: Highlights the neighborhood's ability to host and care for senior citizens.
   * **Avoided Emissions**: Computes the net tons of $CO_2e$ avoided per year using GHSL-aligned emission intensities.
3. **Zoning Glossary**:
   * An interactive definitions panel outlining terms like *Accessory Dwelling Unit (ADU)*, *Upzoning*, *Missing Middle*, *Mixed-Use*, *As-of-Right*, *TOD*, *FAR*, *Sprawl*, and *YIMBY*.
4. **"Share Your Vision" Advocate Letter Generator**:
   * Dynamically compiles simulated metrics (avoided carbon, added housing, walkability increases) into a customized letter to send to local planning boards and council representatives.

---

## 🛠️ Project Structure

* **`index.html`**: The UI layout featuring the isometric SVG visualizer, controls, dashboard, glossary, and email exporter.
* **`index.css`**: Styling system utilizing a glassmorphism theme, slate dark-mode tokens, custom range inputs, and keyframe animations for cars, bikes, and pedestrians.
* **`app.js`**: Application controller loaded with GHSL reference city data, CUFET mathematical calculation functions, interactive SVG class updates, and advocacy letter formatting.
* **`cufet_data_compact.json`**: Compact JSON dataset compiled from GHSL parameters including global models, country fixed effects, and custom city emission intensities.
* **`Dockerfile`**: Packages the app into an Nginx container configured for Cloud Run compatibility.
* **`default.conf`**: Custom Nginx server configuration (listens on port 8080 and enables gzip compression).
* **`deploy_gcp.sh`**: Automatic shell deployer targeting Google Cloud Run.

---

## 🚀 How to Run Locally

### 1. Direct Static Server (Quickest)
You can run a local static file server using Python or Node.js in the repository folder:

Using Python:
```bash
python3 -m http.server 8000
```

Using Node (if you have `http-server` installed):
```bash
npx http-server -p 8000
```
Open `http://localhost:8000` in your web browser.

---

## 🐳 Running with Docker Locally

To run the containerized application on your local machine:

1. **Build the Docker Image**:
   ```bash
   docker build -t gentle-density-simulator .
   ```

2. **Run the Container**:
   Map the container's port `8080` (configured in `default.conf`) to host port `8080`:
   ```bash
   docker run -d -p 8080:8080 --name density-sim gentle-density-simulator
   ```

3. **View the Application**:
   Navigate to `http://localhost:8080` in your browser.

4. **Stop the Container**:
   ```bash
   docker stop density-sim
   docker rm density-sim
   ```

---

## ☁️ Deploying to Google Cloud Run

We have included a script, `deploy_gcp.sh`, which automates creating an Artifact Registry repository, building the container using Google Cloud Build, and deploying to Google Cloud Run with public access.

### Prerequisites
1. Install the [Google Cloud SDK (gcloud CLI)](https://cloud.google.com/sdk/docs).
2. Authenticate with your Google account:
   ```bash
   gcloud auth login
   ```
3. Set your active billing project:
   ```bash
   gcloud config set project YOUR_PROJECT_ID
   ```

### Execution
Simply run the shell script and follow the interactive prompts:
```bash
./deploy_gcp.sh
```

#### What the deployment script does:
1. Verifies your active Google Cloud SDK project ID.
2. Enables required Cloud APIs (`run.googleapis.com`, `artifactregistry.googleapis.com`, `cloudbuild.googleapis.com`).
3. Creates a Google Artifact Registry repository named `gentle-density-repo` if it doesn't already exist.
4. Submits the code to **Google Cloud Build**, compiling the image directly in the cloud (so you don't need local Docker installed).
5. Deploys the service to **Google Cloud Run** with unauthenticated access enabled, printing the public production URL upon completion.
