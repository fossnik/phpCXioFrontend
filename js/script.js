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
					"<td class='flex-item' onclick='getMarketByID(" + result.MarketID + ")'>" + result.MarketID +
				"</tr>";
		});

		// apply generated table string to DOM
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
					"<td class='flex-item' onclick='getMarketByID(" + result.MarketID + ")'>" + result.MarketID +
					"<td class='flex-item'>" + result.SellOrderCount +
					"<td class='flex-item'>" + result.TradeCount +
					"<td class='flex-item'>" + result.Volume +
				"</tr>";
		});

		// apply generated table string to DOM
		$('#maintable').html(html + "</tbody></table>");
	}
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
			printGetCurrencies(getcurrencies);
		}
	});

	function printGetCurrencies(json) {
		// print table headers
		let html =
			"<table>" +
				"<thead>" +
					"<tr>" +
						"<th class='flex-item'>CurrencyID</th>" +
						"<th class='flex-item'>Name</th>" +
						"<th class='flex-item'>TickerCode</th>" +
						"<th class='flex-item'>WalletStatus</th>" +
						"<th class='flex-item'>Type</th>" +
					"</tr>" +
				"</thead>" +
				"<tbody>";

		// fill table
		$.each(json.result, function(index, result) {
			html +=
				"<tr>" +
					"<td class='flex-item'>" + result.CurrencyID +
					"<td class='flex-item'>" + result.Name +
					"<td class='flex-item'>" + result.TickerCode +
					"<td class='flex-item'>" + result.WalletStatus +
					"<td class='flex-item'>" + result.Type +
				"</tr>";
		});

		// apply generated table string to DOM
		$('#maintable').html(html + "</tbody></table>");
	}
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
			printGetCurrencies(getcurrencies);
		}
	});

	function printGetCurrencies(json) {
		// print table headers
		let html =
			"<table>" +
				"<thead>" +
					"<tr>" +
						"<th class='flex-item'>CurrencyID</th>" +
						"<th class='flex-item'>Name</th>" +
						"<th class='flex-item'>TickerCode</th>" +
						"<th class='flex-item'>WalletStatus</th>" +
						"<th class='flex-item'>Type</th>" +
					"</tr>" +
				"</thead>" +
				"<tbody>";

		// fill table
		html +=
			"<tr>" +
				"<td class='flex-item'>" + json.result.CurrencyID +
				"<td class='flex-item'>" + json.result.Name +
				"<td class='flex-item'>" + json.result.TickerCode +
				"<td class='flex-item'>" + json.result.WalletStatus +
				"<td class='flex-item'>" + json.result.Type +
			"</tr>";

		// apply generated table string to DOM
		$('#maintable').html(html + "</tbody></table>");
	}
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
			let getmarketsummaries = JSON.parse(jsonString);
			$('#status').html("pullJson.php Successfully Queried API<br>" +
				"request: " + getmarketsummaries.request);
			printGetMarketSummaries(getmarketsummaries);
		}
	});

	function printGetMarketSummaries(json) {
		console.log(json)
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
		html +=
			"<tr>" +
				"<td class='flex-item'>" + json.result.AskPrice +
				"<td class='flex-item'>" + json.result.BTCVolume +
				"<td class='flex-item'>" + json.result.BidPrice +
				"<td class='flex-item'>" + json.result.BuyOrderCount +
				"<td class='flex-item'>" + json.result.Change +
				"<td class='flex-item'>" + json.result.HighPrice +
				"<td class='flex-item'>" + json.result.LastPrice +
				"<td class='flex-item'>" + json.result.LowPrice +
				"<td class='flex-item' onclick='getMarketByID(" + json.result.MarketID + ")'>" + json.result.MarketID +
				"<td class='flex-item'>" + json.result.SellOrderCount +
				"<td class='flex-item'>" + json.result.TradeCount +
				"<td class='flex-item'>" + json.result.Volume +
			"</tr>";

		// apply generated table string to DOM
		$('#maintable').html(html + "</tbody></table>");
	}
}