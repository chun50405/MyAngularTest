import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
@Component({
  selector: 'app-risk-assessment',
  templateUrl: './risk-assessment.component.html',
  styleUrls: ['./risk-assessment.component.css']
})

export class RiskAssessmentComponent {
  form = new FormGroup({});
  model:any = {  };
  fields: FormlyFieldConfig[] = [
    {
      key: 'age',
      type: 'radio',
      props: {
        label: '請問您的實際年齡',
        required: true,
        options: [
          { value: "a", label: '未滿 20 歲/70 歲(含)以上 ' },
          { value: "b", label: '60 歲(含)以上〜70 歲' },
          { value: "c", label: '50 歲(含)以上〜60 歲' },
          { value: "d", label: '40 歲(含)以上〜50 歲' },
          { value: "e", label: '20 歲(含)以上〜40 歲' },
        ],
      }
    },
    {
      key: 'degree',
      type: 'radio',
      props: {
        label: '請問您的教育程度：(如果您選擇 a.或 b.，您的風險屬性將設定為第一級 保守型)',
        required: true,
        options: [
          { value: "a", label: '識字有限' },
          { value: "b", label: '國中(含)以下' },
          { value: "c", label: '高中職' },
          { value: "d", label: '專科/大學' },
          { value: "e", label: '研究所以上' },
        ],
      }
    },
    {
      key: 'annualIncome',
      type: 'radio',
      props: {
        label: '請問您的個人年所得(新台幣元)',
        required: true,
        options: [
          { value: "a", label: '50 萬以下' },
          { value: "b", label: '50 萬(含)〜100 萬' },
          { value: "c", label: '100 萬(含)〜150 萬' },
          { value: "d", label: '150 萬(含)〜200 萬' },
          { value: "e", label: '200 萬(含)以上' },
        ],
      }
    },
    {
      key: 'investmentPurpose',
      type: 'radio',
      props: {
        label: '請問您投資金融商品最主要的考量因素為何？(投資目的)',
        required: true,
        options: [
          { value: "a", label: '保持資產的流動性' },
          { value: "b", label: '保本' },
          { value: "c", label: '賺取固定的利息收益' },
          { value: "d", label: '賺取資本利得(價差) ' },
          { value: "e", label: '追求總投資報酬最大' },
        ],
      }
    },
    {
      key: 'investmentExperience',
      type: 'radio',
      props: {
        label: '請問您的投資經驗為何？(投資經驗-時間)',
        required: true,
        options: [
          { value: "a", label: '沒有經驗' },
          { value: "b", label: '1 〜 3 年' },
          { value: "c", label: '4 〜 6 年' },
          { value: "d", label: '7 〜 9 年' },
          { value: "e", label: '10 年以上' },
        ],
      }
    },
    {
      key: 'investmentProduct',
      type: 'multicheckbox',
      props: {
        label: '請問您曾經投資過那些金融商品(可複選)？(投資經驗-商品)',
        required: true,
        options: [
          { value: "a", label: '台外幣存款、貨幣型基金、儲蓄型保險 ' },
          { value: "b", label: '債券、債券型基金' },
          { value: "c", label: '股票、股票型基金、ETF ' },
          { value: "d", label: '結構型商品、投資型保單' },
          { value: "e", label: '期貨、選擇權或其他衍生性金融商品' },
        ],
      }
    },
    {
      key: 'investmentVolatileProduct',
      type: 'radio',
      props: {
        label: '請問您有多少年投資經驗在具價值波動性之商品(包括股票、共同基金、外幣、結構型投資商品、認(售)購權證、期貨、選擇權及投資型保單) ？(風險評估-偏好)',
        required: true,
        options: [
          { value: "a", label: '沒有經驗' },
          { value: "b", label: '1 〜 3 年' },
          { value: "c", label: '4 〜 6 年' },
          { value: "d", label: '7 〜 9 年' },
          { value: "e", label: '10 年以上' },
        ],
      }
    },
    {
      key: 'investmentRatio',
      type: 'radio',
      props: {
        label: '請問您目前投資之資產中，約有多少比例是持有前述 2.4 所列舉之具價值波動性得商品 ？ (風險評估-偏好)',
        required: true,
        options: [
          { value: "a", label: '0%' },
          { value: "b", label: '介於 0%〜10%(含)' },
          { value: "c", label: '介於 10%〜25%(含) ' },
          { value: "d", label: '介於 25%〜50%(含) ' },
          { value: "e", label: '超過 50%' },
        ],
      }
    },
    {
      key: 'acceptableVolatile',
      type: 'radio',
      props: {
        label: '在一般情況下，您所能接受之價格波動，大約在那種程度？ (風險評估-偏好)',
        required: true,
        options: [
          { value: "a", label: '價格波動介於-5% 〜 +5%之間' },
          { value: "b", label: '價格波動介於-10% 〜 +10%之間' },
          { value: "c", label: '價格波動介於-15% 〜 +15%之間' },
          { value: "d", label: '價格波動介於-20% 〜 +20%之間' },
          { value: "e", label: '價格波動超過±20%' },
        ],
      }
    },
    {
      key: 'affordableVolatile',
      type: 'radio',
      props: {
        label: '假設您有 NT100 萬元之投資組合，請問您可承擔最大本金下跌幅度為何？(風險評估- 承受力) (如果您選擇 a.，您的風險屬性將設定為第一級 保守型)',
        required: true,
        options: [
          { value: "a", label: '0%' },
          { value: "b", label: '-5% ' },
          { value: "c", label: '-10%' },
          { value: "d", label: '-15%' },
          { value: "e", label: '-20%以上' },
        ],
      }
    },
    {
      key: 'lifeImpact',
      type: 'radio',
      props: {
        label: '如您持有之整體投資資產下跌超過 15%，請問對您的生活影響程度為何？(風險評估-承受力)(現金流量期望)',
        required: true,
        options: [
          { value: "a", label: '無法承受' },
          { value: "b", label: '影響程度大' },
          { value: "c", label: '中度影響' },
          { value: "d", label: '影響程度小' },
          { value: "e", label: '沒有影響' },
        ],
      }
    },
    {
      key: 'beyondExpectation',
      type: 'radio',
      props: {
        label: '當您的投資超過預設的停損或停利點時，請問您會採取那種處置方式？(風險評估-偏好) (現金流量期望)',
        required: true,
        options: [
          { value: "a", label: '立即賣出所有部位 ' },
          { value: "b", label: '先賣出一半或一半以上部位' },
          { value: "c", label: '先賣出一半以內部位 ' },
          { value: "d", label: '暫時觀望，視情況再因應 ' },
          { value: "e", label: '繼續持有至回本或不漲為止' },
        ],
      }
    },
    {
      key: 'expectReward',
      type: 'radio',
      props: {
        label: '當您的投資組合預期平均報酬率達到多少時才會考慮賣出？(風險評估) (現金流量期望)',
        required: true,
        options: [
          { value: "a", label: '5%' },
          { value: "b", label: '10%' },
          { value: "c", label: '15%' },
          { value: "d", label: '20%' },
          { value: "e", label: '25%' },
        ],
      }
    },
    {
      key: 'reserveFund',
      type: 'radio',
      props: {
        label: '若有臨時且非預期之事件發生時，請問您的備用金相當於您幾個月的家庭開支？',
        required: true,
        options: [
          { value: "a", label: '無備用金儲蓄 ' },
          { value: "b", label: '3 個月以下' },
          { value: "c", label: '3 個月(含)以上 〜 6 個月' },
          { value: "d", label: '6 個月(含)以上〜9 個月 ' },
          { value: "e", label: '9 個月(含)以上' },
        ],
      }
    },
    {
      key: 'investmentPreference',
      type: 'radio',
      props: {
        label: '請問您偏好以下那類風險及報酬率之投資組合？',
        required: true,
        options: [
          { value: "a", label: '沒有概念 ' },
          { value: "b", label: '絕對低度風險投資組合+穩健保本(低度風險，只要保本就好)' },
          { value: "c", label: '低度風險投資組合+低度回報(低風險承擔下，追求低的投資報酬)' },
          { value: "d", label: '中度風險投資組合+中度回報(在中等風險承擔下，要求中等水準的合理報酬)' },
          { value: "e", label: '高風險投資組合+高度回報(願意承擔高度風險，也期待創造超額報酬)' },
        ],
      }
    },
  ];

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
