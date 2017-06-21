import { Component, Input } from '@angular/core';
import {ProbService} from '../ProbsService/ProbsService.service';

@Component({
  selector: 'prob-select',
  templateUrl: './probSelect.component.html',
  styleUrls: ['./probSelect.component.css']
})

export class ProbSelectComponent {
  @Input() admin: boolean;
  probs : string[];
  currProb : string;
  default: string = " -- select an option -- ";

  constructor(private probService: ProbService){}

  ngOnInit(){
    this.probs = this.probService.getProbs();
    this.probs.unshift(this.default);
    this.currProb = this.probs[0];
  }

  selectProblem(){
    console.log(this.currProb + " selected");
  }

  deleteProblem(){
    if (this.currProb != this.default){
      console.log(this.currProb + " deleted");
    }
  }

  createProblem(prob){
    console.log("create new problem");
  }

}
