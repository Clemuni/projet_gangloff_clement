import { Component, OnInit, Input } from '@angular/core';
import { Form } from '../../../ts/form';

@Component({
  selector: 'app-recap',
  templateUrl: './recap.component.html',
  styleUrls: ['./recap.component.scss'],
})
export class RecapComponent implements OnInit {
  @Input() data: Form | null = null;

  constructor() {}

  ngOnInit(): void {}
}
