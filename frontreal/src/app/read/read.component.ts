import { Component, OnInit } from '@angular/core';
import {ApiserviceService} from '../apiservice.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrl: './read.component.css'
})
export class ReadComponent implements OnInit {
  products: any[] = [];
  currentPage = 1;
  pageSize = 5;
  constructor(private service:ApiserviceService) {

  }
  readData:any;
  successmsg:any;


  ngOnInit(): void {
    //this.getAllData();
    this.loadProducts();
  }
  //deletedata
  deleteID(id:any){
    
    this.service.deleteData(id).subscribe((res)=>{
      console.log(res,'deleteres==>')
      this.successmsg=res.message;
      //this.getAllData();
      this.loadProducts();
    })
   
  }
  //getdata
  /*getAllData()
  {
    this.service.getAllData().subscribe((res)=>{
      console.log(res,"res==>");

      this.readData = res.data
    })
  }*/
  loadProducts() {
    this.service.getProducts(this.currentPage, this.pageSize)
      .subscribe(response => {
        this.products = response.data;
      });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadProducts();
  }

}
