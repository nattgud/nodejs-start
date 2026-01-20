window.addEventListener("load", async () => {
	const container = document.querySelector("tbody");
	container.innerHTML = "<tr><td>Loading...</td></tr>";
	const data = await fetch("http://localhost:3000").then(res => res.json());
	container.innerHTML = "";
	for(let row of data) {
		const rowContainer = document.createElement("TR");
		for(let colName in row) {
			const columnContainer = document.createElement("TD");
			columnContainer.textContent = row[colName];
			rowContainer.appendChild(columnContainer);
		};
		container.appendChild(rowContainer);
	}
});