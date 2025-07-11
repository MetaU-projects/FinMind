import sys
import json
import random
import re
import numpy as np
import nltk 
from nltk.corpus import stopwords

def tokenization(arr_sen):
    tokens=[]
    for sentence in arr_sen:
        cleaned_test = re.sub(r"[^\w\s]", " ", sentence)
        tokens.append(cleaned_test.lower().split())
    return tokens

def tf_idf (train_data:list[str]) -> np.ndarray:
    term_freq_matrix = np.zeros((len(train_data), len(unique_words)))

    for idx, sentence in enumerate(train_data):
        for word in docList[idx]:
            term_freq_matrix[idx][words_with_idx[word]] += 1

    doc_freq = np.sum(term_freq_matrix, axis=0)
    inverse_doc_freq = np.log10(len(train_data)/doc_freq)+1
    tfidf = term_freq_matrix * inverse_doc_freq

    return tfidf

def cosine_similarity_func(vector1, vectorList):
    similarity_result = []
    magnitude_v1 = np.linalg.norm(vector1)

    for vector in vectorList:
        magnitude_v2 = np.linalg.norm(vector)
        dot_product = np.dot(vector1, vector)
        if magnitude_v1==0 or magnitude_v2==0:
            return 0.0
        cosine_similarity_calc = (dot_product)/(magnitude_v1 * magnitude_v2)
        similarity_result.append(float("{:.5f}".format(cosine_similarity_calc[0])))
    
    return similarity_result

def quick_sort(arr, key):
    arr_len = len(arr)

    if arr_len <= 1:
        return arr
    else:
        pivot_idx = random.randint(0, arr_len-1)
        pivot = arr.pop(pivot_idx)
        greater = []
        lesser = []
        for item in arr:
            if item[key] > pivot[key]:
                greater.append(item)
            else:
                lesser.append(item)

    return quick_sort(greater, key) + [pivot] + quick_sort(lesser, key)

data = json.load(sys.stdin)
mentee_text = data["mentee"]
mentors = data["mentors"]
train_data = [mentee_text] + [mentor["skill"] for mentor in mentors]

stop_words = set(stopwords.words('english'))

unclear_data = tokenization(train_data)

docList = []
for doc in unclear_data:
    sent = []
    for word in doc:
        if not word in stop_words:
            sent.append(word)
    docList.append(sent)

unique_words = set()
for doc in docList:
    for word in doc:
        unique_words.add(word)

words_with_idx = {}
for idx, word in (enumerate(unique_words)):
    words_with_idx[word] = idx

result = tf_idf(train_data)
tfidf_matrix_content = result
cosine_similarities_content = cosine_similarity_func(tfidf_matrix_content[0:1], tfidf_matrix_content[1:])
scored_mentors = [{ "id": mentor["id"], "score": s } for mentor, s in zip(mentors, cosine_similarities_content) ]
sortedlist = quick_sort( scored_mentors, "score" )
recommendedMentors = sortedlist[:10]

print(json.dumps(recommendedMentors))






