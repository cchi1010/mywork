import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'pj-pagination',
  templateUrl: './pj-pagination.component.html',
  styleUrls: ['./pj-pagination.component.scss'],
})
export class PjPaginationComponent implements OnInit {
  @Input()
  totalPageItem = 7;

  @Input()
  totalPages = 10;

  @Input()
  currentPage = 1;

  @Output()
  pageChanged = new EventEmitter<number>();

  leftItem: PaginationItemData = {
    iconName: 'arrow_back',
    focused: false,
    disabled: true,
  };
  rightItem: PaginationItemData = {
    iconName: 'arrow_forward',
    focused: false,
    disabled: false,
  };

  pageItems?: PaginationItemData[];

  constructor() {}

  ngOnInit(): void {
    if (this.totalPages < 1) {
      this.totalPages = 1;
    }
    if (this.totalPages > 99) {
      this.totalPages = 99;
    }
    if (this.totalPages <= this.totalPageItem) {
      this.pageItems = new Array<PaginationItemData>(this.totalPages);
    } else {
      this.pageItems = new Array<PaginationItemData>(this.totalPageItem);
    }
    this._setPaginationItems();
  }

  onLeftClick(): void {
    if (this.leftItem.disabled) {
      return;
    }
    this.currentPage = this.currentPage - 1;
    this._setPaginationItems();
    this.pageChanged.emit(this.currentPage);
  }

  onRightClick(): void {
    if (this.rightItem.disabled) {
      return;
    }
    this.currentPage = this.currentPage + 1;
    this._setPaginationItems();
    this.pageChanged.emit(this.currentPage);
  }

  onPageItemClick(elm: any): void {
    if (elm.disabled) {
      return;
    }
    this.currentPage = new Number(elm.label).valueOf();
    this._setPaginationItems();
    this.pageChanged.emit(this.currentPage);
  }

  private _setPaginationItems(): void {
    this._setLeftRightItem();
    if (this.totalPages <= this.totalPageItem) {
      this._generateMinPages(this.totalPages);
    } else {
      this._generateMoreThanMinPages(this.totalPages);
    }
  }

  private _setLeftRightItem(): void {
    if (this.currentPage > 1) {
      this.leftItem.disabled = false;
    } else {
      this.currentPage = 1;
      this.leftItem.disabled = true;
    }
    if (this.currentPage >= this.totalPages) {
      this.currentPage = this.totalPages;
      this.rightItem.disabled = true;
    } else {
      this.rightItem.disabled = false;
    }
  }

  private _generateMinPages(pages: number) {
    if (this.pageItems == null) {
      return;
    }
    for (let i = 0; i < pages; i++) {
      this.pageItems[i] = {
        label: i + 1 + '',
        focused: i + 1 === this.currentPage,
        disabled: false,
      };
    }
  }

  private _generateMoreThanMinPages(pages: number) {
    if (this.pageItems == null) {
      return;
    }

    const midPos = Math.floor(this.totalPageItem / 2) + 1;

    this.pageItems[0] = {
      label: '1',
      focused: 1 === this.currentPage,
      disabled: false,
    };
    this.pageItems[this.totalPageItem - 1] = {
      label: '' + pages,
      focused: pages === this.currentPage,
      disabled: false,
    };

    if (this.currentPage <= midPos) {
      for (let i = 1; i <= this.totalPageItem - 2; i++) {
        this.pageItems[i] = {
          label: i + 1 + '',
          focused: i + 1 === this.currentPage,
          disabled: false,
        };
      }
      this.pageItems[this.totalPageItem - 2] = {
        iconName: 'more_horiz',
        focused: false,
        disabled: true,
      };
    } else if (
      this.currentPage > midPos &&
      this.currentPage <= pages - midPos
    ) {
      this.pageItems[1] = {
        iconName: 'more_horiz',
        focused: false,
        disabled: true,
      };

      for (let i = 0; i < this.totalPageItem - 4; i++) {
        this.pageItems[i + 2] = {
          label: this.currentPage - (midPos - (i + 3)) + '',
          focused:
            this.currentPage - (midPos - (i + 3)) == this.currentPage
              ? true
              : false,
          disabled: false,
        };
      }
      this.pageItems[this.totalPageItem - 2] = {
        iconName: 'more_horiz',
        focused: false,
        disabled: true,
      };
    } else {
      this.pageItems[1] = {
        iconName: 'more_horiz',
        focused: false,
        disabled: true,
      };
      for (let i = this.totalPageItem - 2; i >= 2; i--) {
        const pageNumber = pages - 1 - (this.totalPageItem - 2 - i);
        this.pageItems[i] = {
          label: pageNumber + '',
          focused: pageNumber === this.currentPage,
          disabled: false,
        };
      }
    }
  }
}

class PaginationItemData {
  iconName?: string;
  label?: string;
  focused = false;
  disabled = false;
}
