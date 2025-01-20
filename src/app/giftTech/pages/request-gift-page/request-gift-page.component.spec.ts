import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestGiftPageComponent } from './request-gift-page.component';

describe('RequestGiftPageComponent', () => {
  let component: RequestGiftPageComponent;
  let fixture: ComponentFixture<RequestGiftPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestGiftPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestGiftPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
