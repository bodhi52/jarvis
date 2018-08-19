import {Component, OnInit} from '@angular/core';
import {CommonApiService} from '../../../core/api/common-api.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.less']
})
export class DefaultComponent implements OnInit {

  constructor(
    private api: CommonApiService,
  ) {
  }

  ngOnInit() {
    this.api.login().subscribe(data => {
      console.log('data', data);
    });
  }

}
