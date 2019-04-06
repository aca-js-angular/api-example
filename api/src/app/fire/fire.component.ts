import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore } from '@angular/fire/firestore'

@Component({
  selector: 'app-fire',
  templateUrl: './fire.component.html',
  styleUrls: ['./fire.component.css']
})
export class FireComponent implements OnInit {

  result: object;
  db: AngularFirestore;

  constructor(fa: AngularFireAuth, db: AngularFirestore) {
    this.db = db;
  }

  ngOnInit() {
    this.productId = '1';
  }

  getProducts() {
    this.result = {};
    this.db.collection('products').get().subscribe(result => {
      let documents = [];
      result.forEach(doc => {
        documents.push(doc.data());
      });

      Object.assign(this.result, { documents: documents });
    },
      error => {
        this.result = error
      });
  }

  productId: string;
  getProductById() {
    this.db.collection('products').doc(this.productId).get().subscribe(result => {
      this.result = result.data();
    });
  }

  newName: string;
  updateDocumentById() {
    this.db.collection('products').doc(this.productId).update({
      name: this.newName
    });
  }

}
