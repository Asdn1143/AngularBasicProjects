
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from "../services/api.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  freshnessList: string[] = ["Brand new", "Slightly used", "Used", "Damaged"]
  productForm !: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData : any
    ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name : ['', Validators.required],
      category : ['', Validators.required],
      date : ['', Validators.required],
      state : ['', Validators.required],
      price : ['', Validators.required],
      comment : ['', Validators.required],


    })
    console.log(this.editData.id)
  if(this.editData){
    this.productForm.controls['name'].setValue(this.editData.name)
    this.productForm.controls['category'].setValue(this.editData.category)
    this.productForm.controls['date'].setValue(this.editData.date)
    this.productForm.controls['state'].setValue(this.editData.state)
    this.productForm.controls['price'].setValue(this.editData.price)
    this.productForm.controls['comment'].setValue(this.editData.comment)
  }
}
addProduct(){
  if(this.editData.id == undefined){
    this.api.postProduct(this.productForm.value)
    .subscribe({
      next:()=>{
        if (this.productForm.valid) {
          // for debug
          console.log(this.productForm.value)
          this.productForm.reset();
          this.dialogRef.close("save");
        }
        else{
          alert("Invalid product data");
        }
      },
      error:(error)=>{
        alert("error: " + error);
      }
    })
  }
  else{
    this.updateProduct()
  }
}

updateProduct(){
 console.log(this.editData)
  this.api.putProduct(this.productForm.value,this.editData.id)
  .subscribe({
    next:()=>{
      if (this.productForm.valid) {
        // for debug
        console.log(this.productForm.value)
        this.productForm.reset();
        this.dialogRef.close("save");
      }
      else{
        alert("Invalid product data");
      }
    },
    error:()=>{
      alert("error");
    }
  })
}

}


