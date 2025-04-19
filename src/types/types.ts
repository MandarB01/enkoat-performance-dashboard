export interface RoofingProject {
  projectId: string;
  contractorDetails: {
    name: string;
    company: string;
  };
  roofSize: number;
  roofType: string;
  city: string;
  state: string;
  projectDate: Date;
  estimatedEnergySavings: number;
}

export interface FilterCriteria {
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  state: string | null;
  roofType: string | null;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
  }[];
}
