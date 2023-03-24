import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDiscountResponse } from 'src/app/shared/interfaces/discount/discount.interface';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';
import { ImagesService } from 'src/app/shared/services/images/images.service';

@Component({
  selector: 'app-admin-discount',
  templateUrl: './admin-discount.component.html',
  styleUrls: ['./admin-discount.component.scss']
})
export class AdminDiscountComponent implements OnInit {

  public isOpen: boolean = false;
  public editStatus: boolean = false;
  public editID!: number;
  public adminDiscounts!: IDiscountResponse[];
  public discountForm!: FormGroup;
  public isUploaded: boolean = false;
  private currentCategoryId!: number | string;
  

  constructor(
    private discountService: DiscountService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private imageService: ImagesService
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
    this.isOpen = !this.isOpen
    this.discountForm.reset()
  }

  loadDiscount(): void {
    this.discountService.getAllFirebase().subscribe((data) => {
      this.adminDiscounts = data as IDiscountResponse[]
      this.discountForm.patchValue({
        discount: this.adminDiscounts[0].id
      })
    })
  }

  addDiscount(): void {
    if (this.editStatus) {
      this.discountService.updateFirebase(this.discountForm.value, this.currentCategoryId as string).then(() => {
        this.loadDiscount()
        this.toastr.success('Category successfully updated')
      })
    } else {
      this.discountService.createFirebase(this.discountForm.value).then(() => {
        this.loadDiscount()
        this.toastr.success('Discount successfully created')
      })
    }
    this.isOpen = false
    this.editStatus = false
    this.isUploaded = false
    this.discountForm.reset()
  }

  editDiscount(discount: IDiscountResponse): void {
    this.discountForm.patchValue({
      name: discount.name,
      title: discount.title,
      description: discount.description,
      imagePath: discount.imagePath,
    })
    this.isOpen = true
    this.editStatus = true
    this.isUploaded = true
    this.currentCategoryId = discount.id as number
    this.discountService.getOneFirebase(discount.id as string).subscribe((data => { }))
  }

  deleteDiscount(discount: IDiscountResponse): void {
    this.discountService.deleteFirebase(discount.id as string).then(() => {
      this.loadDiscount()
      this.toastr.success('Discount successfully deleted');
    })
    this.discountForm.reset()
  }

  upload(event: any): void {
    const file = event.target.files[0]
    this.imageService.uploadFile('images', file.name, file)
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

  deleteImage(): void {
    this.imageService.deleteUploadFile(this.valueByControl('imagePath')).then(() => {
      this.isUploaded = false
      this.discountForm.patchValue({
        imagePath: null
      })
    }).catch((err) => {
      console.log(err);
    })
  }

  valueByControl(control: string): string {
    return this.discountForm.get(control)?.value
  }
}
