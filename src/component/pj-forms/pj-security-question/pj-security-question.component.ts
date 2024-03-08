import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PjActionEvent, PJ_ACTION, PjFieldValue } from 'src/component/components.global';

@Component({
  selector: 'pj-security-question',
  templateUrl: './pj-security-question.component.html',
  styleUrls: ['./pj-security-question.component.scss']
})
export class PjSecurityQuestionComponent implements OnInit {

  @Input()
  questionAndAnswer?: PjFieldValue;

  @Output()
  actionClick = new EventEmitter<PjActionEvent>();

  constructor() { }

  ngOnInit(): void {
  }

  getQuestion(): string {
    return this.questionAndAnswer?.label || '';
  }
  onContinueResetBtnClick(): void {
    this.actionClick.emit({ actionString: PJ_ACTION.CONTINUE });
  }

  onChangeQuestionBtnClick(): void {
    this.actionClick.emit({ actionString: PJ_ACTION.EDIT });
  }

  onGoBackBtnClick(): void {
    this.actionClick.emit({ actionString: PJ_ACTION.CANCEL });
  }
}
