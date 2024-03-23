import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Agriculteurs } from 'src/app/models/agriculteurs';
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
  showModalDeleteAgr: boolean = false;
  modalRef: NgbModalRef;

  ngOnInit(): void {
    this.loadAgriculteurs();
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
