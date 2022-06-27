import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import * as $ from 'jquery';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import{UserService} from "../../service/user.service";
import {Subscription} from "rxjs";
import { SocialAuthService, SocialUser,FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import {mimeType} from "../../../backend/Admin/signup/mime-type.validator";
import {LanguageService} from "../../service/language.service";
import {OwlOptions} from "ngx-owl-carousel-o";
import {Language} from "../../models/language.model";
import { Router} from "@angular/router";

// @ts-ignore
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  // @ts-ignore
  socialUser: SocialUser;
  // @ts-ignore
  private authListenerSubs: Subscription;

  public subMenuOne = true;
  public subMenuTwo =true;
  public currentUser: string | null;
  public firstName: string | null;
  public currentImage: string | null;
  public languages: any;

  form : FormGroup;
  logForm: FormGroup;
  searchForm: FormGroup;
  imagePreview: string | ArrayBuffer | null;

  constructor(public userService: UserService,
              private socialAuthService: SocialAuthService,
              private languageService: LanguageService,
              public router: Router) { }

  createUser(){
    if(this.form.invalid){
      return;
    }
    this.userService.addUser(this.form.value.name, this.form.value.email, this.form.value.password, this.form.value.image);
    this.form.reset();
    $('#register_modal_closer').click();
  }

  registerWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      console.log(this.socialUser);
      this.userService.addSocialUser(this.socialUser.name, this.socialUser.email, this.socialUser.photoUrl);
    });
    $('#register_modal_closer').click();
  }

  registerWithFB(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.userService.addSocialUser(this.socialUser.name, this.socialUser.email, this.socialUser.photoUrl);
    });
    $('#register_modal_closer').click();
  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(result=>{
    }).catch(error=>{
      console.log(error);
    });
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.userService.socialLogIn(this.socialUser.email);
    });
    $('#login_modal_closer').click();
  }

  signInWithFB(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(result=>{
    }).catch(error=>{
      console.log(error);
    });
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.userService.socialLogIn(this.socialUser.email);
    });
    $('#login_modal_closer').click();
  }

  logInUser(){
    if(this.logForm.invalid){
      return;
    }
    this.userService.logIn(this.logForm.value.email, this.logForm.value.password);
    this.logForm.reset();
    $('#login_modal_closer').click();
  }


  ngOnInit(){

    this.form = new FormGroup({
      'name': new FormControl(null, {validators: [Validators.required]}),
      'email': new FormControl(null,{validators:[Validators.required]}),
      'password': new FormControl(null,{validators:[Validators.required]}),
      'image': new FormControl(null,{validators: [Validators.required], asyncValidators: [mimeType]})
    });

    this.searchForm = new FormGroup({
      'search': new FormControl(null, {validators: [Validators.required]}),
    });


    this.logForm = new FormGroup({
      'email': new FormControl(null,{validators:[Validators.required]}),
      'password': new FormControl(null,{validators:[Validators.required]})
    });

    this.currentUser = this.userService.getThisUser().currentUser;
    this.currentImage = this.userService.getThisUser().currentImage;
    let name = ""+this.currentUser;
    let nameArray = [];
    nameArray = name.split(" ");
    let firstNameString = nameArray[0];
    let firstName = firstNameString.replace(/"/g,"");
    this.firstName = firstName;
    this.userIsAuthenticated = this.userService.getIsAuthenticated();
    this.authListenerSubs = this.userService.getAuthStatusListener().subscribe(isAuthenticated=>{
      this.userIsAuthenticated = isAuthenticated;
    });

    this.languageService.getLanguages(1000,1);
    this.languageService.getLanguagesUpdateListener().subscribe((languageData:{languages:Language[], languageCount: number})=>{
      this.languages = languageData.languages;
    });

  }

  customOptions: OwlOptions = {
    loop: !0,
    margin: 15,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    smartSpeed: 1200,
    navSpeed: 700,
    navText: ['<i class="flaticon-left-arrow"></i>', '<i class="flaticon-right-arrow"></i>'],
    responsive: {
      0: {
        items: 1,
        nav: !0
      },
      600: {
        items: 3,
        nav: !0
      },
      1000: {
        items: 5,
        nav: !0,
        loop: !0,
        margin: 20
      }
    },
    nav: true
  }

  onImagePicked(event: Event){
    // @ts-ignore
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image')?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = ()=>{
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
  }

  onLogOut(){
    this.userService.logOut();
  }

  menuOpener(){
    $("#toggle").on("click", function() {
      // @ts-ignore
      $("#sidebar").width(), 0 == $("#sidebar").offset().left ? $("#sidebar").animate({
        left: -500
      }, "slow") : $("#sidebar").animate({
        left: "0"
      }, "slow")
    })
  }

  menuCloser(){
    $("#toggle_close").on("click", function() {
      // @ts-ignore
      $("#sidebar").width(), 0 == $("#sidebar").offset().left ? $("#sidebar").animate({
        left: -500
      }, "slow") : $("#sidebar").animate({
        left: "0"
      }, "slow")
    })
  }

  searchData(){
    if(this.searchForm.invalid){
      return;
    }
    this.router.navigate(['/search-result', this.searchForm.value.search]);
  }


}
