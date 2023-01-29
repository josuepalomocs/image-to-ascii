import Canvas from "./Canvas";

interface BrightnessMapEntry {
  character: string;
  value: number;
}

export default class AsciiCanvas extends Canvas {
  private readonly imageDataArray: ImageData[];
  public constructor(
    image: HTMLImageElement,
    width: number,
    height: number,
    blockWidth: number,
    blockHeight: number,
    brightnessMapArray: BrightnessMapEntry[]
  ) {
    super(width, height);
    this.context.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
    this.imageDataArray = [];
    this.createImageDataArray(blockWidth, blockHeight);

    this.convertImageDataToGrayscale(
      brightnessMapArray,
      blockWidth,
      blockHeight
    );
    // this.drawText(brightnessMap);
  }

  private createImageDataArray(blockWidth: number, blockHeight: number) {
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

  private convertImageDataToGrayscale(
    brightnessMapArray: BrightnessMapEntry[],
    blockWidth: number,
    blockHeight: number
  ) {
    const characters =
      " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~".split(
        ""
      );

    const maxValue = brightnessMapArray[brightnessMapArray.length - 1].value;
    const deltaValue = 255 / maxValue;

    const avgLumaArray = [];

    this.context.font = "3px sans-serif";
    this.context.fillStyle = "white";

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.imageDataArray.length; i++) {
      const pixels = this.imageDataArray[i].data;
      let avgLuma = 0;
      for (let j = 0; j < pixels.length; j += 4) {
        const luma =
          0.2126 * pixels[j] + 0.7152 * pixels[j + 1] + 0.0722 * pixels[j + 2];
        avgLuma += luma;
        for (let k = 0; k < 3; k++) {
          pixels[j + k] = luma;
        }
      }
      avgLuma /= pixels.length;
      avgLumaArray.push(avgLuma);

      const numImageDataColumns = this.canvas.width / blockWidth;
      const currentImageDataRow = Math.floor(i / numImageDataColumns);
      const currentImageDataColumn = Math.floor(i % numImageDataColumns);
      // const newImageData = new ImageData(pixels, blockWidth, blockHeight);
      // this.context.putImageData(
      //   newImageData,
      //   currentImageDataColumn * blockWidth,
      //   currentImageDataRow * blockHeight
      // );

      const characterIndex = Math.floor(avgLuma * 0.25);

      this.context.fillText(
        characters[characterIndex],
        currentImageDataColumn * blockWidth,
        currentImageDataRow * blockHeight + 4
      );
    }
    console.log(
      avgLumaArray.sort((a, b) => {
        if (a <= b) {
          return -1;
        }
        return 1;
      })
    );
  }

  private drawText(brightnessMap: Map<string, number>) {
    console.log(brightnessMap);
    this.context.font = "16px sans-serif";
    this.context.fillText("HelloHelloHelloHelloHelloHelloHello", 10, 50);
  }
}
