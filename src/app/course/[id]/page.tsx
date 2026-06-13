"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft, Play, CheckCircle, Clock, BookOpen,
  ChevronDown, ChevronRight, Award, ExternalLink,
  BarChart2, Users, Star, Zap, Search,
  Leaf, Building2, Droplets, Mountain, AlertTriangle,
  Wind, Waves, Shield, Globe, Flame,
} from "lucide-react";

function YtIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1C4.5 20.4 12 20.4 12 20.4s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z" />
    </svg>
  );
}

/* ─── Remote Sensing applications data ──────────────────────── */
const RS_APPLICATIONS = [
  {
    field: "Agriculture & Precision Farming",
    color: "#16a34a",
    bg: "#f0fdf4",
    border: "#bbf7d0",
    Icon: Leaf,
    desc: "Monitor crop health, estimate yield, and optimize irrigation across vast farmlands using satellite time-series and drone imagery.",
    concepts: ["NDVI / EVI Time Series", "Crop Type Mapping", "Irrigation Monitoring", "Yield Estimation", "Soil Moisture Index", "Pest & Disease Detection"],
    sensors: "Sentinel-2 · MODIS · Drone Multispectral",
  },
  {
    field: "Forestry & Biodiversity",
    color: "#065f46",
    bg: "#ecfdf5",
    border: "#6ee7b7",
    Icon: Globe,
    desc: "Track deforestation, estimate above-ground biomass, map tree canopy height, and assess wildfire risk across forested landscapes.",
    concepts: ["Deforestation Detection", "Biomass Estimation", "Canopy Height Mapping", "Fire Risk Modelling", "Species Distribution", "Carbon Stock Assessment"],
    sensors: "Landsat · LiDAR · SAR (ALOS-2)",
  },
  {
    field: "Urban Planning & Smart Cities",
    color: "#1d4ed8",
    bg: "#eff6ff",
    border: "#bfdbfe",
    Icon: Building2,
    desc: "Map land use change, urban sprawl, heat islands, and impervious surfaces to support sustainable city planning and infrastructure management.",
    concepts: ["LULC Change Mapping", "Urban Heat Island (UHI)", "Impervious Surface Index (NDBI)", "Urban Sprawl Analysis", "Road & Building Extraction", "Green Space Monitoring"],
    sensors: "WorldView-3 · Sentinel-2 · SAR Coherence",
  },
  {
    field: "Hydrology & Water Resources",
    color: "#0369a1",
    bg: "#f0f9ff",
    border: "#bae6fd",
    Icon: Droplets,
    desc: "Map flood extents, monitor reservoir levels, assess watershed health, and track snowpack to support water resource management.",
    concepts: ["Flood Extent Mapping (SAR)", "Reservoir Volume Monitoring", "Snow/Ice Cover Mapping", "Watershed Delineation", "Groundwater Recharge Zones", "MNDWI Water Index"],
    sensors: "Sentinel-1 SAR · MODIS · ICESat-2",
  },
  {
    field: "Geology & Mineral Exploration",
    color: "#92400e",
    bg: "#fffbeb",
    border: "#fde68a",
    Icon: Mountain,
    desc: "Identify lithological units, map fault lines, detect hydrothermal alteration zones for mineral exploration, and monitor land subsidence.",
    concepts: ["Lithological Mapping", "Hydrothermal Alteration (ASTER)", "Fault & Lineament Extraction", "InSAR Land Subsidence", "Soil & Rock Mineralogy", "DEM-based Terrain Analysis"],
    sensors: "ASTER · Hyperspectral · InSAR (Sentinel-1)",
  },
  {
    field: "Disaster Management",
    color: "#dc2626",
    bg: "#fef2f2",
    border: "#fecaca",
    Icon: AlertTriangle,
    desc: "Rapidly assess flood damage, wildfire burn severity, earthquake impacts, and landslide extent to support emergency response and recovery.",
    concepts: ["Flood Damage Assessment", "Burn Severity (dNBR)", "Earthquake Damage Mapping", "Landslide Susceptibility", "Tsunami Inundation Extent", "Rapid Damage Mapping (EMS)"],
    sensors: "SAR · MODIS · Copernicus EMS · PlanetScope",
  },
  {
    field: "Climate Change & Atmosphere",
    color: "#7c3aed",
    bg: "#f5f3ff",
    border: "#ddd6fe",
    Icon: Wind,
    desc: "Monitor glacier retreat, sea level rise, atmospheric greenhouse gas concentrations, and temperature anomalies to understand long-term climate trends.",
    concepts: ["Glacier & Ice Sheet Monitoring", "Sea Level Rise (Altimetry)", "CO₂ & CH₄ Mapping (Sentinel-5P)", "Land Surface Temperature", "Aerosol Optical Depth", "Vegetation Phenology Shifts"],
    sensors: "GRACE-FO · Sentinel-5P · Landsat · MODIS",
  },
  {
    field: "Oceanography & Coastal Zones",
    color: "#0891b2",
    bg: "#ecfeff",
    border: "#a5f3fc",
    Icon: Waves,
    desc: "Map sea surface temperature, phytoplankton blooms, coastal erosion, mangrove extent, and oil spills to support marine conservation and fisheries.",
    concepts: ["Sea Surface Temperature (SST)", "Chlorophyll-a Concentration", "Coastal Erosion Mapping", "Mangrove Cover Change", "Oil Spill Detection (SAR)", "Coral Reef Health Assessment"],
    sensors: "MODIS Aqua · Sentinel-3 · SAR · Landsat",
  },
  {
    field: "Wildfire Monitoring",
    color: "#ea580c",
    bg: "#fff7ed",
    border: "#fed7aa",
    Icon: Flame,
    desc: "Detect active fire hotspots in near-real time, map post-fire burn scars, model fire spread risk, and assess ecosystem recovery trajectories.",
    concepts: ["Active Fire Detection (VIIRS)", "Burn Area Index (BAI)", "dNBR Burn Severity Classes", "Fire Spread Modelling", "Post-fire Vegetation Recovery", "Fuel Load Mapping"],
    sensors: "MODIS · VIIRS (Suomi-NPP) · Sentinel-2",
  },
  {
    field: "Defense & Border Surveillance",
    color: "#374151",
    bg: "#f9fafb",
    border: "#e5e7eb",
    Icon: Shield,
    desc: "Monitor land borders, detect illegal encroachments, assess infrastructure changes, and support national security through change detection analysis.",
    concepts: ["Change Detection (Bi-temporal)", "Object-Based Image Analysis", "SAR-based Night Surveillance", "Infrastructure Mapping", "Terrain & Trafficability Analysis", "Multi-sensor Fusion"],
    sensors: "VHR Satellites (WorldView) · SAR · LiDAR",
  },
];

