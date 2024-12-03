'use client'

import { useEffect, useRef } from "react";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, LineController, Filler } from 'chart.js';
import { Flex, Heading } from "@chakra-ui/react";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  LineController,
  Filler
);

const TemperatureChart = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  let chartInstance: Chart | null = null;

  interface Location {
    latitude: number;
    longitude: number;
  }

  const getLocation = (): Promise<Location> => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            if (latitude && longitude) {
              resolve({ latitude, longitude });
            } else {
              reject("No valid latitude or longitude");
            }
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        reject("Geolocation is not available on this browser.");
      }
    });
  };

  const getTemperature = async () => {
    try {
      const { latitude, longitude } = await getLocation();
      const locationData = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`);
      
      if (!locationData.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const response = await locationData.json();

      const hourly = response.hourly;

      const weatherData = {
        hourly: {
					time: hourly.time.map((t: string | number | Date) => new Date(t)),
          temperature2m: hourly.temperature_2m,
        },
      };

			const labels = weatherData.hourly.time.map((time: Date) => {
				return time.toISOString().split('T')[1].substring(0, 5);
		});
			

      const data = weatherData.hourly.temperature2m;

      const ctx = chartRef.current?.getContext("2d");
      if (!ctx) {
        throw new Error("Canvas context is null");
      }

      if (chartInstance) {
        chartInstance.destroy();
      }

      chartInstance = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Temperature (°C)",
              data: data,
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              ticks: {
                autoSkip: true,
                maxTicksLimit: 10,
              },
            },
          },
        },
      });
    } catch (error) {
      console.error("Error fetching temperature data:", error);
    }
  };

  useEffect(() => {
    getTemperature();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex flexDir={'column'} gap={'4'} justify={'center'}>
			<Heading size={'lg'}>Real-time temperatures for your location</Heading>
      <canvas ref={chartRef} width="300" height="150"></canvas>
    </Flex>
  );
};

export default TemperatureChart;