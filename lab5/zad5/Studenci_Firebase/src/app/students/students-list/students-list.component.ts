import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-student-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {

  students: any;

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.getStudentsList();
  }

  getStudentsList() {
    this.studentService.getStudentsList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => 
          ({key: c.payload.doc['id'], ...c.payload.doc.data() })
          )
        )
    ).subscribe(students => {
      this.students = students;
    });
  }

  deleteStudents() {
    this.studentService.deleteAll();
  }

}
