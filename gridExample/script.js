$("#updButton").click(function() {
	let columns = $("#columns").val();
	let rows = $("#rows").val();
	let gridCont = $("#gridMain");
	if(columns > 0 && rows > 0) {
		gridCont.css("grid-template-columns", "repeat(" + columns + ", 1fr)");
		gridCont.css("grid-template-rows", "repeat(" + rows + ", 200px)");
	}
	else{
		alert("Please enter a valid number of rows and columns.");
	}
});