import { ConvexHttpClient } from "convex/browser";
import { api } from "./convex/_generated/api.js";

async function generateMockQuote() {
  // Initialize Convex client
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
  console.log("🔗 Convex URL:", convexUrl);

  if (!convexUrl) {
    throw new Error("NEXT_PUBLIC_CONVEX_URL environment variable is not set");
  }

  const convex = new ConvexHttpClient(convexUrl);

  console.log("🚀 Generating comprehensive mock quote...");

  try {
    // Step 1: Create client
    console.log("📝 Creating client...");
    const clientId = await convex.mutation(api.clients.create, {
      name: "María González Rodríguez",
      rut: "12.345.678-9",
      phone: "+56987654321",
      email: "maria.gonzalez@email.cl",
      address: "Av. Providencia 1234, Providencia, Santiago",
      location: "Providencia, Santiago",
      notes: "Cliente residencial, primera instalación eléctrica completa en casa nueva. Prefiere acabados premium y está interesada en soluciones de eficiencia energética."
    });

    console.log(`✅ Client created with ID: ${clientId}`);

    // Step 2: Create comprehensive quote with multiple line items
    console.log("📋 Creating quote with line items...");

    const quoteItems = [
      // Basic installation
      {
        id: "diagnostico-inicial",
        name: "Diagnóstico y evaluación inicial",
        description: "Inspección completa de la instalación existente, medición de cargas, evaluación de normas SEC y recomendaciones técnicas",
        value: 150000,
        category: "Diagnóstico",
        isOptional: false,
        isIncluded: true,
      },
      {
        id: "tablero-principal",
        name: "Tablero eléctrico principal trifásico",
        description: "Suministro e instalación de tablero Schneider Electric con protecciones completas (diferencial, magnetotérmicos, DPS)",
        value: 450000,
        category: "Tablero Eléctrico",
        isOptional: false,
        isIncluded: true,
      },
      {
        id: "cableado-general",
        name: "Cableado general de la vivienda",
        description: "Instalación completa de cableado con cable THW Nexans 2.5mm² para circuitos generales, tierra de protección completa",
        value: 850000,
        category: "Cableado",
        isOptional: false,
        isIncluded: true,
      },
      {
        id: "iluminacion-led",
        name: "Sistema de iluminación LED completo",
        description: "Instalación de luminarias LED Philips en todas las áreas: 12 spots en living, 8 en comedor, 6 en dormitorio principal, 4 en dormitorios secundarios",
        value: 380000,
        category: "Iluminación",
        isOptional: false,
        isIncluded: true,
      },
      {
        id: "enchufes-toma-corriente",
        name: "Enchufes y tomas de corriente",
        description: "Instalación de 24 enchufes Schneider Asfora con protección infantil, distribución estratégica en toda la vivienda",
        value: 240000,
        category: "Enchufes",
        isOptional: false,
        isIncluded: true,
      },
      {
        id: "interruptores-dimmer",
        name: "Interruptores y dimmers",
        description: "Instalación de 18 interruptores simples/dobles Schneider con 3 dimmers en áreas principales",
        value: 135000,
        category: "Controles",
        isOptional: false,
        isIncluded: true,
      },
      {
        id: "puesta-tierra",
        name: "Sistema de puesta a tierra completo",
        description: "Instalación de sistema de puesta a tierra según norma SEC con varilla de cobre y cable de conexión",
        value: 180000,
        category: "Protección",
        isOptional: false,
        isIncluded: true,
      },
      // Optional items
      {
        id: "extractor-cocina",
        name: "Instalación extractor de cocina",
        description: "Circuito dedicado para extractor de cocina con interruptor independiente",
        value: 75000,
        category: "Especializados",
        isOptional: true,
        isIncluded: true,
      },
      {
        id: "ventilador-techo",
        name: "Instalación ventiladores de techo",
        description: "Instalación de 3 ventiladores de techo con controles remotos en dormitorios principales",
        value: 120000,
        category: "Ventilación",
        isOptional: true,
        isIncluded: true,
      },
      {
        id: "sistema-ups",
        name: "Sistema UPS para equipos críticos",
        description: "Instalación de UPS APC para router, computadores y sistema de alarma",
        value: 250000,
        category: "Protección",
        isOptional: true,
        isIncluded: false,
      },
    ];

    // Calculate total value
    const totalValue = quoteItems.reduce((sum, item) => sum + item.value, 0);

    // Step 3: Create quote options
    const quoteOptions = [
      {
        id: "opcion-a",
        name: "Opción A - Instalación Básica",
        description: "Instalación eléctrica completa con materiales estándar, incluye todos los elementos esenciales para una vivienda segura y funcional",
        items: ["diagnostico-inicial", "tablero-principal", "cableado-general", "iluminacion-led", "enchufes-toma-corriente", "interruptores-dimmer", "puesta-tierra"],
        totalValue: 2385000,
        isRecommended: false,
      },
      {
        id: "opcion-b",
        name: "Opción B - Instalación Premium (Recomendada)",
        description: "Instalación completa con acabados premium, incluye elementos opcionales recomendados para mayor confort y funcionalidad",
        items: ["diagnostico-inicial", "tablero-principal", "cableado-general", "iluminacion-led", "enchufes-toma-corriente", "interruptores-dimmer", "puesta-tierra", "extractor-cocina", "ventilador-techo"],
        totalValue: 2585000,
        isRecommended: true,
      },
      {
        id: "opcion-c",
        name: "Opción C - Instalación Full Premium",
        description: "Instalación completa premium más sistema UPS para equipos críticos y máxima protección",
        items: ["diagnostico-inicial", "tablero-principal", "cableado-general", "iluminacion-led", "enchufes-toma-corriente", "interruptores-dimmer", "puesta-tierra", "extractor-cocina", "ventilador-techo", "sistema-ups"],
        totalValue: 2835000,
        isRecommended: false,
      },
    ];

    // Step 4: Create annexes
    const annexes = [
      {
        id: "anexo-iluminacion",
        title: "Anexo A - Sistema de Iluminación Exterior",
        items: [
          {
            id: "iluminacion-exterior-1",
            name: "Iluminación exterior entrada principal",
            description: "Instalación de 2 luminarias LED exteriores con sensor de movimiento",
            value: 120000,
            isOptional: false,
            isIncluded: true,
          },
          {
            id: "iluminacion-exterior-2",
            name: "Iluminación jardín trasero",
            description: "Instalación de 4 proyectores LED para jardín con temporizador",
            value: 180000,
            isOptional: true,
            isIncluded: false,
          },
        ],
        totalValue: 300000,
      },
      {
        id: "anexo-seguridad",
        title: "Anexo B - Sistema de Seguridad Eléctrica",
        items: [
          {
            id: "seguridad-1",
            name: "Circuito dedicado alarma",
            description: "Instalación de circuito independiente para sistema de alarma con backup de batería",
            value: 95000,
            isOptional: false,
            isIncluded: true,
          },
          {
            id: "seguridad-2",
            name: "Iluminación de emergencia",
            description: "Instalación de 6 luminarias de emergencia con batería recargable",
            value: 220000,
            isOptional: true,
            isIncluded: false,
          },
        ],
        totalValue: 315000,
      },
    ];

    // Step 5: Create payment structure
    const payments = [
      {
        id: "pago-1",
        name: "Pago inicial - Materiales y diagnóstico",
        description: "30% del valor total - Adquisición de materiales principales y diagnóstico inicial",
        percentage: 30,
        amount: Math.round(totalValue * 0.3),
        isPaid: false,
        paidAt: undefined,
      },
      {
        id: "pago-2",
        name: "Pago intermedio - Instalación base",
        description: "35% del valor total - Cableado general, tablero e iluminación básica",
        percentage: 35,
        amount: Math.round(totalValue * 0.35),
        isPaid: false,
        paidAt: undefined,
      },
      {
        id: "pago-3",
        name: "Pago final - Acabados y pruebas",
        description: "35% del valor total - Enchufes, interruptores, pruebas finales y certificación",
        percentage: 35,
        amount: Math.round(totalValue * 0.35),
        isPaid: false,
        paidAt: undefined,
      },
    ];

    // Step 6: Create the quote
    const quoteId = await convex.mutation(api.quotes.create, {
      clientId,
      clientName: "María González Rodríguez",
      clientRut: "12.345.678-9",
      projectName: "Instalación Eléctrica Completa Casa Nueva - Providencia",
      projectType: "residential",
      location: "Providencia, Santiago",
      description: "Instalación eléctrica completa para vivienda nueva de 180m². Incluye cableado estructural, iluminación LED completa, sistema de protección y automatización básica. Proyecto certificado según normas SEC vigentes.",
      totalValue,
      plan: "premium",
      status: "sent",
      items: quoteItems,
      options: quoteOptions,
      annexes: annexes,
      payments: payments,
      notes: "Cliente solicita instalación con acabados premium. Preferencia por marcas reconocidas (Schneider, Philips, Nexans). Proyecto debe estar listo en 15 días hábiles.",
      internalNotes: "Cliente contactó por referencia. Presupuesto competitivo aprobado por supervisor. Materiales ya cotizados con proveedores.",
    });

    console.log(`✅ Quote created successfully with ID: ${quoteId}`);
    console.log(`💰 Total quote value: $${totalValue.toLocaleString("es-CL")} CLP`);
    console.log(`📊 Number of line items: ${quoteItems.length}`);
    console.log(`🔧 Number of options: ${quoteOptions.length}`);
    console.log(`📎 Number of annexes: ${annexes.length}`);
    console.log(`💳 Number of payment milestones: ${payments.length}`);

    // Step 7: Retrieve and display the created quote
    const createdQuote = await convex.query(api.quotes.get, { id: quoteId });
    console.log("\n📋 Quote Summary:");
    console.log(`Cliente: ${createdQuote.clientName}`);
    console.log(`Proyecto: ${createdQuote.projectName}`);
    console.log(`Tipo: ${createdQuote.projectType}`);
    console.log(`Estado: ${createdQuote.status}`);
    console.log(`Valor Total: $${createdQuote.totalValue.toLocaleString("es-CL")} CLP`);

    console.log("\n🎉 Mock quote generation completed successfully!");
    return quoteId;

  } catch (error) {
    console.error("❌ Error generating mock quote:", error);
    throw error;
  }
}

// Run the function if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateMockQuote()
    .then(() => {
      console.log("✅ Script completed successfully");
      process.exit(0);
    })
    .catch((error) => {
      console.error("❌ Script failed:", error);
      process.exit(1);
    });
}

export { generateMockQuote };
