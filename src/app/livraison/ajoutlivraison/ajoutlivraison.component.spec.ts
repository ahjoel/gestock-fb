import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutlivraisonComponent } from './ajoutlivraison.component';

describe('AjoutlivraisonComponent', () => {
  let component: AjoutlivraisonComponent;
  let fixture: ComponentFixture<AjoutlivraisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutlivraisonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutlivraisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
