import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paragraph'
})
export class ParagraphPipe implements PipeTransform {

  transform(value: string): string {
    
    if (value == null) {
      return '';
    }
    // 將兩個 \n\n 換成 </p><p> 來分隔段落
    return '<p>' + value.replace(/\n\n/g, '</p><p>') + '</p>';
  }

}
