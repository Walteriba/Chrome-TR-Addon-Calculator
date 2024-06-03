function extractAndAggregateData() {
  const cargo_plataforma = 149; // Cargo por día de la plataforma
  const cargo_herramientas = 1200; // Lectores y Posnet
  const rows = document.querySelectorAll("#table tbody tr");

  const data = {
    virtual: { count: 0, total: 0 },
    sube: { count: 0, total: 0 },
    facturas: { count: 0, total: 0 },
    recaudacion: { count: 0, total: 0 },
    cobros: { count: 0, total: 0 },
    retiros: { count: 0, total: 0 },
    adicional: 0,
    costo_plataforma: cargo_plataforma,
    costo_herramientas: cargo_herramientas
  };

  rows.forEach((row) => {
    let tipoOperacion = row.children[4]?.innerText.trim();
    const producto = row.children[5]?.innerText.trim();
    const referenciaCliente = row.children[6]?.innerText.trim();
    const importeText = row.children[9]?.innerText
      .trim()
      .replace(/[^0-9,-]+/g, "")
      .replace(",", ".");
    const importe = parseFloat(importeText);

    if (isNaN(importe)) return; // Saltear fila si no es un numero

    // Reasignar Uala, a factura
    if (producto === "UALA") {
      tipoOperacion = "Pago Servicio";
    }

    // Para Martín
    if (referenciaCliente === "Almacén Walvan") {
      tipoOperacion = "";
    }

    switch (tipoOperacion) {
      case "Recarga":
        data.virtual.count++;
        data.virtual.total += importe;
        data.adicional += 0.1 * importe;
        break;
      case "Venta Sube":
        data.sube.count++;
        data.sube.total += importe;
        data.adicional += 0.1 * importe;
        break;
      case "Pago Servicio":
        data.facturas.count++;
        data.facturas.total += importe;
        data.adicional += 100;
        break;
      case "Recaudacion":
        data.recaudacion.total += importe;
        break;
      case "Cobro":
        data.cobros.count++;
        data.cobros.total += importe;
        break;
      case "Retiro Dinero":
        data.retiros.count++;
        data.retiros.total += importe;
        data.adicional += 0.01 * importe; // Se cobra 3% pero se gana 1%
        break;
      default:
        // Tipo operacion distinta
        break;
    }
  });

  // Calculo caja y adicionales con sus determinados porcentajes
  data.caja = data.cobros.total * (1 - 0.0422);
  data.adicional -=
    (data.sube.total + data.virtual.total) * 0.015 + cargo_plataforma;

  // Verificar si es 1ro de mes
  const today = new Date();
  if (today.getDate() === 1) {
    data.adicional -= cargo_herramientas;
  }

  return data;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "extractAndAggregateData") {
    try {
      const aggregatedData = extractAndAggregateData();
      sendResponse({ data: aggregatedData });
    } catch (error) {
      console.error("Error al extraer y agregar datos:", error);
      sendResponse({ error: "Fallo al extraer y agregar datos" });
    }
  }
});


