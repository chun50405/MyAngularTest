import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfSelectStockComponent } from './self-select-stock.component';

describe('SelfSelectStockComponent', () => {
  let component: SelfSelectStockComponent;
  let fixture: ComponentFixture<SelfSelectStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelfSelectStockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelfSelectStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
