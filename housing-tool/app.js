// Reference Cities with GHSL-aligned profiles (population, area in km2, baseline EV share)
const referenceCities = {
    "New York": { country: "United States", pop: 19426000, area: 11280, ev: 2 },
    "Tokyo": { country: "Japan", pop: 37400000, area: 8547, ev: 1 },
    "Osaka": { country: "Japan", pop: 19000000, area: 3200, ev: 1 },
    "Hamamatsu": { country: "Japan", pop: 790000, area: 650, ev: 1 },
    "Tosu": { country: "Japan", pop: 74000, area: 72, ev: 1 },
    "Sydney": { country: "Australia", pop: 5100000, area: 2037, ev: 2 },
    "Melbourne": { country: "Australia", pop: 4900000, area: 2453, ev: 2 },
    "Toronto": { country: "Canada", pop: 6200000, area: 2300, ev: 2 },
    "Vancouver": { country: "Canada", pop: 2600000, area: 1150, ev: 2 },
    "London": { country: "United Kingdom", pop: 9000000, area: 1600, ev: 3 },
    "Paris": { country: "France", pop: 11000000, area: 2845, ev: 2 },
    "Amsterdam": { country: "Netherlands", pop: 1100000, area: 320, ev: 5 },
    "Dhaka": { country: "Bangladesh", pop: 22400000, area: 450, ev: 0 },
    "Rosarito": { country: "México", pop: 126000, area: 55, ev: 0 },
    "Los Angeles": { country: "United States", pop: 12500000, area: 6850, ev: 3 }
};

// Glossary data (from PDF guide pages 26-27)
const glossary = {
    "adu": {
        title: "Accessory Dwelling Unit (ADU)",
        text: "A smaller, independent living space located on the same lot as a larger, primary residence. ADUs can be detached structures (like garden suites/backyard cottages), converted spaces within the main house (like basements), or attached to the main home. They offer additional living space, rental income potential, and can help with housing affordability."
    },
    "upzoning": {
        title: "Upzoning",
        text: "Changing zoning laws to allow for greater development capacity in an area, often meaning more units, higher building heights, or increased floor space. Upzoning is a core policy tool to address housing shortages and enable walkable density."
    },
    "missing-middle": {
        title: "\"Missing Middle\" Housing",
        text: "A range of multi-unit housing types, like duplexes and townhouses, that fit between single-family homes and high-density apartment buildings, often in walkable neighborhoods. These housing options can provide a greater variety of affordable housing choices, foster more walkable communities, and potentially reduce the need for extensive off-street parking."
    },
    "mixed-use": {
        title: "Mixed-Use Development",
        text: "A zoning category that allows for multiple uses such as residential, commercial, or office within the same area or building. Mixed-use zoning fosters vibrant neighborhoods where shopping, dining, and housing are integrated."
    },
    "as-of-right": {
        title: "As-of-Right",
        text: "A term to describe a proposed development that complies with all applicable zoning codes, and can proceed without requiring special approvals or discretionary decisions from a zoning board. Making missing-middle housing 'as-of-right' speeds up construction and lowers housing costs."
    },
    "tod": {
        title: "Transit-Oriented Development (TOD)",
        text: "An urban planning approach that concentrates higher-density housing, businesses, and community spaces around public transit stations. It aims to create vibrant, walkable neighborhoods, reduce car dependency, and foster more efficient use of city resources."
    },
    "sprawl": {
        title: "Sprawl",
        text: "Low-density, dispersed, single-use development spreading outward from cities, often unrestricted, creating car-dependent communities with separated housing, commercial, and industrial areas, often driven by zoning favoring large lots and separating land uses instead of compact, mixed-use growth."
    },
    "setback": {
        title: "Setback",
        text: "The required distance a building or structure must be from the property lines, streets, or other structures. Relaxing setbacks allows missing middle options like townhouses to fit efficiently on suburban lots."
    },
    "far": {
        title: "Floor Area Ratio (FAR)",
        text: "The ratio of a building's total floor area to the size of its parcel of land - used to regulate density. Increasing allowable FAR enables higher density housing options."
    },
    "yimby": {
        title: "YIMBY",
        text: "An acronym for 'Yes In My Back Yard' used to describe individuals who support new housing development in their neighborhoods, often in contrast to those who oppose such development (NIMBYs - 'Not In My Back Yard')."
    }
};

