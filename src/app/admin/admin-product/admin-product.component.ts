import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/category.interface';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
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
  public isUploaded = false;
  public isOpen = false;
  private currentProductId!: string | number;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private imageService: ImagesService,
    private toastr: ToastrService,
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
    this.productService.getAllProducts().subscribe((data) => {
      this.adminProducts = data as IProductResponse[]
      this.productForm.patchValue({
        product: this.adminProducts[0].id 
      })
    })   
  }

  loadProduct(): void {
    this.productService.getAllProducts().subscribe((data) => {
      this.adminProducts = data as IProductResponse[]
    })  
  }

  addProduct(): void {
    if(this.editStatus){
      this.productService.updateProduct(this.productForm.value, this.currentProductId as string).then(() => {
        this.loadProduct()
        this.loadCategories()
        this.toastr.success('Product successfully updated')
      })
    } else {
      this.productService.createProduct(this.productForm.value).then(() => {
        this.loadProduct();
        this.toastr.success('Product successfully created');
      })
    }
    
    this.isOpen = false;
    this.isUploaded = false
    this.editStatus = false;
    this.productForm.reset()
  }

  editProduct(product: IProductResponse): void {
    this.productForm.patchValue({
      category: product.category,
      name: product.name,
      path: product.path,
      ingredients: product.ingredients,
      weight: product.weight,
      price: product.price,
      imagePath: product.imagePath,
      count: 1,
    });
    this.isOpen = true;
    this.isUploaded = true;
    this.editStatus = true;
    this.currentProductId = product.id as number;
    this.productService.getOneProduct(product.id as string).subscribe((data) => {})
    console.log(this.adminProducts);
  }

  deleteProduct(product: IProductResponse): void {
    this.productService.deleteProduct(product.id as string).then(() => {
      this.loadProduct()
      this.toastr.success('Product successfully deleted');
    })
    this.productForm.reset()
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
}

