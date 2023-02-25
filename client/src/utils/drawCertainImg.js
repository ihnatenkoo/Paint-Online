export const drawCertainImg = (ctx, imgData, canvasWidth, canvasHeight) => {
	let img = new Image();
	img.src = imgData;
	img.onload = () => {
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);
		ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
	};
};
