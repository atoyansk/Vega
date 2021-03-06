import { AuthService } from './../../services/auth.service';
import { PhotoService } from './../../services/photo.service';
import { BrowserXhr } from '@angular/http';
import { ProgressService, BrowserXhrWithProgress } from './../../services/progress.service';
import { ToastyService } from 'ng2-toasty';
import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styles: [`
  .delImg {
    z-index: 999;
    float: right;
    background: red;
    padding:0 6px;
    box-sizing: border-box;
    border-radius: 50%;
    cursor: pointer;
    color: #FFFFFF;
    font-weight: bold;
    text-decoration: none;
    margin-left: 5px;
    border: none;
  }
`],
  providers: [
    { provide: BrowserXhr, useClass: BrowserXhrWithProgress },
    ProgressService
  ]
})
export class ViewVehicleComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  vehicle: any;
  vehicleId: number;
  photos: any[];
  progress: any;

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private zone: NgZone,
    private toasty: ToastyService,
    private progressService: ProgressService,
    private photoService: PhotoService,
    private vehicleService: VehicleService) { 
      route.params.subscribe(p => {
        this.vehicleId = +p['id'];
        if (isNaN(this.vehicleId) || this.vehicleId <= 0){
          router.navigate(['/vehicles']);
          return;
        }
        });
    }

  ngOnInit() {
    this.photoService.getPhotos(this.vehicleId)
    .subscribe(photos => this.photos = photos);

    this.vehicleService.getVehicle(this.vehicleId)
    .subscribe(
    v => this.vehicle = v,
    err => {
      if(err.status == 404){
        this.router.navigate(['/vehicles']);
        return;
      }
    });
  }

  delete(){
    if(confirm("Are you sure?")){
      this.deleteAllImg();
      this.vehicleService.delete(this.vehicle.id)
        .subscribe(x =>{
          this.router.navigate(['/vehicles']);
        });
    }
  }

  deleteImg(){
    if(confirm("Do you really want to delete this image?")){
      // this.vehicleService.delete(this.vehicle.id)
      //   .subscribe(x =>{
      //     this.router.navigate(['/vehicles']);
      //   });
    }
  }

  deleteAllImg(){

  }

  uploadPhoto() {    
    this.progressService.startTracking()
      .subscribe(progress => {
        this.zone.run(() => {
          this.progress = progress;
        });
      },
      null,
      () => { this.progress = null; });

    var nativeElement: HTMLInputElement = this.fileInput.nativeElement;
    var file = nativeElement.files[0];
    nativeElement.value = ''; 
    this.photoService.upload(this.vehicleId, file)
      .subscribe(photo => {
        this.photos.push(photo);
      },
      err => {
        this.toasty.error({
          title: 'Error',
          msg: err.text(),
          theme: 'bootstrap',
          showClose: true,
          timeout: 5000
        });
      });
  }
}
