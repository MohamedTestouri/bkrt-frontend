import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent{

  title = 'Bakourat.Client';

  isSideNavCollapsed = false;
  screenWidth = 0;

  constructor(private router: Router) {}

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
}

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}