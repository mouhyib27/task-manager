import { Component, OnInit } from '@angular/core';
import {UiService} from "../../services/ui.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  subscription!: Subscription;
  show: boolean = false;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService.onToggle().subscribe(rsp => this.show = rsp);
  }

  ngOnInit(): void {}

  toggleShow(){
    this.uiService.toggleShow();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
