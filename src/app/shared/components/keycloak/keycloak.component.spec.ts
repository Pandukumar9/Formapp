import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeycloakComponent } from './keycloak.component';

describe('KeycloakComponent', () => {
  let component: KeycloakComponent;
  let fixture: ComponentFixture<KeycloakComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KeycloakComponent]
    });
    fixture = TestBed.createComponent(KeycloakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
