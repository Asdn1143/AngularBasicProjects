import { Component } from '@angular/core';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'CRUD_v1';

  constructor(public dialog: MatDialog) {
    }


    openDialog(height: number = 200, width: number = 200) {
      this.dialog.open(DialogComponent,{
        width: `${width}px`,
        height: `${height}px`,
      });
    }




}
