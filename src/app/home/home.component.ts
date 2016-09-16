import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  createRetroForm: FormGroup;
  joinRetroForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.createRetroForm = new FormBuilder().group({
      // characterName: ['', Validators.required]
    });

    this.joinRetroForm = new FormBuilder().group({

    });
  }

}