/* ─── Remote Sensing Fundamentals curriculum ─────────────────── */
const RS_MODULES = [
  {
    id: 1, title: "Foundations of Remote Sensing",
    lessons: [
      {
        id: 1, title: "Introduction to Remote Sensing", duration: "14:30",
        youtubeId: null,
        desc: "Understand what remote sensing is, how it differs from in-situ observation, and the basic workflow from data acquisition to information extraction. Covers key terminology and the electromagnetic basis of the discipline.",
        resources: ["NASA Remote Sensing Tutorial", "ESA EO Beginners Guide", "CCRS Fundamentals of Remote Sensing"],
      },
      {
        id: 2, title: "History & Evolution of Earth Observation", duration: "11:20",
        youtubeId: null,
        desc: "Trace remote sensing from early aerial photography and CORONA spy satellites through Landsat, SPOT, and modern constellations. Understand how spatial, spectral, and temporal resolutions have improved over decades.",
        resources: ["USGS Landsat Mission History", "ESA Earth Observation Timeline", "Corona Declassified Archive"],
      },
      {
        id: 3, title: "Active vs. Passive Remote Sensing", duration: "13:45",
        youtubeId: null,
        desc: "Distinguish passive sensors (sunlight-dependent optical/thermal) from active sensors (radar, LiDAR) that emit their own energy. Compare advantages, limitations, and optimal use cases for each approach.",
        resources: ["Active Sensor Comparison Chart", "LiDAR vs SAR Overview", "CCRS Sensor Types Guide"],
      },
      {
        id: 4, title: "Spatial, Spectral, Temporal & Radiometric Resolution", duration: "15:10",
        youtubeId: null,
        desc: "Master the four resolution types that define any sensor system. Understand trade-offs (e.g., high spatial vs. high temporal), pixel size vs. ground sampling distance, and bit depth impact on analysis.",
        resources: ["Resolution Comparison Table", "USGS Landsat Resolution Guide", "Sentinel-2 Product Specifications"],
      },
    ],
  },
  {
    id: 2, title: "Electromagnetic Spectrum & Energy Interactions",
    lessons: [
      {
        id: 5, title: "Electromagnetic Radiation Principles", duration: "16:40",
        youtubeId: null,
        desc: "Explore the physics of electromagnetic radiation: wavelength, frequency, energy, the EM spectrum from gamma rays to microwaves, and why different bands provide different information about Earth surfaces.",
        resources: ["NASA EM Spectrum Overview", "NOAA Radiation Basics", "Physics of Remote Sensing Notes"],
      },
      {
        id: 6, title: "Spectral Signatures of Earth Surface Features", duration: "19:10",
        youtubeId: null,
        desc: "Study how vegetation, soil, water, and urban surfaces each reflect, absorb, and transmit radiation uniquely. Interpret spectral reflectance curves and understand why NDVI works for vegetation detection.",
        resources: ["USGS Spectral Library", "ASTER Spectral Library", "Spectral Signature Chart Gallery"],
      },
      {
        id: 7, title: "Atmospheric Effects & Windows", duration: "14:55",
        youtubeId: null,
        desc: "Learn how atmospheric gases (O₂, CO₂, H₂O, ozone) scatter and absorb radiation. Identify the key atmospheric windows where transmission is high and understand how they dictate which bands sensors use.",
        resources: ["Atmospheric Windows Diagram", "MODTRAN Atmospheric Model Docs", "ESA Atmospheric Correction Guide"],
      },
      {
        id: 8, title: "Energy-Matter Interactions & Reflectance", duration: "17:20",
        youtubeId: null,
        desc: "Understand specular vs. diffuse (Lambertian) reflectance, transmittance, and absorptance. Apply the energy balance equation and explore BRDF effects that cause reflectance variability with illumination angle.",
        resources: ["BRDF Explanation – NASA", "Reflectance Factor Definitions", "Soil & Vegetation Reflectance Models"],
      },
    ],
  },
  {
    id: 3, title: "Sensor Systems & Satellite Platforms",
    lessons: [
      {
        id: 9, title: "Optical & Multispectral Sensor Design", duration: "18:45",
        youtubeId: null,
        desc: "Examine how CCD and CMOS detectors capture reflected light, the optics involved, pushbroom vs. whiskbroom scanning, and band design choices in sensors like OLI (Landsat 8/9), MSI (Sentinel-2), and LISS.",
        resources: ["Landsat 9 OLI Instrument Paper", "Sentinel-2 MSI Specs", "Sensor Design Fundamentals PDF"],
      },
      {
        id: 10, title: "Hyperspectral Imaging Systems", duration: "20:30",
        youtubeId: null,
        desc: "Explore imaging spectrometers (AVIRIS, DESIS, PRISMA, EMIT) that capture hundreds of contiguous spectral bands. Understand the data cube structure, spectral unmixing, and applications in mineralogy and vegetation stress detection.",
        resources: ["AVIRIS Data & Docs", "EMIT Mission Overview – NASA/JPL", "Hyperspectral Analysis Tutorial"],
      },
      {
        id: 11, title: "SAR & Microwave Remote Sensing", duration: "22:15",
        youtubeId: null,
        desc: "Study Synthetic Aperture Radar (SAR): how it generates images from backscatter, C-band (Sentinel-1) vs. L-band (ALOS-2) vs. X-band (TerraSAR-X) differences, coherence, InSAR for deformation, and cloud-penetrating capability.",
        resources: ["ESA SAR Basics Tutorial", "NASA SAR Handbook", "Sentinel-1 User Guide"],
      },
      {
        id: 12, title: "Major Satellite Missions: Landsat, Sentinel, MODIS", duration: "21:00",
        youtubeId: null,
        desc: "Compare the flagship EO missions: Landsat 8/9 (30 m, 16-day), Sentinel-2 A/B (10 m, 5-day), MODIS (250 m – 1 km, daily). Explore band specifications, data access portals, and best-use-case selection criteria.",
        resources: ["USGS EarthExplorer", "Copernicus Open Access Hub", "MODIS Data Products Table"],
      },
      {
        id: 13, title: "UAV & Drone-based Remote Sensing", duration: "16:50",
        youtubeId: null,
        desc: "Cover drone platforms (fixed-wing vs. multi-rotor), RGB, multispectral (MicaSense RedEdge), and thermal payloads. Understand photogrammetric processing (SfM), orthomosaic generation, and precision agriculture applications.",
        resources: ["DJI Agriculture Drone Guide", "Agisoft Metashape SfM Tutorial", "UAV Remote Sensing Workflow"],
      },
    ],
  },
  {
    id: 4, title: "Image Acquisition & Pre-processing",
    lessons: [
      {
        id: 14, title: "Geometric Corrections & Orthorectification", duration: "17:35",
        youtubeId: null,
        desc: "Correct systematic and nonsystematic geometric distortions caused by sensor tilt, Earth curvature, and terrain relief. Apply GCPs, polynomial transformations, and DEM-based orthorectification using ENVI or SNAP.",
        resources: ["ENVI Geometric Correction Tutorial", "ESA SNAP Orthorectification Guide", "RPC Model Explanation"],
      },
      {
        id: 15, title: "Radiometric Calibration: DN to Reflectance", duration: "15:50",
        youtubeId: null,
        desc: "Convert raw digital numbers (DN) to Top-of-Atmosphere (TOA) radiance and reflectance using sensor gain/offset and solar irradiance. Understand the difference between DN, radiance, TOA reflectance, and surface reflectance.",
        resources: ["Landsat Radiometric Calibration Guide", "Sentinel-2 Reflectance Conversion Formula", "TOA vs SR Comparison"],
      },
      {
        id: 16, title: "Atmospheric Correction Methods", duration: "19:20",
        youtubeId: null,
        desc: "Convert TOA reflectance to Bottom-of-Atmosphere (BOA) / surface reflectance. Compare empirical methods (dark object subtraction, QUAC), model-based methods (FLAASH, 6S, Sen2Cor), and when each is appropriate.",
        resources: ["Sen2Cor Plugin Guide", "FLAASH Module Docs (ENVI)", "Dark Object Subtraction Explained"],
      },
      {
        id: 17, title: "Image Enhancement Techniques", duration: "14:40",
        youtubeId: null,
        desc: "Apply contrast stretching (linear, histogram equalization, Gaussian), spatial filtering (edge detection, sharpening, smoothing), and pan-sharpening methods (Gram-Schmidt, Brovey) to improve interpretability.",
        resources: ["Histogram Equalization Explained", "Pan-sharpening Comparison Study", "ERDAS Spatial Filtering Guide"],
      },
    ],
  },
  {
    id: 5, title: "Visual & Digital Image Interpretation",
    lessons: [
      {
        id: 18, title: "Elements of Visual Image Interpretation", duration: "13:55",
        youtubeId: null,
        desc: "Apply the 9 elements of visual interpretation: tone/color, texture, size, shape, shadow, pattern, site, association, and resolution. Practice identifying land use features from real satellite imagery examples.",
        resources: ["Photo Interpretation Elements Chart", "USGS Visual Interpretation Guide", "Sample Imagery Exercise Set"],
      },
      {
        id: 19, title: "Band Combinations & False Color Composites", duration: "16:25",
        youtubeId: null,
        desc: "Understand why different RGB band assignments reveal different surface features. Explore standard composites: True Color (4-3-2), False Color Infrared (8-4-3), Agriculture (11-8-2), and Geology (12-11-2) for Sentinel-2.",
        resources: ["Sentinel-2 Band Combination Guide", "Landsat Band Combinations Reference", "Band Combo Selector Tool"],
      },
      {
        id: 20, title: "Digital Image Processing Fundamentals", duration: "18:10",
        youtubeId: null,
        desc: "Cover image data structures (raster grids, GeoTIFF, HDF5), coordinate reference systems, resampling methods (nearest neighbor, bilinear, cubic), and basic Python/NumPy image array manipulation.",
        resources: ["GeoTIFF Format Specification", "GDAL Raster Tutorial", "Rasterio Python Library Docs"],
      },
      {
        id: 21, title: "Feature Identification & Photo-interpretation Practice", duration: "15:35",
        youtubeId: null,
        desc: "Practice identifying agricultural fields, urban areas, water bodies, forests, bare soil, and road networks using multi-sensor imagery. Create an interpreted map using QGIS or ArcGIS Pro with digitized polygons.",
        resources: ["QGIS Digitizing Tutorial", "ArcGIS Pro Feature Mapping Guide", "Photo Interpretation Key Library"],
      },
    ],
  },
  {
    id: 6, title: "Spectral Indices & Land Cover Classification",
    lessons: [
      {
        id: 22, title: "Vegetation Indices: NDVI, EVI, SAVI & More", duration: "20:45",
        youtubeId: null,
        desc: "Compute and interpret major vegetation indices. Understand NDVI limitations (saturation, soil background), how EVI adds a blue-band correction, SAVI's soil-adjustment factor L, and when to use LAI vs. canopy chlorophyll indices.",
        resources: ["NDVI Formula & Interpretation", "EVI Algorithm Theoretical Basis – NASA", "Vegetation Indices Comparison Study"],
      },
      {
        id: 23, title: "Water, Soil & Urban Spectral Indices", duration: "18:30",
        youtubeId: null,
        desc: "Calculate NDWI (McFeeters) and MNDWI for water detection, NDMI for vegetation moisture stress, NDBI and UI for impervious surface mapping, BSI for bare soil, and NBR for burn severity assessment.",
        resources: ["NDWI vs MNDWI Comparison", "NBR Burn Severity Classes", "Urban Index Validation Paper"],
      },
      {
        id: 24, title: "Unsupervised Classification: K-Means & ISODATA", duration: "22:00",
        youtubeId: null,
        desc: "Perform unsupervised clustering without training data. Implement K-Means and ISODATA in ENVI, SNAP, or Python (scikit-learn). Set convergence thresholds, determine optimal cluster count, and label the output classes using reference imagery.",
        resources: ["ENVI K-Means Classification Tutorial", "ISODATA Algorithm Explained", "scikit-learn Clustering Docs"],
      },
      {
        id: 25, title: "Supervised Classification: SVM, Random Forest & MLC", duration: "24:15",
        youtubeId: null,
        desc: "Collect stratified random training samples, extract spectral signatures, and classify using Maximum Likelihood (MLC), Support Vector Machine (SVM), and Random Forest classifiers. Compare outputs and understand bias-variance trade-offs.",
        resources: ["Training Sample Design Guidelines", "SVM Remote Sensing Tutorial", "Random Forest Classification Code (Python)"],
      },
      {
        id: 26, title: "Accuracy Assessment & Validation", duration: "18:55",
        youtubeId: null,
        desc: "Design a probability-based validation sample, build an error (confusion) matrix, and compute overall accuracy, Kappa coefficient, producer's accuracy (omission error), and user's accuracy (commission error) per class.",
        resources: ["Accuracy Assessment Best Practices – Foody 2002", "Stratified Random Sampling Guide", "QGIS Semi-Automatic Classification Plugin"],
      },
    ],
  },
  {
    id: 7, title: "Applications & Capstone Project",
    lessons: [
      {
        id: 27, title: "Environmental & Agricultural Monitoring", duration: "20:10",
        youtubeId: null,
        desc: "Apply remote sensing to crop health monitoring (NDVI time series), drought stress detection, deforestation tracking, coastal erosion mapping, and wetland change analysis using multi-temporal Sentinel-2 and Landsat data.",
        resources: ["FAO Crop Monitoring Guidelines", "Global Forest Watch Platform", "Copernicus Land Monitoring Service"],
      },
      {
        id: 28, title: "Disaster Assessment & Change Detection", duration: "22:40",
        youtubeId: null,
        desc: "Use pre- and post-event satellite imagery for flood mapping (SAR coherence change), wildfire burn area (dNBR), earthquake damage assessment, and landslide detection. Integrate Copernicus EMS rapid mapping outputs.",
        resources: ["Copernicus EMS Activation Archive", "dNBR Fire Severity Methodology", "UNOSAT Rapid Mapping Products"],
      },
      {
        id: 29, title: "Capstone: End-to-End Land Cover Mapping Project", duration: "38:20",
        youtubeId: null,
        desc: "Complete a full remote sensing workflow: select a study area, acquire Sentinel-2 imagery, perform atmospheric correction, compute spectral indices, run supervised classification, validate accuracy, and produce a publication-quality land cover map with cartographic layout.",
        resources: ["Capstone Project Template", "Cartographic Map Layout Guide – QGIS", "Land Cover Legend Standards (FAO LCCS)"],
      },
    ],
  },
];

