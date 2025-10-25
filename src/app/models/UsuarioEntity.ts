export class UserEntity {
    constructor(
        public id?: number,
        public name?: string,
        public email?: string,
        public rol_id?: number,
        public dni?: string,
        public estado?: number,
        public created_at?: string,
        public link?: string,
        public password?: string,
        public cNombreRol?:string,

    ) { }
}

export class RolEntity {
    constructor(
        public id?: number,
        public cNombreRol?: string,
        public nEstado?: number,
        public lstMenu?: Array<MenuEntity>,

    ) { }
}

export class MenuEntity {
    constructor(
        public menu_id?: number,
        public cNombreMenu?: string,
        public nEstado?: number,
        public lstSubMenu?: Array<SubMenuEntity>,

    ) { }
}

export class SubMenuEntity {
    constructor(
        public nIdMenuItemRol?: number,
        public nEstado?: number,

    ) { }
}