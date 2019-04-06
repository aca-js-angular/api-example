import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-rest',
  templateUrl: './rest.component.html',
  styleUrls: ['./rest.component.css']
})
export class RestComponent implements OnInit {

  baseUrl: string = 'https://firestore.googleapis.com/v1beta1/projects/';
  projectId: string = environment.firebaseConfig.projectId;
  key: string = environment.firebaseConfig.apiKey;
  databasePath: string = '/databases/(default)/documents/';
  httpParam: HttpParams;

  result: object;

  constructor(private http: HttpClient) {
    this.httpParam = new HttpParams().set('key', this.key);
  }

  ngOnInit() {
    this.productId = '1';
  }

  getProducts() {
    let url = this.baseUrl + this.projectId + this.databasePath + 'products';
    this.http.get(url, {
      params: this.httpParam
    }).subscribe(result => {
      this.result = result;
    });
  }

  productId: string;
  getProductById() {
    let url = this.baseUrl + this.projectId + this.databasePath + 'products/' + this.productId;
    this.http.get(url, {
      params: this.httpParam
    }).subscribe(result => {
      this.result = result;
    }, error => {
      this.result = error;
    });
  }

  newName: string;
  updateDocumentById() {
    let url = this.baseUrl + this.projectId + this.databasePath + 'products/' + this.productId;
    this.http.patch(url,
      {
        fields: {
          name: {
            stringValue: this.newName
          }
        }
      },
      {
        params: this.httpParam.set('updateMask.fieldPaths', 'name')
      }).subscribe(result => {
        this.result = result;
      }, error => {
        this.result = error;
      });
  }

}
