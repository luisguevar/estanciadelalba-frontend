import { HabitacionEntity } from "./TarifaHoteleraEntity";

export class NivelHabitacionEntity {
    constructor(
        public id?: number,
        public cNombreNivel?: string,
        public lstHabitaciones?: Array<HabitacionEntity>,

    ) { }
}

