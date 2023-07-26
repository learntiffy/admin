import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Response } from '../models/response.model';
import { Area } from '../models/area.model';
import { SubArea } from '../models/subarea.model';
import { Item } from '../models/item.model';
import { Menu } from '../models/menu.model';

const host = "https://tiffy-backend.onrender.com";
// const host = "https://tiffylearn2-zany-space-parakeet-wr7v6v5gg99qf5w5r-9999.preview.app.github.dev";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

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

}
