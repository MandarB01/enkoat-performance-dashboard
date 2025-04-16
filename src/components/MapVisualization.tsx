import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { RoofingProject } from "../types/types";

interface MapVisualizationProps {
  projects: RoofingProject[];
}

const MapVisualization = ({ projects }: MapVisualizationProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const geocodingRequestsRef = useRef<AbortController[]>([]);

  useEffect(() => {
    const loader = new Loader({
      apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
      version: "beta",
      libraries: ["marker"],
      mapIds: ["7a60938efd28f95"],
    });

    loader.load().then(() => {
      if (!mapRef.current || mapInstance.current) return;

      mapInstance.current = new google.maps.Map(mapRef.current, {
        center: { lat: 39.8283, lng: -98.5795 },
        zoom: 4,
        mapId: "7a60938efd28f95",
      });

      infoWindowRef.current = new google.maps.InfoWindow();
    });

    return () => {
      // Cleanup
      markersRef.current.forEach((marker) => (marker.map = null));
      markersRef.current = [];
      if (infoWindowRef.current) {
        infoWindowRef.current.close();
      }
      // Abort any pending geocoding requests
      geocodingRequestsRef.current.forEach((controller) => controller.abort());
      geocodingRequestsRef.current = [];
    };
  }, []);

  useEffect(() => {
    if (!mapInstance.current) return;

    // Clear existing markers and abort pending requests
    markersRef.current.forEach((marker) => (marker.map = null));
    markersRef.current = [];
    geocodingRequestsRef.current.forEach((controller) => controller.abort());
    geocodingRequestsRef.current = [];

    // Create a geocoding queue to handle requests
    const geocoder = new google.maps.Geocoder();
    const geocodeLocation = async (project: RoofingProject) => {
      const controller = new AbortController();
      geocodingRequestsRef.current.push(controller);

      try {
        const response = await new Promise<google.maps.GeocoderResult[]>(
          (resolve, reject) => {
            geocoder.geocode(
              { address: `${project.city}, ${project.state}` },
              (results, status) => {
                if (status === "OK" && results) {
                  resolve(results);
                } else {
                  reject(new Error(`Geocoding failed: ${status}`));
                }
              }
            );
          }
        );

        if (controller.signal.aborted) return;

        if (response[0] && mapInstance.current && infoWindowRef.current) {
          const position = response[0].geometry.location;

          const markerElement = document.createElement("div");
          markerElement.className = "marker";
          markerElement.style.backgroundColor = "#e74c3c";
          markerElement.style.borderRadius = "50%";
          markerElement.style.padding = "6px";
          markerElement.style.border = "2px solid white";

          const marker = new google.maps.marker.AdvancedMarkerElement({
            map: mapInstance.current,
            position,
            title: `${project.city}, ${project.state}`,
            content: markerElement,
          });

          marker.addEventListener("gmp-click", () => {
            if (infoWindowRef.current && mapInstance.current) {
              infoWindowRef.current.setContent(`
                <div>
                  <h3>${project.city}, ${project.state}</h3>
                  <p>Roof Size: ${project.roofSize} sq ft</p>
                  <p>Energy Savings: ${project.estimatedEnergySavings} kWh</p>
                  <p>Contractor: ${project.contractorDetails.company}</p>
                </div>
              `);
              infoWindowRef.current.open({
                map: mapInstance.current,
                anchor: marker,
              });
            }
          });

          markersRef.current.push(marker);
        }
      } catch (error) {
        console.error("Geocoding error:", error);
      } finally {
        const index = geocodingRequestsRef.current.indexOf(controller);
        if (index > -1) {
          geocodingRequestsRef.current.splice(index, 1);
        }
      }
    };

    // Process projects in batches to avoid rate limiting
    const batchSize = 10;
    const processBatch = async (startIndex: number) => {
      const batch = projects.slice(startIndex, startIndex + batchSize);
      await Promise.all(batch.map(geocodeLocation));

      if (startIndex + batchSize < projects.length) {
        setTimeout(() => {
          processBatch(startIndex + batchSize);
        }, 1000); // 1 second delay between batches
      }
    };

    processBatch(0);

    return () => {
      // Cleanup batch processing
      geocodingRequestsRef.current.forEach((controller) => controller.abort());
      geocodingRequestsRef.current = [];
    };
  }, [projects]);

  return (
    <div className="map-container">
      <div ref={mapRef} style={{ width: "100%", height: "400px" }} />
    </div>
  );
};

export default MapVisualization;
