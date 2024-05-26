import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  popDownProfile = false

  constructor (private router: Router) {}
  
  showPopdownProfile () {
    this.popDownProfile= !this.popDownProfile;
  }
  showPopUpLogout () {
    Swal.fire({
      title: 'Se Deconnecter',
      text: "Etes vous sur de se déconnecter",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#056809',
      cancelButtonColor: 'red',
      confirmButtonText: 'Confirmer!'
    }).then((result) => {
      
      if(result.isConfirmed){
        this.router.navigate(['/']);
      localStorage.clear();
      }
      
    });
  }
}
