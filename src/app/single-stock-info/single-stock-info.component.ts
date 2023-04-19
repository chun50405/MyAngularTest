import { Component } from '@angular/core';
import { StockService } from "../service/stock.service";
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable, interval, of } from "rxjs";
import { Chart } from 'angular-highcharts';
import * as moment from 'moment';
import * as Highcharts from 'highcharts';

import HC_exporting from 'highcharts/modules/exporting'; //呈現匯出按鈕用



@Component({
  selector: 'app-single-stock-info',
  templateUrl: './single-stock-info.component.html',
  styleUrls: ['./single-stock-info.component.css']
})
export class SingleStockInfoComponent {
  code:string = "";

  info:any;

  stockCompanyInfo:any;


  chart:any;




  constructor(private http: HttpClient, private stockService: StockService) {

    HC_exporting(Highcharts);

  }




  search() {

    this.stockService.getStockDayHistory(this.code).subscribe(data => {
     console.log(data);
     // 在這裡處理獲得的資料，例如顯示在畫面上

     this.chart = new Chart({
     chart: {
       type: 'line',
       renderTo: 'highCharts'
       // zoomType: 'x'
     },
     title: {
       text: data.title
     },
     subtitle: {
       text: '走勢圖'
     },
     xAxis: {
       type: 'datetime',
       title: {
         text: '日期'
       }
     },
     yAxis: {
       title: {
         text: '價格'
       }
     },
     legend: {
       enabled: true
     },
     credits: {
       enabled: true
     },
     data: {
       // dateFormat: 'YYYY/mm/dd'
     },
     exporting: {
        buttons: {
          contextButton: { // 隱藏內建下拉選單
            enabled: false
          },
          customButton1: {
            text: '1 Week',
            onclick: () => {
            let weekData = data.data.filter((d:any) => {
              return moment(d.date).isBetween(moment().subtract(7,'day'), moment())
            })
              this.chart.ref.series[0].setData(weekData.map((d:any) =>  [d.date, d.price] ), true);
            }
          },
          customButton2: {
            text: '1 Month',
            onclick: () => {
              let monthData = data.data.filter((d:any) => {
                return moment(d.date).isBetween(moment().subtract(1,'month'), moment())
              })
                this.chart.ref.series[0].setData(monthData.map((d:any) =>  [d.date, d.price] ), true);
            }
          },
          customButton3: {
            text: 'reset',
            onclick: () => {
              this.chart.ref.series[0].setData(data.data.map((d:any) =>  [d.date, d.price] ), true);
            }
          },
        },
        enabled: true
      },
     series: [{
       name: data.title,
       type: 'area',
       data: data.data.map((d:any) => {


         return [d.date, d.price];
       })
     }]
   });

   });

    this.stockService.getStockCompanyInfo(this.code).subscribe(data => {
      console.log('getStockCompanyInfo data=>', data)
      this.stockCompanyInfo = data
    });
  }



}
