import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: 'admin.component.html',
    styles: [`
    .graph {
      margin-bottom: 50px;
    }
  `]
})

export class AdminComponent implements OnInit {
    make = {
        labels: ['BMW', 'Audi', 'Mazda'],
        datasets: [
            {
                data: [5, 8, 7],
                backgroundColor: [
                    "#ff6384",
                    "#36a2eb",
                    "#ccce56"
                ]
            }
        ]
    };
    model = {
        labels: ['Sedan', 'Sport', 'SUV'],
        datasets: [
            {
                data: [5, 10, 3],
                backgroundColor: [
                    "#ff5576",
                    "#cca2eb",
                    "#ffce33"
                ]
            }
        ]
    };
    growth = {
        labels: ["January", "February", "March", "April", "May", "June", "July", "August"],
        datasets: [
          {
            label: "Annual Growth",
            data: [65, 59, 80, 81, 56, 55, 40, 50],
            backgroundColor: [
                "#ff5576"
            ]
          }
        ]
      };
    options = {
        legend: {
            position: 'left'
        }
    };
    options2 = {
        legend: {
            position: 'top'
        },
        responsive: true,
        maintainAspectRatio: false
    };
    constructor() { }

    ngOnInit() { }
}