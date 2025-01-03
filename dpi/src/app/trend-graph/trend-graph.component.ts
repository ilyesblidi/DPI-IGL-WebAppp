import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto'; // Ensure you import from 'chart.js/auto'

@Component({
  selector: 'app-trend-graph',
  standalone: true,
  templateUrl: './trend-graph.component.html',
  styleUrls: ['./trend-graph.component.css'],
})
export class TrendGraphComponent implements AfterViewInit {
  @ViewChild('trendChart') trendChart!: ElementRef<HTMLCanvasElement>;
  private chart: Chart | undefined;

  ngAfterViewInit() {
    this.initializeChart();
  }

  private initializeChart() {
    this.chart = new Chart(this.trendChart.nativeElement, {
      type: 'bar',  // Changed to 'bar' to create a bar chart
      data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], // Mock labels
        datasets: [
          {
            label: 'Glycemia',
            data: [120, 125, 110, 130], // Mock data
            borderColor: 'rgba(75, 192, 192, 1)',  // Border color for the bars
            backgroundColor: 'rgba(75, 192, 192, 0.2)',  // Background color for the bars
            borderWidth: 2,
          },
          {
            label: 'Blood Pressure',
            data: [80, 85, 90, 88], // Mock data
            borderColor: 'rgba(255, 99, 132, 1)',  // Border color for the bars
            backgroundColor: 'rgba(255, 99, 132, 0.2)',  // Background color for the bars
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
          title: { display: true, text: 'Trend Graph' },
        },
        scales: {
          x: {
            title: { display: true, text: 'Time' },
          },
          y: {
            title: { display: true, text: 'Value' },
          },
        },
      },
    });
  }
}
