export default class CanvasApi {
  private readonly canvas: HTMLCanvasElement;
  private readonly context: CanvasRenderingContext2D;

  public constructor(image: HTMLImageElement) {
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d")!;
    this.canvas.width = window.innerWidth / 2;
    this.canvas.height = window.innerHeight / 2;
    this.context.drawImage(
      image,
      0,
      0,
      window.innerWidth / 2,
      window.innerHeight / 2
    );
  }

  public getCanvas() {
    return this.canvas;
  }
}
