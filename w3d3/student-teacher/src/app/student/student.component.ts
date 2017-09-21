import {Component, OnInit} from '@angular/core';

import { StudentDataSrv } from './studentData'

@Component({
    selector: 'app-students',
    template:`
        <ul>
          <li *ngFor="let student of students"><a [routerLink]="['profile',student.id]">{{student.name}}</a></li>
        </ul>
        <hr>
        <router-outlet></router-outlet>
    `,
    styles:[]
})
export class StudentsComponent implements OnInit {
    constructor(private _studentService: StudentDataSrv) {}
    students:Array<any>;
    ngOnInit() {
        this.students = this._studentService.getData();
    }
}