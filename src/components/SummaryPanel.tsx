import { RoofingProject } from "../types/types";

interface SummaryPanelProps {
  projects: RoofingProject[];
}

const SummaryPanel = ({ projects }: SummaryPanelProps) => {
  const totalProjects = projects.length;
  const averageRoofSize =
    projects.length > 0
      ? Math.round(
          projects.reduce((sum, p) => sum + p.roofSize, 0) / projects.length
        )
      : 0;
  const totalEnergySavings = Math.round(
    projects.reduce((sum, p) => sum + p.estimatedEnergySavings, 0)
  );

  const uniqueContractors = new Set(
    projects.map((p) => p.contractorDetails.company)
  ).size;

  return (
    <div className="summary-panel">
      <h2>Dashboard Summary</h2>
      <div className="metrics-grid">
        <div className="metric-card">
          <h3>Total Projects</h3>
          <p className="metric-value">{totalProjects}</p>
        </div>
        <div className="metric-card">
          <h3>Average Roof Size</h3>
          <p className="metric-value">{averageRoofSize} sq ft</p>
        </div>
        <div className="metric-card">
          <h3>Total Energy Savings</h3>
          <p className="metric-value">{totalEnergySavings} kWh</p>
        </div>
        <div className="metric-card">
          <h3>Unique Contractors</h3>
          <p className="metric-value">{uniqueContractors}</p>
        </div>
      </div>
    </div>
  );
};

export default SummaryPanel;
