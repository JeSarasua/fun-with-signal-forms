import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwFormComponent } from './sw-form.component';

describe('SwFormComponent', () => {
  let component: SwFormComponent;
  let fixture: ComponentFixture<SwFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
