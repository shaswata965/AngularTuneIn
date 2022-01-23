import { Component, OnInit } from '@angular/core';
import { Chart } from "chart.js";
import {AdminService} from "../../frontend/service/admin.service";

@Component({
  selector: 'app-backend-header',
  templateUrl: './backend-header.component.html',
  styleUrls: ['./backend-header.component.css']
})
export class BackendHeaderComponent implements OnInit {

  public notificationBell = true;
  public sidebarMenu = false;
  public adminMenu = true;
  public userMenu = true;
  public albumMenu = true;
  public languageMenu = true;
  public actorMenu = true;

  public currentAdminName : string | null;
  public currentAdminImage : string | null;

  constructor(public adminService: AdminService) {}

  onLogOut(){
    this.adminService.logOut();
  }

  ngOnInit() {

    this.currentAdminName = this.adminService.getThisAdmin().currentAdmin;
    this.currentAdminImage = this.adminService.getThisAdmin().currentAdminImage;

    console.log(this.currentAdminImage);

    let ctx = document.getElementById("page_view");
    // @ts-ignore
    let myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        datasets: [{ backgroundColor: ["#E4E9EC", "#E4E9EC", "#E4E9EC"," #64C5B1", "#E4E9EC", "#E4E9EC", "#E4E9EC"], data: [15, 20, 25, 30, 25, 20, 15] }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: { display: !1 },
        tooltips: { intersect: !1, mode: "nearest" },
        legend: { display: !1 },
        barRadius: 2,
        scales: { xAxes: [{ barThickness: 5, display: !1, gridLines: !1, ticks: { beginAtZero: !0 } }], yAxes: [{ display: !1, gridLines: !1, ticks: { beginAtZero: !0 } }] },
        layout: { padding: { left: 0, right: 0, top: 0, bottom: 0 } },
      },
    });
  }


}
