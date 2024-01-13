const LIBRARY_URL = "https://api.npoint.io/8dfe6b3483094464d038";

const libraries = await (await fetch(LIBRARY_URL)).json();

const list = document.querySelector("#list");

const map = L.map("map").setView([-36.8977, 174.9188], 11);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
	maxZoom: 19,
	attribution:
		'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const visitLibrary = async (libraryId) => {
	const lib = libraries.find((l) => l.libraryId === libraryId);
	lib.visited = !lib.visited;
	drawMap();
	await fetch(LIBRARY_URL, {
		method: "POST",
		body: JSON.stringify(libraries),
	});
	console.log(libraries.filter((i) => i.visited));
};
libraries.forEach((lib) => {
	let el = document.createElement("div");
	el.className = "libraryElement";
	el.dataset.visited = lib.visited;
	el.dataset.libraryId = lib.libraryId;
	// the lazy man's react
	el.innerHTML = `<div><h3>${
		lib.name
	}</h3><a target="_blank" rel="noopener noreferrer" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
		lib.name + " Auckland"
	)}">${lib.address}</a></div>`;
	let checkbox = document.createElement("input");
	checkbox.type = "checkbox";
	checkbox.checked = lib.visited;
	checkbox.addEventListener("click", (e) => {
		e.stopPropagation();
		visitLibrary(lib.libraryId);
	});
	el.appendChild(checkbox);

	el.addEventListener("click", () => {
		const p = L.popup()
			.setContent(`${lib.name}`)
			.setLatLng([lib.lat, lib.lon])
			.openOn(map);
		map.openPopup(p);
	});
	el.onclick = list.appendChild(el);
});
const drawMap = () => {
	libraries.forEach((lib) => {
		const popup = L.popup().setContent(`${lib.name}`);
		const color = lib.visited ? "#08FF08" : "#ff0000";
		const circle = L.circle([lib.lat, lib.lon], {
			color: color,
			fillColor: color,
			fillOpacity: "1",
			radius: 400,
		}).addTo(map);
		circle.on("click", () => {
			document
				.querySelector(`[data-library-id="${lib.libraryId}"]`)
				.scrollIntoView({ behavior: "smooth" });
		});
		circle.bindPopup(popup);
	});
};

drawMap();
