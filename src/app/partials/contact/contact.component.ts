import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, Validators  } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { ReCaptchaComponent } from 'angular2-recaptcha/lib/captcha.component';

declare var $:any;
declare var google: any;
declare var GMaps: any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {'class': 'index-fix-inset'}
})
export class ContactComponent implements OnInit {
  @ViewChild(ReCaptchaComponent) captcha: ReCaptchaComponent;
  isSend: boolean = false;
  callbackSuccess: boolean = false;
  callbackFailure: boolean = false;
  callbackSuccessText: string = "";
  callbackFailureText: string = "";
  captchaControlValue: string = "";
  contactForm : FormGroup;

  constructor(private formBuilder:FormBuilder){
    let emailRegex = '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$';
    this.contactForm = formBuilder.group({
      name: new FormControl('', [Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required]),
      email: new FormControl('', [Validators.pattern(emailRegex), Validators.required]),
      phone: new FormControl('', [Validators.minLength(8),Validators.maxLength(10), Validators.required]),
      subject: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required])
    })
  }
  reset() {
    this.contactForm.reset();
    this.captcha.reset();
  }

  closeCallback() {
    this.captcha.reset();
    this.isSend = false;
    this.callbackSuccess = false;
    this.callbackFailure = false;
    this.callbackFailureText = "";
  }
    submitForm(contactFormValue) {
      contactFormValue['g-recaptcha-response'] = $('#g-recaptcha-response').val();
      
      var me = this;
      $.ajax({
        type: 'POST',
        url: '/contact',
        data: JSON.stringify(contactFormValue),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function(res) {
          me.reset();
          me.isSend = true;
          me.callbackSuccess = true;
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          me.reset();
          me.isSend = true;
          me.callbackFailure = true;
          me.callbackFailureText = errorThrown;
          console.log(XMLHttpRequest);
        }
      });
    }

  	ngOnInit() {
  	}

  	ngAfterViewInit(){
  	  $(function () {
      	// Google maps
      	var myAddress = {lat: 51.119106, lng: 5.253265};
      	var map = new google.maps.Map(document.getElementById('map'), {
	      	zoom: 15,
	      	center: myAddress,
	      	streetViewControl : false,
	        overviewMapControl: false,
	        mapTypeControl: false,
	        panControl : false,
	        scrollwheel: false,
	        styles: [
        {
          "featureType":"landscape",
          "stylers":[
          {"saturation":-100},
          {"lightness":65},
          {"visibility":"on"}
          ]
        },
        {
          "featureType":"poi",
          "stylers":[
          {"saturation":-100},
          {"lightness":51},
          {"visibility":"simplified"}
          ]
        },
        {
          "featureType":"road.highway",
          "stylers":[
          {"saturation":-100},
          {"visibility":"simplified"}
          ]
        },
        {
          "featureType":"road.arterial",
          "stylers":[
          {"saturation":-100},
          {"lightness":30},
          {"visibility":"on"}
          ]
        },
        {
          "featureType":"road.local",
          "stylers":[
          {"saturation":-100},
          {"lightness":40},
          {"visibility":"on"}
          ]
        },
        {
          "featureType":"transit",
          "stylers":[
          {"saturation":-100},
          {"visibility":"simplified"}
          ]
        },
        {
          "featureType":"administrative.province",
          "stylers":[
          {"visibility":"off"}
          ]
        },
        {
          "featureType":"water",
          "elementType":"labels",
          "stylers":[
          {"visibility":"on"},
          {"lightness":-25},
          {"saturation":-100}
          ]
        }
        ]
	  	});
	    var marker = new google.maps.Marker({
          	position: myAddress,
          	icon: '/assets/images/map-icon.png',
          	map: map
        });

      $(window).on('resize', function(){
        var center = map.getCenter();
         google.maps.event.trigger(map, "resize");
         map.setCenter(center); 
      });
      
    });
  	}


}
