var currentCountry = 'US';
		var currentLanguage = 'en';

		function tealiumLogEvent() {
			utag.link({
				"customer_email": "" + arguments[0] + "",
				"customer_id": "" + arguments[0] + "",
				"customer_status": "" + arguments[1] + "",
				"link_id": "",
				"link_name": "" + arguments[2] + "",
				"link_type": "" + arguments[3] + ""
			});
		}

		function tealiumRegisterEvent() {
			utag.link({
				"link_name": "" + arguments[0] + "",
				"link_type": "register"
			});
		}

		function tealiumCartEvent() {
			utag.link({
				"link_id": "" + arguments[0] + "",
				"link_name": "" + arguments[0] + "",
				"link_type": "" + arguments[1] + ""
			});
		}

		function tealiumSocialShareEvent() {
			utag.link({
				"link_type": "social share"
			});
		}

		function tealiumMeganavEvent() {
			utag.link({
				"link_type": "mega nav"
			});
		}

		function tealiumGlobalSearchResultsTabClickEvent() {
			utag.link({
				"search_type": "" + arguments[0] + "",
				"page_name": "" + arguments[1] + ":global search:" + arguments[2] + "?text=" + arguments[3] + "#" + arguments[4]
			});
		}

		function tealiumSupportClickEvent() {
			utag.link({
				"link_name": "" + arguments[0] + "",
				"link_type": "support click"
			});
		}

		function tealiumVideoEvent() {
			utag.link({
				"link_name": "" + arguments[0] + "",
				"link_type": "video_start"
			});
		}

		function tealiumWhereToBuyEvent() {
			utag.link({
				"link_type": "where to buy"
			});
		}

		function tealiumRebateClickEvent() {
			utag.link({
				"link_name": "" + arguments[0] + "",
				"link_type": "rebate_click"
			});
		}


		function bazaarvoiceROIBeacon() {
			$BV.SI.trackConversion({
				"type": "StoreLocator",
				"label": "ProductPage: " + arguments[0],
				"value": 1
			});
		}