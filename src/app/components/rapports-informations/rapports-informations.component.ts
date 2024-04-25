import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Agriculteurs } from 'src/app/models/agriculteurs';
import { Engineer } from 'src/app/models/engineers';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-rapports-informations',
  templateUrl: './rapports-informations.component.html',
  styleUrls: ['./rapports-informations.component.css']
})
export class RapportsInformationsComponent implements OnInit {

  constructor(private userService: UserService, private modalService: NgbModal) { }
  agriculteurs : Agriculteurs[];
  engineers : Engineer[];
  showListAgriculteurs: boolean = true;
  showListIngenieurs: boolean = false;
  showModalDeleteAgr: boolean = false;
  modalRef: NgbModalRef;
  listName : string = "";

  choixList = [
    { id: 'agriculteurs', label: 'قائمة الفلاحين', value: 'قائمة الفلاحين', checked: true },
    { id: 'ingénieurs', label: ' قائمة المهندسين ', value: ' قائمة المهندسين ', checked: false },
  ];

  ngOnInit(): void {
    this.loadAgriculteurs();
  }

  onChoixListChange(event: any)
  {
    this.listName = event.label;
    if(event.id == "agriculteurs")
    {
      this.showListAgriculteurs = true;
      this.showListIngenieurs = false;

    }
    else
    {
      this.showListAgriculteurs = false;
      this.showListIngenieurs = true;
    }
  }

  loadAgriculteurs() {
    this.userService.getAgriculteurs().subscribe(
      (data: Agriculteurs[]) => {
        this.agriculteurs = data;
      },
      error => {
        console.error('Erreur lors de la récupération des agriculteurs :', error);
      }
    );
  }
 
  openModal(content) {
    console.log("modal", content)
    this.modalRef = this.modalService.open(content, { centered: true }); // Stockez la référence à l'objet modal
  }

  closeModal() {
    this.modalRef.close(); // Utilisez la méthode close() pour fermer le modal
  }
}
