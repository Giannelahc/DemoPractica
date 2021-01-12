import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public formulario: FormGroup;

  @Input() titulo: string;
  @Input() events: Observable<void>;
  @Output() enviarForm: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  constructor(public fb: FormBuilder) { }

  ngOnInit(): void {
    this.rellenarFormulario();
    this.events.subscribe(() => {
      this.enviarForm.emit(this.formulario);
    });
  }

  rellenarFormulario() {
    this.formulario = this.fb.group({
      email: [''],
      password: ['']
    });
  }

}
