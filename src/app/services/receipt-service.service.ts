import { Injectable } from '@angular/core';
import { Receipt } from '../models/receipt-model';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {

  private _receipts: Receipt[] = [
    new Receipt(
      'r1',
      20.99,
      new Date(),
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/ReceiptSwiss.jpg/200px-ReceiptSwiss.jpg'
    ),
    new Receipt(
      'r2',
      5,
      new Date(),
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/ReceiptSwiss.jpg/200px-ReceiptSwiss.jpg'
    ),
    new Receipt(
      'r3',
      233.99,
      new Date(),
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/ReceiptSwiss.jpg/200px-ReceiptSwiss.jpg'
    ),
    new Receipt(
      'r4',
      17.99,
      new Date(),
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/ReceiptSwiss.jpg/200px-ReceiptSwiss.jpg'
    ),
    new Receipt(
      'r5',
      17.99,
      new Date(),
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/ReceiptSwiss.jpg/200px-ReceiptSwiss.jpg'
    ),
    new Receipt(
      'r6',
      17.99,
      new Date(),
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/ReceiptSwiss.jpg/200px-ReceiptSwiss.jpg'
    ),
  ]

  constructor() { }

  public getReceipts() {
    return [...this._receipts];
  }
}
