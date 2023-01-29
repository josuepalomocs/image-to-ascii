import Canvas from "./Canvas";

export default class AsciiCanvas extends Canvas {
  private readonly imageDataArray: ImageData[];
  public constructor(
    image: HTMLImageElement,
    width: number,
    height: number,
    blockWidth: number,
    blockHeight: number
  ) {
    super(width, height);
    this.context.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
    this.imageDataArray = [];
    this.createImageDataArray(image, blockWidth, blockHeight);

    this.convertImageDataToGrayscale(blockWidth, blockHeight);
  }

  private createImageDataArray(
    image: HTMLImageElement,
    blockWidth: number,
    blockHeight: number
  ) {
    for (let i = 0; i < this.canvas.height / blockHeight; i++) {
      for (let j = 0; j < this.canvas.width / blockWidth; j++) {
        const imageData = this.context.getImageData(
          j * blockWidth,
          i * blockHeight,
          blockWidth,
          blockHeight
        );

        this.imageDataArray.push(imageData);
      }
    }
  }

  private convertImageDataToGrayscale(blockWidth: number, blockHeight: number) {
    for (let i = 0; i < this.imageDataArray.length; i++) {
      const pixels = this.imageDataArray[i].data;
      for (let j = 0; j < pixels.length; j += 4) {
        const luma =
          0.2126 * pixels[j] + 0.7152 * pixels[j + 1] + 0.0722 * pixels[j + 2];
        for (let k = 0; k < 3; k++) {
          pixels[j + k] = luma;
        }
      }
      const numImageDataRows = this.canvas.height / blockHeight;
      const numImageDataColumns = this.canvas.width / blockWidth;
      const currentImageDataRow = i / numImageDataColumns;
      const currentImageDataColumn = i % numImageDataColumns;
      const newImageData = new ImageData(pixels, blockWidth, blockHeight);
      this.context.putImageData(
        newImageData,
        currentImageDataRow * blockWidth,
        currentImageDataColumn * blockHeight
      );
    }
  }
}
