// pull JSON from API on button click

let orderbook = null;

$('#orderbook').click(function() {
	let market = document.getElementById("market").value;

	$.ajax({
		type: 'POST',
		url: 'php/pullJson.php',
		data: {
			market: market
		},
		success: function (JsonString) {
			orderbook = JSON.parse(JsonString);
			printOrderBook(orderbook);
			$('#status').html("pullJson.php Successfully Queried API" +
				" endpoint 'market' #" + market + "\n" +
				"request: " + orderbook.request);
		}
	});

	function printOrderBook(json) {
		// print table headers - BUY and SELL
		$('#JS-fill').html(
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
			"</tr>"
		);

		// fill table rows
		let buyOrders = json.result.BuyOrders;
		let sellOrders = json.result.SellOrders;
		$.each(buyOrders, function(index, buyOrder) {
			$('#JS-fill').append(
				"<tr>" +
				"<td class='flex-item'>" + buyOrder.OrderTime + "</td>" +
				"<td class='flex-item'>" + buyOrder.Price + "</td>" +
				"<td class='flex-item'>" + buyOrder.Quantity + "</td>" +

				"<td class='flex-item'>" + sellOrders[index].OrderTime + "</td>" +
				"<td class='flex-item'>" + sellOrders[index].Price + "</td>" +
				"<td class='flex-item'>" + sellOrders[index].Quantity + "</td>" +
				"</tr>"
			);
		});
	}
});

$('#getmarkets').click(function() {

	$.ajax({
		type: 'POST',
		url: 'php/pullJson.php',
		data: {
			endpoint: 'getmarkets'
		},
		success: function (JsonString) {
			$('#status').html("pullJson.php Successfully Queried API Endpoint 'getMarkets'");
			printGetMarkets(JsonString);
			// getmarkets = JSON.parse(JsonString);
			// printGetMarkets(getmarkets);
		}
	});

	function printGetMarkets(getmarkets) {
		$('#log').html(getmarkets);
		console.log(getmarkets);
	}
});