// Stage narrative descriptions (aligned with PDF illustrated pages 10-11)
const stageNarrative = {
    1: "<strong>Stage 1: Exclusive Single-Family Zoning (Current Zoning)</strong><br>The neighborhood consists entirely of single-family detached homes on large lots. Zoning laws mandate wide setbacks, low floor area ratios, and off-street parking. Almost everyone drives for all errands, sidewalks are empty or non-existent, and active transit is non-existent. Sprawl is locked in, and housing costs are high, locking out younger families and seniors.",
    2: "<strong>Stage 2: Allow ADUs (Backyard Suites)</strong><br>Recent zoning reforms permit Accessory Dwelling Units (ADUs/backyard cottages) as-of-right. Some neighbors create backyard suites to generate rental income or move into them to let their adult children raise families in the main house. The neighborhood begins to welcome a wider diversity of residents, and children playing are seen more in the lanes.",
    3: "<strong>Stage 3: Allow 2–4 Plexes &amp; Townhouses (Missing Middle)</strong><br>Missing middle homes like duplexes and townhouses replace some aging detached homes. As density increases, neighbors successfully advocate for dedicated green-painted bike lanes, wider sidewalks, and traffic-calming street alterations. Active travel increases, leading to a drop in car trips.",
    4: "<strong>Stage 4: Mixed-Use Nodes &amp; Reduced Parking</strong><br>Mixed-use zoning is permitted on the corner, allowing a multi-story building with a ground-floor grocery/café and apartments above. Street parking requirements are relaxed, enabling the conversion of driveways to trees, bioswales, and rain gardens. Wide, bustling sidewalks and protected bike lanes make the neighborhood vibrant and self-sufficient."
};

// Application state
let cufetData = null;
let activeCountry = "United States";
let activeCity = "Los Angeles";
let activeStage = 1;

// DOM Elements
const countrySelect = document.getElementById("country-select");
const citySelect = document.getElementById("city-select");
const customCityGroup = document.getElementById("custom-city-group");
const cityNameInput = document.getElementById("city-name-input");

const popSlider = document.getElementById("pop-slider");
const popVal = document.getElementById("pop-val");
const areaSlider = document.getElementById("area-slider");
const areaVal = document.getElementById("area-val");
const baselineDensityText = document.getElementById("baseline-density");

const evSlider = document.getElementById("ev-slider");
const evVal = document.getElementById("ev-val");

// Climate indicators DOM
const badgeSizeCat = document.getElementById("badge-size-cat");
const badgeDensityElas = document.getElementById("badge-density-elas");
const badgeEmissionIntensity = document.getElementById("badge-emission-intensity");

// Map & Stage Control DOM
const neighborhoodSvg = document.getElementById("neighborhood-svg");
const currentStageTitle = document.getElementById("current-stage-title");
const stageDescShort = document.getElementById("stage-desc-short");
const stageSlider = document.getElementById("stage-slider");
const tickBtns = document.querySelectorAll(".tick-btn");
const stageNarrativeText = document.getElementById("stage-narrative-text");

// Metrics Dashboard DOM
const metricUnits = document.getElementById("metric-units");
const metricAffordability = document.getElementById("metric-affordability-proxy");
const metricVmtReduction = document.getElementById("metric-vmt-reduction");
const metricVmtMiles = document.getElementById("metric-vmt-miles");
const metricWalkScore = document.getElementById("metric-walk-score");
const metricWalkDesc = document.getElementById("metric-walk-desc");
const metricAgingScore = document.getElementById("metric-aging-score");
const metricAgingDesc = document.getElementById("metric-aging-desc");

const emissionsBaseline = document.getElementById("emissions-baseline");
const emissionsProposed = document.getElementById("emissions-proposed");
const emissionsReductionPct = document.getElementById("emissions-reduction-pct");
const emissionsAvoided = document.getElementById("emissions-avoided");

// Glossary DOM
const glossaryBtns = document.querySelectorAll(".glossary-term-btn");
const glossaryDefTitle = document.getElementById("glossary-def-title");
const glossaryDefText = document.getElementById("glossary-def-text");

