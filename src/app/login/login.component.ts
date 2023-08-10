import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin/admin.service';
import { Router } from '@angular/router';
import { AppService } from '../shared/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName!: string;
  password!: string;

  isLoading = false;
  invalid = false;

  constructor(private router: Router, private appService: AppService, private adminService: AdminService) { }

  ngOnInit(): void {
    localStorage.getItem('token') ? this.router.navigateByUrl('/admin/users') : '';
  }

  login() {
    this.isLoading = true;
    this.adminService.login(this.userName, this.password).subscribe(res => {
      if (res.status == 400)
        this.invalid = true;
      else if (res.status == 200) {
        localStorage.setItem('token', res.data);
        this.appService.login();
        this.router.navigateByUrl('/admin/users');
      }
      this.isLoading = false;
    });
  }

}
