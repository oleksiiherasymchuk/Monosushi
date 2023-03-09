import { CategoryService } from 'src/app/shared/services/category/category.service';
import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/category.interface';
import { deleteObject, getDownloadURL, percentage, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';

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
  private currentCategoryId = 0

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private storage: Storage,
  ) { }

  ngOnInit(): void {
    this.initCategoryForm();
    this.loadCategories();
  }

  addCategoryItem(): void {
    this.editStatus = !this.editStatus
  }

  initCategoryForm(): void {
    this.categoryForm = this.fb.group({
      name: [null, Validators.required],
      path: [null, Validators.required],
      imagePath: ['https://monosushi.com.ua/wp-content/uploads/2022/07/sushyk-zsu_page-0001.jpg.pagespeed.ce.8oVtB1QVQX.jpg', Validators.required],
    })
  }


  loadCategories(): void {
    this.categoryService.getAll().subscribe((data) => {
      this.adminCategories = data
    })
  }

  addCategory(): void {
    if (this.editStatus) {
      this.categoryService.update(this.categoryForm.value, this.currentCategoryId).subscribe(() => {
        this.loadCategories()
      })
    } else {
      this.categoryService.create(this.categoryForm.value).subscribe(() => {
        this.loadCategories()
      })
    }
    
    this.editStatus = false
    this.categoryForm.reset()
    this.isUploaded = false
  }

  editCategory(category: ICategoryResponse): void {
    
    this.editStatus = true
    this.categoryForm.patchValue({
      name: category.name,
      path: category.path,
      imagePath: category.imagePath
    })
 
    // this.editStatus = false
    this.currentCategoryId = category.id
    this.isUploaded = true;
  }

  deleteCategory(category: ICategoryResponse): void {
    this.categoryService.delete(category.id).subscribe(() => {
      this.loadCategories()
    })

    this.categoryForm.reset()
  }

  upload(event: any): void {
    const file = event.target.files[0]
    this.uploadFile('images', file.name, file)
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

  async uploadFile(folder: string, name: string, file: File | null): Promise<string> {
    const path = `${folder}/${name}`
    let url = ''
    if (file) {
      try {
        const storageRef = ref(this.storage, path)
        const task = uploadBytesResumable(storageRef, file)
        percentage(task).subscribe((data) => {
          this.uploadPercent = data.progress
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
      this.categoryForm.patchValue({
        imagePath: null
      })
      
    })
  }
  valueByControl(control: string): string {
    return this.categoryForm.get(control)?.value
  }
}



