import { Component, OnInit } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit(){

  	var services = {
	    tabs: function() {
	        var tabs = $(".services-tabs");
	        var hexagons = tabs.find(".hexagon");
	        var sections = tabs.find(".section");

	        hexagons.click(function() {
	            hexagons.removeClass("active");
	            $(this).addClass("active");
	            var index = hexagons.index(this);
	            sections.fadeOut();
	            sections.eq(index).fadeIn();
	        });
	    },

	    screenHover: function() {
	        var screens = $(".features-hover-section .images img");
	        var features = $(".features-hover-section .features .feature");
	        features.mouseenter(function() {
	            if (!$(this).hasClass("active")) {
	                features.removeClass("active");
	                $(this).addClass("active");
	                var index = features.index(this);
	                screens.stop().fadeOut();
	                screens.eq(index).fadeIn();
	            }
	        });
	    },

	    initialize: function() {
	        this.tabs();
	        this.screenHover();
	    }
	}

  	$(function() {
	    services.initialize();
	});

  }

}
