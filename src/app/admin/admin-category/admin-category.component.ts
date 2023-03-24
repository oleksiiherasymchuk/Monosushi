import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/category.interface';
import { ImagesService } from 'src/app/shared/services/images/images.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {

  public adminCategories: Array<ICategoryResponse> = [];
  public categoryForm!: FormGroup
  public editStatus: boolean = false;
  public uploadPercent!: number;
  public isUploaded: boolean = false;
  public isOpen: boolean = false
  private currentCategoryId!: number | string;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private imageService: ImagesService,
  ) { }

  ngOnInit(): void {
    this.initCategoryForm();
    this.loadCategories();
  }

  addCategoryItem(): void {
    this.isOpen = !this.isOpen
  }

  initCategoryForm(): void {
    this.categoryForm = this.fb.group({
      name: [null, Validators.required],
      path: [null, Validators.required],
      imagePath: [null, Validators.required],
    })
  }

  loadCategories(): void {
    this.categoryService.getAllFirebase().subscribe((data) => {
      this.adminCategories = data as ICategoryResponse[]
    })
  }
 
  addCategory(): void {
    if (this.editStatus) {
      this.categoryService.updateFirebase(this.categoryForm.value, this.currentCategoryId as string).then(() => {
        this.loadCategories()
        this.toastr.success('Category successfully updated')
      })
    } else {
      this.categoryService.createFirebase(this.categoryForm.value).then(() => {
        this.loadCategories()
        this.toastr.success('Category successfully created')
      })
    }

    this.editStatus = false
    this.isOpen = false
    this.isUploaded = false
    this.categoryForm.reset()
  }
  
  editCategory(category: ICategoryResponse): void {
    this.categoryForm.patchValue({
      name: category.name,
      path: category.path,
      imagePath: category.imagePath
    })
    this.isOpen = true
    this.editStatus = true
    this.isUploaded = true;
    this.currentCategoryId = category.id as number
    this.categoryService.getOneFirebase(category.id as string).subscribe((data) => {})
  }

  deleteCategory(category: ICategoryResponse): void {
    this.categoryService.deleteFirebase(category.id as string).then(() => {
      this.loadCategories()
      this.toastr.success('Category successfully deleted');
    })
  }

  upload(event: any): void {
    const file = event.target.files[0]
    this.imageService.uploadFile('images', file.name, file)
      .then(data => {
        this.categoryForm.patchValue({
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
      this.categoryForm.patchValue({
        imagePath: null
      })
    })
  }
  valueByControl(control: string): string {
    return this.categoryForm.get(control)?.value
  }
}


