import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as html2pdf from 'html2pdf.js'
import { TRANS_TYPE } from '../../../constants/constants';
import { IBill } from '../../../interfaces/bill.interface';
import { IPopupData } from '../../../interfaces/products.interface';
@Component({
  selector: 'app-bill-pdf',
  templateUrl: './bill-pdf.component.html',
  styleUrls: ['./bill-pdf.component.scss']
})
export class BillPdfComponent implements OnInit {

  @ViewChild('htmlData', { static: false }) htmlData: ElementRef;
  public billDetail: IBill;
  public TRANS_TYPE = TRANS_TYPE;
  constructor(
    public dialogRef: MatDialogRef<BillPdfComponent>,

    @Inject(MAT_DIALOG_DATA) public dialogData: IPopupData,
  ) {
    this.billDetail = this.dialogData.bill;
    console.log(this.billDetail)
  }

  ngOnInit() {
  }


  public openPDF(): void {
    const options = {
      name: 'abc.pdf',
      image: { type: 'jpeg' },
      html2canvas: {},
      jsPDF: { orientation: 'landscape' }
    };

    html2pdf().from(this.htmlData.nativeElement).set(options).save();
  }


  public downloadPDF(): void {

  }

}
