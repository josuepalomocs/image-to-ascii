export default class Image {
  private readonly image: HTMLImageElement;

  public constructor(src: string) {
    this.image = document.createElement("img");
    this.image.src = src;
  }

  public getImage() {
    const getLoadedImage = new Promise<HTMLImageElement>((resolve) => {
      if (this.image.complete) {
        resolve(this.image);
      }

      this.image.onload = () => {
        resolve(this.image);
      };
    });

    return getLoadedImage.then((image) => image);
  }
}
