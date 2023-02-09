import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit  {


  stringDateModel: string = "2023-02-07T11:11:11+0200";
  dateModel: string = this.stringDateModel;

  ngOnInit() {
  }

  getDatetime(dt: string) {
    console.log("app getDatetime dt:", dt);
    this.dateModel = dt;
  }
}
