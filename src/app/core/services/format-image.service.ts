import { inject, Renderer2 } from '@angular/core';

export class FormatImagesService {

  private renderer2 = inject(Renderer2);

  public widthImgaesInsideContainer(images: HTMLElement[], width: '25%' | '50%' | '75%' | '100%') {
    images.forEach(( img: HTMLElement | any ) => {
      this.renderer2.setStyle(img, 'width', width);
      this.renderer2.addClass(img, 'cursor-pointer');
      this.renderer2.addClass(img, 'full-screen');
      img.addEventListener('click', function() {
        if (!document.fullscreenElement) {
          if (img.requestFullscreen) {
              img.requestFullscreen();
          } else if (img.mozRequestFullScreen) {
              img.mozRequestFullScreen();
          } else if (img.webkitRequestFullscreen) {
              img.webkitRequestFullscreen();
          } else if (img.msRequestFullscreen) {
              img.msRequestFullscreen();
          }
        }
      });
    });
  }
}
