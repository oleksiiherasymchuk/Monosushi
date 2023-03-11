import { Component, OnInit } from '@angular/core';
import { deleteObject, getDownloadURL, percentage, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDiscount, IDiscountResponse } from 'src/app/shared/interfaces/discount/discount.interface';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';

@Component({
  selector: 'app-admin-discount',
  templateUrl: './admin-discount.component.html',
  styleUrls: ['./admin-discount.component.scss']
})
export class AdminDiscountComponent implements OnInit {

  // public adminDiscounts!: IDiscount[];
  // public description!: string;
  public imagePath = 'https://la.ua/wp-content/uploads/2021/08/6-1.jpg';
  public editStatus: boolean = false;
  public editID!: number;

  public adminDiscounts!: IDiscountResponse[];
  public discountForm!: FormGroup;
  public isUploaded: boolean = false;
  private currentCategoryId: number = 0

  constructor(
    private discountService: DiscountService,
    private fb: FormBuilder,
    private storage: Storage,
  ) { }

  ngOnInit(): void {
    this.initDiscountForm()
    this.loadDiscount()
  }

  initDiscountForm(): void {
    this.discountForm = this.fb.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      title: [null, Validators.required],
      imagePath: [null, Validators.required]
    })
  }

  addDiscountItem(): void {
    this.editStatus = !this.editStatus
  }

  loadDiscount(): void {
    this.discountService.getAll().subscribe((data) => {
      this.adminDiscounts = data
    })
  }

  addDiscount(): void {
    // do not add this editStatus true 
    // if (this.editStatus) {
    //   this.discountService.update(this.discountForm.value, this.currentCategoryId).subscribe(() => {
    //     this.loadDiscount()
    //   })
    // } else {
      this.discountService.create(this.discountForm.value).subscribe(() => {
        this.loadDiscount()
      })
    // }

    this.editStatus = false
    this.discountForm.reset()
    this.isUploaded = false
  }

  editDiscount(discount: IDiscountResponse): void {
    this.editStatus = true
    this.discountForm.patchValue({
      name: discount.name,
      title: discount.title,
      description: discount.description,
      imagePath: discount.imagePath,
    })
    // this.editStatus = false
    this.currentCategoryId = discount.id
    this.isUploaded = true
  }

  deleteDiscount(discount: IDiscountResponse): void {
    this.discountService.delete(discount.id).subscribe(() => {
      this.loadDiscount()
    })

    this.discountForm.reset()
  }



  upload(event: any): void {
    const file = event.target.files[0]
    this.uploadFile('images', file.name, file)
      .then(data => {
        this.discountForm.patchValue({
          imagePath: data
        })
        this.isUploaded = true
      })
      .catch(err => {
        console.log(err);
      })
  }

  async uploadFile(folder: string, name: string, file: File | null): Promise<string> {
    const path = `${folder}/${name}`
    let url = ''
    if (file) {
      try {
        const storageRef = ref(this.storage, path)
        const task = uploadBytesResumable(storageRef, file)
        percentage(task).subscribe((data) => {
          // console.log(data);
        })
        await task
        url = await getDownloadURL(storageRef)
      } catch (e: any) {
        console.error(e)
      }
    } else {
      console.log('Wrong format');
    }
    return Promise.resolve(url)
  }

  deleteImage(): void {
    const task = ref(this.storage, this.valueByControl('imagePath'))
    deleteObject(task).then(() => {
      console.log('File deleted');
      this.isUploaded = false
      // this.uploadPercent = 0
      this.discountForm.patchValue({
        imagePath: null
      })

    })
  }
  valueByControl(control: string): string {
    return this.discountForm.get(control)?.value
  }

}


// getDiscounts(): void {
//   this.discountService.getAll().subscribe(data => {
//     this.adminDiscounts = data;
//   })
// }

// addDiscount(): void {
//   const newDiscount = {
//     description: this.description,
//     imagePath: this.imagePath
//   };
//   this.discountService.create(newDiscount).subscribe(() => {
//     this.getDiscounts();
//     this.resetForm();
//   })
// }

// editDiscount(discount: IDiscount): void {
//   this.description = discount.description;
//   this.imagePath = discount.imagePath;
//   this.editStatus = true;
//   this.editID = discount.id;
// }

// saveDiscount(): void {
//   const updateDiscount = {
//     description: this.description,
//     imagePath: this.imagePath
//   };
//   this.discountService.update(updateDiscount, this.editID).subscribe(() => {
//     this.getDiscounts();
//     this.resetForm();
//   })
// }

// deleteDiscount(discount: IDiscount): void {
//   if(confirm('Are you sure?')){
//     this.discountService.delete(discount.id).subscribe(() => {
//       this.getDiscounts();
//     })
//   }
// }

// private resetForm(): void {
//   this.description = '';
//   this.imagePath = 'https://la.ua/wp-content/uploads/2021/08/6-1.jpg';
//   this.editStatus = false;
// }