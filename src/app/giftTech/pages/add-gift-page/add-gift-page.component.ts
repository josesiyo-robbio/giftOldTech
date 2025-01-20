import {Component, inject} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader} from '@angular/material/card';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {Category, Condition, ProductGift} from '../../interfaces/product-gift';
import {MatOption, MatSelect} from '@angular/material/select';
import {LoadingDialogComponent} from '../../../shared/loading-dialog/loading-dialog.component';
import {MessageDialogComponent} from '../../../shared/message-dialog/message-dialog.component';

@Component({
  selector: 'giftTech-add-gift-page',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInput,
    MatButton,
    MatSelect,
    MatOption,
    FormsModule
  ],
  templateUrl: './add-gift-page.component.html',
  styleUrl: './add-gift-page.component.css'
})
export class AddGiftPageComponent
{
  //CLASS PROPERTIES
  public  pageToolTip : string = `On this page, you can add a device you'd like to gift.
   Simply fill out the form with the product details, such as its name, description,
    condition, and category. Once you submit the form, your device will be available
     for others to take and give it a second life.`;
    giftForm: FormGroup;
  selectedCategory : string = '';
  categories: Category[] = Object.values(Category);

  selectedCondition: string = '';
  conditions: Condition[] = Object.values(Condition);
  private dialogRef: MatDialogRef<LoadingDialogComponent, any> | undefined;
  public dialog :MatDialog = inject(MatDialog);



  //CONSTRUCTOR
  constructor(private fb: FormBuilder, private router: Router,)
  {
    this.giftForm = this.fb.group({
      name        :   ['', Validators.required],
      image       :   ['', Validators.required],
      description :   ['', Validators.required],
      category       :   ['', Validators.required],
      condition:   ['', Validators.required],
    });
  }



  //GETTERS & SETTERS (NA)



  //METHODS
  public onSubmit(): void
  {
    if (this.giftForm.invalid)
    {
      return;
    }

    const productContainer = JSON.parse(localStorage.getItem('myGifts') || '[]');

    if (!Array.isArray(productContainer) || productContainer.length === 0)
    {
      console.error('El formato del localStorage no es válido.');
      return;
    }

    const gifts = productContainer[0];

    const newProduct: ProductGift =
      {
        id          :   this.generateId(),
        name        :   this.giftForm.value.name,
        image       :   this.giftForm.value.image,
        description :   this.giftForm.value.description,
        given       :   false,
        category    :   this.giftForm.value.category,
        condition   :   this.giftForm.value.condition,
        claimed     :   false,
      };

    gifts.push(newProduct);

    localStorage.setItem('myGifts', JSON.stringify(productContainer));

    this.giftForm.reset();

  this.dialogRef = this.dialog.open(MessageDialogComponent,
      {
        data: {
          title: 'Success',
          message: 'The product has been created successfully',
          onOk: () => this.router.navigate(['']),
        },
      });

  }


  private generateId(): string
  {
    return crypto.randomUUID();
  }



  //LIFECYCLE HOOKS (NA)


  protected readonly Category = Category;
}
