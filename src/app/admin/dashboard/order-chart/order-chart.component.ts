import { Component, OnInit } from '@angular/core';
import { AppConstants } from 'src/app/models/const.model';

@Component({
  selector: 'app-order-chart',
  templateUrl: './order-chart.component.html',
  styleUrls: ['./order-chart.component.css']
})
export class OrderChartComponent implements OnInit {

  days = {
    options: AppConstants.DAYS_OPS,
    selected: AppConstants.DAYS_OPS[1]
  }

  stackedChartData: any;
  stackedChartOptions: any;

  pieChartData: any;
  pieChartOptions: any;

  constructor() { }

  ngOnInit(): void {
    this.setStackedChartOptions();
    this.getStackedChartData();

    this.setPieChartOptions();
    this.getPieChartData();
  }

  setStackedChartOptions() {
    this.stackedChartOptions = {
      plugins: {
        tooltips: {
          mode: 'index',
          intersect: false
        },
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          stacked: true,
          ticks: {
            color: '#883cae'
          },
          grid: {
            color: 'white'
          }
        },
        y: {
          stacked: true,
          ticks: {
            color: '#883cae'
          },
          grid: {
            color: 'white'
          }
        }
      }
    };
  }

  getStackedChartData() {
    this.stackedChartData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          type: 'bar',
          label: 'Lunch',
          backgroundColor: '#eccfff',
          data: [
            50,
            25,
            12,
            48,
            90,
            76,
            42
          ]
        }, {
          type: 'bar',
          label: 'Dinner',
          backgroundColor: '#b3e5fc',
          data: [
            21,
            84,
            24,
            75,
            37,
            65,
            34
          ]
        },]
    };
  }

  setPieChartOptions() {
    this.pieChartOptions = {
      plugins: {
        legend: {
          labels: {
            color: '#495057'
          }
        }
      }
    }
  }

  getPieChartData() {
    this.pieChartData = {
      labels: ['Lunch', 'Dinner'],
      datasets: [
        {
          data: [300, 50],
          backgroundColor: [
            "#eccfff",
            "#b3e5fc",
          ],
          hoverBackgroundColor: [
            "#eccfff",
            "#b3e5fc",
          ]
        }
      ]
    };
  }
}