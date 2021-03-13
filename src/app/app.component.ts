import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import mathData from '../assets/mathData.json';

export interface Lesson {
  id: string;
  dateLesson: string;
  theme: string;
  homework: string;
  note: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  lessonsData: Lesson[] = mathData;
  form: FormGroup;
  buttonName = 'Добавить';
  flagEdit: boolean;

  constructor(private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: this.formBuilder.control({
        value: this.lessonsData.length,
        disabled: false,
      }),
      dateLesson: this.formBuilder.control('', Validators.required),
      theme: this.formBuilder.control('', Validators.required),
      homework: this.formBuilder.control(''),
      note: this.formBuilder.control(''),
    });
  }

  addValue(lesson: Lesson) {
    if (this.buttonName==='Добавить') {
      this.lessonsData.push(lesson)
    }
    else{
      this.lessonsData.find((o) => o.id === lesson.id).id=lesson.id;
      this.lessonsData.find((o) => o.id === lesson.id).dateLesson=lesson.dateLesson;
      this.lessonsData.find((o) => o.id === lesson.id).homework=lesson.homework;
      this.lessonsData.find((o) => o.id === lesson.id).note=lesson.note
      this.lessonsData.find((o) => o.id === lesson.id).theme=lesson.theme;
      this.buttonName='Добавить';
    }
    
  }
  setValueForm(id: number) {
    this.form = this.formBuilder.group({
      id: this.formBuilder.control({
        value: this.lessonsData[id].id,
        disabled: false,
      }),
      dateLesson: this.formBuilder.control(this.lessonsData[id].dateLesson, Validators.required),
      theme: this.formBuilder.control(this.lessonsData[id].theme, Validators.required),
      homework: this.formBuilder.control(this.lessonsData[id].homework),
      note: this.formBuilder.control(this.lessonsData[id].note),
    });
    this.buttonName='Изменить';
  }


  deleteValue(id: number){
    this.lessonsData.splice(id,1);
  }

}