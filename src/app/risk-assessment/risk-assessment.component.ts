import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyService } from '../service/formly.service';

@Component({
  selector: 'app-risk-assessment',
  templateUrl: './risk-assessment.component.html',
  styleUrls: ['./risk-assessment.component.css']
})

export class RiskAssessmentComponent {
  form = new FormGroup({});
  model:any = {  };
  fields: FormlyFieldConfig[] = [];


  constructor(private formlyService: FormlyService) {
  this.formlyService.getRiskQuestion()
    .subscribe(data => {
      this.fields = data
    })
  }



  onSubmit(model:any) {
    console.log(model);

    let scoreMap: any = {
      a: 2, b: 4, c: 6, d: 8, e: 10
    };

    let score = 0

    for(let key in this.model) {
      let value = this.model[key];
      if(typeof value == 'string') {
        score += scoreMap[value]
      } else if(typeof value == "object"){
        let selectScore:number[] = [];
        for(let key2 in value) {
          let value2 = value[key2]
          if(value2 == true) {
            selectScore.push(scoreMap[key2])
          }
        }

        score += Math.max(...selectScore);
      }


    }

    let result:string = ""
    if(score <= 27 ) {
      result = "保守型"
    } else if(score <= 36) {
      result = "安穩型"
    } else if(score <= 47) {
      result = "穩健型"
    } else if(score <= 60) {
      result = "成長型"
    } else {
      result = "積極型"
    }


    window.alert(`您的檢測結果為 ${result} `);
  }

}
