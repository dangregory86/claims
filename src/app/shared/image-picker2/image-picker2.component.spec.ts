import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ImagePicker2Component } from './image-picker2.component';

describe('ImagePicker2Component', () => {
  let component: ImagePicker2Component;
  let fixture: ComponentFixture<ImagePicker2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagePicker2Component ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ImagePicker2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
