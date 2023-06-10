import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserInfo} from "../../models/UserInfo";
import {ReportService} from "../../services/report.service";

@Component({
  selector: 'report-modal',
  templateUrl: './report-modal.component.html',
  styleUrls: ['./report-modal.component.css']
})
export class ReportModalComponent implements OnInit {

  @Output() closeReport: EventEmitter<void> = new EventEmitter<void>();

  @Input() reportedUser: UserInfo;

  reportComment: string = '';

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
  }

  sendReport() {
    this.reportService.fileReport(this.reportedUser.id, this.reportComment).subscribe({
      next: response => {
        console.log(response);
      },
      complete: () => {
        this.close();
      }
    })
  }

  close() {
    this.closeReport.emit();
  }

}
