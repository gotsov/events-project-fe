import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEventSectorComponent } from './add-event-sector.component';

describe('AddEventSectorComponent', () => {
  let component: AddEventSectorComponent;
  let fixture: ComponentFixture<AddEventSectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEventSectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEventSectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
