#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Terminal Colors
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${CYAN}===================================================${NC}"
echo -e "${CYAN}      GENTLE DENSITY SIMULATOR - GCP DEPLOYER      ${NC}"
echo -e "${CYAN}===================================================${NC}"

# Default Settings
SERVICE_NAME="gentle-density-simulator"
DEFAULT_REGION="us-central1"
REPO_NAME="gentle-density-repo"

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo -e "${RED}Error: Google Cloud SDK (gcloud) is not installed.${NC}"
    echo "Please install it from https://cloud.google.com/sdk/docs and log in."
    exit 1
fi

# Get current project
PROJECT_ID=$(gcloud config get-value project 2>/dev/null || echo "")

if [ -z "$PROJECT_ID" ] || [ "$PROJECT_ID" = "(unset)" ]; then
    echo -e "${YELLOW}Warning: No active GCP project set in gcloud config.${NC}"
    read -p "Enter your Google Cloud Project ID: " PROJECT_ID
    if [ -z "$PROJECT_ID" ]; then
        echo -e "${RED}Error: Project ID is required.${NC}"
        exit 1
    fi
    gcloud config set project "$PROJECT_ID"
else
    echo -e "${GREEN}Active GCP Project: ${PROJECT_ID}${NC}"
    read -p "Do you want to use this project? (y/n, default: y): " USE_ACTIVE
    if [ "$USE_ACTIVE" = "n" ] || [ "$USE_ACTIVE" = "N" ]; then
        read -p "Enter Google Cloud Project ID: " NEW_PROJECT_ID
        if [ -n "$NEW_PROJECT_ID" ]; then
            PROJECT_ID="$NEW_PROJECT_ID"
            gcloud config set project "$PROJECT_ID"
        fi
    fi
fi

# Prompt for Region
read -p "Enter deployment region (default: $DEFAULT_REGION): " REGION
REGION=${REGION:-$DEFAULT_REGION}

echo -e "\n${YELLOW}Step 1: Enabling required APIs (run.googleapis.com, artifactregistry.googleapis.com, cloudbuild.googleapis.com)...${NC}"
gcloud services enable \
    run.googleapis.com \
    artifactregistry.googleapis.com \
    cloudbuild.googleapis.com

echo -e "\n${YELLOW}Step 2: Checking / Creating Artifact Registry Repository...${NC}"
REPO_EXISTS=$(gcloud artifacts repositories list --filter="name:projects/$PROJECT_ID/locations/$REGION/repositories/$REPO_NAME" --format="value(name)" 2>/dev/null || echo "")

if [ -z "$REPO_EXISTS" ]; then
    echo "Creating repository '$REPO_NAME' in region '$REGION'..."
    gcloud artifacts repositories create "$REPO_NAME" \
        --repository-format=docker \
        --location="$REGION" \
        --description="Docker repository for Gentle Density Simulator"
else
    echo -e "${GREEN}Repository '$REPO_NAME' already exists.${NC}"
fi

IMAGE_TAG="$REGION-docker.pkg.dev/$PROJECT_ID/$REPO_NAME/$SERVICE_NAME:latest"

echo -e "\n${YELLOW}Step 3: Submitting builds to Google Cloud Build...${NC}"
echo -e "Image Tag: ${CYAN}$IMAGE_TAG${NC}"
echo "Building container image in the cloud (no local Docker required)..."
gcloud builds submit --tag "$IMAGE_TAG" .

echo -e "\n${YELLOW}Step 4: Deploying to Google Cloud Run...${NC}"
gcloud run deploy "$SERVICE_NAME" \
    --image "$IMAGE_TAG" \
    --platform managed \
    --region "$REGION" \
    --allow-unauthenticated \
    --port 8080

echo -e "\n${GREEN}===================================================${NC}"
echo -e "${GREEN}  SUCCESS: Gentle Density Simulator has been deployed!${NC}"
echo -e "${GREEN}===================================================${NC}"
echo -e "Service URL:"
gcloud run services describe "$SERVICE_NAME" --platform managed --region "$REGION" --format="value(status.url)"
echo -e "${GREEN}===================================================${NC}\n"
