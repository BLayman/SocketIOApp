import {PROBS} from "./mockProbs";
import {Injectable} from "@angular/core";

@Injectable()
export class ProbService{
  getProbs(){
    return PROBS;
  }
}
