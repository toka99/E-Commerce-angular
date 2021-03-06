import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { PagerService } from './services/index'

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  products:Product[];

  constructor(private _ProductService: ProductService,private pagerService: PagerService) { }

  //private allItems: any[];

    // pager object
    pager: any = {};

    // paged items
    pagedItems: Product[];


  ngOnInit(): void {
    this._ProductService.getProducts().subscribe((res: any) => {
      this.products = res.data;

      this.setPage(1);

    });

  }
  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
        return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.products.length, page);

    // get current page of items
    this.pagedItems = this.products.slice(this.pager.startIndex, this.pager.endIndex + 1);
}

}
