import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FournitureComponent } from './fourniture.component';

describe('FournitureComponent', () => {
  let component: FournitureComponent;
  let fixture: ComponentFixture<FournitureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FournitureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FournitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
