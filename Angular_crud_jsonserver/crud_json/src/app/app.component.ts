import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'crud_json';
  displayedColumns: string[] = ['id','productName', 'category', 'freshness', 'price','comment','date','action'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
constructor(private dialog: MatDialog, private api:ApiService) {}
ngOnInit(): void {
  this.getallProducts();
}
  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent,{
      width:'30%'

    }).afterClosed().subscribe(val=>{
      if(val == "Save"){
        this.getallProducts();
      }
    })

  }

  getallProducts(){
      this.api.getProduct().subscribe({
        next:(res)=>{
          console.log(res)
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort
        },
        error:(err)=>{
          alert("error")
        }
      })
  }
  editproduct(row:any){
this.dialog.open(DialogComponent,{
  width:'30%',
  data:row
}).afterClosed().subscribe(val=>{
  if(val == "update"){
    this.getallProducts();
  }
})
  }
  deleteproducts(id:number){
    this.api.deleteproduct(id).subscribe({
      next:(res)=>{
        alert("success")
        this.getallProducts();
      },
      error:()=>{
        alert("error")
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
