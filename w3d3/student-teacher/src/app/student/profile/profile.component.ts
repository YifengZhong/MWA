import {Component, OnInit, Injectable} from '@angular/core';
import { Subscription } from "rxjs/Rx";
import { ActivatedRoute } from "@angular/router";
import { StudentDataSrv } from '../studentData'
import { Observable } from "rxjs/Rx";
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";
import { Router } from "@angular/router";

@Component({
    selector: 'app-students',
    template:`
            <hr>
            Name:{{student.name}}<br>
            studentID:{{student.stuID}}<br>
            email:{{student.email}}<br>
            `,
    styles:[]
})
@Injectable()
export class RouteComponent implements OnInit {
    private subscription: Subscription;
    id: string;
    onetimeId: string;
    students:Array<any>;
    student;
    constructor(private activatedRoute: ActivatedRoute,
                private _studentService: StudentDataSrv,
                private router: Router) {
        // params will return an Observable
        // we need it so we track changes in parameters as this code will be run once at constructor
        this.subscription = activatedRoute.params.subscribe(
            (param: any) => this.id = param['id']
        );
        // constructor will be used once
        this.onetimeId = activatedRoute.snapshot.params['id']        
    }
    ngOnInit() {
        console.log(this.id);
        this.students = this._studentService.getData();
        this.students.forEach(x=>{if(x.id === this.id) this.student = x});

    }
    onNavigate(){

    }
       

}