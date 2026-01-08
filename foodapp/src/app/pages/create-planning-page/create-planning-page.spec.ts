import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePlanningPage } from './create-planning-page';

describe('CreatePlanningPage', () => {
  let component: CreatePlanningPage;
  let fixture: ComponentFixture<CreatePlanningPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePlanningPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePlanningPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