// Advocacy DOM
const advocacyRepName = document.getElementById("advocacy-rep-name");
const advocacyLetterBody = document.getElementById("advocacy-letter-body");
const copyLetterBtn = document.getElementById("copy-letter-btn");


// Helper: Format large numbers
function formatNumber(num, decimals = 0) {
    if (num >= 1e9) {
        return (num / 1e9).toFixed(decimals + 1) + " B";
    }
    if (num >= 1e6) {
        return (num / 1e6).toFixed(decimals + 1) + " M";
    }
    if (num >= 1e3) {
        return num.toLocaleString(undefined, { maximumFractionDigits: decimals });
    }
    return num.toFixed(decimals);
}

// Load dataset
async function loadData() {
    try {
        const response = await fetch("cufet_data_compact.json");
        cufetData = await response.json();
        initializeUI();
    } catch (error) {
        console.error("Failed to load CUFET compact dataset:", error);
        alert("Error loading dataset. Please ensure cufet_data_compact.json exists.");
    }
}

// Initialize UI selectors and bindings
function initializeUI() {
    // Populate Countries select
    const sortedCountries = Object.keys(cufetData.countries).sort();
    sortedCountries.forEach(country => {
        const option = document.createElement("option");
        option.value = country;
        option.textContent = country;
        countrySelect.appendChild(option);
    });

    // Set Defaults
    countrySelect.value = "United States";
    handleCountryChange();

    citySelect.value = "Los Angeles";
    handleCityChange();

    // Event listeners
    countrySelect.addEventListener("change", handleCountryChange);
    citySelect.addEventListener("change", handleCityChange);
    cityNameInput.addEventListener("input", handleInputChange);

    popSlider.addEventListener("input", () => {
        popVal.textContent = parseInt(popSlider.value).toLocaleString();
        handleInputChange();
    });

    areaSlider.addEventListener("input", () => {
        areaVal.textContent = `${parseInt(areaSlider.value).toLocaleString()} km²`;
        handleInputChange();
    });

    evSlider.addEventListener("input", () => {
        evVal.textContent = `${evSlider.value}%`;
        handleInputChange();
    });

    // Stage control slider
    stageSlider.addEventListener("input", () => {
        setStage(parseInt(stageSlider.value));
    });

    // Stage ticks buttons
    tickBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const stage = parseInt(btn.getAttribute("data-stage"));
            setStage(stage);
        });
    });

    // Glossary tabs
    glossaryBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            glossaryBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            const termKey = btn.getAttribute("data-term");
            const termData = glossary[termKey];
            if (termData) {
                glossaryDefTitle.textContent = termData.title;
                glossaryDefText.textContent = termData.text;
            }
        });
    });

    // Copy advocacy text
    copyLetterBtn.addEventListener("click", () => {
        advocacyLetterBody.select();
        document.execCommand("copy");
        
        const originalText = copyLetterBtn.textContent;
        copyLetterBtn.textContent = "✅ Copied Letter!";
        copyLetterBtn.style.background = "var(--color-success)";
        setTimeout(() => {
            copyLetterBtn.textContent = originalText;
            copyLetterBtn.style.background = "";
        }, 2000);
    });

    // Representative Name Change update letter
    advocacyRepName.addEventListener("input", generateLetter);

    // Initial Trigger
    setStage(1);
    handleInputChange();
}

// Handle Country Change to sync cities dropdown
function handleCountryChange() {
    activeCountry = countrySelect.value;
    
    // Clear dropdown but keep Custom lookup
    citySelect.innerHTML = '<option value="">-- Custom / Manual --</option>';
    
    // Reference cities list filter
    Object.keys(referenceCities).forEach(city => {
        if (referenceCities[city].country === activeCountry) {
            const option = document.createElement("option");
            option.value = city;
            option.textContent = `${city} (Reference City)`;
            citySelect.appendChild(option);
        }
    });

    // GHSL parsed cities list
    const citiesList = cufetData.country_cities[activeCountry] || [];
    citiesList.forEach(city => {
        if (referenceCities[city] && referenceCities[city].country === activeCountry) {
            return; // skip duplicate reference city
        }
        const option = document.createElement("option");
        option.value = city;
        option.textContent = city;
        citySelect.appendChild(option);
    });

    // Set Default city lookup
    if (citySelect.options.length > 1) {
        citySelect.selectedIndex = 1;
    } else {
        citySelect.value = "";
    }
    
    handleCityChange();
}

