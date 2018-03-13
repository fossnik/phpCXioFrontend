// pull JSON from API on button click

$('#orderbook').click(function() {
	let market = document.getElementById("market").value;

	$.ajax({
		type: 'POST',
		url: 'php/pullJson.php',
		data: {
			endpoint: "getorderbook?market_id=" + market
		},
		success: function (JsonString) {
			let orderbook = JSON.parse(JsonString);
			$('#status').html("pullJson.php Successfully Queried API<br>" +
				"request: " + orderbook.request +
				"  for  [ marketID:  " + market + " ]");
			printOrderBook(orderbook);
		}
	});

	function printOrderBook(json) {
		// print table headers - BUY and SELL
		let html =
			"<table>" +
				"<thead>" +
					"<tr>" +
						"<th colspan='3' class='flex-item buy'>BUY</th>" +
						"<th colspan='3' class='flex-item sell'>SELL</th>" +
					"</tr>" +
					"<tr>" +
						"<th class='flex-item buy'>Order Time</th>" +
						"<th class='flex-item buy'>Price</th>" +
						"<th class='flex-item buy'>Quantity</th>" +

						"<th class='flex-item sell'>Order Time</th>" +
						"<th class='flex-item sell'>Price</th>" +
						"<th class='flex-item sell'>Quantity</th>" +
					"</tr>" +
				"</thead>" +
				"<tbody>";

		// fill table rows
		let buyOrders = json.result.BuyOrders;
		let sellOrders = json.result.SellOrders;
		$.each(buyOrders, function(index, buyOrder) {
			html +=
				"<tr>" +
					"<td class='flex-item'>" + buyOrder.OrderTime + "</td>" +
					"<td class='flex-item'>" + buyOrder.Price + "</td>" +
					"<td class='flex-item'>" + buyOrder.Quantity + "</td>" +

					"<td class='flex-item'>" + sellOrders[index].OrderTime + "</td>" +
					"<td class='flex-item'>" + sellOrders[index].Price + "</td>" +
					"<td class='flex-item'>" + sellOrders[index].Quantity + "</td>" +
				"</tr>";
		});

		// apply generated table string to DOM
		$('#maintable').html(html + "</tbody></table>");
	}
});

$('#getmarkets').click(function() {

	$.ajax({
		type: 'POST',
		url: 'php/pullJson.php',
		data: {
			endpoint: 'getmarkets'
		},
		success: function (jsonString) {
			let getmarkets = JSON.parse(jsonString);
			$('#status').html("pullJson.php Successfully Queried API<br>" +
				"request: " + getmarkets.request);
			printTable(getmarkets.result);
		}
	});

});

$('#getmarketsummaries').click(function () {

	$.ajax({
		type: 'POST',
		url: 'php/pullJson.php',
		data: {
			endpoint: 'getmarketsummaries'
		},
		success: function (jsonString) {
			let getmarketsummaries = JSON.parse(jsonString);
			$('#status').html("pullJson.php Successfully Queried API<br>" +
				"request: " + getmarketsummaries.request);
			printTable(getmarketsummaries.result);
		}
	});

});

$('#getcurrencies').click(function () {

	$.ajax({
		type: 'POST',
		url: 'php/pullJson.php',
		data: {
			endpoint: 'getcurrencies'
		},
		success: function (jsonString) {
			let getcurrencies = JSON.parse(jsonString);
			$('#status').html("pullJson.php Successfully Queried API<br>" +
				"request: " + getcurrencies.request);
			printTable(getcurrencies.result);
		}
	});

});

$('#getcurrency').click(function () {
	let ticker = $('option:selected').data().name;

	$.ajax({
		type: 'POST',
		url: 'php/pullJson.php',
		data: {
			endpoint: 'getcurrency' + '?ticker_code=' + ticker
		},
		success: function (jsonString) {
			let getcurrencies = JSON.parse(jsonString);
			$('#status').html("pullJson.php Successfully Queried API<br>" +
				"request: " + getcurrencies.request + "  [" + ticker + "]");
			printTable([getcurrencies.result]);
		}
	});

});

function getMarketByID(MarketID) {
	let endpoint = "getmarketsummary?market_id=" + MarketID;

	$.ajax({
		type: 'POST',
		url: 'php/pullJson.php',
		data: {
			endpoint: endpoint
		},
		success: function (jsonString) {
			let getmarketsummary = JSON.parse(jsonString);
			$('#status').html("pullJson.php Successfully Queried API<br>" +
				"request: " + getmarketsummaries.request);
			printTable([getmarketsummary.result]);
		}
	});

}

function printTable(results) {
	// print table headers
	let html =
		"<table>" +
			"<thead>" +
				"<tr>";

	let properties = Object.keys(results[0])
	properties.forEach(function (header) {
		html += "<th class='flex-item'>" + header + "</th>";
	});

	html +=
				"</tr>" +
			"</thead>" +
			"<tbody>";

	// each Result
	results.forEach(function(result) {
		html += "<tr>";

		// each property of individual Result
		properties.forEach(function (property) {
			html += "<td class='flex-item'>" +
				result[property] + "</td>";
		});

		html += "</tr>";
	});

	// apply generated table string to DOM
	$('#maintable').html(html + "</tbody></table>");
}