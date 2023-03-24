import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IDiscountRequest, IDiscountResponse } from '../../interfaces/discount/discount.interface';
import { collection, CollectionReference, DocumentData, Firestore, collectionData, doc, docData, addDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  private url = environment.BACKEND_URL;
  private api = { discounts: `${this.url}/discounts` }
  private discountCollection!: CollectionReference<DocumentData>

  constructor(
    private http: HttpClient,
    private afs: Firestore) { 
      this.discountCollection = collection(this.afs, 'discounts')
     }

  getAll(): Observable<IDiscountResponse[]> {
    return this.http.get<IDiscountResponse[]>(this.api.discounts)
  }

  getOne(id: number): Observable<IDiscountResponse> {
    return this.http.get<IDiscountResponse>(`${this.api.discounts}/${id}`)
  }

  create(discount: IDiscountRequest): Observable<IDiscountResponse> {
    return this.http.post<IDiscountResponse>(this.api.discounts, discount)
  }

  update(discount: IDiscountRequest, id: number): Observable<IDiscountResponse> {
    return this.http.patch<IDiscountResponse>(`${this.api.discounts}/${id}`, discount)
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.discounts}/${id}`)
  }

  //  firebase discount service
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
