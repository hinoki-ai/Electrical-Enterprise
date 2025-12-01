import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface PDFOptions {
  filename?: string;
  quality?: number;
  format?: 'a4' | 'letter';
  orientation?: 'portrait' | 'landscape';
}

export class PDFGenerator {
  private doc: jsPDF;
  private pageWidth: number;
  private pageHeight: number;
  private margin: number;
  private currentY: number;
  private options: PDFOptions;

  constructor(options: PDFOptions = {}) {
    const {
      format = 'a4',
      orientation = 'portrait',
      filename = 'document.pdf'
    } = options;

    this.options = options;
    this.doc = new jsPDF({
      orientation,
      unit: 'mm',
      format,
      compress: true
    });

    this.pageWidth = this.doc.internal.pageSize.getWidth();
    this.pageHeight = this.doc.internal.pageSize.getHeight();
    this.margin = 20; // 20mm margin
    this.currentY = this.margin;

    // Add PDF metadata
    this.addMetadata();

    // Add custom fonts if available
    this.initializeFonts();
  }

  private addMetadata(): void {
    this.doc.setProperties({
      title: 'Proyecto Eléctrico - Presupuesto',
      subject: 'Propuesta Técnica y Presupuesto',
      author: 'Agustín Arancibia Mac-Guire',
      keywords: 'eléctrico, presupuesto, instalación, proyecto',
      creator: 'Electrical Enterprise'
    });
  }

  private initializeFonts(): void {
    try {
      // Try to add Inter font for better rendering
      // Note: In a real implementation, you would embed the font file
      this.doc.setFont('helvetica', 'normal');
    } catch (error) {
      console.warn('Could not initialize custom fonts for PDF:', error);
    }
  }

  private addHeader(pageNum: number, totalPages: number): void {
    const headerY = 10;

    // Add a subtle header line
    this.doc.setDrawColor(200, 200, 200);
    this.doc.setLineWidth(0.5);
    this.doc.line(this.margin, headerY + 5, this.pageWidth - this.margin, headerY + 5);

    // Add page number in top right
    this.doc.setFontSize(8);
    this.doc.setTextColor(100, 100, 100);
    const pageText = `Página ${pageNum} de ${totalPages}`;
    const pageTextWidth = this.doc.getTextWidth(pageText);
    this.doc.text(pageText, this.pageWidth - this.margin - pageTextWidth, headerY + 3);
  }

  private addFooter(): void {
    const footerY = this.pageHeight - 10;

    // Add a subtle footer line
    this.doc.setDrawColor(200, 200, 200);
    this.doc.setLineWidth(0.5);
    this.doc.line(this.margin, footerY - 5, this.pageWidth - this.margin, footerY - 5);

    // Add generation timestamp
    this.doc.setFontSize(6);
    this.doc.setTextColor(100, 100, 100);
    const timestamp = `Generado el ${new Date().toLocaleDateString('es-CL')} a las ${new Date().toLocaleTimeString('es-CL')}`;
    this.doc.text(timestamp, this.margin, footerY - 2);
  }

