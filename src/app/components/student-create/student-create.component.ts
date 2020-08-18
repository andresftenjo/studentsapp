import { Router } from '@angular/router';
import { ApiService } from './../../service/student.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})

export class StudentCreateComponent implements OnInit {  
  submitted = false;
  studentForm: FormGroup;
  selectedFile = null;
  selectedPhoto = null;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) { 
    this.mainForm();
  }

  ngOnInit() { }

  mainForm() {
    this.studentForm = this.fb.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      address: ['', [Validators.required]],
    })
  }

  // Getter to access form control
  get myForm(){
    return this.studentForm.controls;
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    let reader = new FileReader();
    let that = this;
    reader.addEventListener("load", function () {
      // convert image file to base64 string
      that.selectedPhoto = this.result;
    }, false);
    if (this.selectedFile) {
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit() {
    this.submitted = true;
    if (!this.studentForm.valid) {
      return false;
    } else {

      if(this.selectedPhoto){
        this.studentForm.value.photo = this.selectedPhoto;
      }
      this.apiService.createStudent(this.studentForm.value).subscribe(
        (res) => {
          console.log('Student successfully created!')
          this.ngZone.run(() => this.router.navigateByUrl('/students-list'))
        }, (error) => {
          console.log(error);
        });
    }
  }
}