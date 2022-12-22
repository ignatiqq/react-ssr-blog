
type loadScriptOptionsArg = {
    onLoad?: () => any,
    onError?: () => any,
}

const plugFn = () => {};

export function loadScript(src: string, options?: loadScriptOptionsArg) {
	const script = document.createElement('script');
	script.src = src;

	if (options) {
		script.onload = options.onLoad || plugFn;
		script.onerror = options.onError || plugFn;
	}
	document.head.appendChild(script);

	return () => {
		document.head.removeChild(script);
	};
}