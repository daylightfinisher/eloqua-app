var BASE_IMG_URL = "http://ec2-54-187-67-219.us-west-2.compute.amazonaws.com//images";
var BASE_COMP_URL = "http://ec2-54-187-67-219.us-west-2.compute.amazonaws.com/";
 
module.exports = 
{
	name: 'The CCPV2 Test Provider',
	version: '2.0.0',
	logoUrl: BASE_IMG_URL + "/logo-journey.gif",
	components: [
	{
		name: 'My First Component',
		description: "This our first cloud component",
		iconUrl: BASE_IMG_URL +'/logo-journey.gif',
		componentImage: 
		{
			height: '200',
			width: '200',
			url: BASE_IMG_URL +'/logo-journey.gif'
		},
		createInstance  : BASE_COMP_URL + '/components/create/{Id}',
		removeInstance  : BASE_COMP_URL + '/remove/{Id}',
		configurationUrl: BASE_COMP_URL + '/configure/{Id}?assetId={AssetId}&contactId={ContactId}',
		renderInstance  : BASE_COMP_URL + '/render/{Id}?assetId={AssetId}&contactId={ContactId}&visitorId={VisitorId}',
		instanceImage   : BASE_COMP_URL + '/preview/{Id}?assetId={AssetId}&contactId={ContactId}&visitorId={VisitorId}'
	}]
};