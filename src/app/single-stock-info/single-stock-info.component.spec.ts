import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleStockInfoComponent } from './Single-stock-info.component';

describe('SingleStockInfoComponent', () => {
  let component: SingleStockInfoComponent;
  let fixture: ComponentFixture<SingleStockInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleStockInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleStockInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
