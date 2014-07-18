var BASE_IMG_URL = 'http://ec2-54-187-67-219.us-west-2.compute.amazonaws.com/images';
var BASE_COMP_URL = 'http://ec2-54-187-67-219.us-west-2.compute.amazonaws.com';
 
module.exports = 
{
	name: 'Trend Micro - Eloqua App',
	version: '0.0.1',
	logoUrl: BASE_IMG_URL + '/TrendMicro-Logo.png',
	components: [
	{
		name: 'My First Component',
		description: 'This our first cloud component',
		iconUrl: BASE_IMG_URL +'/TrendMicro-EloquaApp.png',
		componentImage: 
		{
			height: '50',
			width: '135',
			url: BASE_IMG_URL +'/TrendMicro-EloquaApp.png'
		},
		createInstance  : BASE_COMP_URL + '/components/create/{Id}',
		removeInstance  : BASE_COMP_URL + '/components/remove/{Id}',
		configurationUrl: BASE_COMP_URL + '/components/configure/{Id}?assetId={AssetId}&contactId={ContactId}',
		renderInstance  : BASE_COMP_URL + '/components/render/{Id}?assetId={AssetId}&contactId={ContactId}&visitorId={VisitorId}',
		instanceImage   : BASE_COMP_URL + '/components/preview/{Id}?assetId={AssetId}&contactId={ContactId}&visitorId={VisitorId}'
	}]
};