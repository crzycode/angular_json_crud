import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  actionbtn:string = "Save";
  freshnesslist = ["brand new","second hand","refurbished"]
  productForm !: FormGroup
  constructor(private formbuilder: FormBuilder, private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editdata:any,
    private dialogref: MatDialogRef<DialogComponent>
    ) { }

  ngOnInit(): void {
    this.productForm = this.formbuilder.group({
      productName:['',Validators.required],
      category:['',Validators.required],
      freshness:['', Validators.required],
      price:['',Validators.required],
      comment:['', Validators.required],
      date:['',Validators.required]


    })
    if(this.editdata){
      this.actionbtn = "Update"
      this.productForm.controls['productName'].setValue(this.editdata.productName)
      this.productForm.controls['category'].setValue(this.editdata.category)
      this.productForm.controls['freshness'].setValue(this.editdata.freshness)
      this.productForm.controls['price'].setValue(this.editdata.price)
      this.productForm.controls['comment'].setValue(this.editdata.comment)
      this.productForm.controls['date'].setValue(this.editdata.date)

    }
    console.log(this.editdata)

  }

  addproduct(){
   if(!this.editdata){
    if(this.productForm.valid){
      this.api.postProduct(this.productForm.value).subscribe({
        next:(res) =>{

          this.productForm.reset();
          this.dialogref.close('save');
        },
        error:()=>{
          alert("unsuccessfull")
        }
      })

    }
   }else{
    this.updatedata();
   }

  }
  updatedata(){
this.api.putproduct(this.productForm.value,this.editdata.id).subscribe({
  next:(res)=>{
    alert("success")
    this.productForm.reset();
    this.dialogref.close('update');
  },
  error:()=>{
    alert("error");

  }
})
  }

}
