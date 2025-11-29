import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/modules/product/model';
import { WishlistService } from 'src/app/core/services/wishlist.service';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
    selector: 'app-wishlist',
    templateUrl: './wishlist.component.html',
    styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
    wishlist: Product[] = [];

    constructor(
        private wishlistService: WishlistService,
        private cartService: CartService
    ) { }

    ngOnInit(): void {
        this.wishlistService.wishlist$.subscribe(items => {
            this.wishlist = items;
        });
    }

    removeFromWishlist(product: Product) {
        this.wishlistService.remove(product);
    }

    addToCart(product: Product) {
        this.cartService.add(product);
        // Optional: Remove from wishlist after adding to cart
        // this.removeFromWishlist(product);
    }

    clearWishlist() {
        this.wishlistService.clear();
    }
}
