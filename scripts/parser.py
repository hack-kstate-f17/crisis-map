#####
## parser.py parses hashtag information from tweets
## it stores its findings in 'hashtags.json'
#####

import json

hashtags = []
counts = []

def remove_elems(count_arr, tags_arr): # recursive (deprecated)
    size = len(count_arr)
    for i in range(size):
        if count_arr[i] < 20:
            del count_arr[i]
            del tags_arr[i]
            remove_elems(count_arr, tags_arr)
            break

    return (count_arr, tags_arr)

def remove_elems_two(count_arr, tags_arr):
    new_counts = []
    new_tags = []
    for i in range(len(count_arr)):
        if count_arr[i] > 100:
            new_counts.append(count_arr[i])
            new_tags.append(tags_arr[i])

    return (new_counts, new_tags)

n = 10000 # max lines to parse through
i = 0
with open('acm-w/stream__Harvey.json') as f:
    for raw_line in f:
        if i > n:
            break
        line = json.loads(raw_line)
        try:
            for hashtag in line['entities']['hashtags']:
                tag = hashtag['text']
                try:
                    index = hashtags.index(tag)
                    counts[index] = counts[index] + 1
                except:
                    hashtags.append(tag)
                    index = hashtags.index(tag)
                    counts.append(1)
        except:
            pass
        i += 1

counts, hashtags = remove_elems_two(counts, hashtags)

print hashtags
print counts

output_data = dict(zip(hashtags, counts))

# write json to file
with open('hashtags.json', 'w') as outfile:
    json.dump(output_data, outfile)
