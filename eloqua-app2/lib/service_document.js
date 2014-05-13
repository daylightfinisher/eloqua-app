var BASE_IMG_URL = "http://127.0.0.1:8080/images";
var BASE_COMP_URL = "http://127.0.0.1:8080";
 
module.exports = 
{
	name: 'Trend Micro - Eloqua App',
	version: '0.0.1',
	logoUrl: BASE_IMG_URL + "/TrendMicro-Logo.png",
	components: [
	{
		name: 'My First Component',
		description: "This our first cloud component",
		iconUrl: BASE_IMG_URL +'/TrendMicro-EloquaApp.png',
		componentImage: 
		{
			height: '50',
			width: '135',
			url: BASE_IMG_URL +'/TrendMicro-EloquaApp.png'
		},
		createInstance  : BASE_COMP_URL + '/components/create/{Id}',
		removeInstance  : BASE_COMP_URL + '/remove/{Id}',
		configurationUrl: BASE_COMP_URL + '/configure/{Id}?assetId={AssetId}&contactId={ContactId}',
		renderInstance  : BASE_COMP_URL + '/render/{Id}?assetId={AssetId}&contactId={ContactId}&visitorId={VisitorId}',
		instanceImage   : BASE_COMP_URL + '/preview/{Id}?assetId={AssetId}&contactId={ContactId}&visitorId={VisitorId}'
	}]
};