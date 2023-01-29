import "../style.css";
import Image from "./Image";
import AsciiCanvas from "./AsciiCanvas";
import FontBitMapCanvas from "./FontBitMapCanvas";

const asciiCanvasImage = await new Image("image.jpg").getImage();
console.log(asciiCanvasImage.src);

if (asciiCanvasImage) {
  const canvas = new AsciiCanvas(
    asciiCanvasImage,
    window.innerWidth,
    window.innerHeight,
    8,
    8
  ).getCanvas();

  document.querySelector<HTMLDivElement>("#app")!.appendChild(canvas);
}

const fontBitMapImage = await new Image("fontbitmap.png").getImage();

const characters =
  " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";

if (fontBitMapImage) {
  const canvas = new FontBitMapCanvas(
    fontBitMapImage,
    characters.split(""),
    19,
    5
  ).getCanvas();

  // document.querySelector<HTMLDivElement>("#app")!.appendChild(canvas);
}
