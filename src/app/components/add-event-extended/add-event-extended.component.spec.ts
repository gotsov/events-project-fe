import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEventExtendedComponent } from './add-event-extended.component';

describe('AddEventExtendedComponent', () => {
  let component: AddEventExtendedComponent;
  let fixture: ComponentFixture<AddEventExtendedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEventExtendedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEventExtendedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
