'use client'
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const PopulationChart = ({ populationData }: { populationData: { year: number; population: number }[] }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = new Chart(chartRef.current, {
        type: "line",
        data: {
          labels: populationData.map((data) => data.year), // Años en el eje X
          datasets: [
            {
              label: "Population Over Time",
              data: populationData.map((data) => data.population), // Población en el eje Y
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              fill: true,
              tension: 0.4, // Suaviza la línea
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Population Over Time",
              font: {
                size: 18,
              },
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Year",
              },
            },
            y: {
              title: {
                display: true,
                text: "Population",
              },
              ticks: {
                callback: function (tickValue: string | number) {
                  // Comprobamos si el valor es un número antes de aplicar toLocaleString
                  if (typeof tickValue === 'number') {
                    return tickValue.toLocaleString(); // Formato con separador de miles
                  }
                  return tickValue; // Si no es un número, lo devolvemos tal cual
                },
              },
            },
          },
        },
      });

      // Limpiar el gráfico cuando el componente se desmonte
      return () => {
        chart.destroy();
      };
    }
  }, [populationData]);

  return (
    <section>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Population Over Time</h2>
      <div className="chart-container">
        <canvas ref={chartRef} />
      </div>
    </section>
  );
};

export default PopulationChart;
