import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Legal_Doc_Type } from 'src/ammall/am-model/ammall.data';
import { PjActionEvent, PJ_ACTION } from 'src/component/components.global';

@Component({
  selector: 'pj-term-notice',
  templateUrl: './pj-term-notice.component.html',
  styleUrls: ['./pj-term-notice.component.scss']
})
export class PjTermNoticeComponent implements OnInit {

  @Input()
  actionLabel: string = 'continuing';

  @Input()
  brandLabel: string = 'PolarJ';

  @Output()
  actionEvent = new EventEmitter<PjActionEvent>();
  constructor() { }

  ngOnInit(): void {
  }

  onTermLinkClick(): void {
    this.actionEvent.emit({
      actionString: PJ_ACTION.LEGAL_DOC,
      para: { docType: Legal_Doc_Type.TERMS_AND_CONDITIONS }
    });
  }

  onPrivacyLinkClick(): void {
    this.actionEvent.emit({
      actionString: PJ_ACTION.LEGAL_DOC,
      para: { docType: Legal_Doc_Type.PRIVACY_POLICY }
    });
  }

  getDescription(): string {
    return 'By ' + this.actionLabel + ', you agree to ' + this.brandLabel + '\'s';
  }
}
