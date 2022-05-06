import {Injectable} from '@angular/core';
import {Product} from "./product";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {

  private productUrl: string = "api/products/products.json"

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrl).pipe(
        tap(data => console.log("All: ", JSON.stringify(data))),
        catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    // handle exception; in the real world: maybe remote logging infrastructure
    let message = "";
    if(err.error instanceof ErrorEvent) {
      // client side or network error occured
      message = "An error occured: " + err.error.message;
    } else {
      //backend returned unsuccessful response code
      //response body may contain further info
      message = "Server returned code: " + err.status + ", error message is: " + err.message;
    }
    console.error(message);
    return throwError(message);
  }
}
