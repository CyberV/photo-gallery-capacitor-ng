import { Component, OnInit } from '@angular/core';
import { AuthService } from "angularx-social-login";
import { Platform } from '@ionic/angular';
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import "@codetrix-studio/capacitor-google-auth";
import { Plugins } from '@capacitor/core';
const {GoogleAuth} = Plugins;
 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public user:any;
  public isLoggedIn:boolean;

  constructor(private socialAuthService:AuthService,public plateform:Platform) {
    if(this.plateform.is("android") || this.plateform.is("ios")){
      GoogleAuth.addListener('userChange', (googleUser) => {
        console.log("userChange:", googleUser);
      });
    }
    else{
    this.socialAuthService.authState.subscribe((user)=>{
      console.log("user",user);
      if(user!=null){
        this.user=user;
        this.isLoggedIn=true;
      }
      else{
        this.isLoggedIn=false;
      }
    });
  }
   }

  ngOnInit() {
  }
  async loginGoogle(){
    console.log('signing in with google');
    if(this.plateform.is("desktop")||this.plateform.is("mobileweb")){
    let socialPlatformProvider: string;
    socialPlatformProvider=GoogleLoginProvider.PROVIDER_ID;
    this.socialAuthService.signIn(socialPlatformProvider).then((userData)=>{
      console.log("userInfo",userData);

    }).catch((error)=>{
      console.log("error",error);
    });
  }
  else if(this.plateform.is("android")|| this.plateform.is("ios")){
    let googleUser = await GoogleAuth.signIn();
    console.log("signIn:", googleUser);
    this.user=googleUser;
  }

  }
  async refreshToken() {
    let response = await GoogleAuth.refresh();
    console.log("refresh:", response);
  }
  async loginFacebook(){
    console.log('signing in with facebook');
    let socialPlatformProvider: string;
    socialPlatformProvider=FacebookLoginProvider.PROVIDER_ID;
    this.socialAuthService.signIn(socialPlatformProvider).then((userData)=>{
      console.log("userInfo",userData);

    }).catch((error)=>{
      console.log("error",error);
    });

    
  }
  async logout(){
    if(this.plateform.is('desktop')){
    this.socialAuthService.signOut();
    }
    else{
    await GoogleAuth.signOut();
    }

  }

}
