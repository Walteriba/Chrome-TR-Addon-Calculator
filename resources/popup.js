document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("extract-btn").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          files: ["content.js"],
        },
        () => {
          chrome.tabs.sendMessage(
            tabs[0].id,
            { action: "extractAndAggregateData" },
            (response) => {
              if (chrome.runtime.lastError || response.error) {
                console.error("Error:", chrome.runtime.lastError || response.error);
                return;
              }

              const data = response.data;
              const tableBody = document.querySelector("#data-table tbody");
              tableBody.innerHTML = "";
              const rows = [
                {
                  description: "Virtual",
                  count: data.virtual.count,
                  total: data.virtual.total.toFixed(2),
                },
                {
                  description: "Sube",
                  count: data.sube.count,
                  total: data.sube.total.toFixed(2),
                },
                {
                  description: "Facturas",
                  count: data.facturas.count,
                  total: data.facturas.total.toFixed(2),
                },
                {
                  description: "Recaudación",
                  count: "-",
                  total: data.recaudacion.total.toFixed(2),
                },
                {
                  description: "Cobros",
                  count: data.cobros.count,
                  total: data.cobros.total.toFixed(2),
                },
                {
                  description: "Retiros",
                  count: data.retiros.count,
                  total: data.retiros.total.toFixed(2),
                },
                { description: "Caja", count: "-", total: data.caja.toFixed(2) },
                {
                  description: "Adicional",
                  count: "-",
                  total: data.adicional.toFixed(2),
                },
              ];

              rows.forEach((row) => {
                const tr = document.createElement("tr");
                tr.innerHTML = `<td>${row.description}</td><td>${row.count}</td><td>${row.total}</td>`;
                tableBody.appendChild(tr);
              });

              // Mostrar costos en el HTML
              document.getElementById("costo-plataforma").innerText = `$${data.costo_plataforma}`;
              document.getElementById("costo-herramientas").innerText = `$${data.costo_herramientas}`;
            }
          );
        }
      );
    });
  });
});