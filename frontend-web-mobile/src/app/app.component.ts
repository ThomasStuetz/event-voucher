import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ScannerQRCodeConfig, NgxScannerQrcodeService, ScannerQRCodeSelectedFiles, ScannerQRCodeResult, NgxScannerQrcodeComponent } from 'ngx-scanner-qrcode';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'fwm-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend-web-mobile';

  public config: ScannerQRCodeConfig = {
    constraints: {
      video: {
        width: window.innerWidth
      },
    }
  };

  public qrCodeResult: ScannerQRCodeSelectedFiles[] = [];
  public qrCodeResult2: ScannerQRCodeSelectedFiles[] = [];
  public percentage = 80;
  public quality = 100;
  public latestQRCode: string = "";
  public isValid = false;
  public message: string = ""

  @ViewChild('action') action!: NgxScannerQrcodeComponent;

  constructor(private qrcode: NgxScannerQrcodeService, private http: HttpClient) {
  }

  ngAfterViewInit(): void {
    this.action.isReady.subscribe((res: any) => {
      // this.handle(this.action, 'start');
    });
  }

  public onEvent(e: ScannerQRCodeResult[], action?: any) {
    this.action.pause()
    this.latestQRCode = e[0].value;
    console.log(this.latestQRCode)
  }

  public handle(action: any, fn: string): void {
    // Fix issue #27, #29
    const playDeviceFacingBack = (devices: any[]) => {
      // front camera or back camera check here!
      const device = devices.find(f => (/back|rear|environment/gi.test(f.label))); // Default Back Facing Camera
      action.playDevice(device ? device.deviceId : devices[0].deviceId);
    }

    if (fn === 'start') {
      action[fn](playDeviceFacingBack).subscribe((r: any) => console.log(fn, r), alert);
    } else {
      action[fn]().subscribe((r: any) => console.log(fn, r), alert);
    }
  }

  public restart() {
    this.action.play();
  }

  public validateBon() {
    this.http.get(`${this.latestQRCode}?cancel=true`)
      .subscribe(
        (data) => {
          console.log('GET Request was successful', data);
          this.isValid = false;
          this.message = "Der Wert deines Bons sind " + data + "€";
          // Do something with the response data if needed
        },
        (error) => {
          this.isValid = false;
          this.message = "Kein Wert für diesen Bon erhalten";
          console.error('Error making GET request', error);
          // Handle errors here
        }
      );
    this.action.play();

  }

}
