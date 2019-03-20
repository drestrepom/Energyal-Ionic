import {AbstractControl, AsyncValidator, ValidationErrors} from '@angular/forms';
import {UserService} from '../app/services/user.service';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Validations implements AsyncValidator {
    constructor(private userService?: UserService) {
    }
    validate(ctrl: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
        return this.userService.exists(ctrl.value).pipe(
            map(isTaken => (isTaken ? {userExist: true} : null)),
            catchError(() => null)
        );
    }
}
