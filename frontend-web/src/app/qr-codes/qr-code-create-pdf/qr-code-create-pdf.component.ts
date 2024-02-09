import {Component, ElementRef, ViewChild} from '@angular/core';
import jsPDF from "jspdf";
import {QrCodeStoreService} from "../../shared/qr-code-store.service";
import {Router} from "@angular/router";
import {Qrcode} from "../../shared/qrcode";

@Component({
  selector: 'mvf-qr-code-create-pdf',
  templateUrl: './qr-code-create-pdf.component.html',
  styleUrl: './qr-code-create-pdf.component.css'
})
export class QrCodeCreatePdfComponent {

  qrcodes: Qrcode[] = []

  constructor(private service: QrCodeStoreService, private router: Router) {

    this.router.events.subscribe(event => {
      // console.log(event);
      service.fetchInitialQrCodes();
    });
    this.service.getAll().subscribe(qrcodes => {
      // console.log(this.qrcodes = qrcodes)
      this.qrcodes = qrcodes
    })
  }

  @ViewChild('pdfContent') pdfContent: ElementRef | undefined;

  exportToPdf() {
    if (this.pdfContent) {
      const content = this.pdfContent.nativeElement;
      const pdf = new jsPDF();
      const images = content.querySelectorAll('img');

      const imgWidth = pdf.internal.pageSize.width / 2 - 20; // Adjust image width as needed
      const imgHeight = images[0].naturalHeight * (imgWidth / images[0].naturalWidth);
      const itemsPerPage = 4; // Number of items per page

      let page = 1;
      let yPos = 20;

      for (let i = 0; i < images.length; i++) {
        const imgData = images[i].src;

        const middleX = pdf.internal.pageSize.width
        const middleY = pdf.internal.pageSize.height;

        pdf.line(middleX / 2, 0, middleX / 2, middleY)
        pdf.line(0, middleY / 2, middleX, middleY / 2)

        // Calculate x and y positions for the QR code based on the index
        let xPos, yPos;
        if (i % 4 === 0) {
          // Top left corner
          xPos = 10;
          yPos = 20;
        } else if (i % 4 === 1) {
          // Top right corner
          xPos = pdf.internal.pageSize.width / 2;
          yPos = 20;
        } else if (i % 4 === 2) {
          // Bottom left corner
          xPos = 10;
          yPos = pdf.internal.pageSize.height / 2 + 10;
        } else {
          // Bottom right corner
          xPos = pdf.internal.pageSize.width / 2;
          yPos = pdf.internal.pageSize.height / 2 + 10;
        }

        // Check if adding the image will exceed the page height
        if ((i % itemsPerPage === 0 && i !== 0) || (i % 4 === 0 && i !== 0)) {
          pdf.addPage(); // Add a new page
          yPos = 20; // Reset yPos for the new page
          page++;
        }

        // Add image to PDF
        pdf.addImage(imgData, 'PNG', xPos, yPos, imgWidth, imgHeight);


        // Add text below the QR code
        const valueEuro = `Wert des Tickets: ${this.qrcodes[0].valueEuro}€`
        pdf.text(valueEuro, xPos + imgWidth / 2, yPos + imgHeight + 10, { align: 'center' }); // Adjust position and alignment as needed
      }


      // Save the PDF
      pdf.save('qr-codes.pdf');
    }
  }


  //conifg


  showImage = false

  onFileSelected(event: any) {
    this.showImage = true
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imgElement = document.getElementById('companyLogo') as HTMLImageElement;
        if (imgElement) {
          imgElement.src = e.target?.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  }
}
