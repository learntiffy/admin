import { Component, OnInit } from '@angular/core';
import { AppConstants } from 'src/app/models/const.model';

@Component({
  selector: 'app-user-chart',
  templateUrl: './user-chart.component.html',
  styleUrls: ['./user-chart.component.css']
})
export class UserChartComponent implements OnInit {

  days = {
    options: AppConstants.DAYS_OPS,
    selected: AppConstants.DAYS_OPS[1]
  }

  lineChartData: any;
  lineChartOptions: any;

  doughnutChartData: any;
  doughnutChartOptions: any;

  constructor() { }

  ngOnInit(): void {
    this.setLineChartOptions();
    this.getLineChartData();

    this.setDoughnutChartOptions();
    this.getDoughnutChartData();
  }

  setLineChartOptions() {
    this.lineChartOptions = {
      plugins: {
        legend: {
          display: false
        }
      },
      elements: {
        point: {
          radius: 2.5,
          hoverRadius: 5,
          hoverBorderWidth: 2
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#883cae'
          },
          grid: {
            color: 'white'
          }
        },
        y: {
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

  getLineChartData() {
    this.lineChartData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          data: [12, 51, 62, 33, 21, 62, 45],
          fill: true,
          borderColor: '#883cae',
          tension: .4,
          backgroundColor: 'rgba(136, 60, 174, 0.2)'
        }
      ]
    };
  }

  setDoughnutChartOptions() {
    this.doughnutChartOptions = {
      plugins: {
        legend: {
          labels: {
            color: '#495057'
          }
        }
      }
    }
  }

  getDoughnutChartData() {
    this.doughnutChartData = {
      labels: ['Verified', 'Not Verified'],
      datasets: [
        {
          data: [120, 54],
          backgroundColor: [
            "#eccfff",
            "#b3e5fc",
          ]
        }
      ]
    };
  }

}
