// import { Component, OnInit } from '@angular/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import * as moment from 'moment';
import { ChartEvent, ChartType } from 'ng-chartist';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { BILL_STATUS, PAYMENT_STATUS, TRANS_TYPE } from '../../constants/constants';
import { FirebaseService } from '../../services/firebase/firebase.service';
import { HelperService } from '../../services/helper/helper.service';
declare var require: any;


export interface Chart {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
}
const data: any = require('./data.json');
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  barChart1: Chart;

  // This is for the donute chart
  donuteChart1: Chart = {
    type: 'Pie',
    data: data['Pie'],
    options: {
      donut: true,
      height: 260,
      showLabel: false,
      donutWidth: 20
    }
  };

  public yesterday = 24 * 60 * 60 * 1000;
  public billSub$: Subscription;
  public endDate = new Date();
  public startDate = new Date();
  public allBills: any[] = [];
  public cancelBill = {
    list: [],
    totalOnlinePayment: 0,
    offlinePayment: 0,
    paymentSuccess: 0,
    paymentPending: 0,
    paymentCanceled: 0,
    totalPrice: 0,
    totalPendingPrice: 0
  };
  public acceptBill = {
    list: [],
    totalOnlinePayment: 0,
    offlinePayment: 0,
    paymentSuccess: 0,
    paymentPending: 0,
    paymentCanceled: 0,
    totalPrice: 0,
    totalPendingPrice: 0
  };
  public pendinglBill = {
    list: [],
    totalOnlinePayment: 0,
    offlinePayment: 0,
    paymentSuccess: 0,
    paymentPending: 0,
    paymentCanceled: 0,
    totalPrice: 0,
    totalPendingPrice: 0
  };
  public transportBill = {
    list: [],
    totalOnlinePayment: 0,
    offlinePayment: 0,
    paymentSuccess: 0,
    paymentPending: 0,
    paymentCanceled: 0,
    totalPrice: 0,
    totalPendingPrice: 0
  };
  public doneBill = {
    list: [],
    totalOnlinePayment: 0,
    offlinePayment: 0,
    paymentSuccess: 0,
    paymentPending: 0,
    paymentCanceled: 0,
    totalPrice: 0,
    totalPendingPrice: 0
  };
  private arrBill = [
    'doneBill',
    'transportBill',
    'pendinglBill',
    'acceptBill',
    'cancelBill'
  ];

  public data = {
    list: [],
    totalOnlinePayment: 0,
    offlinePayment: 0,
    paymentSuccess: 0,
    paymentPending: 0,
    paymentCanceled: 0,
    totalPrice: 0,
    totalPendingPrice: 0
  };

  public dateRange = { begin: new Date(moment().subtract(6, 'days').format('MM/DD/YYYY')), end: new Date() };
  public maxDate = new Date();
  public minDate = new Date();

  constructor(
    public helperService: HelperService,
    private firebaseService: FirebaseService
  ) {
    this.getData();
  }

  ngOnInit() {
  }

  getData() {
    this.helperService.showLoading();
    if (this.billSub$) {
      this.billSub$.unsubscribe();
    }
    const startDate = new Date(this.dateRange.begin).setHours(0, 0, 0);
    const endDate = new Date(this.dateRange.end).setHours(23, 59, 59);
    console.log(startDate, endDate);
    this.billSub$ = this.firebaseService.getListBill(startDate, endDate).pipe(
      map(x => x.map((bill: any) => {
        bill.date = moment(bill.date).format('DD/MM/yyyy');
        return bill;
      }))
    ).subscribe(res => {
      this.allBills = res;
      console.log(this.allBills);
      this.initData();
      this.initChart();
      this.helperService.hideLoading();
    }, err => {
      this.helperService.hideLoading();
    });
  }

  initData() {
    this.data = {
      list: [],
      totalOnlinePayment: 0,
      offlinePayment: 0,
      paymentSuccess: 0,
      paymentPending: 0,
      paymentCanceled: 0,
      totalPrice: 0,
      totalPendingPrice: 0
    };
    this.pendinglBill = {
      list: [],
      totalOnlinePayment: 0,
      offlinePayment: 0,
      paymentSuccess: 0,
      paymentPending: 0,
      paymentCanceled: 0,
      totalPrice: 0,
      totalPendingPrice: 0
    };
    this.acceptBill = {
      list: [],
      totalOnlinePayment: 0,
      offlinePayment: 0,
      paymentSuccess: 0,
      paymentPending: 0,
      paymentCanceled: 0,
      totalPrice: 0,
      totalPendingPrice: 0
    };
    this.transportBill = {
      list: [],
      totalOnlinePayment: 0,
      offlinePayment: 0,
      paymentSuccess: 0,
      paymentPending: 0,
      paymentCanceled: 0,
      totalPrice: 0,
      totalPendingPrice: 0
    };
    this.doneBill = {
      list: [],
      totalOnlinePayment: 0,
      offlinePayment: 0,
      paymentSuccess: 0,
      paymentPending: 0,
      paymentCanceled: 0,
      totalPrice: 0,
      totalPendingPrice: 0
    };
    this.cancelBill = {
      list: [],
      totalOnlinePayment: 0,
      offlinePayment: 0,
      paymentSuccess: 0,
      paymentPending: 0,
      paymentCanceled: 0,
      totalPrice: 0,
      totalPendingPrice: 0
    };
    if (Array.isArray(this.allBills)) {
      for (const bill of this.allBills) {
        switch (bill.status) {
          case BILL_STATUS.pending.key:
            this.pendinglBill.list.push(bill);
            if (bill.payment === TRANS_TYPE.online) {
              this.pendinglBill.totalOnlinePayment++;
            } else {
              this.pendinglBill.offlinePayment++;
            }
            if (bill.paymentStatus === PAYMENT_STATUS.success) {
              this.pendinglBill.totalPrice += bill.totalPrice;
              this.pendinglBill.paymentSuccess++;
            } else if (bill.paymentStatus === PAYMENT_STATUS.pending) {
              this.pendinglBill.totalPendingPrice += bill.totalPrice;
              this.pendinglBill.paymentPending++;
            } else {
              this.pendinglBill.paymentCanceled++;
            }
            break;
          case BILL_STATUS.accept.key:
            this.acceptBill.list.push(bill);
            if (bill.payment === TRANS_TYPE.online) {
              this.acceptBill.totalOnlinePayment++;
            } else {
              this.acceptBill.offlinePayment++;
            }
            if (bill.paymentStatus === PAYMENT_STATUS.success) {
              this.acceptBill.totalPrice += bill.totalPrice;
              this.acceptBill.paymentSuccess++;
            } else if (bill.paymentStatus === PAYMENT_STATUS.pending) {
              this.acceptBill.totalPendingPrice += bill.totalPrice;
              this.acceptBill.paymentPending++;
            } else {
              this.acceptBill.paymentCanceled++;
            }
            break;
          case BILL_STATUS.canceled.key:
            this.cancelBill.list.push(bill);
            if (bill.payment === TRANS_TYPE.online) {
              this.cancelBill.totalOnlinePayment++;
            } else {
              this.cancelBill.offlinePayment++;
            }
            if (bill.paymentStatus === PAYMENT_STATUS.success) {
              this.cancelBill.totalPrice += bill.totalPrice;
              this.cancelBill.paymentSuccess++;
            } else if (bill.paymentStatus === PAYMENT_STATUS.pending) {
              this.cancelBill.totalPendingPrice += bill.totalPrice;
              this.cancelBill.paymentPending++;
            } else {
              this.cancelBill.paymentCanceled++;
            }
            break;
          case BILL_STATUS.transport.key:
            this.transportBill.list.push(bill);
            if (bill.payment === TRANS_TYPE.online) {
              this.transportBill.totalOnlinePayment++;
            } else {
              this.transportBill.offlinePayment++;
            }
            if (bill.paymentStatus === PAYMENT_STATUS.success) {
              this.transportBill.totalPrice += bill.totalPrice;
              this.transportBill.paymentSuccess++;
            } else if (bill.paymentStatus === PAYMENT_STATUS.pending) {
              this.transportBill.totalPendingPrice += bill.totalPrice;
              this.transportBill.paymentPending++;
            } else {
              this.transportBill.paymentCanceled++;
            }
            break;
          case BILL_STATUS.done.key:
            this.doneBill.list.push(bill);
            if (bill.payment === TRANS_TYPE.online) {
              this.doneBill.totalOnlinePayment++;
            } else {
              this.doneBill.offlinePayment++;
            }
            if (bill.paymentStatus === PAYMENT_STATUS.success) {
              this.doneBill.totalPrice += bill.totalPrice;
              this.doneBill.paymentSuccess++;
            } else if (bill.paymentStatus === PAYMENT_STATUS.pending) {
              this.doneBill.totalPendingPrice += bill.totalPrice;
              this.doneBill.paymentPending++;
            } else {
              this.doneBill.paymentCanceled++;
            }
            break;
        }

        this.data.list.push(bill);
        if (bill.payment === TRANS_TYPE.online) {
          this.data.totalOnlinePayment++;
        } else {
          this.data.offlinePayment++;
        }
        if (bill.paymentStatus === PAYMENT_STATUS.success) {
          this.data.totalPrice += bill.totalPrice;
          this.data.paymentSuccess++;
        } else if (bill.paymentStatus === PAYMENT_STATUS.pending) {
          this.data.totalPendingPrice += bill.totalPrice;
          this.data.paymentPending++;
        } else {
          this.data.paymentCanceled++;
        }
        // this.data.totalPrice += bill.totalPrice;
        // this.data.totalProduct += bill.totalItem;
      }

    }
  }

  initChart() {
    const labels = this.helperService.getDates(this.dateRange.begin, this.dateRange.end);
    const online = [];
    const offline = [];
    if (Array.isArray(labels)) {
      for (const label of labels) {
        const valueOnline = this.doneBill.list.filter(x => x.date === label && x.payment === TRANS_TYPE.online
          && x.paymentStatus === PAYMENT_STATUS.success).reduce((total, curr) => {
            return total + curr.totalPrice;
          }, 0);
        online.push(valueOnline / 1000);
        const valueOffline = this.doneBill.list.filter(x => x.date === label && x.payment === TRANS_TYPE.payment_on_delivery
          && x.paymentStatus === PAYMENT_STATUS.success)
          .reduce((total, curr) => {
            return total + curr.totalPrice;
          }, 0);
        offline.push(valueOffline / 1000);
      }
    }
    console.log('online', online)

    this.barChart1 = {
      type: 'Bar',
      data: {
        'labels': labels,
        'series': [online, offline]
      },
      options: {
        height: 360,
        showLabel: true,
        width: labels.length > 13 ? (labels.length * 80 + 80) + 'px' : '',
        // horizontalBars: true
      }
    };
  }

  ngOnDestroy(): void {
    if (this.billSub$) {
      this.billSub$.unsubscribe();
    }
  }
}
