import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Product } from 'src/app/modules/product/model';
import { ProductService } from 'src/app/modules/product/services/product.service';
import { WishlistService } from 'src/app/core/services/wishlist.service';

@Component({
  selector: 'app-searchresult',
  templateUrl: './searchresult.component.html',
  styles: [
  ]
})
export class SearchresultComponent implements OnInit {
  products: Product[] = [];
  isLoading = false;
  error!: string;
  searchKeyword!: string;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private wishlistService: WishlistService
  ) {
  }
  ngOnInit(): void {
    this.getResults();
  }
  getResults() {
    this.isLoading = true;
    this.route.queryParams.subscribe((params: Params) => {
      this.searchKeyword = params['q'];
      this.productService.search(params['q']).subscribe((data) => {
        this.isLoading = false;
        this.products = data
      }, error => this.error = error.message)
    })
  }

  toggleWishlist(product: Product) {
    this.wishlistService.toggle(product);
  }

  isInWishlist(product: Product): boolean {
    return this.wishlistService.isInWishlist(product);
  }

}
