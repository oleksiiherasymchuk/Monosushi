import { Component, OnInit } from '@angular/core';
import { deleteObject, getDownloadURL, percentage, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/category.interface';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ImagesService } from 'src/app/shared/services/images/images.service';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {

  public adminCategories: Array<ICategoryResponse> = [];
  public adminProducts: Array<IProductResponse> = [];
  public productForm!: FormGroup; 
  public editStatus = false;
  public uploadPercent = 0;
  public isUploaded = false;
  public isOpen = false;
  private currentCategoryId = 0;
  private currentProductId = 0;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService,
    private imageService: ImagesService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initProductForm();
    this.loadCategories();
    this.loadProduct();
  }

  initProductForm(): void {
    this.productForm = this.fb.group({
      category: [null, Validators.required],
      name: [null, Validators.required],
      path: [null, Validators.required],
      ingredients: [null, Validators.required],
      weight: [null, Validators.required],
      price: [null, Validators.required],
      imagePath: [null, Validators.required],
      count: [1]
    });
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe(data => {
      this.adminCategories = data;
      this.productForm.patchValue({
        category: this.adminCategories[0].id
      })
    })
  }

  loadProduct(): void {
    this.productService.getAll().subscribe(data => {
      this.adminProducts = data;
    })
  }

  addProduct(): void {
    if(this.editStatus){
      this.productService.update(this.productForm.value, this.currentProductId).subscribe(() => {
        this.loadProduct();
        this.isOpen = false;
        this.editStatus = false;
        this.toastr.success('Product successfully updated');
      })
    } else {
      this.productService.create(this.productForm.value).subscribe(() => {
        this.loadProduct();
        this.isOpen = false;
        this.editStatus = false;
        this.toastr.success('Product successfully created');
        this.productForm.reset()
      })
    }
  }

  editProduct(product: IProductResponse): void {
    this.productForm.patchValue({
      category: product.category,
      name: product.name,
      path: product.path,
      ingredient: product.ingredients,
      weight: product.weight,
      price: product.price,
      imagePath: product.imagePath,
    });
    this.isOpen = true;
    this.isUploaded = true;
    this.editStatus = true;
    this.currentProductId = product.id;
  }

  deleteProduct(product: IProductResponse): void {
    this.productService.delete(product.id).subscribe(() => {
      this.loadProduct();
      this.toastr.success('Product successfully deleted');
    })
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.imageService.uploadFile('images', file.name, file)
      .then(data => {
        this.productForm.patchValue({
          imagePath: data
        });
        this.isUploaded = true;
      })
      .catch(err => {
        console.log(err);
      })
  }

  deleteImage(): void {
    this.imageService.deleteUploadFile(this.valueByControl('imagePath'))
      .then(() => {
        this.isUploaded = false;
        this.uploadPercent = 0;
        this.productForm.patchValue({ imagePath: null });
      })
      .catch(err => {
        console.log(err);
      })
  }

  valueByControl(control: string): string {
    return this.productForm.get(control)?.value;
  }

  addProductItem(): void {
    this.isOpen = !this.isOpen;
  }

  // public adminCategories: Array<ICategoryResponse> = [];
  // public categoryForm!: FormGroup
  // public editStatus: boolean = false;
  // public uploadPercent!: number;
  // public isUploaded: boolean = false;
  // private currentCategoryId = 0

  // constructor(
  //   private fb: FormBuilder,
  //   private categoryService: CategoryService,
  //   private storage: Storage,
  // ) { }

  // ngOnInit(): void {
  //   this.initCategoryForm();
  //   this.loadCategories();
  // }

  // addCategoryItem(): void {
  //   this.editStatus = !this.editStatus
  // }

  // initCategoryForm(): void {
  //   this.categoryForm = this.fb.group({
  //     name: [null, Validators.required],
  //     path: [null, Validators.required],
  //     imagePath: [null, Validators.required],
  //   })
  // }


  // loadCategories(): void {
  //   this.categoryService.getAll().subscribe((data) => {
  //     this.adminCategories = data
  //   })
  // }

  // addCategory(): void {
  //   if (this.editStatus) {
  //     this.categoryService.update(this.categoryForm.value, this.currentCategoryId).subscribe(() => {
  //       this.loadCategories()
  //     })
  //   } else {
  //     this.categoryService.create(this.categoryForm.value).subscribe(() => {
  //       this.loadCategories()
  //     })
  //   }
    
  //   this.editStatus = false
  //   this.categoryForm.reset()
  //   this.isUploaded = false
  // }

  // editCategory(category: ICategoryResponse): void {
    
  //   this.editStatus = true
  //   this.categoryForm.patchValue({
  //     name: category.name,
  //     path: category.path,
  //     imagePath: category.imagePath
  //   })
 
  //   // this.editStatus = false
  //   this.currentCategoryId = category.id
  //   this.isUploaded = true;
  // }

  // deleteCategory(category: ICategoryResponse): void {
  //   this.categoryService.delete(category.id).subscribe(() => {
  //     this.loadCategories()
  //   })

  //   this.categoryForm.reset()
  // }

  // upload(event: any): void {
  //   const file = event.target.files[0]
  //   this.uploadFile('images', file.name, file)
  //     .then(data => {
  //       this.categoryForm.patchValue({
  //         imagePath: data
  //       })
  //       this.isUploaded = true
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })
  // }

  // async uploadFile(folder: string, name: string, file: File | null): Promise<string> {
  //   const path = `${folder}/${name}`
  //   let url = ''
  //   if (file) {
  //     try {
  //       const storageRef = ref(this.storage, path)
  //       const task = uploadBytesResumable(storageRef, file)
  //       percentage(task).subscribe((data) => {
  //         this.uploadPercent = data.progress
  //       })
  //       await task
  //       url = await getDownloadURL(storageRef)
  //     } catch (e: any) {
  //       console.error(e)
  //     }
  //   } else {
  //     console.log('Wrong format');
  //   }
  //   return Promise.resolve(url)
  // }

  // deleteImage(): void {
  //   const task = ref(this.storage, this.valueByControl('imagePath'))
  //   deleteObject(task).then(() => {
  //     console.log('File deleted');
  //     this.isUploaded = false
  //     // this.uploadPercent = 0
  //     this.categoryForm.patchValue({
  //       imagePath: null
  //     })
      
  //   })
  // }
  // valueByControl(control: string): string {
  //   return this.categoryForm.get(control)?.value
  // }
}
