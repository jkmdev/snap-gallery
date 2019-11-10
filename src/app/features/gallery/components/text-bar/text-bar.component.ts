import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-text-bar',
  templateUrl: './text-bar.component.html',
  styleUrls: ['./text-bar.component.scss']
})
export class TextBarComponent implements OnInit {

  @Input() text: string;

  constructor() { }

  ngOnInit() {
  }

}
