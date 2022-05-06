import {Component, OnDestroy, OnInit} from "@angular/core";
import {Product} from "../product";
import {ProductDataService} from "../product-data.service";
import {Subscription} from "rxjs";

@Component({
    selector: "pm-products",
    templateUrl: "./products.component.html",
    styleUrls: ["./products.component.css"],
})
export class ProductsComponent implements OnInit, OnDestroy {

    pageTitle: string = "Products List";
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImages: boolean = false;
    private _listFilter: string = "";
    private errorMessage: string = "";
    private productsSubscription!: Subscription;

    public get listFilter(): string {
        return this._listFilter;
    }

    public set listFilter(value: string) {
        console.log("filtervalue: " + value);
        this._listFilter = value;
        this.filteredProducts = this.performFilter(this._listFilter);
    }

    filteredProducts: Product[] = [];

    products: Product[] = [];

    performFilter(filterBy: string): Product[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: Product) => product.productName.toLocaleLowerCase().includes(filterBy));
    }

    constructor(private productDataService: ProductDataService) {
    }

    ngOnInit(): void {
        console.log("On init!");
        this.productsSubscription = this.productDataService.getProducts().subscribe({
            next: products => {
                this.products = products;
                this.listFilter = "";
            },
            error: err => this.errorMessage = err
        });
    }

    ngOnDestroy(): void {
        this.productsSubscription.unsubscribe();
    }

    toggleImages(): void {
        this.showImages = !this.showImages;
    }

    onNotify($event: string) {
        console.log("notification received!");
    }
}
