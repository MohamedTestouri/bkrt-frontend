import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core'; // Importation corrigée
import dayGridPlugin from '@fullcalendar/daygrid';
import { EventInput } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import { Router } from '@angular/router';

@Component({
 selector: 'app-rendez-vous',
 templateUrl: './rendez-vous.component.html',
 styleUrls: ['./rendez-vous.component.css']
})
export class RendezVousComponent implements OnInit {

   // Définition de handleDateSelect avant calendarOptions
   handleDateSelect = (selectInfo) => {
      let title = prompt('Titre de l\'événement:');
      let color = prompt('Couleur de l\'événemen:');
      let calendarApi = selectInfo.view.calendar;

      calendarApi.unselect();

      if (title) {
         calendarApi.addEvent({
         id: this.createEventId(),
         title,
         start: selectInfo.startStr,
         end: selectInfo.endStr,
         color: color,
         allDay: selectInfo.allDay
         });
      }
   }

   calendarOptions: CalendarOptions = {
      initialView: 'dayGridMonth',
      height:'auto',
      plugins: [dayGridPlugin,interactionPlugin],
      selectable: true,
      //select: this.handleDateSelect,
      events: []
   };

   constructor(private router: Router) { }

   ngOnInit(): void {
   }

   createEventId() {
      return '_' + Math.random().toString(36).substr(2, 9);
   }

   goTodemandeAppointment()
   {
      this.router.navigateByUrl('/demande');
   }

}
