import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../service/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})

export class StudentListComponent implements OnInit {
  
  Student:any = [];

  constructor(private apiService: ApiService) { 
    this.readStudent();
  }

  ngOnInit() {}

  readStudent(){
    this.apiService.getStudents().subscribe((data) => {
     this.Student = data;
    })    
  }

  removeStudent(studentId, index) {
    if(window.confirm('Desea remover este estudiante?')) {
        this.apiService.deleteStudent(studentId).subscribe((data) => {
          this.readStudent();
        }
      )    
    }
  }
}