// Handle City Change
function handleCityChange() {
    activeCity = citySelect.value;
    
    if (activeCity && referenceCities[activeCity]) {
        // Load predefined profile
        const profile = referenceCities[activeCity];
        popSlider.value = profile.pop;
        areaSlider.value = profile.area;
        evSlider.value = profile.ev;
        
        popVal.textContent = profile.pop.toLocaleString();
        areaVal.textContent = `${profile.area.toLocaleString()} km²`;
        evVal.textContent = `${profile.ev}%`;
        
        customCityGroup.style.display = "none";
        cityNameInput.value = activeCity;
    } else if (activeCity) {
        // GHSL generic city
        customCityGroup.style.display = "none";
        cityNameInput.value = activeCity;
    } else {
        // Custom Manual entry
        customCityGroup.style.display = "flex";
        cityNameInput.value = "Custom City";
    }
    
    handleInputChange();
}

// Main stage manager
function setStage(stage) {
    activeStage = stage;
    stageSlider.value = stage;

    // Toggle active ticks
    tickBtns.forEach(btn => {
        const tickStage = parseInt(btn.getAttribute("data-stage"));
        if (tickStage === stage) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });

    // Update Stage Badge titles
    const titles = {
        1: "Stage 1: Single-Family",
        2: "Stage 2: Allow ADUs",
        3: "Stage 3: Multiplexes",
        4: "Stage 4: Mixed-Use Nodes"
    };
    currentStageTitle.textContent = titles[stage];
    
    const shortDesc = {
        1: "Stage 1: Exclusive Single-Family Zoning (Baseline)",
        2: "Stage 2: Allow Backyard Accessory Dwelling Units (+25% Density)",
        3: "Stage 3: Allow Missing Middle Multiplexes/Townhouses (+75% Density)",
        4: "Stage 4: Mixed-Use Grocery/Cafe + Reduced Parking (+150% Density)"
    };
    stageDescShort.textContent = shortDesc[stage];

    // SVG Class morphing
    neighborhoodSvg.className.baseVal = `stage-${stage}`;

    // Update narrative
    stageNarrativeText.innerHTML = stageNarrative[stage];

    // Trigger visual/calculations updates
    handleInputChange();
}

// Triggered when any profile inputs or stage changes
function handleInputChange() {
    if (!cufetData) return;

    const pop = parseInt(popSlider.value);
    const area = parseInt(areaSlider.value);
    const evShare = parseInt(evSlider.value);
    
    // Baseline Density
    const baselineDensity = pop / area;
    baselineDensityText.textContent = `${Math.round(baselineDensity).toLocaleString()} / km²`;

    // Map stage to simulated compactness increase (density multiplier)
    // Stage 1 = 1.0x, Stage 2 = 1.25x (+25%), Stage 3 = 1.75x (+75%), Stage 4 = 2.50x (+150%)
    let densityMultiplier = 1.0;
    if (activeStage === 2) densityMultiplier = 1.25;
    if (activeStage === 3) densityMultiplier = 1.75;
    if (activeStage === 4) densityMultiplier = 2.50;

    // Run CUFET baseline calculations (Stage 1)
    const baselineResults = calculateCUFET(activeCountry, cityNameInput.value, pop, area, evShare);
    
    // Run CUFET proposed calculations
    const proposedArea = area / densityMultiplier;
    const proposedResults = calculateCUFET(activeCountry, cityNameInput.value, pop, proposedArea, evShare);

    // Update climate parameters indicator labels
    badgeSizeCat.textContent = baselineResults.sizeCategory;
    badgeDensityElas.textContent = baselineResults.slopeDensity.toFixed(3);
    badgeEmissionIntensity.textContent = `${baselineResults.emissionIntensity.toFixed(1)} g/km`;

    // Update dashboard metrics
    updateDashboardMetrics(baselineResults, proposedResults, densityMultiplier);
}

