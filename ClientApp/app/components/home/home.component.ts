import { Component, OnInit } from '@angular/core';
import { NgxCarousel, NgxCarouselStore } from 'ngx-carousel';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styles: [`
    .leftRs {
        position: absolute;
        margin: auto;
        top: 0;
        bottom: 0;
        width: 50px;
        height: 50px;
        box-shadow: 1px 2px 10px -1px rgba(0, 0, 0, .3);
        border-radius: 999px;
        left: 5px;
    }

    .rightRs {
        position: absolute;
        margin: auto;
        top: 0;
        bottom: 0;
        width: 50px;
        height: 50px;
        box-shadow: 1px 2px 10px -1px rgba(0, 0, 0, .3);
        border-radius: 999px;
        right: 5px;
    }
  `]
})
export class HomeComponent implements OnInit {
  public carouselBanner: NgxCarousel;
    ngOnInit(){
        
            this.carouselBanner = {
              grid: {xs: 1, sm: 1, md: 1, lg: 1, all: 0},
              slide: 1,
              speed: 600,
              interval: 6000,
              point: {
                visible: true,
                pointStyles: `
                  .ngxcarouselPoint {
                    list-style-type: none;
                    text-align: center;
                    padding: 12px;
                    margin: 0;
                    white-space: nowrap;
                    overflow: auto;
                    position: absolute;
                    width: 100%;
                    bottom: 10px;
                    left: 0;
                    box-sizing: border-box;
                  }
                  .ngxcarouselPoint li {
                    display: inline-block;
                    border-radius: 999px;
                    border: 2px solid #FFF;
                    background: rgba(0, 0, 0, 0.55);
                    padding: 5px;
                    margin: 0 3px;
                    transition: .4s ease all;
                  }
                  .ngxcarouselPoint li.active {
                      background: black;
                      width: 20px;
                      border: 2px solid #FFF;
                  }
                `
              },
              load: 2,
              loop: true,
              touch: true
            }
          }
        
          /* This will be triggered after carousel viewed */
          afterCarouselViewedFn(data) {
            console.log(data);
          }
        
          /* It will be triggered on every slide*/
          onmoveFn(data: NgxCarouselStore) {
            console.log(data);
          }
}
