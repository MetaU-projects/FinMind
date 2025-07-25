const sw = require('stopword');

/**
 * Preprocesses text by lowercasing, removing punctuation, splitting, and removing stopwords.
 * @param {String} text - Raw input string
 * @returns {String[]} - Cleaned array of tokens
 */

const trainText = (text) => {
    const tokens = text
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .split(/\s+/)

    return sw.removeStopwords(tokens).filter(Boolean);
};

/**
 * Builds an array of unique words from the tokenized documents
 * @param {String[][]} docs - Array of tokenized words arrays
 * @returns {String[]} Array of unique words
 */

const buildUniqueWords = (docs) => {
    const vocab = new Set();
    docs.forEach(tokens => tokens.forEach(word => vocab.add(word)));

    return Array.from(vocab);
}

/**
 * Maps each word in the array of unique words to a numeric index
 * @param {String[][]} uniqueWords - Array of unique words
 * @returns {Object} - Mapping from word to index
 */

const buildWordIndex = (uniqueWords) => {
    const wordToIdx = {};
    uniqueWords.forEach((word, i) => {
        wordToIdx[word] = i;
    });

    return wordToIdx;
}

/**
 * Builds the term frequency matrix for tokenized bios
 * @param {String[][]} tokenizedBios - Array of tokenized word arrays
 * @param {Object} wordToIdx - Mapping from word to index
 * @returns {Number[][]} Term frequency matrix
 */

const buildTermFreqMatrix = (tokenizedBios, wordToIdx) => {
    const tfMatrix = Array(tokenizedBios.length).fill(0).map(() => Array(Object.keys(wordToIdx).length).fill(0));
    tokenizedBios.forEach((doc, i) => {
        doc.forEach(word => {
            const idx = wordToIdx[word];
            if(idx !== undefined) tfMatrix[i][idx] +=1;
        });
    });

    return tfMatrix
}

/**
 * Computes inverse document frequency (IDF) for each word in the array of unique words
 * @param {Number[][]} termFreqMatrix - Term frequency matrix
 * @returns {Number[]} IDF values
 */

const computeIDF = (termFreqMatrix) => {
    const docCount = termFreqMatrix.length;
    const wordCount = termFreqMatrix[0].length;
    const docFreq = Array(wordCount).fill(0);

    for(let j = 0; j < wordCount; j++){
        for(let i=0; i < docCount; i++){
            if(termFreqMatrix[i[j]] > 0) docFreq[j]++;
        }
    }

    return docFreq.map(df => Math.log10(docCount / (df+1)));
}

/**
 * Compute the TF-IDF matrix by multiplying TF with IDF
 * @param {Number[][]} termFreqMatrix - Term frequency matrix
 * @param {Number[]} inverseDocFreq - IDF values
 * @returns 
 */

const computeTFIDF = (termFreqMatrix, inverseDocFreq) => {
    return termFreqMatrix.map(row => 
        row.map((termFreq, j) => termFreq * inverseDocFreq[j])
    );
}

module.exports = {
    trainText,
    buildUniqueWords,
    buildWordIndex,
    buildTermFreqMatrix,
    computeIDF,
    computeTFIDF
}