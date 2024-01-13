import csv
import json
import re
import time
from bs4 import BeautifulSoup
import requests

def pairwise(iterable):
	"s -> (s0, s1), (s2, s3), (s4, s5), ..."
	a = iter(iterable)
	return zip(a, a)
def get_latlong(name, address):
	no_whitespace = lambda s: re.sub(r'\s', '+', s)
	resp = requests.get(f'https://nominatim.openstreetmap.org/search?q={no_whitespace(name)}+{no_whitespace(address)}+Auckland,+New+Zealand&format=json&polygon=1&addressdetails=1')
	body = resp.json()	
	if(len(body) >= 1):
		return {'lat': body[0]['lat'], 'lon': body[0]['lon'], 'osm_id': body[0]['osm_id']}
	else:
		resp = requests.get(f'https://nominatim.openstreetmap.org/search?q={no_whitespace(name)},+Auckland,+New+Zealand&format=json&polygon=1&addressdetails=1')
		body = resp.json()	
		if(len(body) >= 1):
			return {'lat': body[0]['lat'], 'lon': body[0]['lon'], 'osm_id': body[0]['osm_id']}
		else:
			print(body)

			return {'lat': '', 'lon': '', 'osm_id': ''}

URL = "https://www.aucklandlibraries.govt.nz/pages/library.aspx?library="

libraries = []
# i=1;
for i in range(1, 57):
	try:
		page = requests.get(URL+str(i))
		soup = BeautifulSoup(page.content, "html.parser")
		name = soup.find_all('h1',class_='page-title')[-1].string
		address = ', '.join([str(i) for i in soup.find('address').contents if str(i) != '<br/>'])

		hours = {k: v for  (k,v) in pairwise(i.text for i in list(soup.find('p',class_='opening-hours').children) if i.text)}

		saturday = hours['Saturday']
		sunday = hours['Sunday']
		lat, lon, osm_id = get_latlong(name, address).values()

		libraries.append({'libraryId': i, 'name': name, 'address': address, 'hours': hours, 'lat': lat, 'lon': lon, 'osm_id':osm_id})
		print(f'{i} - {name}')
	except Exception as e:
		print(i, e)
		libraries.append({'libraryId': i, 'name': '', 'address': '', 'saturday': '', 'sunday': ''})
	finally:
		time.sleep(3)

print(libraries)

with open('libraries.json', 'w') as f:
	json.dump(libraries, f)

# with(open("libraries.csv", "w")) as fw:
# 		out = csv.writer(fw)
# 		# Write CSV Header, If you dont need that, remove this line
# 		out.writerow(['libraryId', 'name', 'address', 'saturday', 'sunday'])

# 		for i in libraries:
# 			out.writerow([i['libraryId'],
# 						i["name"],
# 						i["address"],
# 						i["saturday"],
# 						i["sunday"]])



	
