import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  isCreate = false;
  form!: FormGroup;
  selectFile = null;
  constructor(
    private productService: ProductService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl(''),
      title: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      note: new FormControl(''),
    });

    this.getProductById();
  }

  get f() {
    return this.form.controls;
  }

  pickFile(file: any) {
    if (!file) {
      return;
    }

    this.selectFile = file.target.files[0];
  }

  onSubmitForm() {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    this.productService.setID = this.f['id'].value;
    this.productService.setTitle = this.f['title'].value;
    this.productService.setPrice = this.f['price'].value;
    this.productService.setNote = this.f['note'].value;
    this.productService.setImage = this.selectFile;

    if (this.isCreate) {
      this.productService.updateProduct().subscribe({
        next: () => {
          this.location.back();
        },
        error: (er) => {},
        complete: () => {},
      });
    } else {
      this.productService.createProduct().subscribe({
        next: () => {
          this.location.back();
        },
        error: (er) => {
          console.log(er);
        },
        complete: () => {},
      });
    }
  }

  getProductById() {
    this.route.paramMap.subscribe((param) => {
      if (param.get('id')) {
        this.productService.setID = param.get('id') || '';
        this.productService.getProduct().subscribe({
          next: (res) => {
            this.form.setValue({
              id: res._id,
              title: res.title,
              price: res.price,
              imageurl: res.imageUrl,
              note: res.note,
            });
            this.isCreate = true;
          },
          error: (er) => {
            console.log(er);
          },
          complete: () => {},
        });
      }
    });
  }
}
