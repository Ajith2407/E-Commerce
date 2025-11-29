import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';
import { Product } from 'src/app/modules/product/model';
import { MENU } from 'src/app/shared/constant';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { WishlistService } from 'src/app/core/services/wishlist.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [`
    :host {
      display: block;
    }
    
    .scale-x-100 {
      transform: scaleX(1);
    }
  `]
})
export class HeaderComponent implements OnInit {
  cart: Product[] = [];
  menulist: { title: string; path: string }[] = MENU;
  isMobileMenuOpen = false;
  wishlistCount = 0;

  constructor(
    private cartService: CartService,
    public authService: AuthService,
    private router: Router,
    private wishlistService: WishlistService
  ) { }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  logOut() {
    this.authService.logout();
    this.closeMobileMenu();
    this.router.navigate(['/']);
  }

  isActive(path: string): boolean {
    return this.router.url.includes(path);
  }

  ngOnInit(): void {
    this.cart = this.cartService.getCart;
    this.wishlistService.count$.subscribe(count => {
      this.wishlistCount = count;
    });
  }
}