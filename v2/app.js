window.addEventListener("load", async () => {
	const container = document.querySelector("tbody");
	container.innerHTML = "<tr><td>Loading...</td></tr>";
	const data = await fetch("http://localhost:3000").then(res => res.json());
	if(data.fatal !== undefined) {
		container.innerHTML = "<tr><td>Backend offline</td></tr>";
		return false;
	}
	container.innerHTML = "";
	const columns = {
		titel:	"Filmtitel",
		ar:		"År",
		langd_minuter:	"Längd",
		genre:	"Genre",
		regissor:	"Regissör"
	};
	for(let row of data) {
		let rowContainer = document.createElement("TR");
		if(container.innerHTML === "") {
			for(let colName in row) {
				const columnContainer = document.createElement("TH");
				columnContainer.textContent = columns[colName];
				rowContainer.appendChild(columnContainer);
			}
			container.appendChild(rowContainer);
			rowContainer = document.createElement("TR");
		}
		for(let colName in row) {
			const value = row[colName];
			const columnContainer = document.createElement("TD");
			columnContainer.textContent = value+((colName === "langd_minuter")?"m":"");
			rowContainer.appendChild(columnContainer);
		};
		container.appendChild(rowContainer);
	};
});