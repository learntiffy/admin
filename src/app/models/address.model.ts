import { Area } from "./area.model";
import { SubArea } from "./subarea.model";

export interface Address {
    _id: string,
    homeNo: string,
    society: string,
    landmark: string,
    area: Area,
    subArea: SubArea,
    type: string,
    status: string,
}
