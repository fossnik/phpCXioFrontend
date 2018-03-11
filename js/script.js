// pull JSON from API on button click

let orderbook = null;

$('#pull').click(function() {
	let market = document.getElementById("market").value;
	$.ajax({
		type: 'POST',
		url: 'php/pullJson.php',
		data: {
			market: market
		},
		success: function (JsonString) {
			$('#status').html("pullJson.php Successfully Queried API");
			orderbook = JSON.parse(JsonString);
		}
	});
});

$('#print').click(function() {
	if (orderbook === null)
		$('#status').html("Orderbook must first be Queried");
	else
		printOrderBook(orderbook)
});

function printOrderBook(json) {
	// print table headers - BUY and SELL
	$('#JS-fill').html(
		"<tr>" +
			"<th colspan='3' class='flex-item'>BUY</th>" +
			"<th colspan='3' class='flex-item'>SELL</th>" +
		"</tr>" +
		"<tr>" +
			"<th class='flex-item'>Order Time</th>" +
			"<th class='flex-item'>Price</th>" +
			"<th class='flex-item'>Quantity</th>" +

			"<th class='flex-item'>Order Time</th>" +
			"<th class='flex-item'>Price</th>" +
			"<th class='flex-item'>Quantity</th>" +
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
