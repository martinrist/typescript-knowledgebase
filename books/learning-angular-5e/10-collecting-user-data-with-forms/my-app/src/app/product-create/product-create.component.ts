import {Component} from '@angular/core';
import {ProductsService} from '../products.service';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-product-create',
  imports: [ReactiveFormsModule],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css'
})
export class ProductCreateComponent {

  productForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: Validators.required
    }),
    price: new FormControl<number | undefined>(undefined, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1)]
    }),
    category: new FormControl('', { nonNullable: true })
  });

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private builder: FormBuilder
  ) {}

  createProduct() {
    this.productsService.addProduct(this.productForm.value)
      .subscribe(() => this.router.navigate(['/products']));
  }

}
