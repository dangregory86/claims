import { Component } from '@angular/core';
import { Receipt } from '../models/receipt-model';
import { ReceiptService } from '../services/receipt-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  loadedReceipts: Receipt[];
  total = 0;

  constructor(private receiptService: ReceiptService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }
  
  
  ionViewWillEnter() {
    this.loadedReceipts = this.receiptService.getReceipts();
    this.total = this.getTotalToClaim();
  }

  getTotalToClaim(){
    let total = 0;
    for(let r of this.loadedReceipts){
      total = total + r.amount;
    }
    return total;
  }
}
