import { Injectable } from '@angular/core';
import { IDiscountRequest, IDiscountResponse } from '../../interfaces/discount/discount.interface';
import { collection, CollectionReference, DocumentData, Firestore, collectionData, doc, docData, addDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  private discountCollection!: CollectionReference<DocumentData>

  constructor(
    private afs: Firestore) { 
      this.discountCollection = collection(this.afs, 'discounts')
     }

  getAllFirebase(){
    return collectionData(this.discountCollection, { idField: 'id' })
  }

  getOneFirebase(id: string) {
    const discountDocumentReference = doc(this.afs, `discounts/${id}`)
    return docData(discountDocumentReference, { idField: 'id' } )
  }

  createFirebase(discount: IDiscountRequest){
    return addDoc(this.discountCollection, discount)
  }

  updateFirebase(discount: IDiscountRequest, id: string) {
    const discountDocumentReference = doc(this.afs, `discounts/${id}`)
    return updateDoc(discountDocumentReference, { ...discount })
  }

  deleteFirebase(id: string) {
    const discountDocumentReference = doc(this.afs, `discounts/${id}`)
    return deleteDoc(discountDocumentReference)
  }
}
