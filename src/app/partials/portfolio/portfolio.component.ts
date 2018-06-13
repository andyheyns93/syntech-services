import { Component, OnInit } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})

export class PortfolioComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit(){
  	var filters = $("#filters a");
      // filter items when filter link is clicked
    filters.click(function() {
        filters.removeClass("active");
        $(this).addClass("active");
        $(this).css('backgroundColor','transparent');
    });
  }

}
