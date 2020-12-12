import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewClaimPage } from './new-claim.page';

describe('NewClaimPage', () => {
  let component: NewClaimPage;
  let fixture: ComponentFixture<NewClaimPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewClaimPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewClaimPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
