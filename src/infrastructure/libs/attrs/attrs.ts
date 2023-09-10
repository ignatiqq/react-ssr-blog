export const wrapScript = (str: string, options?: string[]) => {
	return `<script ${options ? options.join(' ') : ''}>${str}</script>`;
};