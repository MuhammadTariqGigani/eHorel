import { Product } from '../models/newProduct';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot } from '@angular/router';
import { splitNamespace } from '@angular/core/src/view/util';
import { Products } from '../models/products.model';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  categories = ['sukienki', 'bluzki', 'spodnie', 'kombinezony', 'dodatki'];
  products = [];

  constructor(private firebase: AngularFirestore) { }

  getDressys() {
    return this.firebase.collection('sukienki').snapshotChanges().pipe(
      map(actions => {
        return actions.map( a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  createNewProduct(product: Product) {
    let p: Product;
    p =  {
      category: product.category,
      name: product.name,
      description: product.description,
      price: product.price,
      size: product.size,
      storage: product.storage,
      photos: product.photos,
      isNew: product.isNew,
      promotion: product.promotion,
    };
    this.firebase.collection('products').add(p);
  }

  getNews() {
    return this.firebase.collection('products', ref => ref.where('isNew', '==', true)).snapshotChanges()
    .pipe(map(snaps => {
      return snaps.map( snap => {
        return {
          id: snap.payload.doc.id,
          ...snap.payload.doc.data()
        };
      });
    }));
  }
  getAll() {
    return this.firebase.collection('products').snapshotChanges()
    .pipe(map(snaps => {
      return snaps.map( snap => {
        return {
          id: snap.payload.doc.id,
          ...snap.payload.doc.data()
        };
      });
    }));
  }

 
  getAllToMemory() {
    this.firebase.collection('products').valueChanges().subscribe( res =>  this.products = res);
  }
  getProductsByCategory(category): Observable<any> {
    return this.firebase.collection('products', ref => ref.where('category', '==', category)).snapshotChanges()
    .pipe(map(snaps => {
      return snaps.map( snap => {
        return {
          id: snap.payload.doc.id,
          ...snap.payload.doc.data()
        };
      });
    }));
}

  getProduct(productId) {
    return this.firebase.doc(`products/${productId}`).snapshotChanges().pipe(
      map( snap => {
        return {
          id: snap.payload.id,
          ...snap.payload.data()
      };
      })
    );
  }
  updateProduct(productId, data) {
    this.firebase.doc(`products/${productId}`).update(data);
}
}
