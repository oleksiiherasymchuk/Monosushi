import { collection, Firestore, collectionData, doc, docData, addDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProductRequest, IProductResponse } from '../../interfaces/product/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productCollection!: CollectionReference<DocumentData>

  constructor(
    private afs: Firestore) { 
      this.productCollection = collection(this.afs,  `products`)
     }
  
  getAllProductByCategory(name: string){
    return collectionData(this.productCollection, { idField: `id` } )
    // return this.http.get<IProductResponse[]>(`${this.api.products}?category.path=${name}`);

  }
  getAllProducts(){
    return collectionData(this.productCollection, { idField: 'id' } )
  }

  getOneProduct(id: string){
    const productDocumentReference = doc(this.afs, `products/${id}`)
    return docData(productDocumentReference, { idField: 'id' } )
  }

  createProduct(product: IProductRequest){
    return addDoc(this.productCollection, product)
  }

  updateProduct(product: IProductRequest, id: string) {
    const productDocumentReference = doc(this.afs, `products/${id}`)
    return updateDoc(productDocumentReference, { ...product } )
  }

  deleteProduct(id: string) {
    const productDocumentReference = doc(this.afs, `products/${id}`)
    return deleteDoc(productDocumentReference)
  }
}