import { Component, OnInit, Input } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { Device } from 'src/app/crud.model';
import { DatastorageService } from 'src/app/datastorage.service';

@Component({
  selector: 'app-param-analyse-each',
  templateUrl: './param-analyse-each.component.html',
  styleUrls: ['./param-analyse-each.component.scss']
})
export class ParamAnalyseEachComponent implements OnInit {
  @Input() height;
  @Input() device:Device;
  @Input() param:string;
  public chartDatasetsl1:Array<any>
  color:string="red";


  public lineChartLabels: Label[] = [];
  public lineChartColors: Array<any>;
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  constructor(private dataStorageService:DatastorageService) { }

  ngOnInit(): void {
    var num =this.dataStorageService.noPoints
    this.lineChartLabels=[];
    num--;
    while(num){
      this.lineChartLabels.push(num+" ago");
      num--
    }
    this.lineChartLabels.push("now")
    this.dataStorageService.pointsChanged.subscribe((num:number)=>{
      this.lineChartLabels=[];
      num--
      while(num){
        this.lineChartLabels.push(num+" ago");
        num--
      }
      this.lineChartLabels.push("now")
    });
    
    switch(this.param){
      case 'temperature':this.color="red";break;
      case 'humidity':this.color="blue";break;
      case 'solarVoltage':this.color="yellow";break;
      case 'batteryVoltage':this.color="green";break;
    }
    this.lineChartColors= [
      {
         borderColor: this.color,
         backgroundColor:'transparent',
      },
    ];
    this.chartDatasetsl1=[{data:this.device[this.param].reverse(),label:this.device.name}]
  }

}
