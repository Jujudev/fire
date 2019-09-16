import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})


export class EmailServiceService {
  server : any;
  email: any;

  constructor() { 
   // this.email 	= require("emailjs");

   /* this.server 	= this.email.server.connect({
      user:    "itigodev@gmail.com", 
      password:"Montreal1984", 
      host:    "smtp.gmail.com", 
      ssl:     true
   });*/
  }

  public SendEmail()
  {
    /*this.server.send({
      text:    "i hope this works", 
      from:    "itigodev@gmail.com", 
      to:      "abdou.dione@hotmail.com, abdou.dione-ext@sgcib.com",
      subject: "testing emailjs"
   }, function(err, message) { console.log(err || message); });*/
  }
}
