const { buildTermFreqMatrix, buildUniqueWords, computeIDF, computeTFIDF, trainText, buildWordIndex } =  require("./tfIdf");
const cosineSimilarityAlgorithm = require("./vectorSims");

const recommendFromBios = (menteeBio, mentors) => {
    const trainDocs = [menteeBio, ...mentors.map(m => m.bio)];
    const tokenized = trainDocs.map(trainText);

    const vocab = buildUniqueWords(tokenized);
    const wordToIdx = buildWordIndex(vocab);
    const tf = buildTermFreqMatrix(tokenized, wordToIdx);
    const idf = computeIDF(tf);
    const tfidf = computeTFIDF(tf, idf);

    const menteeVector = tfidf[0];
    const mentorVectors = tfidf.slice(1);

    const results = mentors.map((mentor, i) => ({
        id: mentor.id,
        score: cosineSimilarityAlgorithm(menteeVector, mentorVectors[i])
    }));

    return results.sort((a, b) => b.score - a.score);
}

module.exports = recommendFromBios;

