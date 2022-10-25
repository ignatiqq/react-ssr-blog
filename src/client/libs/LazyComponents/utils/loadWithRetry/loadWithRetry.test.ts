// import loadWithRetry from './loadWithRetry';

// describe('loadWithRetry test', () => {
// 	it('should call load callback once if it resolved value', async () => {
// 		const loadCb = jest.fn().mockResolvedValue('Component');
// 		const result = await loadWithRetry(loadCb, {
// 			retries: 3,
// 		});
// 		expect(loadCb).toHaveBeenCalledTimes(1);
// 		expect(result).toBe('Component');
// 	});

// 	it('result should reject value with retries', async () => {
// 		const loadCb = jest.fn().mockRejectedValue('error message');
// 		const errorCb = jest.fn();
// 		try {
// 			const result = await loadWithRetry(loadCb, {
// 				retries: 3,
// 				errorCallback: errorCb,
// 				timeoutMs: 0,
// 			});
// 		} catch (error) {
// 			expect(error).toBe('error message');
// 			expect(errorCb).toHaveBeenCalledTimes(4);
// 			expect(loadCb).toHaveBeenCalledTimes(4);
// 		}
// 	});
// });