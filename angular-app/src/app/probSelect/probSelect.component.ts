import { Component, Input } from '@angular/core';

@Component({
  selector: 'prob-select',
  templateUrl: './probSelect.component.html',
  styleUrls: ['./probSelect.component.css']
})

export class probSelectComponent {
  @Input() admin: boolean;   
}
