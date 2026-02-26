import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MESSAGES } from '@core/constants/messages';
import { LABELS } from '@core/constants/labels';

@Component({
    selector: 'app-welcome',
    imports: [CommonModule],
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements AfterViewInit {


  public readonly labels = LABELS;
  public readonly messages = MESSAGES;
  public hideBorderTyping = false;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.hideBorderTyping = true;
    }, 2500);
  }
  
}
