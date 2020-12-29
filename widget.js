const widget = require('widget');  // need to use internal API

const settings = widget.getSettings(); // get Object with settings of widget. It can be empty object.
// User configures this parameters in web interface before launch

const manifest = widget.getManifest(); // get Object with manifest of widget

async function generateResult() {
	// several popular node.js modules are build-in so no need to require() them. Axios you can use you fetch data
	// from external sources, or send any requests for external APIs
	const response = await axios.get(manifest.data_source.url);
   	return response && response.data ? response.data.bpi : false;
}

async function initWidget(settings) {
	const currency = settings.currency || 'USD'; // set default value if there is no parameter specified by user
	const res = await generateResult();

	// widget.publish() sends final result of work, after this call execution will be terminated
	// It accepts one parameter String, html tags are accepted
	if (!res) return widget.publish('Some problem, please try again later');
	widget.publish(`Current BTC price: <b>${res[currency].rate_float.toFixed(2)}</b> ${currency}`);
}

initWidget(settings);
