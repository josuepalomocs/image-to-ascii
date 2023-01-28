import "../style.css";
import CanvasApi from "./CanvasApi";
import ImageApi from "./ImageApi";

const imageApi = new ImageApi("image.jpg");
const image = await imageApi.getImage();

if (image) {
  const canvasApi = new CanvasApi(image);
  const canvas = canvasApi.getCanvas();

  document.querySelector<HTMLDivElement>("#app")!.appendChild(canvas);
}
