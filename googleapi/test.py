# Imports the Google Cloud client library
from google.cloud import language
from google.cloud.language import enums
from google.cloud.language import types
import json

i = 0
dic_array = []
array = []
time_array = []
with open('D:/Desktop/stream__hurricaneirma.json') as f:
   for line in f:
       json_data = json.loads(line)
       if json_data['coordinates'] is not None:
           array.append(json_data['text'])
           time_array.append(json_data['created_at'])
           i+=1
       if i is 10:
           break;

# Instantiates a client
client = language.LanguageServiceClient()


# The text to analyze
pos_running = 0
neg_running = 0
pos_ave = 0
neg_ave = 0
postive_score = 0
negative_score = 0
no_score = 0
#text = u'Python is a great programming language, and really useful'
z = 0
for i in array:
    document = types.Document(
        content=i,
        type=enums.Document.Type.PLAIN_TEXT)

    # Detects the sentiment of the text
    sentiment = client.analyze_sentiment(document=document).document_sentiment
    ent_analysis = client.analyze_entities(document=document)
    entities = ent_analysis.entities

    #print('Text: {}'.format(i))
    #print('Sentiment: Score: {}, Magnitude: {}'.format(sentiment.score, sentiment.magnitude))

    #for e in entities:
        #print(e.name, e.metadata, e.salience)

    dictionary = {'Magnitude':[],'Score':[],'Content':[],'Time':[],"Entities":[],'Saliences':[]}
    dictionary['Magnitude'] = sentiment.magnitude
    dictionary['Score'] = sentiment.score
    dictionary['Content'] = i
    dictionary['Time'] = time_array[z]

    ent_array = []
    sal_array = []
    for k in entities:
        ent_array.append(k.name)
        if k.salience is None:
            sal_array.append(0)
        else:
            sal_array.append(k.salience)
    dictionary["Entities"] = ent_array
    dictionary["Saliences"] = sal_array

    dic_array.append(dictionary)

    if sentiment.magnitude > 0:
        postive_score+=1
        pos_running+=sentiment.magnitude
    if sentiment.magnitude == 0:
        no_score+=1
    if sentiment.magnitude < 0:
        negative_score+=1
        neg_running+=sentiment.magnitude

    if postive_score > 0:
        pos_ave = pos_running / postive_score
    else:
        pos_ave = 0
    if negative_score > 0:
        neg_ave = neg_running / negative_score
    else:
        neg_ave = 0

    z+=1

print(postive_score)
print(no_score)
print(negative_score)
#print(pos_running)
print("")
print(pos_ave)
#print(neg_running)
print(neg_ave)
tally_total = postive_score + no_score + negative_score
dictionary2 = {'Positive_Amount': postive_score, 'Negative_Amount': negative_score, 'Neutral_Amount': no_score, 'Positive_Average': pos_ave, 'Negative_Average': neg_ave, 'Total': tally_total}
dic_array.append(dictionary2)
with open('result.json', 'w') as fp:
    for q in dic_array:
        json.dump(q, fp)
