import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filterOptions } from './filterOptions'
@Component({
  selector: 'app-lsit-product',
  templateUrl: './list-product-mytables.component.html',
  styleUrls: ['./list-product-mytables.component.scss']
})
export class ListProductMyTablesComponent implements OnInit {
  currentPage = 'class';
  rows = [];
  temp = [];
  total = 0;
  pageNumber = 0;
  searching: any;
  loader: any = false;
  enableDelete: boolean = true
  enableExport: boolean = true
  enableEdit: boolean = true
  pageSize: number = 10
  isValidationOnly = true

  formItems: any = filterOptions

  url?: string = "api/v1/shops/4/products"
  instanceUrl: string = "api/v1/product-configs"

  stats_count = 0
  args = {}

  //Required Fieds: name
  //Other fields: active, require_serial_number, shop
  formGroupOrder = [
  ]

  // Remmber to pass it to the component
  headers = [
    "shop_name", "name", "require_serial_number"
  ]

  constructor(private route: Router) { }

  ngOnInit() {
  }
  async handleActions(action: any) {
    if (action.name == "Edit") {
      const data = action.data;
      // id and name are what the multiselect expects for update
      data.shop = { id: data.shop, name: data.shop_name }
      await this.route.navigate(['products', 'add-product'], { state: data });
    }
  }

  exportTriggerd(event: any) {
    this.route.navigate(['../reports/downloads']);
  }

  onValidatedData(data: any) {
    let ignoreFiltersForDecription = ["grouping", "paginator"]
    let parsedFilters: any = {}
    let descriptions = []
    for (let key in data) {
      const filterValue = data[key]
      if (!filterValue) continue
      if (typeof filterValue == "object") {
        if (filterValue.hasOwnProperty("value")) {
          parsedFilters[key] = filterValue.value
        }
        if (filterValue.hasOwnProperty("details")) {
          for (let index in filterValue.details) {
            const description = filterValue.details[index]
            if (description.hasOwnProperty("description")) {
              if (!ignoreFiltersForDecription.includes(key))
                descriptions.push(description.description)
            }
          }
        }
      } else {
        parsedFilters[key] = filterValue
        if (!ignoreFiltersForDecription.includes(key))
          descriptions.push(`${key}*${filterValue}`)
      }
    }
    if (descriptions.length > 0)
      parsedFilters["descriptions"] = descriptions.join("-")
    this.url = "api/v1/shops/4/products"
    parsedFilters['paginator'] = 'cursor'
    this.args = parsedFilters
    console.log(parsedFilters)
    console.log(this.url)
  }
}
