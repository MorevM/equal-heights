/**
 * Delays a given function invoking until a given `delay` time have elapsed since the last time a function was invoked.
 *
 * @param     {Function}   cb          A function being invoked.
 * @param     {number}     [delay]     Timeout between function invoking, ms.
 * @param     {boolean}    [initial]   Whether to invoke a given function immediately after initialization.
 *
 * @returns   {Function}
 */
export const debounce = (cb, delay = 100, initial = false) => {
	let timer;
	let started = false;

	return function (...args) {
		if (!started) {
			if (initial) cb.apply(this, args);
			started = true;
		}

		clearTimeout(timer);
		timer = setTimeout(() => {
			cb.apply(this, args);
			started = false;
		}, delay);
	};
};
