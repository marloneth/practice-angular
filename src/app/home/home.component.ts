import { Component, OnInit, OnDestroy } from '@angular/core'
import { DataService } from '../data.service'
import { takeUntil } from 'rxjs'
import { Subject } from 'rxjs'
import { HttpResponse } from '@angular/common/http'
import { Product } from '../product'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  products: Product[] = []
  destroy$ = new Subject<boolean>()

  constructor(private dataService: DataService) {}

  public firstPage() {
    this.products = []
    this.dataService
      .sendGetRequestToUrl(this.dataService.first)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: HttpResponse<Product[]>) => {
        console.log(res)
        this.products = res.body ?? []
      })
  }

  public previousPage() {
    if (!this.dataService.prev) return

    this.products = []
    this.dataService
      .sendGetRequestToUrl(this.dataService.prev)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: HttpResponse<Product[]>) => {
        console.log(res)
        this.products = res.body ?? []
      })
  }

  public nextPage() {
    if (!this.dataService.next) return

    this.products = []
    this.dataService
      .sendGetRequestToUrl(this.dataService.next)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: HttpResponse<Product[]>) => {
        console.log(res)
        this.products = res.body ?? []
      })
  }

  public lastPage() {
    this.products = []
    this.dataService
      .sendGetRequestToUrl(this.dataService.last)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: HttpResponse<Product[]>) => {
        console.log(res)
        this.products = res.body ?? []
      })
  }

  ngOnInit(): void {
    console.log('init')
    this.dataService
      .sendGetRequest()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: HttpResponse<Product[]>) => {
        console.log(res)
        this.products = res.body ?? []
      })
  }

  ngOnDestroy() {
    this.destroy$.next(true)
    // Unsubscribe from the subject
    this.destroy$.unsubscribe()
  }
}
