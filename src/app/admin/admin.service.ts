import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// @ts-ignore
import * as FileSaver from 'file-saver';

import { Response } from '../models/response.model';
import { Area } from '../models/area.model';
import { SubArea } from '../models/subarea.model';
import { Item } from '../models/item.model';
import { Menu } from '../models/menu.model';
import { environment } from 'src/environments/environment';

const host = environment.api_url;

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  exportPdf(fileName: string, columns: any, data: any) {
    import('jspdf').then((jsPDF) => {
      import('jspdf-autotable').then((x) => {
        const doc = new jsPDF.jsPDF('p', 'in', [8.5, 12.9]);
        (doc as any).autoTable(columns, data);
        doc.save(fileName);
      });
    });
  }

  exportExcel(fileName: string, data: any) {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(data);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, fileName);
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    );
  }

  public login(userName: any, password: any): Observable<Response> {
    return this.http.post<Response>(`${host}/authe/admin/login`, {
      userName: userName,
      password: password
    });
  }

  public getUsers(): Observable<Response> {
    return this.http.get<Response>(`${host}/admin/get/user`);
  }

  public getArea(): Observable<Response> {
    return this.http.get<Response>(`${host}/admin/get/area`);
  }

  public saveArea(area: Area): Observable<Response> {
    return this.http.post<Response>(`${host}/admin/save/area`, {
      area: area,
    });
  }

  public getSubArea(areaId: string): Observable<Response> {
    return this.http.get<Response>(`${host}/admin/get/subArea?areaId=${areaId}`);
  }

  public saveSubArea(subArea: SubArea): Observable<Response> {
    return this.http.post<Response>(`${host}/admin/save/subArea`, {
      subArea: subArea,
    });
  }

  public getItem(): Observable<Response> {
    return this.http.get<Response>(`${host}/admin/get/item`);
  }

  public saveItem(item: Item): Observable<Response> {
    const formData = new FormData();
    formData.append("item", JSON.stringify(item));
    formData.append("file", item.file);
    return this.http.post<Response>(`${host}/admin/save/item`, formData);
  }

  public saveMenu(menu: Menu): Observable<Response> {
    return this.http.post<Response>(`${host}/admin/save/menu`, {
      menu: menu,
    });
  }

  public saveMenuDay(menuDay: any): Observable<Response> {
    return this.http.put<Response>(`${host}/admin/set/menu`, {
      menuDay: menuDay,
    });
  }

  public getMenu(): Observable<Response> {
    return this.http.get<Response>(`${host}/admin/get/menu`);
  }

  public getMenuItems(menuId: string): Observable<Response> {
    return this.http.get<Response>(`${host}/admin/get/menu?menuId=${menuId}`);
  }

  public getMenuByDay(): Observable<Response> {
    return this.http.get<Response>(`${host}/admin/get/menuDay`);
  }

  public getOrders(date: Date): Observable<Response> {
    return this.http.get<Response>(`${host}/admin/get/order?date=${date}`);
  }

}
