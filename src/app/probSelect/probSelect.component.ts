import { Component, Input } from '@angular/core';
import {ProbService} from '../ProbsService/ProbsService.service';
import {PostService} from '../PostsService/PostsService.service';
import {postsDisplayComponent} from '../postsDisplay/postsDisplay.component';
import {Prob} from '../ProbsService/prob';

@Component({
  selector: 'prob-select',
  templateUrl: './probSelect.component.html',
  styleUrls: ['./probSelect.component.css']
})

export class ProbSelectComponent {
  @Input() admin: boolean;
  @Input() postsDisplay: postsDisplayComponent;
  default :string = " -- select an option -- ";
  keyVal : {} = {};
  probs : string[] = [this.default];
  currProb : string;
  currKey: number;
  justCreated : boolean = false;

  constructor(private probService: ProbService, private postService: PostService){}

  ngOnInit(){
    this.currProb = this.default;
    this.keyVal[this.currProb] = -1;
    console.log("default current problem: " + this.currProb);
    this.listenForProbs();
    this.listenForDeleted();
  }

  selectProblem(){
    // get key associated with problem name
    this.currKey = this.keyVal[this.currProb];
    console.log("problem: " + this.currProb + " id: " + this.currKey + " selected");
    console.log(this.keyVal);
    // change posts displayed to posts in this room
    this.postsDisplay.changeRoom(this.currProb);
    // request the posts for this room
    this.postService.requestPosts(this.currKey);
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
      (retrievedProbs : Prob[]) => {
        retrievedProbs.forEach(prob => {
            // when a new problem has been created, associate problem name with primary key
            this.keyVal[prob.name] = prob.pk;
            // add new problem to dropdown
            this.probs.push(prob.name);
            console.log(this.probs);
        });
        if (this.justCreated) {
          retrievedProbs.forEach(prob => {
            this.currProb = prob.name;
            this.selectProblem();
            this.justCreated = false;
          });
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
      this.currKey = this.keyVal[this.currProb];
      console.log("problem "+ this.currProb + " with key: " + this.currKey + " deleted");
      this.probService.deleteProb(this.currKey);
    }
  }

  listenForDeleted(){
    let deletedObserver = this.probService.listenForDeleted();
    deletedObserver.subscribe(
      (deleted : Prob) => {
        // delete property of keyVal object corresponding to that pk
        delete this.keyVal[deleted.name];
        // remove problem from dropdown
        let index = this.probs.indexOf(deleted.name);
        this.probs.splice(index,1);
        // if the user is on that problem, move them back to the default selection
        if (this.currProb == deleted.name) {
          this.currProb = this.default;
          this.selectProblem();
        }
      },(error) => {
        console.error(error);
      }, () => {
        console.log("done");
      }
    );
  }

}
