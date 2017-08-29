import { Component, Input } from '@angular/core';
import {ProbService} from '../ProbsService/ProbsService.service';
import {PostService} from '../PostsService/PostsService.service';
import {postsDisplayComponent} from '../postsDisplay/postsDisplay.component';
import {Prob} from '../ProbsService/prob';

// component for selecting, adding and removing a problem (room) from the dropdown.
@Component({
  selector: 'prob-select',
  templateUrl: './probSelect.component.html',
  styleUrls: ['./probSelect.component.css']
})

export class ProbSelectComponent {
  @Input() admin: boolean; // whether or not user is an admin
  @Input() postsDisplay: postsDisplayComponent; // reference to postsDisplay component
  default :string = " -- select an option -- "; // default dropdown selection
  keyVal : {} = {}; // library for accessing rooms using database ids
  probs : string[] = [this.default]; // list of problems bound to html
  currProb : string; // currently selected problem, also bound to html
  currKey: number; // id of currently selected problem
  justCreated : boolean = false; // for switching to newly made problem

  constructor(private probService: ProbService, private postService: PostService){}

  ngOnInit(){
    // set current problem and add it to the keyVal dictionary
    this.currProb = this.default;
    this.keyVal[this.currProb] = -1;
    // listen for new and deleted problems
    this.listenForProbs();
    this.listenForDeleted();
  }

  // called when a problem is selected from the dropdown
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
  // used by other components to access id's of problems
  getCurrKey(){
    this.currKey = this.keyVal[this.currProb];
    return this.currKey;
  }

  // create new problem
  createProblem(prob){
    console.log("create new problem");
    let name = prompt("Enter name for new room:");
    if(name){
      this.probService.addNewProb(name);
      this.justCreated = true;
    }
  }
  // listen for any newly created problems
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
        // if this problem was just made by the user, select it
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
  // delete a problem
  deleteProblem(){
    if (this.currProb != this.default){
      this.currKey = this.keyVal[this.currProb];
      console.log("problem "+ this.currProb + " with key: " + this.currKey + " deleted");
      this.probService.deleteProb({name: this.currProb, pk: this.currKey});
    }
  }
  
  // remove deleted problems
  listenForDeleted(){
    let deletedObserver = this.probService.listenForDeleted();
    deletedObserver.subscribe(
      (deleted : any) => {
        console.log("deleted problem " + deleted.name + " with pk " + deleted.pk);
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
