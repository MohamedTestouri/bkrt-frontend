import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-terrain',
  templateUrl: './new-terrain.component.html',
  styleUrls: ['./new-terrain.component.css']
})
export class NewTerrainComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  AddNewTerrain()
  {
    this.router.navigateByUrl('/formPack');
  }
}
