import { Component, OnInit } from '@angular/core';
import { PjDropdownItem } from '../components.global';


@Component({
  selector: 'pj-table-toolbar',
  templateUrl: './pj-table-toolbar.component.html',
  styleUrls: ['./pj-table-toolbar.component.scss']
})
export class PjTableToolbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // private _dropdownActionItems?: Array<PjDropdownItem>;
  // getDropDownActionItems(): Array<PjDropdownItem> {
  //   if (this._dropdownActionItems == null) {
  //     this._dropdownActionItems = [{
  //       iconName: 'person', label: 'Profile', badgeLabel: '23',
  //     }, {
  //       iconName: 'settings', label: 'Setting', description: 'set the user\'s config'
  //     }, {
  //       iconName: 'settings', label: 'Setting', divider: true,
  //     }, {
  //       iconName: 'logout', label: 'Logout',
  //     }];
  //   }
  //   return this._dropdownActionItems || [];
  // }

  private _dropdownOptionItems?: Array<PjDropdownItem>;
  private _dropdownOptionItemd?: Array<PjDropdownItem>; //we need more Arrays to show the  labels 
  private _dropdownOptionItemShowing?: Array<PjDropdownItem>;
  getStatusDropDownOptionItems(): Array<PjDropdownItem> {
    if (this._dropdownOptionItems == null) {
      this._dropdownOptionItems = [{
        label: 'Status',
      }, {
        label: 'Active',
      }, {
        label: 'Draft',
      }, {
        label: 'Price alert',
      }, {
        label: 'Out of stock',
      }];
    }
    return this._dropdownOptionItems || [];
  }
  
  getDateDropDownOptionItems(): Array<PjDropdownItem> {
    if (this._dropdownOptionItemd == null) {
      this._dropdownOptionItemd = [{
        label: 'Date',
      }, {
        label: '1 month',
      }, {
        label: '3 months',
      }, {
        label: '6 months',
      }, {
        label: '1 year',
      }];
    }
    return this._dropdownOptionItemd || [];
  }

  getShowingDropDownOptionItems(): Array<PjDropdownItem> {
    if (this._dropdownOptionItemShowing == null) {
      this._dropdownOptionItemShowing = [{
        label: '5 Rows',
      }, {
        label: '10 Rows',
      }, {
        label: '15 Rows',
      }, {
        label: '20 Rows',
      }, {
        label: '50 Rows',
      }];
    }
    return this._dropdownOptionItemShowing || [];
  }

}
