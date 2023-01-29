import Canvas from "./Canvas";

interface BrightnessMapEntry {
  character: string;
  value: number;
}

export default class FontBitMapCanvas extends Canvas {
  private readonly imageDataArray: ImageData[];
  private readonly brightnessMapArray: BrightnessMapEntry[];

  public constructor(
    image: HTMLImageElement,
    characters: string[],
    charactersPerRow: number,
    charactersPerColumn: number
  ) {
    super(image.width, image.height);
    this.context.drawImage(image, 0, 0, image.width, image.height);

    this.imageDataArray = [];
    this.createImageDataArray(image, charactersPerRow, charactersPerColumn);
    this.brightnessMapArray = this.populateBrightnessMap(characters);
  }

  private createImageDataArray(
    image: HTMLImageElement,
    charactersPerRow: number,
    charactersPerColumn: number
  ) {
    for (let i = 0; i < charactersPerColumn; i++) {
      for (let j = 0; j < charactersPerRow; j++) {
        const imageData = this.context.getImageData(
          (j * image.width) / charactersPerRow,
          (i * image.height) / charactersPerColumn,
          this.canvas.width / charactersPerRow,
          this.canvas.height / charactersPerColumn
        );

        this.imageDataArray.push(imageData);
      }
    }
  }

  private populateBrightnessMap(characters: string[]) {
    let numPixelsPerCharacter: number[] = [];

    for (let i = 0; i < this.imageDataArray.length; i++) {
      let numPixels = 0;
      for (let j = 0; j < this.imageDataArray[i].data.length; j += 4) {
        if (this.imageDataArray[i].data[j]) {
          numPixels++;
        }
      }
      numPixelsPerCharacter[i] = numPixels;
    }

    let brightnessMapArray: BrightnessMapEntry[] = [];

    for (let i = 0; i < numPixelsPerCharacter.length; i++) {
      const entry = {
        character: characters[i],
        value: numPixelsPerCharacter[i],
      };

      brightnessMapArray[i] = entry;
    }

    brightnessMapArray.sort((a, b) => {
      if (a.value <= b.value) {
        return -1;
      }
      return 1;
    });

    return brightnessMapArray;
  }

  public getBrightnessMapArray() {
    return this.brightnessMapArray;
  }
}
