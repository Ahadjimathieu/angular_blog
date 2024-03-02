import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestlayoutComponent } from './guestlayout.component';

describe('GuestlayoutComponent', () => {
  let component: GuestlayoutComponent;
  let fixture: ComponentFixture<GuestlayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GuestlayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuestlayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
