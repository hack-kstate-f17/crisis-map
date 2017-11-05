import json

coords = []

n = 100 # max lines to parse through
i = 0
with open('../acm-w/stream__Harvey.json') as f:
    for raw_line in f:
        if i > n:
            break
        line = json.loads(raw_line)
        if line['coordinates'] is None:
            continue;
        print line['coordinates']['coordinates']
        coords.append(line['coordinates']['coordinates'])
        # try:
            # for hashtag in line['entities']['hashtags']:
            #     tag = hashtag['text']
            #     try:
            #         index = hashtags.index(tag)
            #         counts[index] = counts[index] + 1
            #     except:
            #         hashtags.append(tag)
            #         index = hashtags.index(tag)
            #         counts.append(1)
        # except:
            # pass
        i += 1

output_data = coords

with open('coords.json', 'w') as outfile:
    json.dump(output_data, outfile)
