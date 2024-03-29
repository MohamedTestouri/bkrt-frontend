import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Agriculteurs } from 'src/app/models/agriculteurs';
import { DemandePacks } from 'src/app/models/demande-packs';
import { DemandePacksService } from 'src/app/services/demande-packs.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-demande-list',
  templateUrl: './demande-list.component.html',
  styleUrls: ['./demande-list.component.css']
})
export class DemandeListComponent implements OnInit {

  constructor(private userService: UserService, private modalService: NgbModal, private demandePAckservice :DemandePacksService) { }
  demandePacks : DemandePacks[];
  showModalDeleteAgr: boolean = false;
  modalRef: NgbModalRef;

  ngOnInit(): void {
    this.loadDemandePacks();
  }

  loadDemandePacks() {
    this.demandePAckservice.getDemandePacks().subscribe(
      (data: DemandePacks[]) => {
        this.demandePacks = data;
      },
      error => {
        console.error('Erreur lors de la récupération des demande Packs :', error);
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