  async generateFromElement(elementId: string, options: PDFOptions = {}): Promise<void> {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with id "${elementId}" not found`);
    }

    // Clone the element to avoid modifying the original
    const clonedElement = element.cloneNode(true) as HTMLElement;

    // Apply print styles by adding print-specific classes
    this.prepareElementForPDF(clonedElement);

    // Temporarily append to body for rendering
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '-9999px';
    tempContainer.style.width = `${(this.pageWidth - (this.margin * 2)) * 3.78}px`; // Convert mm to pixels (approx)
    tempContainer.style.backgroundColor = 'transparent';
    tempContainer.appendChild(clonedElement);
    document.body.appendChild(tempContainer);

    try {
      // Wait a bit for any dynamic content to render
      await new Promise(resolve => setTimeout(resolve, 100));

      const canvas = await html2canvas(clonedElement, {
        scale: 3,
        useCORS: true,
        backgroundColor: null,
        width: clonedElement.scrollWidth,
        height: clonedElement.scrollHeight,
        logging: false,
        allowTaint: false,
        foreignObjectRendering: true,
        onclone: (clonedDoc) => {
          // Hide the print button in the cloned document
          const noPrintElements = clonedDoc.querySelectorAll('.no-print');
          noPrintElements.forEach(el => {
            (el as HTMLElement).style.display = 'none';
          });
        }
      });

      // Calculate dimensions
      const imgWidth = this.pageWidth - (this.margin * 2);
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Check if content fits on one page
      if (imgHeight <= this.pageHeight - (this.margin * 2) - 20) {
        // Single page
        const imgData = canvas.toDataURL('image/png', 0.95);
        const contentY = this.margin + 15; // Leave space for header
        this.doc.addImage(imgData, 'PNG', this.margin, contentY, imgWidth, imgHeight);

        // Add header and footer
        this.addHeader(1, 1);
        this.addFooter();
      } else {
        // Multi-page handling
        await this.addMultiPageContent(canvas, imgWidth, imgHeight);
      }

      // Save the PDF
      const filename = options.filename || `document-${new Date().toISOString().split('T')[0]}.pdf`;
      this.doc.save(filename);

    } finally {
      // Clean up
      document.body.removeChild(tempContainer);
    }
  }

  private async addMultiPageContent(canvas: HTMLCanvasElement, imgWidth: number, imgHeight: number): Promise<void> {
    const totalHeight = imgHeight;
    const pageContentHeight = this.pageHeight - (this.margin * 2) - 20; // Account for header/footer space
    const totalPages = Math.ceil(totalHeight / pageContentHeight);

    for (let page = 0; page < totalPages; page++) {
      if (page > 0) {
        this.doc.addPage();
      }

      const sourceY = page * pageContentHeight;
      const sourceHeight = Math.min(pageContentHeight, totalHeight - sourceY);

      // Create a temporary canvas for this page's content
      const pageCanvas = document.createElement('canvas');
      const pageCtx = pageCanvas.getContext('2d')!;
      pageCanvas.width = canvas.width;
      pageCanvas.height = (sourceHeight / imgHeight) * canvas.height;

      // Draw the portion of the original canvas for this page
      pageCtx.drawImage(
        canvas,
        0, (sourceY / imgHeight) * canvas.height, // source x, y
        canvas.width, pageCanvas.height, // source width, height
        0, 0, // destination x, y
        canvas.width, pageCanvas.height // destination width, height
      );

      const imgData = pageCanvas.toDataURL('image/png', 0.95);
      const contentY = this.margin + 15; // Leave space for header
      this.doc.addImage(imgData, 'PNG', this.margin, contentY, imgWidth, sourceHeight);

      // Add header and footer
      this.addHeader(page + 1, totalPages);
      this.addFooter();
    }
  }


  private prepareElementForPDF(element: HTMLElement): void {
    // Set container width to match PDF page width
    const pixelWidth = (this.pageWidth - (this.margin * 2)) * 3.78; // Convert mm to pixels
    element.style.width = `${pixelWidth}px`;
    element.style.maxWidth = `${pixelWidth}px`;
    element.style.margin = '0 auto';
    
    // Hide any interactive elements
    const buttons = element.querySelectorAll('button, input, select, textarea, [role="button"]');
    buttons.forEach(btn => {
      (btn as HTMLElement).style.display = 'none';
    });

    // Hide no-print elements
    const noPrintElements = element.querySelectorAll('.no-print');
    noPrintElements.forEach(el => {
      (el as HTMLElement).style.display = 'none';
    });

    // Ensure tables are properly styled
    const tables = element.querySelectorAll('table');
    tables.forEach(table => {
      (table as HTMLElement).style.borderCollapse = 'collapse';
      (table as HTMLElement).style.width = '100%';
    });
  }

  // Method to generate PDF from multiple elements (for complex documents)
  async generateFromMultipleElements(elementIds: string[], options: PDFOptions = {}): Promise<void> {
    const { filename = 'document.pdf' } = options;

    this.doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    for (let i = 0; i < elementIds.length; i++) {
      const elementId = elementIds[i];

      if (i > 0) {
        this.doc.addPage();
      }

      await this.addElementToCurrentPage(elementId, i + 1, elementIds.length);
    }

    this.doc.save(filename);
  }

  private async addElementToCurrentPage(elementId: string, pageNum: number, totalPages: number): Promise<void> {
    const element = document.getElementById(elementId);
    if (!element) return;

    const clonedElement = element.cloneNode(true) as HTMLElement;
    this.prepareElementForPDF(clonedElement);

    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '-9999px';
    tempContainer.style.width = `${(this.pageWidth - (this.margin * 2)) * 3.78}px`;
    tempContainer.style.backgroundColor = 'transparent';
    tempContainer.appendChild(clonedElement);
    document.body.appendChild(tempContainer);

    try {
      // Wait a bit for any dynamic content to render
      await new Promise(resolve => setTimeout(resolve, 100));

      const canvas = await html2canvas(clonedElement, {
        scale: 3,
        useCORS: true,
        backgroundColor: null,
        width: clonedElement.scrollWidth,
        height: clonedElement.scrollHeight,
        logging: false,
        allowTaint: false,
        foreignObjectRendering: true,
        onclone: (clonedDoc) => {
          // Hide the print button in the cloned document
          const noPrintElements = clonedDoc.querySelectorAll('.no-print');
          noPrintElements.forEach(el => {
            (el as HTMLElement).style.display = 'none';
          });
        }
      });

      const imgWidth = this.pageWidth - (this.margin * 2);
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const imgData = canvas.toDataURL('image/png', 0.95);
      const contentY = this.margin + 15; // Leave space for header
      this.doc.addImage(imgData, 'PNG', this.margin, contentY, imgWidth, imgHeight);

      // Add header and footer
      this.addHeader(pageNum, totalPages);
      this.addFooter();

    } finally {
      document.body.removeChild(tempContainer);
    }
  }
}

// Convenience functions
export async function generatePDF(elementId: string, options: PDFOptions = {}): Promise<void> {
  const generator = new PDFGenerator(options);
  await generator.generateFromElement(elementId, options);
}

export async function generateMultiPagePDF(elementIds: string[], options: PDFOptions = {}): Promise<void> {
  const generator = new PDFGenerator(options);
  await generator.generateFromMultipleElements(elementIds, options);
}

// Specific function for the electrical quote document
export async function generateElectricalQuotePDF(): Promise<void> {
  try {
    // Generate PDF from the entire document
    const generator = new PDFGenerator({
      filename: `proyecto-electrico-${new Date().toISOString().split('T')[0]}.pdf`
    });

    await generator.generateFromElement('electrical-quote-document', {
      filename: `proyecto-electrico-${new Date().toISOString().split('T')[0]}.pdf`
    });

  } catch (error) {
    console.error('Error generating electrical quote PDF:', error);
    throw error;
  }
}
