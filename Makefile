bundle:
	react-native bundle \
		--platform ios \
		--entry-file index.ios.js \
		--bundle-output ./release/main.jsbundle \
		--assets-dest ./release \
		--dev false
staging:
	code-push release Weekly75 ./release/main.jsbundle 1.0.1
production:
	code-push release Weekly75 ./release/main.jsbundle 1.0.1 --deploymentName Production --mandatory