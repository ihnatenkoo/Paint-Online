export const onDownloadCanvas = (canvas, name) => {
	const dataUrl = canvas.toDataURL();
	const a = document.createElement('a');
	a.href = dataUrl;
	a.download = name + '.jpg';
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
};
