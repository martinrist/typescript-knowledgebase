import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../products.service';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-product-create',
  imports: [ReactiveFormsModule],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css'
})
export class ProductCreateComponent implements OnInit {

  productForm: FormGroup<{
    title: FormControl<string>,
    price: FormControl<number | undefined>,
    category: FormControl<string>
  }> | undefined;

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private builder: FormBuilder
  ) {}

  createProduct() {
    this.productsService.addProduct(this.productForm!.value)
      .subscribe(() => this.router.navigate(['/products']));
  }

  private buildForm() {
    this.productForm = this.builder.nonNullable.group({
      title: [''],
      price: this.builder.nonNullable.control<number | undefined>(undefined),
      category: ['']
    });
  }

  ngOnInit() {
    this.buildForm();
  }
}
