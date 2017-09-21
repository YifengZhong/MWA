import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";
import {Injectable } from "@angular/core"
import { Observable } from "rxjs/Rx";
import { StudentDataSrv } from '../student/studentData'
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs/Rx";
import { Router } from "@angular/router";


@Injectable()
export class MyCanActivateGuard implements CanActivate {
  id: string;
  students:Array<any>;
  student;
  constructor(private activatedRoute: ActivatedRoute
    ,private _studentService: StudentDataSrv
    ,private router: Router){

    }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    let id = route.params.id;
    this.students = this._studentService.getData();
    this.students.forEach(x=>{if(x.id === id) this.student = x});
    console.log(this.student.name);
    if(!this.student){
        this.router.navigateByUrl('');
        return false;
    }
    console.log("in true");
    return true;
  }
}
