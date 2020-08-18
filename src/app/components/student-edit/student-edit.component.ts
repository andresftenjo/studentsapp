import { Student } from './../../model/Student';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from './../../service/student.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";


@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})

export class StudentEditComponent implements OnInit {
  submitted = false;
  editForm: FormGroup;
  studentPhoto = null;
  selectedFile = null;
  
  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.updateStudent();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getStudent(id);
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      address: ['', [Validators.required]],
    })
  }

  // Getter to access form control
  get myForm() {
    return this.editForm.controls;
  }

  getStudent(id) {
    this.apiService.getStudent(id).subscribe(data => {
      this.editForm.setValue({
        name: data['name'],
        lastName: data['lastName'],
        email: data['email'],
        phoneNumber: data['phoneNumber'],
        address: data['address'],
      });
      this.studentPhoto = data['photo'];
    });
  }

  updateStudent() {
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      address: ['', [Validators.required]],
    })
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    let reader = new FileReader();
    let that = this;
    reader.addEventListener("load", function () {
      // convert image file to base64 string
      that.studentPhoto = this.result;
    }, false);
    if (this.selectedFile) {
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit() {
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
      if (window.confirm('Seguro que desea editar?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');

        if(this.studentPhoto){
          this.editForm.value.photo = this.studentPhoto;
        }
        this.apiService.updateStudent(id, this.editForm.value)
          .subscribe(res => {
            this.router.navigateByUrl('/students-list');
            console.log('Estudiante actualizado!')
          }, (error) => {
            console.log(error)
          })
      }
    }
  }
}
