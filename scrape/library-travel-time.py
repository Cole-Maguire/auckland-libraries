# import requests
import json
from itertools import zip_longest

def grouper(iterable, n, fillvalue=None):
    args = [iter(iterable)] * n
    return zip_longest(*args, fillvalue=fillvalue)
# d = null


with open("libraries.json", "r", encoding="utf-8") as f:
    libraries = json.load(f)

headers = {
    "Content-Type": "application/json",
    "format": "application/json",
    "X-Application-Id": "bc4eb517",
    "X-Api-Key": "dcd88613ad10388979e2042c5da0ddeb",
}


json_template = (
    {
        "id": "isochrone-0",
        "departure_time": "2024-07-14T21:00:00.000Z",
        "travel_time": 1200,
        "transportation": {
            "type": "walking",
        },
    },
)

departure_searches = [
    dict(*json_template, coords={"lat": float(lib["lat"]), "lng": float(lib["lon"])}, id=f'isochrone-{i}')
    for i,lib in enumerate(libraries)
]

grouped = grouper(departure_searches, 10)
for group in grouped:
    body = {
    "unions": [{"id": "unions-0", "search_ids": [i['id'] for i in group]}],
    "departure_searches": group,
    }
    print(json.dumps(body))



# response = requests.post('https://playground.traveltime.com/api/time-map', headers=headers, json= body)

# print(response.json())
