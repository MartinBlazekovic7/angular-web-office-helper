import {Component, HostListener, OnInit} from '@angular/core';
import allWords from '../../../assets/words.json';
import finalWords from '../../../assets/finalWords.json';
import {ClipboardService} from "ngx-clipboard";

enum State {
  EMPTY = 'EMPTY',
  WHITE = 'WHITE',
  RED = 'RED',
  BLUE = 'BLUE'
}

interface Letter {
  state: State;
  letter: string;
}

interface Word {
  word: Letter[];
}

@Component({
  selector: 'app-wordle',
  templateUrl: './wordle.component.html',
  styleUrls: ['./wordle.component.css']
})
export class WordleComponent implements OnInit {

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if((event.keyCode > 64 && event.keyCode < 91) ||
      (event.key === 'Enter') ||
      (event.key === 'Backspace')){
      this.insertLetter(event.key);
    }
  }
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e) {
    if(this.playedToday === true && this.showed === false){
      this.playedAlready();
      this.showed = true;
    }
  }

  showed = false;

  guessWords : Letter[] = [
    {state: State.EMPTY, letter: ''},
    {state: State.EMPTY, letter: ''},
    {state: State.EMPTY, letter: ''},
    {state: State.EMPTY, letter: ''},
    {state: State.EMPTY, letter: ''},
  ];
  guessWords2 : Letter[] = [
    {state: State.EMPTY, letter: ''},
    {state: State.EMPTY, letter: ''},
    {state: State.EMPTY, letter: ''},
    {state: State.EMPTY, letter: ''},
    {state: State.EMPTY, letter: ''},
  ];
  guessWords3 : Letter[] = [
    {state: State.EMPTY, letter: ''},
    {state: State.EMPTY, letter: ''},
    {state: State.EMPTY, letter: ''},
    {state: State.EMPTY, letter: ''},
    {state: State.EMPTY, letter: ''},
  ];
  guessWords4 : Letter[] = [
    {state: State.EMPTY, letter: ''},
    {state: State.EMPTY, letter: ''},
    {state: State.EMPTY, letter: ''},
    {state: State.EMPTY, letter: ''},
    {state: State.EMPTY, letter: ''},
  ];
  guessWords5 : Letter[] = [
    {state: State.EMPTY, letter: ''},
    {state: State.EMPTY, letter: ''},
    {state: State.EMPTY, letter: ''},
    {state: State.EMPTY, letter: ''},
    {state: State.EMPTY, letter: ''},
  ];
  guessWords6 : Letter[] = [
    {state: State.EMPTY, letter: ''},
    {state: State.EMPTY, letter: ''},
    {state: State.EMPTY, letter: ''},
    {state: State.EMPTY, letter: ''},
    {state: State.EMPTY, letter: ''},
  ];

  wordField : Word[] = [
    {word: this.guessWords},
    {word: this.guessWords2},
    {word: this.guessWords3},
    {word: this.guessWords4},
    {word: this.guessWords5},
    {word: this.guessWords6},
  ];

  finalWord = '';
  finalWordArray = [];


  alphabet : Letter[] = [
    {state: State.EMPTY, letter: 'Q'},
    {state: State.EMPTY, letter: 'W'},
    {state: State.EMPTY, letter: 'E'},
    {state: State.EMPTY, letter: 'R'},
    {state: State.EMPTY, letter: 'T'},
    {state: State.EMPTY, letter: 'Y'},
    {state: State.EMPTY, letter: 'U'},
    {state: State.EMPTY, letter: 'I'},
    {state: State.EMPTY, letter: 'O'},
    {state: State.EMPTY, letter: 'P'}
  ];
  alphabet2 : Letter[] = [
    {state: State.EMPTY, letter: 'A'},
    {state: State.EMPTY, letter: 'S'},
    {state: State.EMPTY, letter: 'D'},
    {state: State.EMPTY, letter: 'F'},
    {state: State.EMPTY, letter: 'G'},
    {state: State.EMPTY, letter: 'H'},
    {state: State.EMPTY, letter: 'J'},
    {state: State.EMPTY, letter: 'K'},
    {state: State.EMPTY, letter: 'L'}
  ];
  alphabet3 : Letter[] = [
    {state: State.EMPTY, letter: 'Z'},
    {state: State.EMPTY, letter: 'X'},
    {state: State.EMPTY, letter: 'C'},
    {state: State.EMPTY, letter: 'V'},
    {state: State.EMPTY, letter: 'B'},
    {state: State.EMPTY, letter: 'N'},
    {state: State.EMPTY, letter: 'M'}
  ];

  wordCounter = 0;
  letterCounter = 0;

  tempWord = '';

  streak = 0;
  highscore = 0;
  playedTotal = 0;

  playedToday = false;

  guesses : string[] = [];

  hours = 0;
  minutes = 0;
  seconds = 0;

  timer : Date = null;

  dateZero : Date = new Date('08/22/2022');

  constructor(private clipboardApi : ClipboardService) {
    this.ngOnInit();
  }

  async ngOnInit() {

    if(localStorage.getItem('streak') != null) this.streak = parseInt(localStorage.getItem('streak'));
    if(localStorage.getItem('highscore') != null) this.highscore = parseInt(localStorage.getItem('highscore'));
    if(localStorage.getItem('playedTotal') != null) this.playedTotal = parseInt(localStorage.getItem('playedTotal'));

    if(localStorage.getItem('wordField') != null) {
      await new Promise<void> (resolve => {
        this.wordField = JSON.parse(localStorage.getItem('wordField'));
        resolve();
      });
      this.alphabet = JSON.parse(localStorage.getItem('alphabet'));
      this.alphabet2 = JSON.parse(localStorage.getItem('alphabet2'));
      this.alphabet3 = JSON.parse(localStorage.getItem('alphabet3'));
      this.playedToday = true;

    } else {
      this.wordField = [
        {word: this.guessWords},
        {word: this.guessWords2},
        {word: this.guessWords3},
        {word: this.guessWords4},
        {word: this.guessWords5},
        {word: this.guessWords6},
      ];

      let now = new Date();

      now.setHours(0);
      now.setMinutes(0);
      now.setSeconds(0);

      let seconds = now.getTime() - this.dateZero.getTime();
      let days = Math.round(seconds / ( 1000 * 3600 * 24));

      this.finalWord = finalWords[days];
      this.finalWordArray = this.finalWord.toUpperCase().split('');
      console.log(this.finalWord);
    }

    if(this.playedToday){
      let now = new Date();
      let tempTimer = localStorage.getItem('timer');

      let date = new Date(tempTimer.slice(0, 11).replace('"', ''));

      if(now.getFullYear() > date.getFullYear()){
        this.setupNewWord();
      } else {
        if(now.getMonth()+1 > date.getMonth()+1){
          this.setupNewWord();
        } else {
          if(now.getDate() > date.getDate()){
            this.setupNewWord();
          } else {
            setTimeout(() => {
              this.playedAlready();
            }, 500)
          }
        }
      }
    }
  }

  insertLetter(letter){
    if(this.playedToday === false){
      let parents = document.getElementsByClassName('parent');
      let children = parents[this.wordCounter].getElementsByClassName('child');
      if(letter === 'Enter'){
        if(this.tempWord.length === 5){
          this.checkWord(this.tempWord);
        }
      } else if(letter === 'Backspace'){
        if(this.tempWord.length >= 1){
          this.tempWord = this.tempWord.slice(0,-1);
          this.wordField[this.wordCounter].word[this.letterCounter-1].letter = '';
          children[this.letterCounter-1].classList.remove('op');

          this.letterCounter--;
        } else return null;

      } else {
        if(this.tempWord.length === 5) return null;
        else {
          this.tempWord = this.tempWord.concat(letter);
          this.wordField[this.wordCounter].word[this.letterCounter].letter = letter;
          children[this.letterCounter].classList.add('op');

          this.letterCounter++;
        }
      }
    } else {
      this.playedAlready();
    }

  }

  checkWord(word){
    console.log(word);
    let isWord = false;
    allWords.map((e,i) => {
      if(e.localeCompare(word.toLowerCase()) === 0) {
        isWord = true;
      }
    });

    if(isWord){
      this.setStates(word);
      this.setColors();

      this.letterCounter = 0;
      this.wordCounter++;
      this.tempWord = '';
      this.guesses.push(word);
      if(this.wordCounter === 6 && this.playedToday === false){
        this.lostGame();
      }

    } else {
      console.log("not a word");
      document.getElementById("nepostoji").innerHTML = 'Not on word list';
      document.getElementById("nepostoji").animate([

        { opacity: '0' },
        { opacity: '1' },
        { opacity: '1' },
        { opacity: '1' },
        { opacity: '0' },
      ], {

        duration: 2000
      });
    }

  }

  setStates(word){
    if(word.toLowerCase().localeCompare(this.finalWord) === 0) {
      for(let i = 0; i<this.finalWordArray.length; i++) {
        this.wordField[this.wordCounter].word[i].state = State.BLUE;
      }
      this.wonGame();
    } else {
      let wordArray = word.toUpperCase().split('');

      let redLetters = [];
      let whiteLetters = [];
      let blueLetters = [];


      for(let i = 0; i<this.finalWordArray.length; i++){
        for(let j = 0; j<this.finalWordArray.length; j++){
          if((this.finalWordArray)[i] == wordArray[j]){
            this.wordField[this.wordCounter].word[j].state = State.RED;
            redLetters.push(this.wordField[this.wordCounter].word[j].letter);
          }
        }
      }
      for(let i = 0; i<this.finalWordArray.length; i++) {
        if(this.finalWordArray[i] == wordArray[i]){

          this.wordField[this.wordCounter].word[i].state = State.BLUE;
          blueLetters.push(this.wordField[this.wordCounter].word[i].letter);
        }
      }
      for(let i = 0; i<wordArray.length; i++) {
        if(this.wordField[this.wordCounter].word[i].state == State.EMPTY){
          this.wordField[this.wordCounter].word[i].state = State.WHITE;
          whiteLetters.push(this.wordField[this.wordCounter].word[i].letter);
        }
      }

      this.alphabet.map((e,i) => {
          for (let i = 0; i < whiteLetters.length; i++) {
            if(whiteLetters[i].toLowerCase() == e.letter.toLowerCase()) e.state = State.WHITE;
          }
          for (let i = 0; i < redLetters.length; i++) {
            if(redLetters[i].toLowerCase() == e.letter.toLowerCase()) e.state = State.RED;
          }
          for (let i = 0; i < blueLetters.length; i++) {
            if(blueLetters[i].toLowerCase() == e.letter.toLowerCase()) e.state = State.BLUE;
          }
        }
      );
      this.alphabet2.map((e,i) => {
          for (let i = 0; i < whiteLetters.length; i++) {
            if(whiteLetters[i].toLowerCase() == e.letter.toLowerCase()) e.state = State.WHITE;
          }
          for (let i = 0; i < redLetters.length; i++) {
            if(redLetters[i].toLowerCase() == e.letter.toLowerCase()) e.state = State.RED;
          }
          for (let i = 0; i < blueLetters.length; i++) {
            if(blueLetters[i].toLowerCase() == e.letter.toLowerCase()) e.state = State.BLUE;
          }
        }
      );
      this.alphabet3.map((e,i) => {
          for (let i = 0; i < whiteLetters.length; i++) {
            if(whiteLetters[i].toLowerCase() == e.letter.toLowerCase()) e.state = State.WHITE;
          }
          for (let i = 0; i < redLetters.length; i++) {
            if(redLetters[i].toLowerCase() == e.letter.toLowerCase()) e.state = State.RED;
          }
          for (let i = 0; i < blueLetters.length; i++) {
            if(blueLetters[i].toLowerCase() == e.letter.toLowerCase()) e.state = State.BLUE;
          }
        }
      );

    }
  }

  setColors(){
    let parents = document.getElementsByClassName('parent');
    let children = parents[this.wordCounter].getElementsByClassName('child');

    for(let i = 0; i<5; i++){
      if(this.wordField[this.wordCounter].word[i].state === State.WHITE){
        children[i].classList.remove('op');
        children[i].classList.add('toGray');
      } else if (this.wordField[this.wordCounter].word[i].state === State.RED){
        children[i].classList.remove('op');
        children[i].classList.add('toRed');
      } else if (this.wordField[this.wordCounter].word[i].state === State.BLUE){
        children[i].classList.remove('op');
        children[i].classList.add('toBlue');
      }
    }

    let keys = document.getElementsByClassName('letterKey');
    for(let i = 0; i<this.alphabet.length; i++){
      if(this.alphabet[i].state === State.WHITE) keys[i].classList.add('toGrayKey');
      else if(this.alphabet[i].state === State.RED) keys[i].classList.add('toRedKey');
      else if(this.alphabet[i].state === State.BLUE) keys[i].classList.add('toBlueKey');
    }
    for(let i = 0; i<this.alphabet2.length; i++){
      if(this.alphabet2[i].state === State.WHITE) keys[i+10].classList.add('toGrayKey');
      else if(this.alphabet2[i].state === State.RED) keys[i+10].classList.add('toRedKey');
      else if(this.alphabet2[i].state === State.BLUE) keys[i+10].classList.add('toBlueKey');
    }
    for(let i = 0; i<this.alphabet3.length; i++){
      if(this.alphabet3[i].state === State.WHITE) keys[i+20].classList.add('toGrayKey');
      else if(this.alphabet3[i].state === State.RED) keys[i+20].classList.add('toRedKey');
      else if(this.alphabet3[i].state === State.BLUE) keys[i+20].classList.add('toBlueKey');
    }


  }

  startTimer(){
    setInterval(() => {
      let d = new Date();
      let h = d.getHours();
      let m = d.getMinutes();
      let s = d.getSeconds();
      if(h === 0 && m === 0 && s === 0) window.location.reload();
      let midnight = 24*3600;
      let secLeft = midnight - (h*3600 + m*60 + s);
      this.hours = Math.floor(secLeft / 3600) % 24;
      this.minutes = Math.floor(secLeft / 60) % 60;
      this.seconds = Math.floor(secLeft) % 60;
    }, 1000)
  }

  wonGame(){
    this.setColors();
    this.playedTotal++;
    localStorage.setItem('playedTotal', `${this.playedTotal}`);
    this.streak++;
    if(this.streak >= this.highscore) {
      this.highscore = this.streak;
      localStorage.setItem('highscore', `${this.highscore}`);
    }
    document.getElementById("result").classList.add('showResult');
    document.getElementById("text").classList.add('showText');
    // console.log(this.guesses);
    this.setupStorage();
    this.startTimer();
  }

  lostGame(){
    this.streak = 0;
    localStorage.setItem('streak', `${this.streak}`);
    this.playedTotal++;
    localStorage.setItem('playedTotal', `${this.playedTotal}`);
    document.getElementById("result").classList.add('showResult');
    document.getElementById("text").classList.add('showText');
    this.setupStorage();
    this.startTimer();
  }

  playedAlready(){

    this.finalWord = localStorage.getItem('lastWord').replace('"','').replace('"','');

    let parents = document.getElementsByClassName('parent');
    for(let j = 0; j<6; j++){
      let p = 0;
      let w = 0;
      let children = parents[j].getElementsByClassName('child');
      for(let i = p; i<p+5; i++){
        if(this.wordField[j].word[w].state === State.WHITE){
          children[i].classList.remove('op');
          children[i].classList.add('toGray');
        } else if (this.wordField[j].word[w].state === State.RED){
          children[i].classList.remove('op');
          children[i].classList.add('toRed');
        } else if (this.wordField[j].word[w].state === State.BLUE){
          children[i].classList.remove('op');
          children[i].classList.add('toBlue');
        }
        w++;
      }
      w = 0;
      p += 5;
    }
    let keys = document.getElementsByClassName('letterKey');
    for(let i = 0; i<this.alphabet.length; i++){
      if(this.alphabet[i].state === State.WHITE) keys[i].classList.add('toGrayKey');
      else if(this.alphabet[i].state === State.RED) keys[i].classList.add('toRedKey');
      else if(this.alphabet[i].state === State.BLUE) keys[i].classList.add('toBlueKey');
    }
    for(let i = 0; i<this.alphabet2.length; i++){
      if(this.alphabet2[i].state === State.WHITE) keys[i+10].classList.add('toGrayKey');
      else if(this.alphabet2[i].state === State.RED) keys[i+10].classList.add('toRedKey');
      else if(this.alphabet2[i].state === State.BLUE) keys[i+10].classList.add('toBlueKey');
    }
    for(let i = 0; i<this.alphabet3.length; i++){
      if(this.alphabet3[i].state === State.WHITE) keys[i+20].classList.add('toGrayKey');
      else if(this.alphabet3[i].state === State.RED) keys[i+20].classList.add('toRedKey');
      else if(this.alphabet3[i].state === State.BLUE) keys[i+20].classList.add('toBlueKey');
    }
    document.getElementById("result").classList.add('showResult');
    document.getElementById("text").classList.add('showText');
    this.startTimer()
  }

  setupStorage(){
    localStorage.setItem('streak', `${this.streak}`);

    localStorage.setItem('wordField', JSON.stringify(this.wordField));
    localStorage.setItem('alphabet', JSON.stringify(this.alphabet));
    localStorage.setItem('alphabet2', JSON.stringify(this.alphabet2));
    localStorage.setItem('alphabet3', JSON.stringify(this.alphabet3));

    this.timer = new Date();
    console.log(this.timer);
    console.log(this.timer.toLocaleString("en-US", {timeZone: 'CET'}));
    localStorage.setItem('timer', JSON.stringify(this.timer.toLocaleString("en-US", {timeZone: 'CET'})));

    localStorage.setItem('lastWord', JSON.stringify(this.finalWord));

    this.playedToday = true;
  }

  setupNewWord(){
    console.log('nova riječ');
    this.playedToday = false;
    this.wordField = [
      {word: this.guessWords},
      {word: this.guessWords2},
      {word: this.guessWords3},
      {word: this.guessWords4},
      {word: this.guessWords5},
      {word: this.guessWords6},
    ];
    this.alphabet = [
      {state: State.EMPTY, letter: 'Q'},
      {state: State.EMPTY, letter: 'W'},
      {state: State.EMPTY, letter: 'E'},
      {state: State.EMPTY, letter: 'R'},
      {state: State.EMPTY, letter: 'T'},
      {state: State.EMPTY, letter: 'Y'},
      {state: State.EMPTY, letter: 'U'},
      {state: State.EMPTY, letter: 'I'},
      {state: State.EMPTY, letter: 'O'},
      {state: State.EMPTY, letter: 'P'}
    ];
    this.alphabet2 = [
      {state: State.EMPTY, letter: 'A'},
      {state: State.EMPTY, letter: 'S'},
      {state: State.EMPTY, letter: 'D'},
      {state: State.EMPTY, letter: 'F'},
      {state: State.EMPTY, letter: 'G'},
      {state: State.EMPTY, letter: 'H'},
      {state: State.EMPTY, letter: 'J'},
      {state: State.EMPTY, letter: 'K'},
      {state: State.EMPTY, letter: 'L'}
    ];
    this.alphabet3 = [
      {state: State.EMPTY, letter: 'Z'},
      {state: State.EMPTY, letter: 'X'},
      {state: State.EMPTY, letter: 'C'},
      {state: State.EMPTY, letter: 'V'},
      {state: State.EMPTY, letter: 'B'},
      {state: State.EMPTY, letter: 'N'},
      {state: State.EMPTY, letter: 'M'}
    ];
    localStorage.setItem('wordField', JSON.stringify(this.wordField));
    let now = new Date();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    let seconds = now.getTime() - this.dateZero.getTime();
    let days = Math.round(seconds / (1000 * 3600 * 24));

    this.finalWord = finalWords[days];
    this.finalWordArray = this.finalWord.toUpperCase().split('');
    console.log(this.finalWord);
  }

  copyClipboard(){
    let now = new Date();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    let seconds = now.getTime() - this.dateZero.getTime();
    let days = Math.round(seconds / (1000 * 3600 * 24));
    let temp = `Wordle #${days+1} - ${now.getDate()}.${now.getMonth() + 1}.${now.getFullYear()}. \n`;

    this.wordField.map((e,i) => {
      if(e.word[0].state != State.EMPTY) {
        for (let i = 0; i < e.word.length; i++) {
          if (e.word[i].state === State.WHITE) temp = temp.concat('⬜');
          else if (e.word[i].state === State.RED) temp = temp.concat('🟥');
          else if (e.word[i].state === State.BLUE) temp = temp.concat('🟦');
        }
        temp = temp.concat('\n');
      }
    });
    document.getElementById("nepostoji").innerHTML = 'Rezultat kopiran';
    document.getElementById("nepostoji").animate([
      // keyframes
      { opacity: '0' },
      { opacity: '1' },
      { opacity: '1' },
      { opacity: '1' },
      { opacity: '0' },
    ], {
      // timing options
      duration: 2000
    });

    this.clipboardApi.copy(temp);
    console.log(temp);

  }

}
