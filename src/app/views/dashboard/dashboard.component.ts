import { Component, OnInit } from "@angular/core";
import { getStyle, hexToRgba } from "@coreui/coreui/dist/js/coreui-utilities";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import { DashboardService } from "../../services/dashboard.service";
import { CurrentStatData } from "../../models/currentStatModel";
import { HistoryData } from "../../models/historyStatModel";
import { StatsService } from "../../services/stats.service";

@Component({
  templateUrl: "dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  radioModel: string = "Month";

  // lineChart1
  public lineChart1Data: Array<any> = [
    {
      data: [65, 59, 84, 84, 51, 55, 40],
      label: "Series A",
    },
  ];
  public lineChart1Labels: Array<any> = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];
  public lineChart1Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips,
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          gridLines: {
            color: "transparent",
            zeroLineColor: "transparent",
          },
          ticks: {
            fontSize: 2,
            fontColor: "transparent",
          },
        },
      ],
      yAxes: [
        {
          display: false,
          ticks: {
            display: false,
            min: 40 - 5,
            max: 84 + 5,
          },
        },
      ],
    },
    elements: {
      line: {
        borderWidth: 1,
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false,
    },
  };
  public lineChart1Colours: Array<any> = [
    {
      backgroundColor: getStyle("--primary"),
      borderColor: "rgba(255,255,255,.55)",
    },
  ];
  public lineChart1Legend = false;
  public lineChart1Type = "line";

  // lineChart2
  public lineChart2Data: Array<any> = [
    {
      data: [1, 18, 9, 17, 34, 22, 11],
      label: "Series A",
    },
  ];
  public lineChart2Labels: Array<any> = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];
  public lineChart2Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips,
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          gridLines: {
            color: "transparent",
            zeroLineColor: "transparent",
          },
          ticks: {
            fontSize: 2,
            fontColor: "transparent",
          },
        },
      ],
      yAxes: [
        {
          display: false,
          ticks: {
            display: false,
            min: 1 - 5,
            max: 34 + 5,
          },
        },
      ],
    },
    elements: {
      line: {
        tension: 0.00001,
        borderWidth: 1,
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false,
    },
  };
  public lineChart2Colours: Array<any> = [
    {
      // grey
      backgroundColor: getStyle("--warning"),
      borderColor: "rgba(255,255,255,.55)",
    },
  ];
  public lineChart2Legend = false;
  public lineChart2Type = "line";

  // lineChart3
  public lineChart3Data: Array<any> = [
    {
      data: [78, 81, 80, 45, 34, 12, 40],
      label: "Series A",
    },
  ];
  public lineChart3Labels: Array<any> = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];
  public lineChart3Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips,
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          display: false,
        },
      ],
      yAxes: [
        {
          display: false,
        },
      ],
    },
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
    legend: {
      display: false,
    },
  };
  public lineChart3Colours: Array<any> = [
    {
      backgroundColor: "rgba(255,255,255,.2)",
      borderColor: "rgba(255,255,255,.55)",
    },
  ];
  public lineChart3Legend = false;
  public lineChart3Type = "line";

  // barChart1
  public barChart1Data: Array<any> = [
    {
      data: [78, 81, 80, 45, 34, 12, 40, 78, 81, 80, 45, 34, 12, 40, 12, 40],
      label: "Series A",
      barPercentage: 0.6,
    },
  ];
  public barChart1Labels: Array<any> = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
  ];
  public barChart1Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips,
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          display: false,
        },
      ],
      yAxes: [
        {
          display: false,
        },
      ],
    },
    legend: {
      display: false,
    },
  };
  public barChart1Colours: Array<any> = [
    {
      backgroundColor: "rgba(255,255,255,.3)",
      borderWidth: 0,
    },
  ];
  public barChart1Legend = false;
  public barChart1Type = "bar";

  public random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  public currentStatus: CurrentStatData = null;
  public historyStatus: HistoryData[] = [];
  public vaccineStats = [];

  constructor(private dashboardService: DashboardService, private statsService:StatsService) {}

  ngOnInit(): void {
    this.getCurrentCovidState();
    this.getHistoryStats();
    this.getVaccinationStats();
  }

  getCurrentCovidState = () => {
    this.dashboardService.getCurrentStats().subscribe(
      (res) => {
        this.currentStatus = res.data;
      },
      (error) => {
        console.log(error);
      }
    );
  };

  getHistoryStats = () => {
    this.dashboardService.getHistoricalStats().subscribe(
      (res) => {
        this.historyStatus = res.data;
      },
      (error) => {
        console.log(error);
      }
    );
  };

  getVaccinationStats =() =>{
    this.statsService.getStats().subscribe(res=>{
      console.log(res);
      (res || []).forEach(item => {
        this.vaccineStats.push({
          vaccine: item.vaccine,
          pieChartLabels: item.sideEffectStatics.map(a=>a.sideEffect),
          pieChartData: item.sideEffectStatics.map(a=>a.count)
        })
      });

    },error=>{
      console.log(error);
    })
  }
}
