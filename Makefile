build: clean
	npm run build
	cp -R build package/kedro_viz/html

clean:
	find . -regex ".*/__pycache__" -exec rm -rf {} +
	find . -regex ".*\.egg-info" -exec rm -rf {} +

secret-scan:
	trufflehog --max_depth 1 --exclude_path trufflehog-ignore.txt .

security-scan:
	bandit -ll -q -r kedro_viz
