import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserInfo} from "../../models/UserInfo";
import {ReportService} from "../../services/report.service";
import {Report} from "../../models/Report";

@Component({
  selector: 'view-report-modal',
  templateUrl: './view-report-modal.component.html',
  styleUrls: ['./view-report-modal.component.css']
})
export class ViewReportModalComponent implements OnInit {

  @Output() closeViewReport: EventEmitter<void> = new EventEmitter<void>();

  @Input() reportedUser: UserInfo;

  reports: Report[] = [];
  count: number = 0;

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    console.log("in ngOnInit in ViewReports")
    this.loadUserReports();
  }

  loadUserReports() {
    this.reportService.getUserReports(this.reportedUser.id).subscribe({
      next: response => {
        console.log("reports from BE:")
        console.log(response);
        this.reports = response;
      }
    });
  }

  closeModal() {
    this.closeViewReport.emit();
  }
}