/* ─── GEE curriculum data ────────────────────────────────────── */
const GEE_MODULES = [
  {
    id: 1, title: "Getting Started with GEE",
    lessons: [
      {
        id: 1, title: "What is Google Earth Engine?", duration: "12:45",
        youtubeId: "gKGOeTFHnKY",
        desc: "Overview of the GEE platform, its cloud computing architecture, major capabilities, and real-world applications in remote sensing, environmental monitoring, and geospatial analysis.",
        resources: ["GEE Developer Guide", "GEE Dataset Catalog", "GEE Community Forum"],
      },
      {
        id: 2, title: "GEE Code Editor Walkthrough", duration: "18:30",
        youtubeId: "_V1_BGrIB2A",
        desc: "Navigate the GEE Code Editor interface: map panel, script editor, console output, inspector, tasks panel, assets, and the documentation sidebar.",
        resources: ["Code Editor Shortcuts", "GEE Script Manager"],
      },
      {
        id: 3, title: "Creating Your First GEE Script", duration: "15:20",
        youtubeId: null,
        desc: "Write and run your first script to load a Landsat image, apply visualization parameters, and display it on the interactive map.",
        resources: ["Hello World Script Template", "GEE Playground"],
      },
      {
        id: 4, title: "JavaScript Fundamentals for GEE", duration: "22:10",
        youtubeId: null,
        desc: "Key JavaScript concepts needed for GEE: variables, functions, lists, dictionaries, conditionals, loops, and callbacks with practical GEE examples.",
        resources: ["JS for GEE Cheatsheet", "MDN JavaScript Reference"],
      },
    ],
  },
  {
    id: 2, title: "Working with Images & Collections",
    lessons: [
      {
        id: 5, title: "Understanding Image Objects", duration: "14:50",
        youtubeId: null,
        desc: "Learn about Image objects, their bands, projections, scale, and metadata properties. Understand how GEE represents raster data.",
        resources: ["Image Object API Docs", "Projection Guide"],
      },
      {
        id: 6, title: "Image Collections & Filtering", duration: "20:15",
        youtubeId: "LyFIf6J3xrE",
        desc: "Work with ImageCollections (Landsat, Sentinel, MODIS). Apply date filters, bounds filters, and metadata property filters to select relevant imagery.",
        resources: ["Available Datasets", "Filter Reference", "Collection Code Samples"],
      },
      {
        id: 7, title: "Visualization Parameters", duration: "16:40",
        youtubeId: null,
        desc: "Control map display: band selection, min/max stretch, gamma correction, color palettes, and false-color composite compositions.",
        resources: ["Color Palette Gallery", "Visualization Params Docs"],
      },
      {
        id: 8, title: "Band Math & Spectral Indices", duration: "19:25",
        youtubeId: null,
        desc: "Compute NDVI, NDWI, EVI, SAVI, NBR, and custom indices using GEE band arithmetic. Understand band naming conventions across sensors.",
        resources: ["Spectral Indices Reference", "NDVI Formula Sheet"],
      },
      {
        id: 9, title: "Mosaicking & Cloud-Free Composites", duration: "17:55",
        youtubeId: null,
        desc: "Build cloud-free composites using median, mean, and quality mosaic approaches. Apply cloud masking using QA bands from Landsat and Sentinel-2.",
        resources: ["Cloud Masking Tutorial", "Compositing Strategies"],
      },
    ],
  },
  {
    id: 3, title: "Spatial Analysis & Geometry",
    lessons: [
      {
        id: 10, title: "Geometry & Feature Operations", duration: "21:30",
        youtubeId: null,
        desc: "Create and manipulate Geometry objects (points, lines, polygons), FeatureCollections, and perform geometric operations like buffer, union, and intersection.",
        resources: ["Geometry API Docs", "Vector Data Guide"],
      },
      {
        id: 11, title: "Reducers & Zonal Statistics", duration: "18:45",
        youtubeId: null,
        desc: "Use GEE Reducers to compute zonal statistics (mean, sum, min, max, histogram) within regions. Apply reduceRegion and reduceRegions.",
        resources: ["Reducers Reference", "Statistical Analysis Examples"],
      },
      {
        id: 12, title: "Spatial Joins & Vector Analysis", duration: "15:10",
        youtubeId: null,
        desc: "Perform spatial queries, feature intersections, attribute joins, and vector-to-raster conversions in GEE.",
        resources: ["Join Types Reference", "Vector Operations Guide"],
      },
      {
        id: 13, title: "Terrain Analysis with DEM", duration: "16:20",
        youtubeId: null,
        desc: "Derive slope, aspect, hillshade, curvature, and viewshed from Digital Elevation Models (SRTM, ASTER, ALOS) using GEE's Terrain algorithms.",
        resources: ["ee.Terrain API", "DEM Dataset Catalog", "Terrain Analysis Code"],
      },
    ],
  },
  {
    id: 4, title: "Time Series Analysis",
    lessons: [
      {
        id: 14, title: "Multi-temporal Image Analysis", duration: "23:15",
        youtubeId: null,
        desc: "Analyze land cover changes across multiple time periods. Stack images, compute differences, and create before/after comparisons.",
        resources: ["Temporal Analysis Tutorial", "MODIS Time Series Data"],
      },
      {
        id: 15, title: "NDVI Time Series & Charting", duration: "19:50",
        youtubeId: null,
        desc: "Extract NDVI values over time and create interactive time-series charts using GEE's built-in charting functions. Identify vegetation seasonality.",
        resources: ["ui.Chart Reference", "Time Series Examples", "Chart Customization"],
      },
      {
        id: 16, title: "Change Detection Methods", duration: "24:40",
        youtubeId: null,
        desc: "Implement image differencing, LandTrendr algorithm, and CCDC (Continuous Change Detection) for detecting land cover changes over time.",
        resources: ["LandTrendr Docs", "CCDC Algorithm Paper", "Change Detection Code"],
      },
      {
        id: 17, title: "Seasonal & Phenological Analysis", duration: "20:05",
        youtubeId: null,
        desc: "Identify seasonal patterns, growing seasons, and vegetation phenology from multi-year satellite time series using harmonic regression.",
        resources: ["Phenology Tutorial", "Harmonic Regression Guide"],
      },
    ],
  },
  {
    id: 5, title: "Classification & Machine Learning",
    lessons: [
      {
        id: 18, title: "Supervised Classification Basics", duration: "22:35",
        youtubeId: null,
        desc: "Collect training samples and classify satellite imagery using SVM, CART, Random Forest, and Naive Bayes classifiers in GEE.",
        resources: ["Classification Tutorial", "Training Data Collection Tips"],
      },
      {
        id: 19, title: "Random Forest Classifier", duration: "25:20",
        youtubeId: null,
        desc: "Implement Random Forest classification in GEE with hyperparameter tuning, feature importance analysis, and cross-validation techniques.",
        resources: ["ee.Classifier.smileRandomForest Docs", "RF Optimization Guide"],
      },
      {
        id: 20, title: "Accuracy Assessment", duration: "18:15",
        youtubeId: null,
        desc: "Compute confusion matrix, overall accuracy, Kappa coefficient, producer accuracy, and user accuracy for classified maps.",
        resources: ["Accuracy Assessment Workflow", "Sample Design Reference"],
      },
      {
        id: 21, title: "LULC Mapping End-to-End Project", duration: "30:10",
        youtubeId: null,
        desc: "Complete land use/land cover mapping project using Sentinel-2 imagery: from data collection to classification, validation, and final map production.",
        resources: ["LULC Project Template", "Sentinel-2 Bands Guide", "FAO Land Cover Standards"],
      },
    ],
  },
  {
    id: 6, title: "Export, Python API & Automation",
    lessons: [
      {
        id: 22, title: "Exporting Images, Tables & Videos", duration: "16:45",
        youtubeId: null,
        desc: "Export processed images to Google Drive, GCS, or as GEE Assets. Export tables as CSV/GeoJSON and create animated GIF/MP4 time-lapse videos.",
        resources: ["Export API Docs", "Export Formats Reference"],
      },
      {
        id: 23, title: "Python API (earthengine-api)", duration: "27:30",
        youtubeId: null,
        desc: "Use the GEE Python client library in Jupyter Notebooks and Google Colab. Authenticate, import datasets, and run analysis with geemap library.",
        resources: ["Python API Install Guide", "geemap Documentation", "Colab Notebook Template"],
      },
      {
        id: 24, title: "Building GEE Apps & Automation", duration: "24:55",
        youtubeId: null,
        desc: "Build interactive GEE Apps using the ui module. Deploy apps publicly and automate repetitive workflows with GEE Tasks and batch processing.",
        resources: ["UI Widgets Reference", "App Deployment Guide", "Batch Export Examples"],
      },
    ],
  },
];

