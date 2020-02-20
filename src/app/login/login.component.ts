import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../_services'
import { HttpHeaders } from '@angular/common/http';

@Component({templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error: string;
    success: string
    Success: boolean = false;
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: new FormControl('',Validators.required),
            password: new FormControl('',Validators.required)
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        
        // show success message on registration
        if (this.route.snapshot.queryParams['registered']) {
            this.success = 'Registration successful';
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;
        // reset alerts on submit
        this.error = null;
        this.success = null;
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        
/*
this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
*/
// If form is Valid
        if(this.loginForm.valid){
          
            debugger;
            this.authenticationService.getToken(this.loginForm)
            .pipe(first())
            .subscribe(
                data => {
                    if (data != null && data != undefined && data != '') {
                        let myObj = JSON.parse(data);
                        localStorage.setItem('token', myObj.access_token );     
                        if(myObj.access_token!=""){
                            alert("Token Activated");
                            localStorage.setItem('username',this.loginForm.controls['username'].value);
                            this.authenticationService.isAuth();
                            this.Success=true;
                            this.router.navigate(['./home']);
                            this.loading = false;
                    }else{
                        alert("no token");
                    }
                      }
                },
                error => {
                    this.loading = false;
                    console.log(error)
                    this.error = error.error;
                    
                });
    }
}
}