// Core CUFET Regression logic
function calculateCUFET(country, city, pop, area, evShare) {
    const model = cufetData.model;
    const density = pop / area;
    
    // 1. Determine size category band
    let sizeCategory = "Large";
    if (pop < model.threshold_sm) {
        sizeCategory = "Small";
    } else if (pop < model.threshold_ml) {
        sizeCategory = "Medium";
    }

    // 2. Load elasticities
    const band = model.bands[sizeCategory];
    const interceptDev = band.intercept_dev;
    const slopePop = band.slope_pop;
    const slopeDensity = band.slope_density;

    // 3. Country Fixed Effect
    const countryData = cufetData.countries[country] || { fe: 0.0, ei: 226.2 };
    const countryFe = countryData.fe;

    // 4. Predicted log VKT
    const lnPop = Math.log(pop);
    const lnDensity = Math.log(density);
    const predictedLnVkt = model.global_intercept + countryFe + interceptDev + (lnPop * slopePop) + (lnDensity * slopeDensity);
    
    // Linear VKT (total city-wide annual driving km)
    const predictedVkt = Math.exp(predictedLnVkt);

    // ICE VKT (EV share offsets gasoline driving emissions)
    const iceVkt = predictedVkt * (1 - evShare / 100);

    // 5. Grid/Fleet emission intensity
    const cityKey = `${city}|${country}`;
    let emissionIntensity = cufetData.city_custom_ei[cityKey];
    if (emissionIntensity === undefined) {
        emissionIntensity = countryData.ei !== undefined ? countryData.ei : 226.2;
    }

    // 6. Annual transport emissions in tonnes CO2e
    const totalCO2e = (iceVkt * emissionIntensity) / 1000000;

    return {
        vkt: predictedVkt,
        totalCO2e: totalCO2e,
        sizeCategory: sizeCategory,
        slopeDensity: slopeDensity,
        slopePop: slopePop,
        emissionIntensity: emissionIntensity
    };
}

// Update Metrics Dashboard numbers
function updateDashboardMetrics(baseline, proposed, multiplier) {
    // 1. Housing Units Added
    const unitsMap = { 1: "6 Units", 2: "9 Units", 3: "15 Units", 4: "22 Units" };
    const housingDiffText = {
        1: "Affordability: Low",
        2: "Affordability: Moderate (ADU Rent Income)",
        3: "Affordability: Good (Townhouse Condos)",
        4: "Affordability: Very High (Shedding car costs)"
    };
    metricUnits.textContent = unitsMap[activeStage];
    metricAffordability.textContent = housingDiffText[activeStage];

    // 2. VMT Reduction percentage
    const vmtReduction = ((proposed.vkt - baseline.vkt) / baseline.vkt) * 100;
    metricVmtReduction.textContent = vmtReduction === 0 ? "0%" : `${vmtReduction.toFixed(1)}%`;
    
    const vmtSubText = {
        1: "Baseline driving profile",
        2: "Slight vehicle trip reductions",
        3: "Fewer trips due to bike/walk options",
        4: "Car ownership shed; local errands"
    };
    metricVmtMiles.textContent = vmtSubText[activeStage];

    // 3. Walkability Score
    const walkScoreMap = { 1: "18/100", 2: "32/100", 3: "65/100", 4: "92/100" };
    const walkDescMap = {
        1: "Car Dependent",
        2: "Mostly Car Dependent",
        3: "Somewhat Walkable",
        4: "Walker's Paradise"
    };
    metricWalkScore.textContent = walkScoreMap[activeStage];
    metricWalkDesc.textContent = walkDescMap[activeStage];

    // 4. Aging in Place Score
    const agingScoreMap = { 1: "22%", 2: "55%", 3: "78%", 4: "95%" };
    const agingDescMap = {
        1: "Highly Restrictive",
        2: "ADU Options (Yard Downsizing)",
        3: "Multiplex Accessible Layouts",
        4: "Walkable Errand-free Senior Care"
    };
    metricAgingScore.textContent = agingScoreMap[activeStage];
    metricAgingDesc.textContent = agingDescMap[activeStage];

    // 5. Greenhouse Gas Emissions (CO2e)
    emissionsBaseline.textContent = formatNumber(baseline.totalCO2e, 0) + " t";
    emissionsProposed.textContent = formatNumber(proposed.totalCO2e, 0) + " t";
    
    const emissionsDiff = baseline.totalCO2e - proposed.totalCO2e;
    emissionsAvoided.textContent = formatNumber(emissionsDiff, 1) + " t";
    
    const reductionPct = ((proposed.totalCO2e - baseline.totalCO2e) / baseline.totalCO2e) * 100;
    emissionsReductionPct.textContent = reductionPct === 0 ? "0% reduction" : `${reductionPct.toFixed(1)}% carbon reduction`;

    // Visual indicators updates
    const emissionsCard = document.getElementById("emissions-card");
    if (activeStage === 1) {
        emissionsCard.style.border = "";
        emissionsCard.style.background = "";
    } else if (activeStage === 2) {
        emissionsCard.style.border = "1px solid rgba(121, 202, 183, 0.35)";
        emissionsCard.style.background = "linear-gradient(135deg, rgba(121, 202, 183, 0.08) 0%, rgba(137, 112, 178, 0.08) 100%)";
    } else if (activeStage === 3) {
        emissionsCard.style.border = "1px solid rgba(121, 202, 183, 0.55)";
        emissionsCard.style.background = "linear-gradient(135deg, rgba(121, 202, 183, 0.12) 0%, rgba(137, 112, 178, 0.12) 100%)";
    } else {
        emissionsCard.style.border = "1px solid rgba(121, 202, 183, 0.75)";
        emissionsCard.style.background = "linear-gradient(135deg, rgba(121, 202, 183, 0.18) 0%, rgba(137, 112, 178, 0.18) 100%)";
    }

    // Generate Advocacy template letter
    generateLetter(proposed.totalCO2e, emissionsDiff, vmtReduction);
}