const COURSE_META = {
  1: {
    title: "Google Earth Engine (GEE)",
    tag: "GEE", color: "#2563eb",
    badge: "Bestseller",
    level: "Beginner to Advanced",
    duration: "12 Weeks",
    rating: 4.9, students: 540,
    instructor: "Dr. Arjun Mehta",
    instructorTitle: "Senior GIS Scientist & GEE Specialist",
    totalLessons: 24,
    price: "₹499",
    searchPrefix: "Google Earth Engine",
    desc: "Master cloud-based geospatial analysis using JavaScript and Python APIs for large-scale satellite data processing.",
  },
  2: {
    title: "Remote Sensing Fundamentals",
    tag: "RS", color: "#0d9488",
    badge: "Foundation to Expert",
    level: "Foundation to Expert",
    duration: "14 Weeks",
    rating: 4.8, students: 320,
    instructor: "Dr. Priya Nair",
    instructorTitle: "Remote Sensing Scientist & EO Specialist",
    totalLessons: 29,
    price: "₹449",
    searchPrefix: "Remote Sensing",
    desc: "Complete course on electromagnetic spectrum, sensor systems, image interpretation, and practical environmental applications.",
  },
};

/* ─── helpers ────────────────────────────────────────────────── */
const CARD = { background: "rgba(255,255,255,0.93)", borderColor: "rgba(0,0,0,0.06)", boxShadow: "0 2px 20px rgba(0,0,0,0.05)" } as const;

