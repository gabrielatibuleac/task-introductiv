import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BobocDetailComponent } from './boboc-detail.component';

describe('BobocDetailComponent', () => {
  let component: BobocDetailComponent;
  let fixture: ComponentFixture<BobocDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BobocDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BobocDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
