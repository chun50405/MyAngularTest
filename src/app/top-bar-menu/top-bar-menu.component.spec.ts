import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBarMenuComponent } from './top-bar-menu.component';

describe('TopBarMenuComponent', () => {
  let component: TopBarMenuComponent;
  let fixture: ComponentFixture<TopBarMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopBarMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopBarMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