function getLessonProgress(courseId: number): Record<number, boolean> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(`gvp_progress_${courseId}`);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

function saveLessonProgress(courseId: number, progress: Record<number, boolean>) {
  localStorage.setItem(`gvp_progress_${courseId}`, JSON.stringify(progress));
}

function getCourseModules(id: number) {
  return id === 2 ? RS_MODULES : GEE_MODULES;
}

/* ─── page ───────────────────────────────────────────────────── */
export default function CoursePage() {
  const params   = useParams();
  const courseId = Number(params.id);
  const meta     = COURSE_META[courseId as keyof typeof COURSE_META];
  const modules  = getCourseModules(courseId);

  const [completed, setCompleted]       = useState<Record<number, boolean>>({});
  const [activeLesson, setActiveLesson] = useState(() => modules[0].lessons[0]);
  const [openModules, setOpenModules]   = useState<Record<number, boolean>>({ 1: true });

  useEffect(() => {
    setCompleted(getLessonProgress(courseId));
  }, [courseId]);

  if (!meta) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#f0f4f8" }}>
      <div className="text-center">
        <p className="text-slate-500 mb-4">Course content coming soon.</p>
        <Link href="/profile" className="text-blue-600 hover:underline">← Back to Profile</Link>
      </div>
    </div>
  );

  /* all lessons flat */
  const allLessons = modules.flatMap((m) => m.lessons);
  const totalDone  = allLessons.filter((l) => completed[l.id]).length;
  const pct        = Math.round((totalDone / allLessons.length) * 100);

  /* prev / next */
  const idx        = allLessons.findIndex((l) => l.id === activeLesson.id);
  const prevLesson = idx > 0 ? allLessons[idx - 1] : null;
  const nextLesson = idx < allLessons.length - 1 ? allLessons[idx + 1] : null;

  function toggleComplete(lessonId: number) {
    const next = { ...completed, [lessonId]: !completed[lessonId] };
    setCompleted(next);
    saveLessonProgress(courseId, next);
  }

  function toggleModule(moduleId: number) {
    setOpenModules((p) => ({ ...p, [moduleId]: !p[moduleId] }));
  }

  function openLesson(lesson: typeof allLessons[0], moduleId: number) {
    setActiveLesson(lesson);
    setOpenModules((p) => ({ ...p, [moduleId]: true }));
  }

  const ytSearch = (title: string) =>
    `https://www.youtube.com/results?search_query=${encodeURIComponent(`${meta.searchPrefix} ${title} tutorial`)}`;

  return (
    <div className="min-h-screen" style={{ background: "#f0f4f8" }}>

      {/* ── Top bar ─────────────────────────────────────────── */}
      <header className="sticky top-0 z-40" style={{ background: "rgba(255,255,255,0.93)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
        <div className="max-w-[1400px] mx-auto px-5 h-14 flex items-center justify-between gap-4">
          <Link href="/profile" className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">
            <ArrowLeft size={16} /> Back to Profile
          </Link>
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold" style={{ background: `${meta.color}18`, color: meta.color }}>{meta.tag}</span>
            <p className="text-sm font-bold text-slate-800 truncate">{meta.title}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-xs text-slate-500">{totalDone}/{allLessons.length} lessons</span>
            <div className="w-24 h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: meta.color }} />
            </div>
            <span className="text-xs font-bold" style={{ color: meta.color }}>{pct}%</span>
          </div>
        </div>
      </header>

      {/* ── Course hero ─────────────────────────────────────── */}
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg,#060d1f 0%,#0f2044 60%,#060d1f 100%)" }}>
        <div className="absolute inset-0 opacity-[0.055]" style={{ backgroundImage: `linear-gradient(rgba(148,198,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(148,198,255,1) 1px,transparent 1px)`, backgroundSize: "40px 40px" }} />
        <div className="absolute top-0 left-1/3 w-64 h-64 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle,#2563eb,transparent 70%)", filter: "blur(70px)", opacity: 0.2 }} />
        <div className="max-w-[1400px] mx-auto px-5 py-8 relative z-10">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold" style={{ background: `${meta.color}25`, color: "#93c5fd" }}>{meta.tag}</span>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full" style={{ background: "#fef3c7", color: "#92400e" }}>{meta.badge}</span>
              </div>
              <h1 className="text-2xl font-black text-white mb-1">{meta.title}</h1>
              <p className="text-slate-400 text-sm max-w-xl mb-3">{meta.desc}</p>
              <div className="flex flex-wrap gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1"><Star size={11} className="text-amber-400 fill-amber-400" /> {meta.rating} rating</span>
                <span className="flex items-center gap-1"><Users size={11} /> {meta.students.toLocaleString()} students</span>
                <span className="flex items-center gap-1"><Clock size={11} /> {meta.duration}</span>
                <span className="flex items-center gap-1"><BarChart2 size={11} /> {meta.level}</span>
                <span className="flex items-center gap-1"><BookOpen size={11} /> {meta.totalLessons} lessons</span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="text-right">
                <p className="text-xs text-slate-400">Instructor</p>
                <p className="text-white font-bold text-sm">{meta.instructor}</p>
                <p className="text-slate-400 text-xs">{meta.instructorTitle}</p>
              </div>
              {pct === 100 && (
                <Link href="/profile" className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold text-white"
                  style={{ background: "linear-gradient(135deg,#f59e0b,#ea580c)" }}>
                  <Award size={14} /> View Certificate
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Main layout ─────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-5 py-6 flex gap-5 items-start">

        {/* ── Left sidebar: curriculum ─────────────────────── */}
        <aside className="w-80 flex-shrink-0 sticky top-16 max-h-[calc(100vh-5rem)] overflow-y-auto rounded-2xl border" style={CARD}>
          <div className="p-4 border-b border-slate-100">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Course Curriculum</p>
            <p className="text-xs text-slate-400 mt-0.5">{modules.length} modules · {allLessons.length} lessons</p>
          </div>

          <div className="divide-y divide-slate-100">
            {modules.map((mod) => {
              const modDone = mod.lessons.filter((l) => completed[l.id]).length;
              const isOpen  = openModules[mod.id];
              return (
                <div key={mod.id}>
                  {/* Module header */}
                  <button
                    onClick={() => toggleModule(mod.id)}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition-all text-left"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-black text-white flex-shrink-0"
                        style={{ background: meta.color }}>{mod.id}</span>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-700 truncate">{mod.title}</p>
                        <p className="text-[10px] text-slate-400">{modDone}/{mod.lessons.length} done</p>
                      </div>
                    </div>
                    {isOpen ? <ChevronDown size={14} className="text-slate-400 flex-shrink-0" /> : <ChevronRight size={14} className="text-slate-400 flex-shrink-0" />}
                  </button>

                  {/* Lessons */}
                  {isOpen && (
                    <div className="bg-slate-50/50">
                      {mod.lessons.map((lesson) => {
                        const isActive = activeLesson.id === lesson.id;
                        const isDone   = completed[lesson.id];
                        return (
                          <button
                            key={lesson.id}
                            onClick={() => openLesson(lesson, mod.id)}
                            className={`w-full flex items-start gap-3 px-4 py-2.5 transition-all text-left ${isActive ? "bg-blue-50 border-r-2 border-blue-500" : "hover:bg-white"}`}
                          >
                            <div className="flex-shrink-0 mt-0.5">
                              {isDone ? (
                                <CheckCircle size={15} style={{ color: "#10b981" }} />
                              ) : isActive ? (
                                <Play size={15} style={{ color: meta.color }} />
                              ) : (
                                <div className="w-[15px] h-[15px] rounded-full border-2 border-slate-300" />
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className={`text-xs font-semibold truncate ${isActive ? "text-blue-700" : isDone ? "text-slate-500" : "text-slate-700"}`}>
                                {lesson.id}. {lesson.title}
                              </p>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
                                  <Clock size={9} /> {lesson.duration}
                                </span>
                                {lesson.youtubeId && (
                                  <span className="text-[10px] text-red-400 flex items-center gap-0.5">
                                    <YtIcon size={9} /> Video
                                  </span>
                                )}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* sidebar progress */}
          <div className="p-4 border-t border-slate-100">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-slate-600">Overall Progress</span>
              <span className="text-xs font-bold" style={{ color: meta.color }}>{pct}%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: `linear-gradient(90deg,${meta.color},${meta.color}99)` }} />
            </div>
            <p className="text-[10px] text-slate-400 mt-1">{totalDone} of {allLessons.length} lessons completed</p>
          </div>
        </aside>

        {/* ── Right: lesson viewer ─────────────────────────── */}
        <div className="flex-1 min-w-0 space-y-5">

          {/* YouTube player */}
          <div className="rounded-2xl border overflow-hidden" style={CARD}>
            {activeLesson.youtubeId ? (
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  key={activeLesson.youtubeId}
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${activeLesson.youtubeId}?rel=0&modestbranding=1&color=white`}
                  title={activeLesson.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowFullScreen
                />
              </div>
            ) : (
              <div
                className="relative w-full flex flex-col items-center justify-center gap-5 py-16"
                style={{ background: "linear-gradient(135deg,#060d1f,#0f2044)", minHeight: 340 }}
              >
                <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `linear-gradient(rgba(148,198,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(148,198,255,1) 1px,transparent 1px)`, backgroundSize: "36px 36px" }} />
                <div className="relative z-10 flex flex-col items-center gap-4">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: "rgba(255,0,0,0.15)", border: "2px solid rgba(255,80,80,0.3)" }}>
                    <YtIcon size={36} className="text-red-400" />
                  </div>
                  <div className="text-center">
                    <p className="text-white font-bold text-lg">{activeLesson.title}</p>
                    <p className="text-slate-400 text-sm mt-1">Video lecture available on YouTube</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href={ytSearch(activeLesson.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white text-sm hover:opacity-90 transition-all"
                      style={{ background: "linear-gradient(135deg,#ff0000,#cc0000)", boxShadow: "0 4px 16px rgba(255,0,0,0.35)" }}
                    >
                      <YtIcon size={16} /> Watch on YouTube
                    </a>
                    <a
                      href={`https://www.youtube.com/results?search_query=${encodeURIComponent(`${meta.searchPrefix} ${activeLesson.title}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-slate-300 text-sm hover:bg-white/10 transition-all border border-white/15"
                    >
                      <Search size={14} /> Search Videos
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Lesson info */}
          <div className="rounded-2xl border p-6" style={CARD}>
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full" style={{ background: `${meta.color}15`, color: meta.color }}>
                    Lesson {activeLesson.id}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1"><Clock size={11} /> {activeLesson.duration}</span>
                  {activeLesson.youtubeId && (
                    <a
                      href={`https://www.youtube.com/watch?v=${activeLesson.youtubeId}`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600 font-semibold"
                    >
                      <YtIcon size={11} /> Open in YouTube <ExternalLink size={10} />
                    </a>
                  )}
                </div>
                <h2 className="text-xl font-black text-slate-900">{activeLesson.title}</h2>
              </div>

              <button
                onClick={() => toggleComplete(activeLesson.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:-translate-y-0.5 ${
                  completed[activeLesson.id]
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "text-white"
                }`}
                style={completed[activeLesson.id] ? {} : { background: `linear-gradient(135deg,${meta.color},${meta.color}cc)`, boxShadow: `0 4px 14px ${meta.color}44` }}
              >
                <CheckCircle size={15} />
                {completed[activeLesson.id] ? "Completed ✓" : "Mark Complete"}
              </button>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed">{activeLesson.desc}</p>

            {/* Resources */}
            {activeLesson.resources && activeLesson.resources.length > 0 && (
              <div className="mt-5 pt-5 border-t border-slate-100">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Lesson Resources</p>
                <div className="flex flex-wrap gap-2">
                  {activeLesson.resources.map((r) => (
                    <a
                      key={r}
                      href={`https://www.google.com/search?q=${encodeURIComponent(`Google Earth Engine ${r}`)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-blue-600 hover:border-blue-200 transition-all"
                    >
                      <ExternalLink size={11} /> {r}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Prev / Next navigation */}
          <div className="flex items-center justify-between gap-4">
            {prevLesson ? (
              <button
                onClick={() => {
                  const mod = modules.find((m) => m.lessons.some((l) => l.id === prevLesson.id));
                  if (mod) openLesson(prevLesson, mod.id);
                }}
                className="flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-white hover:shadow-md transition-all group"
                style={{ background: "rgba(255,255,255,0.9)" }}
              >
                <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
                <div className="text-left">
                  <p className="text-[10px] text-slate-400">Previous</p>
                  <p className="truncate max-w-[180px]">{prevLesson.title}</p>
                </div>
              </button>
            ) : <div />}

            {nextLesson ? (
              <button
                onClick={() => {
                  const mod = modules.find((m) => m.lessons.some((l) => l.id === nextLesson.id));
                  if (mod) openLesson(nextLesson, mod.id);
                }}
                className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white hover:opacity-90 hover:-translate-y-0.5 transition-all group"
                style={{ background: `linear-gradient(135deg,${meta.color},${meta.color}cc)`, boxShadow: `0 4px 14px ${meta.color}44` }}
              >
                <div className="text-right">
                  <p className="text-[10px] text-blue-200">Next</p>
                  <p className="truncate max-w-[180px]">{nextLesson.title}</p>
                </div>
                <ChevronRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            ) : (
              pct === 100 ? (
                <Link href="/profile"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-all"
                  style={{ background: "linear-gradient(135deg,#f59e0b,#ea580c)", boxShadow: "0 4px 14px rgba(245,158,11,0.4)" }}>
                  <Award size={15} /> Download Your Certificate
                </Link>
              ) : null
            )}
          </div>

          {/* All modules overview (compact) */}
          <div className="rounded-2xl border p-6" style={CARD}>
            <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Zap size={15} style={{ color: meta.color }} /> All Modules Overview
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {modules.map((mod) => {
                const done = mod.lessons.filter((l) => completed[l.id]).length;
                const modPct = Math.round((done / mod.lessons.length) * 100);
                return (
                  <button
                    key={mod.id}
                    onClick={() => { openLesson(mod.lessons[0], mod.id); setOpenModules((p) => ({ ...p, [mod.id]: true })); }}
                    className="flex items-start gap-3 p-3.5 rounded-xl border hover:shadow-md transition-all text-left group"
                    style={{ borderColor: "rgba(0,0,0,0.06)", background: "#fafbff" }}
                  >
                    <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black text-white flex-shrink-0 mt-0.5"
                      style={{ background: modPct === 100 ? "#10b981" : meta.color }}>
                      {modPct === 100 ? "✓" : mod.id}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-slate-700 leading-snug">{mod.title}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{done}/{mod.lessons.length} · {mod.lessons.reduce((a, l) => a + parseInt(l.duration), 0)} min</p>
                      <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden mt-1.5">
                        <div className="h-full rounded-full" style={{ width: `${modPct}%`, background: modPct === 100 ? "#10b981" : meta.color }} />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── RS Applications section (only for course 2) ──── */}
          {courseId === 2 && (
            <div className="rounded-2xl border p-6" style={CARD}>
              <div className="mb-6">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2 mb-1">
                  <Globe size={16} style={{ color: meta.color }} />
                  Applications of Remote Sensing Across Fields
                </h3>
                <p className="text-xs text-slate-500">
                  Real-world domains where the techniques you learn in this course are actively applied
                </p>
              </div>

              <div className="grid sm:grid-cols-2 xl:grid-cols-2 gap-4">
                {RS_APPLICATIONS.map((app) => (
                  <div
                    key={app.field}
                    className="rounded-xl border p-4 hover:shadow-md transition-all group"
                    style={{ background: app.bg, borderColor: app.border }}
                  >
                    {/* Header */}
                    <div className="flex items-start gap-3 mb-3">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: `${app.color}18`, border: `1.5px solid ${app.color}30` }}
                      >
                        <app.Icon size={18} style={{ color: app.color }} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-black text-slate-800 leading-snug">{app.field}</p>
                        <p className="text-[10px] font-medium mt-0.5" style={{ color: app.color }}>{app.sensors}</p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-600 leading-relaxed mb-3">{app.desc}</p>

                    {/* Concept tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {app.concepts.map((c) => (
                        <span
                          key={c}
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-full border"
                          style={{ color: app.color, background: `${app.color}10`, borderColor: `${app.color}25` }}
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
