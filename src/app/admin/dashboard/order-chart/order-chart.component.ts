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

  pieChartData1: any;
  pieChartData2: any;
  pieChartData3: any;
  pieChartOptions: any;

  constructor() { }

  ngOnInit(): void {
    this.setStackedChartOptions();
    this.getStackedChartData();

    this.setPieChartOptions();
    this.getPieChartData1();
    this.getPieChartData2();
    this.getPieChartData3();
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
      labels: ['20 July', '21 July', '22 July', '23 July', '24 July', '25 July', '26 July'],
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

  getPieChartData1() {
    this.pieChartData1 = {
      labels: ['Lunch', 'Dinner'],
      datasets: [
        {
          data: [300, 150],
          backgroundColor: [
            "#eccfff",
            "#b3e5fc",
          ]
        }
      ]
    };
  }

  getPieChartData2() {
    this.pieChartData2 = {
      labels: ['Eklingji Road', 'Ghoda Gadi', 'Sanand Police Station', 'Sanand Bus Stand', 'Sanand GIDC'],
      datasets: [
        {
          data: [20, 60, 25, 37, 8],
          backgroundColor: [
            "#eccfff",
            "#c7eeea",
            "#FEEDAF",
            "#fad3e7",
            "#b3e5fc",
          ]
        }
      ]
    };
  }

  getPieChartData3() {
    this.pieChartData3 = {
      labels: ['Mag Masala', 'Chana Masala', 'Gulab Jaamun', 'Paneer Tika', 'Roti'],
      datasets: [
        {
          data: [39, 40, 65, 17, 73],
          backgroundColor: [
            "#eccfff",
            "#c7eeea",
            "#FEEDAF",
            "#fad3e7",
            "#b3e5fc",
          ]
        }
      ]
    };
  }

}