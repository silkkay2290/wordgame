import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Answer } from '../answer';
import { StringUtils } from 'turbocommons-ts';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  instruction : string;
  answer : Answer;
  submitString : string;
  answerList : Array<Answer>;
  commonChars : Array<string>;
  max: number = 0;
  positionCount : number = 0;
  isWord: boolean = false;
  isTooLong: boolean = false;
  isTooShort: boolean = false;
  chars : string;
  constructor(
    private http:HttpClient
  ) { 
    this.instruction = 'Enter a word';
    this.answer = new Answer("");
    this.submitString = "";
    this.answerList = [];
    this.chars = "";
    this.commonChars = [];
  }

  submitAnswer(){

  }
  checkAnswer() {
    let max = 0;
    this.submitString = "Your submitted answer " +
    this.answer.userinput;
    if(this.answer.userinput === this.response){
      this.isWord = true;
      max = Math.max(this.response.length,this.answer.userinput.length);
      for(var char of this.answer.userinput) {
        this.response.includes(char) ? this.commonChars.push(char) : false;
      }
      for (let i = 0; i < max; i++) {
        if(this.response.length < this.answer.userinput.length){
          if(this.response[i] === this.answer.userinput[i]){
            this.positionCount++; 
          }
        }
      }
    } else {
          max = Math.max(this.response.length,this.answer.userinput.length);
          for(var char of this.answer.userinput) {
            this.response.includes(char) ? this.commonChars.push(char): false;
          }
          for (let i = 0; i < max; i++) {
            if(this.response.length < this.answer.userinput.length){
              if(this.response[i] === this.answer.userinput[i]){
                this.positionCount++; 
                this.isTooLong = true;
                this.isTooShort = false;
              }
            } else {
              this.isTooShort = true;
              this.isTooLong = false;
            }
          }
          console.log(max);
        
      }
      this.answerList.push(this.answer);
      this.answer = new Answer("");
  }
  response : any;
  submitAnswertoBackend() {
    this.http.post<any>(
      "http://localhost/angular/wordle_api.php",
      JSON.stringify(this.answerList)
    ).subscribe(
      (response) =>{
        this.response = response;
      }
    )
  }

 
  ngOnInit(): void {
  }

}
