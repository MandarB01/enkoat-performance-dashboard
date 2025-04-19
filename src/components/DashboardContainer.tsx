import { useState, useEffect } from "react";
import { RoofingProject, FilterCriteria } from "../types/types";
import { mockProjects } from "../data/mockData";
import FilterPanel from "./FilterPanel";
import ChartComponent from "./ChartComponent";
import SummaryPanel from "./SummaryPanel";
import MapVisualization from "./MapVisualization";
import ExportButtons from "./ExportButtons";

const DashboardContainer = () => {
  const [projects, setProjects] = useState<RoofingProject[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<RoofingProject[]>(
    []
  );
  const [filters, setFilters] = useState<FilterCriteria>({
    dateRange: { start: null, end: null },
    state: null,
    roofType: null,
  });

  useEffect(() => {
    // Initialize with mock data
    setProjects(mockProjects);
    setFilteredProjects(mockProjects);
  }, []);

  useEffect(() => {
    // Apply filters
    let filtered = [...projects];

    if (filters.dateRange.start && filters.dateRange.end) {
      filtered = filtered.filter(
        (project) =>
          project.projectDate >= filters.dateRange.start! &&
          project.projectDate <= filters.dateRange.end!
      );
    }

    if (filters.state) {
      filtered = filtered.filter((project) => project.state === filters.state);
    }

    if (filters.roofType) {
      filtered = filtered.filter(
        (project) => project.roofType === filters.roofType
      );
    }

    setFilteredProjects(filtered);
  }, [filters, projects]);

  return (
    <div className="dashboard-container">
      <FilterPanel
        filters={filters}
        onFilterChange={setFilters}
        projects={projects}
      />
      <div className="dashboard-content">
        <SummaryPanel projects={filteredProjects} />
        <div className="charts-grid">
          <ChartComponent
            type="bar"
            projects={filteredProjects}
            metric="projectsByState"
          />
          <ChartComponent
            type="bar"
            projects={filteredProjects}
            metric="roofSizeByType"
          />
          <ChartComponent
            type="bar"
            projects={filteredProjects}
            metric="energySavingsByType"
          />
          <ChartComponent
            type="line"
            projects={filteredProjects}
            metric="monthlyTrends"
          />
        </div>
        <MapVisualization projects={filteredProjects} />
        <ExportButtons data={filteredProjects} />
      </div>
    </div>
  );
};

export default DashboardContainer;
