import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreCollectionGroup } from '@angular/fire/firestore';
import { DomSanitizer } from '@angular/platform-browser';

import { Student } from '../students/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  studentsRef: AngularFirestoreCollection<Student> = null;

  constructor(private dataBase: AngularFirestore) {
    this.studentsRef = dataBase.collection('/students');
  }

  createStudent(student: Student): void {
    this.studentsRef.add({...student});
  }

  updateStudent(key: string, value: any): Promise<void> {
    return this.studentsRef.doc(key).update(value);
  }

  deleteStudent(key: string): Promise<void> {
    return this.studentsRef.doc(key).delete();
  }

  getStudentsList(): AngularFirestoreCollection<Student>  {
    return this.studentsRef;
  }

   deleteAll() {
    this.studentsRef.get().subscribe(
      s => { s.forEach( data => {
          data.ref.delete();
        });
      }
    )
  }
    
}
