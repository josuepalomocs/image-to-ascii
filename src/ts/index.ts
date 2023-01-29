import "../style.css";
import Image from "./Image";
import AsciiCanvas from "./AsciiCanvas";
import FontBitMapCanvas from "./FontBitMapCanvas";

const fontBitMapImage = await new Image("fontbitmap.png").getImage();

const characters =
  " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";

if (fontBitMapImage) {
  const fontBitMapCanvasObj = new FontBitMapCanvas(
    fontBitMapImage,
    characters.split(""),
    19,
    5
  );

  const asciiCanvasImage = await new Image("image.jpg").getImage();

  if (asciiCanvasImage) {
    const asciiCanvas = new AsciiCanvas(
      asciiCanvasImage,
      1080,
      720,
      3,
      3,
      fontBitMapCanvasObj.getBrightnessMapArray()
    ).getCanvas();

    document.querySelector<HTMLDivElement>("#app")!.appendChild(asciiCanvas);
  }
}