// Generate Advocacy Letter
function generateLetter(proposedEmissions, avoidedEmissions, vmtPercent) {
    const repName = advocacyRepName.value || "[Representative Name]";
    const cityName = cityNameInput.value || "our city";
    const stageTitles = {
        1: "Single-Family Zoning",
        2: "Zoning Stage 2: Allow ADUs",
        3: "Zoning Stage 3: Allow Multiplexes",
        4: "Zoning Stage 4: Mixed-Use Nodes + Reduced Parking"
    };
    
    const unitsMap = { 1: "6", 2: "9", 3: "15", 4: "22" };
    const walkScore = { 1: "18", 2: "32", 3: "65", 4: "92" };
    const agingScore = { 1: "22%", 2: "55%", 3: "78%", 4: "95%" };

    const letterBody = `Dear ${repName},

I am writing as a resident of ${cityName} to advocate for zoning reforms in our community, inspired by the "Thriving in Place" zoning guidelines. 

I recently used the Gentle Density Simulator to model how updating zoning ordinances would impact our residential blocks. Transitioning our block to "${stageTitles[activeStage]}" shows significant benefits:

1. Housing Options: Expands the number of homes from 6 to ${unitsMap[activeStage]} units on a typical block, introducing affordable missing-middle starter homes.
2. Aging in Place: Increases our neighborhood's "Aging in Place" score from 22% to ${agingScore[activeStage]} by letting seniors downsize into backyard suites (ADUs) or accessible townhomes.
3. Transit & Walkability: Improves the local walkability score from 18/100 to ${walkScore[activeStage]}/100, bringing daily needs like grocery/cafes closer to home.
4. Climate Impact: Driving activity (VMT) decreases by ${Math.abs(vmtPercent).toFixed(1)}% due to denser, walkable community layouts. Using the CUFET regression model, this translates into ${avoidedEmissions.toLocaleString(undefined, {maximumFractionDigits: 1})} tons of CO₂e emissions avoided per year city-wide!

Upzoning and mixed-use regulations are proven ways to build affordable, green, and tight-knit neighborhoods. I urge you to support legalizing accessory dwelling units, duplexes, triplexes, and walkable corner nodes as-of-right in ${cityName}.

Sincerely,
[Your Name]
[Your Address]`;

    advocacyLetterBody.value = letterBody;

}

// Fetch and load data on initialization
loadData();
