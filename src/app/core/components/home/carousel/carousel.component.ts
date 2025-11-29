import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html'
})
export class CarouselComponent implements AfterViewInit {
  @Input() slideImages!: string[];
  @ViewChild('sliderRef') sliderRef!: ElementRef<HTMLDivElement>;

  selectedSlide = 0;

  ngAfterViewInit(): void {
    this.scrollToSlide(this.selectedSlide);
  }

  onPrev() {
    if (this.selectedSlide > 0) {
      this.selectedSlide--;
    } else {
      this.selectedSlide = this.slideImages.length - 1;
    }
    this.scrollToSlide(this.selectedSlide);
  }

  onNext() {
    if (this.selectedSlide < this.slideImages.length - 1) {
      this.selectedSlide++;
    } else {
      this.selectedSlide = 0;
    }
    this.scrollToSlide(this.selectedSlide);
  }

  selectSlide(index: number) {
    this.selectedSlide = index;
    this.scrollToSlide(index);
  }

  private scrollToSlide(index: number) {
    const width = this.sliderRef.nativeElement.clientWidth;
    this.sliderRef.nativeElement.scrollTo({
      left: width * index,
      behavior: 'smooth'
    });
  }
}
