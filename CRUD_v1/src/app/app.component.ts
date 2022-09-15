import { Component, OnInit } from '@angular/core';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialog } from "@angular/material/dialog";
import { ApiService } from './services/api.service';
// Table
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  title = 'CRUD_v1';

  displayedColumns: string[] = ['name', 'category', 'date', 'state', 'price','comment','edit','delete' ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private api : ApiService) {
    // //for debug only
    this.openDialog();
    }
  ngOnInit(): void {
    this.getAllProducts();
  }


    openDialog(row: any = {}, height: number = 770, width: number = 400 ) {
      this.dialog.open(DialogComponent,{
        width: `${width}px`,
        height: `${height}px`,
        data: row,
      }).afterClosed().subscribe(()=>{
        this.getAllProducts();
      })
    }

    editProduct(row: any){
      this.openDialog(row)
    }


    getAllProducts(){
      this.api.getProduct()
      .subscribe({
        next: (res)=>{
          this.dataSource = new MatTableDataSource(res)
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error:()=>{
          console.log("Products not received")
        }
      })
    }
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

}
