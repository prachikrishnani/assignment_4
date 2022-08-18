import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from "./shared.service";
import { customerModel } from "./customer.module";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  customerValue!: FormGroup;
  customerModelObj: customerModel = new customerModel()
  displayCustomer!: any;
  singleCustomer!: any;
  title = 'customerData';

  constructor(private formbuilder: FormBuilder, private shared: SharedService) { }

  ngOnInit(): void {
    this.customerValue = this.formbuilder.group({
      customerName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]]
    })
    this.allCustomer()
  }
  postCustomer() {
    this.customerModelObj.name = this.customerValue.value.customerName;
    this.customerModelObj.email = this.customerValue.value.email;
    this.customerModelObj.phone = this.customerValue.value.phone;

    this.shared.postCustomer(this.customerModelObj)
      .subscribe((res) => {
        console.log(res);
        this.allCustomer()
        this.customerValue.reset()
      }, err => {
        alert(err.message)
        console.log(err.message);
      })
  }

  removeCustomer(row: any) {
    this.shared.delCustomer(row.email).subscribe(
      (res) => {
        console.log(res);
        this.allCustomer()
      }, (err) => {
        alert(err.message)
      }
    )
  }


  allCustomer() {
    this.shared.getAllCustomer().subscribe((res) => {
      console.log(res);
      this.displayCustomer = res;
    }, (err) => {
      console.log(err.message);
      alert(err.message)

    })
  }

  getSingleCustomer(row: any) {
    this.shared.getCustomer(row.email).subscribe((res) => {
      console.log(res);      
      this.singleCustomer = res
    }, (err) => {
      console.log(err.message);
      alert(err.message)

    })
  }

}
