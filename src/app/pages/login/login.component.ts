import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData={
    username:'',
    password:''
  }

  constructor(private snake:MatSnackBar,private login:LoginService) { }

  ngOnInit(): void {
  }

  formlogin()
  {
    if(this.loginData.username.trim()=='' || this.loginData.username.trim()==null)
    {
      this.snake.open(
        "Username is required!!",'',{duration:3000}
      );
      return;
    }

    if(this.loginData.password.trim()=='' || this.loginData.password.trim()==null)
    {
      this.snake.open(
        "password is required!!",'',{duration:3000}
      );
      return;
    }


    this.login.generateToken(this.loginData).subscribe(

      (response:any)=>
      {
        console.log(response.token)
        this.login.loginUser(response.token)
        this.login.getCurrentUser().subscribe(
          (user:any)=>{
              this.login.setUser(user);
          }
        )
        window.location.href="/dashboard"
      },
      error=>{console.log(error)}

    )


  }

}
