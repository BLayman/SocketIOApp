import { Component, Input } from '@angular/core';
import {ProbService} from '../ProbsService/ProbsService.service';
import {postsDisplayComponent} from '../postsDisplay/postsDisplay.component';

@Component({
  selector: 'prob-select',
  templateUrl: './probSelect.component.html',
  styleUrls: ['./probSelect.component.css']
})

export class ProbSelectComponent {
  @Input() admin: boolean;
  @Input() postsDisplay: postsDisplayComponent;
  default = " -- select an option -- ";
  probs : string[] = [this.default];
  currProb : string;
  justCreated : boolean = false;

  constructor(private probService: ProbService){}

  ngOnInit(){
    this.currProb = this.probs[0];
    this.listenForProbs();
    this.listenForDeleted();
  }

  selectProblem(){
    console.log(this.currProb + " selected");
    this.postsDisplay.changeRoom(this.currProb);
  }

  createProblem(prob){
    console.log("create new problem");
    let name = prompt("Enter name for new room:");
    if(name){
      this.probService.addNewProb(name);
      this.justCreated = true;
    }
  }

  listenForProbs(){
    let probObserver = this.probService.listenForProbs();
    probObserver.subscribe(
      (retrievedProbs : string[]) => {
        retrievedProbs.forEach(prob => {
            this.probs.push(prob);
        });
        if (this.justCreated) {
          this.currProb = this.probs[this.probs.length - 1];
          this.postsDisplay.changeRoom(this.currProb);
          this.justCreated = false;
        }
      },(error) => {
        console.error(error);
      }, () => {
        console.log("done");
      }
  );
  }

  deleteProblem(){
    if (this.currProb != this.default){
      console.log(this.currProb + " deleted");
      this.probService.deleteProb(this.currProb);
    }
  }

  listenForDeleted(){
    let deletedObserver = this.probService.listenForDeleted();
    deletedObserver.subscribe(
      (deleted : string) => {
        let index = this.probs.indexOf(deleted);
        if (index == this.probs.indexOf(this.currProb)){
          this.currProb = this.probs[0];
          this.postsDisplay.changeRoom(this.currProb);
        }
        this.probs.splice(index,1);
      },(error) => {
        console.error(error);
      }, () => {
        console.log("done");
      }
    );
  }

}
