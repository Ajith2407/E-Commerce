import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/modules/product/model';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlist: Product[] = [];
  public wishlist$ = new BehaviorSubject<Product[]>([]);
  public count$ = new BehaviorSubject<number>(0);

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    const stored = localStorage.getItem('wishlist');
    if (stored) {
      this.wishlist = JSON.parse(stored);
      this.updateState();
    }
  }

  private updateState() {
    this.wishlist$.next(this.wishlist);
    this.count$.next(this.wishlist.length);
    localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
  }

  getWishlist() {
    return this.wishlist;
  }

  add(product: Product) {
    if (!this.isInWishlist(product)) {
      this.wishlist.push(product);
      this.updateState();
    }
  }

  remove(product: Product) {
    const index = this.wishlist.findIndex(item => item.id === product.id);
    if (index !== -1) {
      this.wishlist.splice(index, 1);
      this.updateState();
    }
  }

  toggle(product: Product) {
    if (this.isInWishlist(product)) {
      this.remove(product);
    } else {
      this.add(product);
    }
  }

  isInWishlist(product: Product): boolean {
    return this.wishlist.some(item => item.id === product.id);
  }

  clear() {
    this.wishlist = [];
    this.updateState();
  }
}
