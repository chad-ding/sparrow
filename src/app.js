
export default {
	getName() {
		import('./common/index.js').then(({ print }) => print('dddddd'));
		return 'hello world';
	}
};
