/**
 * Calculates cosine similarity between two numeric vectors.
 * 
 * @param {Number[]} vector1 - First vector.
 * @param {Number[]} vector2 - Second vector
 * @returns {Number} Cosine similarity score between 0 and 1
 */

const cosineSimilarityAlgorithm = (vector1, vector2) => {
    let dotProduct = 0, normA = 0, normB = 0;
    for(let i=0; i < vector1.length; i++){
        dotProduct += vector1[i] * vector2[i];
        normA += vector1[i] * vector1[i];
        normB += vector2[i] * vector2[i];
    }
    if(normA === 0 || normB === 0) return 0;
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB))
}

module.exports = cosineSimilarityAlgorithm;