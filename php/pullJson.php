<?php

	if (isset($_POST['market'])) {
		$MarketID = $_POST['market'];
		$url = 'https://www.coinexchange.io/api/v1/getorderbook?market_id=' . $MarketID;
		echo file_get_contents($url);
	} else
		if (isset($_POST['endpoint'])) {
			$endpoint = $_POST['endpoint'];
			echo file_get_contents('https://www.coinexchange.io/api/v1/' . $endpoint);
		}

//	$url = '../json/.Sample-ltc-orderbook.json';

	// output api results as a file (not working)
//	$fileName = './json/' . $MarketID . '-' . time() . '.json';
//	file_put_contents($filename, $htmlStr);

?>
