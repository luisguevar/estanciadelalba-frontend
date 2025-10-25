import { ChangeDetectorRef, Component } from '@angular/core';
import { SvGeneralService } from '../service/sv-general.service';
import { UserEntity } from 'src/app/models/UsuarioEntity';
import { MatDialog } from '@angular/material/dialog';
import { AddEditUsuarioComponent } from './add-edit-usuario/add-edit-usuario.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent {


}
