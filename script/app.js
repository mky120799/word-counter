class WordCounter {
    constructor(inputText) {
        this.inputText = inputText;
        this.inputText.addEventListener('input', () => {
            this.count();
        });
    }
    count() {
        let wordStat = this.getWordStat(this.inputText.value.trim());
        this.emitEvent(wordStat);
    }

    emitEvent(wordStat) {
        // Create count event
        let countEvent = new CustomEvent('count', {
            bubbles: true,
            cancelable: true,
            detail: {
                wordStat
            }
        });
        // dispatch the count event
        this.inputText.dispatchEvent(countEvent);

    }
    getWordStat(str) {
        let matches = str.match(/\S+/g);
        return {
            characters: str.length,
            words: matches ? matches.length : 0,
        };
    }
}



////  app js
const inputText = document.querySelector('#text');
console.log(inputText);
const statElem = document.querySelector('#stat');
console.log(statElem);

// create a new instance of Word Counter
let WordCounterObject = new WordCounter(inputText);

console.log(WordCounterObject);

// render the 
const render = (e) => {
    statElem.innerHTML = `<p>You've written <span class="highlight">${e.detail.wordStat.words} words</span> 
    and <span class="highlight">${e.detail.wordStat.characters} characters</span>.</p>`;
}

inputText.addEventListener('count', render);