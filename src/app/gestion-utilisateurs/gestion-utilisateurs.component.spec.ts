import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionUtilisateursComponent } from './gestion-utilisateurs.component';

describe('GestionUtilisateursComponent', () => {
  let component: GestionUtilisateursComponent;
  let fixture: ComponentFixture<GestionUtilisateursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionUtilisateursComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionUtilisateursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
