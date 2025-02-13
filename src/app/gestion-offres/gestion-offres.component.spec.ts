import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionOffresComponent } from './gestion-offres.component';

describe('GestionOffresComponent', () => {
  let component: GestionOffresComponent;
  let fixture: ComponentFixture<GestionOffresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionOffresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionOffresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
