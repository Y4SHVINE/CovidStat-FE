import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "stat-chart",
  templateUrl: "./stat-chart.component.html",
  styleUrls: ["./stat-chart.component.scss"],
})
export class StatChartComponent implements OnInit {

  @Input() chartName: string = '';
  @Input() pieChartLabels: string[] = [];
  @Input() pieChartData: number[] = [];

  public pieChartType = "pie";

  constructor() {}

  ngOnInit(): void {}

  // events
  public chartClicked(e: any): void {
    // console.log(e);
  }

  public chartHovered(e: any): void {
    // console.log(e);
  }
}
