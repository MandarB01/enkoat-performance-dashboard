import { faker } from "@faker-js/faker";
import { RoofingProject } from "../types/types";

// Generate consistent mock data
faker.seed(123);

const roofTypes = ["Asphalt Shingle", "Metal", "Slate", "Tile", "Green Roof"];

const generateMockProjects = (count: number = 1000): RoofingProject[] => {
  return Array.from({ length: count }, () => ({
    projectId: faker.string.uuid(),
    contractorDetails: {
      name: faker.person.fullName(),
      company: faker.company.name(),
    },
    roofSize: faker.number.int({ min: 1000, max: 10000 }),
    roofType: faker.helpers.arrayElement(roofTypes),
    city: faker.location.city(),
    state: faker.location.state(),
    projectDate: faker.date.between({
      from: "2024-01-01",
      to: "2025-04-15",
    }),
    estimatedEnergySavings: faker.number.int({ min: 5000, max: 50000 }),
  }));
};

export const mockProjects = generateMockProjects();

// Export helper functions for filtering and data manipulation
export const getUniqueStates = () => [
  ...new Set(mockProjects.map((p) => p.state)),
];
export const getUniqueRoofTypes = () => [
  ...new Set(mockProjects.map((p) => p.roofType)),
];

export const getProjectsByState = () => {
  return mockProjects.reduce((acc, project) => {
    acc[project.state] = (acc[project.state] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
};

export const getMonthlyTrends = () => {
  return mockProjects.reduce((acc, project) => {
    const month = project.projectDate.toLocaleString("default", {
      month: "short",
    });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
};
