export default class Canvas {
  protected readonly canvas: HTMLCanvasElement;
  protected readonly context: CanvasRenderingContext2D;

  public constructor(width: number, height: number) {
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d")!;
    this.canvas.width = width;
    this.canvas.height = height;
  }

  public getCanvas() {
    return this.canvas;
  }
}
