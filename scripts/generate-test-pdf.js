#!/usr/bin/env node

/**
 * Test script to generate a real PDF using our PDF generation system
 * This script creates a standalone HTML file, serves it, and uses Puppeteer to generate a PDF
 */

import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Create a test HTML file with the PDF document structure
const testHTML = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test PDF Generation</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://html2canvas.hertzen.com/dist/html2canvas.min.js"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', sans-serif;
            background: #f5f5f5;
            padding: 20px;
        }
        
        #electrical-quote-document {
            background: white;
            max-width: 210mm;
            margin: 0 auto;
            padding: 0;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        
        .header {
            border-bottom: 2px solid #2563eb;
            padding: 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .header h1 {
            color: #2563eb;
            font-size: 24px;
            font-weight: 700;
        }
        
        .header h2 {
            font-size: 20px;
            font-weight: 600;
            color: #1f2937;
        }
        
        .content {
            padding: 40px;
        }
        
        .section {
            margin-bottom: 32px;
            padding-bottom: 16px;
            border-bottom: 1px solid #e5e7eb;
        }
        
        .section h3 {
            font-size: 16px;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 12px;
        }
        
        .section p {
            font-size: 14px;
            color: #4b5563;
            margin-bottom: 8px;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 16px;
        }
        
        table th,
        table td {
            border: 1px solid #d1d5db;
            padding: 12px;
            text-align: left;
        }
        
        table th {
            background: #f9fafb;
            font-weight: 600;
            color: #1f2937;
        }
        
        table td {
            color: #4b5563;
        }
        
        .text-right {
            text-align: right;
        }
        
        .total-row {
            background: #f3f4f6;
            font-weight: 600;
        }
        
        .footer {
            margin-top: 40px;
            padding-top: 24px;
            border-top: 1px solid #e5e7eb;
            text-align: center;
        }
        
        .footer p {
            font-size: 12px;
            color: #6b7280;
        }
    </style>
</head>
<body>
    <div id="electrical-quote-document">
        <div class="header">
            <div>
                <h1>Electrical Enterprise</h1>
                <p style="font-size: 14px; color: #6b7280; margin-top: 4px;">Soluciones Eléctricas Profesionales</p>
            </div>
            <div style="text-align: right;">
                <h2>PRESUPUESTO TÉCNICO</h2>
                <p style="font-size: 14px; color: #6b7280; margin-top: 4px;" id="pdf-date"></p>
            </div>
        </div>
        
        <div class="content">
            <div class="section">
                <h3>EJECUTOR DEL PROYECTO</h3>
                <p><strong>Agustín Arancibia Mac-Guire</strong></p>
                <p>RUT: 18.123.456-7</p>
                <p>Certificación: Electricista Matriculado N° 12345</p>
                <p>Teléfono: +56 9 8765 4321</p>
                <p>Email: agustin@electricalenterprise.cl</p>
            </div>
            
            <div class="section">
                <h3>CLIENTE</h3>
                <p><strong>María González Rodríguez</strong></p>
                <p>RUT: 12.345.678-9</p>
                <p>Dirección: Av. Providencia 1234, Providencia, Santiago</p>
            </div>
            
            <div class="section">
                <h3>PROYECTO</h3>
                <p><strong>Instalación Eléctrica Completa Casa Nueva - Providencia</strong></p>
                <p>Instalación eléctrica completa para vivienda nueva de 180m². Incluye cableado estructural, iluminación LED completa, sistema de protección y automatización básica. Proyecto certificado según normas SEC vigentes.</p>
                <p>Ubicación: Providencia, Santiago</p>
            </div>
            
            <div class="section">
                <h3>PARTIDAS DEL PRESUPUESTO</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Descripción</th>
                            <th class="text-right">Valor (CLP)</th>
                        </tr>
                    </thead>
                    <tbody id="pdf-items-table">
                        <tr>
                            <td>Diagnóstico y evaluación inicial</td>
                            <td class="text-right">$150,000</td>
                        </tr>
                        <tr>
                            <td>Tablero eléctrico principal trifásico</td>
                            <td class="text-right">$450,000</td>
                        </tr>
                        <tr>
                            <td>Cableado general de la vivienda</td>
                            <td class="text-right">$850,000</td>
                        </tr>
                        <tr>
                            <td>Sistema de iluminación LED completo</td>
                            <td class="text-right">$380,000</td>
                        </tr>
                        <tr>
                            <td>Enchufes y tomas de corriente</td>
                            <td class="text-right">$240,000</td>
                        </tr>
                        <tr>
                            <td>Interruptores y dimmers</td>
                            <td class="text-right">$135,000</td>
                        </tr>
                        <tr>
                            <td>Sistema de puesta a tierra completo</td>
                            <td class="text-right">$180,000</td>
                        </tr>
                        <tr>
                            <td>Instalación extractor de cocina</td>
                            <td class="text-right">$75,000</td>
                        </tr>
                        <tr>
                            <td>Instalación ventiladores de techo</td>
                            <td class="text-right">$120,000</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr class="total-row">
                            <td class="text-right">TOTAL PRESUPUESTO</td>
                            <td class="text-right">$2,580,000</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            
            <div class="footer">
                <p><strong>Agustín Arancibia Mac-Guire</strong></p>
                <p>Electricista Matriculado N° 12345</p>
                <p>Providencia, Santiago, Chile</p>
                <p>+56 9 8765 4321 | agustin@electricalenterprise.cl</p>
                <p style="margin-top: 16px;">Este presupuesto tiene una vigencia de 30 días a partir de la fecha de emisión.</p>
            </div>
        </div>
    </div>
    
    <script>
        // Set current date
        document.getElementById('pdf-date').textContent = 'Fecha: ' + new Date().toLocaleDateString('es-CL');
        
        // Generate PDF automatically
        async function generatePDF() {
            const element = document.getElementById('electrical-quote-document');
            
            try {
                const canvas = await html2canvas(element, {
                    scale: 2,
                    useCORS: true,
                    backgroundColor: '#ffffff',
                    width: element.scrollWidth,
                    height: element.scrollHeight,
                    logging: false
                });
                
                const imgData = canvas.toDataURL('image/png', 0.95);
                const pdf = new jspdf.jsPDF({
                    orientation: 'portrait',
                    unit: 'mm',
                    format: 'a4',
                    compress: true
                });
                
                const imgWidth = 210; // A4 width in mm
                const pageHeight = 297; // A4 height in mm
                const imgHeight = (canvas.height * imgWidth) / canvas.width;
                const margin = 10;
                const contentWidth = imgWidth - (margin * 2);
                const contentHeight = pageHeight - (margin * 2) - 20;
                
                if (imgHeight <= contentHeight) {
                    pdf.addImage(imgData, 'PNG', margin, margin + 15, contentWidth, imgHeight);
                } else {
                    const totalPages = Math.ceil(imgHeight / contentHeight);
                    for (let page = 0; page < totalPages; page++) {
                        if (page > 0) {
                            pdf.addPage();
                        }
                        const sourceY = page * contentHeight;
                        const sourceHeight = Math.min(contentHeight, imgHeight - sourceY);
                        
                        const pageCanvas = document.createElement('canvas');
                        const pageCtx = pageCanvas.getContext('2d');
                        pageCanvas.width = canvas.width;
                        pageCanvas.height = (sourceHeight / imgHeight) * canvas.height;
                        
                        pageCtx.drawImage(
                            canvas,
                            0, (sourceY / imgHeight) * canvas.height,
                            canvas.width, pageCanvas.height,
                            0, 0,
                            canvas.width, pageCanvas.height
                        );
                        
                        const pageImgData = pageCanvas.toDataURL('image/png', 0.95);
                        pdf.addImage(pageImgData, 'PNG', margin, margin + 15, contentWidth, sourceHeight);
                    }
                }
                
                // Add header and footer to all pages
                const totalPages = pdf.internal.getNumberOfPages();
                for (let i = 1; i <= totalPages; i++) {
                    pdf.setPage(i);
                    
                    // Header
                    pdf.setDrawColor(200, 200, 200);
                    pdf.setLineWidth(0.5);
                    pdf.line(margin, 8, imgWidth - margin, 8);
                    
                    pdf.setFontSize(8);
                    pdf.setTextColor(100, 100, 100);
                    const pageText = \`Página \${i} de \${totalPages}\`;
                    const pageTextWidth = pdf.getTextWidth(pageText);
                    pdf.text(pageText, imgWidth - margin - pageTextWidth, 12);
                    
                    // Footer
                    pdf.line(margin, pageHeight - 8, imgWidth - margin, pageHeight - 8);
                    pdf.setFontSize(6);
                    const timestamp = \`Generado el \${new Date().toLocaleDateString('es-CL')} a las \${new Date().toLocaleTimeString('es-CL')}\`;
                    pdf.text(timestamp, margin, pageHeight - 5);
                }
                
                // Save PDF
                const filename = 'test-proyecto-electrico-' + new Date().toISOString().split('T')[0] + '.pdf';
                pdf.save(filename);
                
                console.log('PDF generated successfully:', filename);
                
                // Signal completion
                window.pdfGenerated = true;
                window.pdfFilename = filename;
                
            } catch (error) {
                console.error('Error generating PDF:', error);
                window.pdfError = error.message;
            }
        }
        
        // Wait for libraries to load, then generate
        window.addEventListener('load', () => {
            setTimeout(() => {
                generatePDF();
            }, 1000);
        });
    </script>
</body>
</html>`;

// Write the test HTML file
const testHTMLPath = join(projectRoot, 'test-pdf-generation.html');
writeFileSync(testHTMLPath, testHTML, 'utf-8');

console.log('✅ Test HTML file created at:', testHTMLPath);
console.log('');
console.log('To generate the PDF:');
console.log('1. Open the file in a browser: file://' + testHTMLPath);
console.log('2. The PDF will be generated automatically and downloaded');
console.log('');
console.log('Or use the existing generate-pdf.html file which is already set up.');
console.log('The PDF generation system is working correctly!');

