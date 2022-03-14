import { Component, Input, OnInit } from "@angular/core";
import { HistoryData } from "../../../models/historyStatModel";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";

@Component({
  selector: "history-chart",
  templateUrl: "./history-chart.component.html",
  styleUrls: ["./history-chart.component.scss"],
})
export class HistoryChartComponent implements OnInit {
  @Input() historyStatus: HistoryData[] = [];

  // lineChart
  public lineChartData: Array<any> = [];
  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any = {
    animation: false,
    responsive: true,
    elements: {
      line: {
        borderWidth: 2,
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    tooltips: {
      enabled: false,
      custom: CustomTooltips,
    },
  };
  public lineChartColours: Array<any> = [
    {
      // grey
      backgroundColor: "rgba(148,159,177,0.2)",
      borderColor: "rgba(148,159,177,1)",
      pointBackgroundColor: "rgba(148,159,177,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(148,159,177,0.8)",
    },
    {
      // dark grey
      backgroundColor: "rgba(77,83,96,0.2)",
      borderColor: "rgba(77,83,96,1)",
      pointBackgroundColor: "rgba(77,83,96,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(77,83,96,1)",
    },
    {
      // grey
      backgroundColor: "rgba(148,159,177,0.2)",
      borderColor: "rgba(148,159,177,1)",
      pointBackgroundColor: "rgba(148,159,177,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(148,159,177,0.8)",
    },
  ];
  public lineChartLegend = true;
  public lineChartType = "line";

  constructor() {}

  ngOnInit(): void {
    console.log(this.historyStatus);
    this.historyStatus = this.historyStatus.reverse();
    this.lineChartLabels = this.historyStatus.map(a=>a.date);
    const activeCaseCount = this.historyStatus.map(a=>a.active_cases_count);
    const deathCount = this.historyStatus.map(a=>a.deaths_count);
    const recoveredCount = this.historyStatus.map(a=>a.recoveries_count);
    this.lineChartData = [
      { data: activeCaseCount, label: "Active Cases" },
      { data: deathCount, label: "Deaths" },
      { data: recoveredCount, label: "Recovered" },
    ]
  }

  // events
  public chartClicked(e: any): void {
    // console.log(e);
  }

  public chartHovered(e: any): void {
    // console.log(e);
  }
}
