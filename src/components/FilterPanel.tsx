import { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { FilterCriteria, RoofingProject } from "../types/types";

interface FilterPanelProps {
  filters: FilterCriteria;
  onFilterChange: (filters: FilterCriteria) => void;
  projects: RoofingProject[];
}

const FilterPanel = ({
  filters,
  onFilterChange,
  projects,
}: FilterPanelProps) => {
  const uniqueStates = [...new Set(projects.map((p) => p.state))].sort();
  const uniqueRoofTypes = [...new Set(projects.map((p) => p.roofType))].sort();

  // Convert Date object to YYYY-MM-DD string format for date inputs
  const formatDateForInput = (date: Date | null): string => {
    if (!date) return "";
    return date instanceof Date ? date.toISOString().split("T")[0] : "";
  };

  return (
    <div className="filter-panel">
      <h2>Filters</h2>
      <Formik
        initialValues={filters}
        enableReinitialize
        onSubmit={(values) => {
          onFilterChange(values);
        }}
      >
        {({ submitForm, setFieldValue }) => (
          <Form>
            <div className="filter-group">
              <label>Date Range</label>
              <div className="date-inputs">
                <Field
                  type="date"
                  name="dateRange.start"
                  value={formatDateForInput(filters.dateRange.start)}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const date = e.target.value
                      ? new Date(e.target.value)
                      : null;
                    setFieldValue("dateRange.start", date);
                    submitForm();
                  }}
                />
                <Field
                  type="date"
                  name="dateRange.end"
                  value={formatDateForInput(filters.dateRange.end)}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const date = e.target.value
                      ? new Date(e.target.value)
                      : null;
                    setFieldValue("dateRange.end", date);
                    submitForm();
                  }}
                />
              </div>
            </div>

            <div className="filter-group">
              <label>State</label>
              <Field
                as="select"
                name="state"
                value={filters.state || ""}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  setFieldValue("state", e.target.value || null);
                  submitForm();
                }}
              >
                <option value="">All States</option>
                {uniqueStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </Field>
            </div>

            <div className="filter-group">
              <label>Roof Type</label>
              <Field
                as="select"
                name="roofType"
                value={filters.roofType || ""}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  setFieldValue("roofType", e.target.value || null);
                  submitForm();
                }}
              >
                <option value="">All Types</option>
                {uniqueRoofTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Field>
            </div>

            <button
              type="button"
              onClick={() => {
                onFilterChange({
                  dateRange: { start: null, end: null },
                  state: null,
                  roofType: null,
                });
              }}
            >
              Reset Filters
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FilterPanel;
