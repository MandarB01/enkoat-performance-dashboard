import jsPDF from "jspdf";

declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: {
      head: string[][];
      body: string[][];
      startY?: number;
      theme?: string;
      styles?: {
        fontSize?: number;
        cellPadding?: number;
        overflow?: string;
      };
      headStyles?: {
        fillColor?: number[];
        textColor?: number[];
        fontStyle?: string;
      };
      columnStyles?: {
        [key: number]: {
          cellWidth?: number;
        };
      };
      margin?: {
        top?: number;
      };
    }) => jsPDF;
  }
}
