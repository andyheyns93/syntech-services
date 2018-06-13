import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {

	constructor(private translate: TranslateService) {
        translate.addLangs(["nl", "en"]);
        translate.setDefaultLang('nl');

        let browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|nl/) ? browserLang : 'nl');        
    }

    ngAfterViewInit(){

      $(document).ready(function() {
        $(".sidebar-toggle").click(function(e) {
          e.stopPropagation();
        $(".st-container").toggleClass("nav-effect");
        });

        $(".st-pusher").click(function() {
          $(".st-container").removeClass("nav-effect");
        });

        $(".main-menu > a").click(function() {
          $(".st-container").removeClass("nav-effect");
        });

        var browserLang = navigator.language.split('-')[0];
        $('.language-links a').removeClass('active');
        $('.language-links li.' + browserLang + ' > a').addClass('active');

        onResize();
      });

      $(window).resize(function() {
        onResize();
      });

      function onResize() {
        $('.nav-menu').height($('.st-pusher').height() - 30);
      }

      $('.language-links a').on('click', function() {
        $('.language-links a').removeClass('active');
        $(this).addClass('active');
      });

    }
}
