import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  constructor(private translate: TranslateService) {}

  ngOnInit() {
  }

  changeLanguage(lang) {
		this.translate.use(lang);
	}

}
