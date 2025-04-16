import jsPDF from "jspdf";
import "jspdf-autotable";
import { unparse } from "papaparse";
import { RoofingProject } from "../types/types";

interface ExportButtonsProps {
  data: RoofingProject[];
}

const ExportButtons = ({ data }: ExportButtonsProps) => {
  const exportToPDF = () => {
    try {
      // Initialize jsPDF
      const doc = new jsPDF("landscape", "mm", "a4");

      // Validate data
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error("No data available to export");
      }

      const tableColumn = [
        "Project ID",
        "Contractor",
        "Location",
        "Roof Size (sq ft)",
        "Energy Savings (kWh)",
      ];

      const tableRows = data.map((project) => [
        project.projectId || "",
        project.contractorDetails?.company || "",
        `${project.city || ""}, ${project.state || ""}`,
        (project.roofSize || 0).toString(),
        (project.estimatedEnergySavings || 0).toString(),
      ]);

      // Set document properties
      doc.setProperties({
        title: "Roofing Projects Report",
        subject: "Project Data Export",
        author: "EnKoat Dashboard",
        creator: "EnKoat Dashboard",
      });

      // Add title and date
      doc.setFontSize(16);
      doc.text("Roofing Projects Report", 14, 15);

      doc.setFontSize(11);
      const dateStr = new Date().toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      doc.text(`Generated on: ${dateStr}`, 14, 25);

      // Add the table
      (doc as any).autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 35,
        theme: "grid",
        styles: {
          fontSize: 8,
          cellPadding: 2,
          overflow: "linebreak",
        },
        headStyles: {
          fillColor: [231, 76, 60],
          textColor: [255, 255, 255],
          fontStyle: "bold",
        },
        columnStyles: {
          0: { cellWidth: 45 },
          1: { cellWidth: 45 },
          2: { cellWidth: 45 },
          3: { cellWidth: 30 },
          4: { cellWidth: 35 },
        },
        margin: { top: 35 },
      });

      // Save the document
      doc.save("roofing-projects-report.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("There was an error generating the PDF. Please try again.");
    }
  };

  const exportToCSV = () => {
    const csvData = data.map((project) => ({
      projectId: project.projectId,
      contractorName: project.contractorDetails.name,
      company: project.contractorDetails.company,
      roofSize: project.roofSize,
      roofType: project.roofType,
      city: project.city,
      state: project.state,
      projectDate: project.projectDate.toISOString(),
      estimatedEnergySavings: project.estimatedEnergySavings,
    }));

    const csv = unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "roofing-projects.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="export-buttons">
      <button onClick={exportToPDF} className="export-btn pdf">
        Export to PDF
      </button>
      <button onClick={exportToCSV} className="export-btn csv">
        Export to CSV
      </button>
    </div>
  );
};

export default ExportButtons;
