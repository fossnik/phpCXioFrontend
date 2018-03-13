// pull JSON from API on button click

$('#orderbook').click(function() {
	let market = document.getElementById("market").value;

	$.ajax({
		type: 'POST',
		url: 'php/pullJson.php',
		data: {
			market: market
		},
		success: function (JsonString) {
			let orderbook = JSON.parse(JsonString);
			printOrderBook(orderbook);
			$('#status').html("pullJson.php Successfully Queried API<br>" +
				"request: " + orderbook.request +
				"  for  [ marketID:  " + market + " ]");
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

		// print table end
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
			printGetMarkets(getmarkets);
		}
	});

	function printGetMarkets(json) {
		// print table headers
		let html =
			"<table>" +
				"<thead>" +
					"<tr>" +
						"<th class='flex-item'>Active</th>" +
						"<th class='flex-item'>BaseCurrency</th>" +
						"<th class='flex-item'>BaseCurrencyCode</th>" +
						"<th class='flex-item'>BaseCurrencyID</th>" +
						"<th class='flex-item'>MarketAssetCode</th>" +
						"<th class='flex-item'>MarketAssetID</th>" +
						"<th class='flex-item'>MarketAssetName</th>" +
						"<th class='flex-item'>MarketAssetType</th>" +
						"<th class='flex-item'>MarketID</th>" +
					"</tr>" +
				"</thead>" +
				"<tbody>";

		// fill table
		$.each(json.result, function(index, result) {
			html +=
				"<tr>" +
					"<td class='flex-item'>" + result.Active +
					"<td class='flex-item'>" + result.BaseCurrency +
					"<td class='flex-item'>" + result.BaseCurrencyCode +
					"<td class='flex-item'>" + result.BaseCurrencyID +
					"<td class='flex-item'>" + result.MarketAssetCode +
					"<td class='flex-item'>" + result.MarketAssetID +
					"<td class='flex-item'>" + result.MarketAssetName +
					"<td class='flex-item'>" + result.MarketAssetType +
					"<td class='flex-item'>" + result.MarketID +
				"</tr>";
		});

		// print table end
		$('#maintable').html(html + "</tbody></table>");
	}
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
			printGetMarketSummaries(getmarketsummaries);
		}
	});

	function printGetMarketSummaries(json) {
		// print table headers
		let html =
			"<table>" +
				"<thead>" +
					"<tr>" +
						"<th class='flex-item'>AskPrice</th>" +
						"<th class='flex-item'>BTCVolume</th>" +
						"<th class='flex-item'>BidPrice</th>" +
						"<th class='flex-item'>BuyOrderCount</th>" +
						"<th class='flex-item'>Change</th>" +
						"<th class='flex-item'>HighPrice</th>" +
						"<th class='flex-item'>LastPrice</th>" +
						"<th class='flex-item'>LowPrice</th>" +
						"<th class='flex-item'>MarketID</th>" +
						"<th class='flex-item'>SellOrderCount</th>" +
						"<th class='flex-item'>TradeCount</th>" +
						"<th class='flex-item'>Volume</th>" +
					"</tr>" +
				"</thead>" +
				"<tbody>";

		// fill table
		$.each(json.result, function(index, result) {
			html +=
				"<tr>" +
					"<td class='flex-item'>" + result.AskPrice +
					"<td class='flex-item'>" + result.BTCVolume +
					"<td class='flex-item'>" + result.BidPrice +
					"<td class='flex-item'>" + result.BuyOrderCount +
					"<td class='flex-item'>" + result.Change +
					"<td class='flex-item'>" + result.HighPrice +
					"<td class='flex-item'>" + result.LastPrice +
					"<td class='flex-item'>" + result.LowPrice +
					"<td class='flex-item'>" + result.MarketID +
					"<td class='flex-item'>" + result.SellOrderCount +
					"<td class='flex-item'>" + result.TradeCount +
					"<td class='flex-item'>" + result.Volume +
				"</tr>";
		});

		// print table end
		$('#maintable').html(html + "</tbody></table>");
	}
});