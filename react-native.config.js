module.exports = {
	dependencies: {
		'jmessage-react-plugin': {
			platforms: {
				android: {
					packageInstance: 'new JMessageReactPackage(false)',
				},
			},
		},
	},
};
