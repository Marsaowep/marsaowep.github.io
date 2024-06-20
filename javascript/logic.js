// Code credits: this code was written by Dr. Pavol Federl for the SENG 513 course at the UofC
// https://codepen.io/pfederl/pen/JEMKwB

function getStats(txt) {
    // get nChar by get string length
    let nChars = txt.length;

    // save original lines to before manipulate txt
    let ori_lines = txt.split("\n");

    // get nLines by split by /n
    let nLines = ori_lines.length;

    // get nNonEmptyLines by examine each line, find lines with length
    let nNonEmptyLines = 0;
    for(let ori_line of ori_lines){
        if(ori_line.trim().length!=0){ // if not empty after removing spaces
            nNonEmptyLines+=1;
        }
    }

    // update if find a longer line to get max length
    let maxLineLength = 0;
    for(let ori_line of ori_lines){
        if(maxLineLength < ori_line.length){
            maxLineLength = ori_line.length;
        }
    }
    // convert txt to lower case and remove punctuactions (all charactors other than a-z, 0-9 and \t,\r)
    let txt_modified = txt.toLowerCase().replace(/[^a-z0-9\s]/g,"").replace(/[\t\r]/g,"");    
    let lines = txt_modified.split("\n");

    //console.log(lines);
    // get nWord by split by white spaces and numbers
    let words = [];
    // convert to lower case
    for(let line of lines){
        // find potential words in lines, but cannot separate numbers and words
        let potential_words = line.split(" ");
        // examine each word, find numbers and split
        for(let potential_word of potential_words){
            // split by numbers
            let w = potential_word.split(/(\d+)/);
            // put words in the array if not empty
            for(let word of w){
                if(word != ""){                
                    words.push(word);
                }
            } 
        }
    }
    
    // count the array length to get nWords
    let nWords = words.length;

    // sum and divide to get average length
    let sum = 0;
    for(let word of words){
        sum += word.length;
    }

    // calculate avarage and set 2 decimal places
    let averageWordLength = (sum/nWords).toFixed(2);
    
    // sort words by length and alphabetically
    // save length and fequency
    let noDup = []; // words list with no duplicates
    let frequency = {};
    
    
    for(let word of words){
        if(noDup.includes(word)==false){
            noDup.push(word);
        }
        if(word in frequency){
            frequency[word] += 1;
        }else{
            frequency[word] = 1;
        }
    }

    let tenLongestWords = [];
    
    // sort the array
    noDup.sort(function(a,b){if(a.length != b.length){
        return b.length - a.length;
        }
        else{
            // put number after letter string
            if(isNaN(a)==true && isNaN(b)==false){
                return -1;
            }
            else if(isNaN(a)==false && isNaN(b)==true){
                return 1;
            }else{ // compare if both number or letter string
                return a.localeCompare(b);
            }
        }
    })

    // take 10 longest words
    for(let i = 0; tenLongestWords.length < 10 && i < noDup.length; i++){
            tenLongestWords.push(noDup[i]);
    }

    let tenMostFrequentWords = [];

    // put words and frequency into array to sort
    let sorted_freq_words = [];
    for(let word in frequency){
        sorted_freq_words.push([word,frequency[word]]);
    }

    // sort by frequency and alphabetically
    sorted_freq_words.sort(function(a,b){if(a[1] != b[1]){
        return b[1] - a[1];
        }
        else{
            // put number after letter string
            if(isNaN(a[0])==true && isNaN(b[0])==false){
                return -1;
            }
            else if(isNaN(a[0])==false && isNaN(b[0])==true){
                return 1;
            }else{ // compare if both number or letter string
                return a[0].localeCompare(b[0]);
            }
        }
    })

    // take 10 most frequent words
    for(let i = 0; tenMostFrequentWords.length < 10 && i < sorted_freq_words.length; i++){
        tenMostFrequentWords.push(sorted_freq_words[i][0]+"("+sorted_freq_words[i][1]+")");
    }
    
    return {
        nChars: nChars,                                                     
        nWords: nWords,
        nLines: nLines,
        nNonEmptyLines: nNonEmptyLines,
        averageWordLength: averageWordLength,
        maxLineLength: maxLineLength,
        tenLongestWords: tenLongestWords,
        tenMostFrequentWords: tenMostFrequentWords
        
    };

}
