<template>
    <div>
      <div class="selCountry" style="border: 1px solid #CCC;width: 250px;height:35px;">
        <div style="display: flex;padding-left:10px;" @click="dispList">
          <div style="margin-top:2px;font-size: 24px;">
            {{selectedCountry.e}}
          </div>
          <div ref="arrow" style="width: 10px; height: 35px;line-height: 35px;font-size:10px;
          opacity:0.6;transform: scaleY(.6);">{{arrowText}}</div>
          <div style="margin-left:10px;line-height: 35px;height: 35px;font-size: 14px;">
            {{selectedCountry.n}}
            <template v-if="selectedCountry.l != ''">({{selectedCountry.l}})</template>
          </div>
        </div>
      </div>
  
      <div ref="countryList" style="display: none;">
       <ul class="country-list" style="font-size:14px;list-style: none;text-align: left;">
         <li class="oneCountry">
           <input style="width:240px;height:20px;" ref="searchKey" type="text" placeholder="搜索国家或地区" @input="search" />
         </li>
                <template v-for="(item,index) in countryAll" :key="index">
                  <template v-if="item.t==0">
                  <li class="divider"></li>
                  </template>
                  <template v-else>
                  <li class="oneCountry" @click="selectCountry(item.c)"  >
                    <div style="display: flex;">
                      <div style="font-size: 24px;">{{item.e}}</div>
                      <div>{{item.n}}
                        <template v-if="item.l != ''">({{item.l}})</template>
                      </div>
                    </div>
                  </li>
                  </template>
                </template>
       </ul>
      </div>
    </div>
  </template>
  
  <script>
  import {onMounted, ref} from "vue"
  export default {
    name: "CountrySelect",
    props:['selected','top'],   //selected:默认选中的国家或地区, top:推荐的国家或地区:多个时用半角逗号隔开
    setup (props) {
      //全部国家或地区的容器
      const countryAll = ref([]);
      //初始化国家或地区
      let countrysOrigin = [
        {c:'ad',n:'Andorra',l:'',e:'🇦🇩',d:'+376',},
        {c:'ae',n:'United Arab Emirates ',l:'الإمارات العربية المتحدة',e:'🇦🇪',d:'+971'},
        {c:'af',n:'Afghanistan ',l:'افغانستان',e:'🇦🇫',d:'+93'},
        {c:'ag',n:'Antigua and Barbuda',l:'',e:'🇦🇬',d:'+1268'},
        {c:'ai',n:'Anguilla',l:'',e:'🇦🇮',d:'+1 264'},
        {c:'al',n:'Albania ',l:'Shqipëri',e:'🇦🇱',d:'+355'},
        {c:'am',n:'Armenia ',l:'Հայաստան',e:'🇦🇲',d:'+374'},
        {c:'ao',n:'Angola',l:'',e:'🇦🇴',d:'+244'},
        {c:'ar',n:'Argentina',l:'',e:'🇦🇷',d:'+54'},
        {c:'as',n:'American Samoa',l:'',e:'🇦🇸',d:'+1 684'},
        {c:'at',n:'Austria ',l:'Österreich',e:'🇦🇹',d:'+43'},
        {c:'au',n:'Australia',l:'',e:'🇦🇺',d:'+61'},
        {c:'aw',n:'Aruba',l:'',e:'🇦🇼',d:'+297'},
        {c:'ax',n:'Åland Islands ',l:'Åland',e:'🇦🇽',d:''},
        {c:'az',n:'Azerbaijan ',l:'Azərbaycan',e:'🇦🇿',d:'+994'},
        {c:'ba',n:'Bosnia and Herzegovina ',l:'Босна и Херцеговина',e:'🇧🇦',d:'+387'},
        {c:'bb',n:'Barbados',l:'',e:'🇧🇧',d:'+1 246'},
        {c:'bd',n:'Bangladesh ',l:'বাংলাদেশ',e:'🇧🇩',d:'+880'},
        {c:'be',n:'Belgium ',l:'België',e:'🇧🇪',d:'+32'},
        {c:'bf',n:'Burkina Faso',l:'',e:'🇧🇫',d:'+226'},
        {c:'bg',n:'Bulgaria ',l:'България',e:'🇧🇬',d:'+359'},
        {c:'bh',n:'Bahrain ',l:'البحرين',e:'🇧🇭',d:'+973'},
        {c:'bi',n:'Burundi ',l:'Uburundi',e:'🇧🇮',d:'+257'},
        {c:'bj',n:'Benin ',l:'Bénin',e:'🇧🇯',d:'+229'},
        {c:'bl',n:'Saint Barthélemy ',l:'Saint-Barthélemy',e:'🇧🇱',d:'+590'},
        {c:'bm',n:'Bermuda',l:'',e:'🇧🇲',d:'+1 441'},
        {c:'bn',n:'Brunei',l:'',e:'🇧🇳',d:'+673'},
        {c:'bo',n:'Bolivia',l:'',e:'🇧🇴',d:'+591'},
        {c:'bq',n:'Caribbean Netherlands',l:'',e:'🇧🇶',d:''},
        {c:'br',n:'Brazil ',l:'Brasil',e:'🇧🇷',d:'+55'},
        {c:'bs',n:'Bahamas',l:'',e:'🇧🇸',d:'+1 242'},
        {c:'bt',n:'Bhutan ',l:'འབྲུག',e:'🇧🇹',d:'+975'},
        {c:'bw',n:'Botswana',l:'',e:'🇧🇼',d:'+267'},
        {c:'by',n:'Belarus ',l:'Беларусь',e:'🇧🇾',d:'+375'},
        {c:'bz',n:'Belize',l:'',e:'🇧🇿',d:'+501'},
        {c:'ca',n:'Canada',l:'',e:'🇨🇦',d:'+1'},
        {c:'cc',n:'Cocos ',l:'Keeling Islands ',e:'🇨🇨',d:'+61'},
        {c:'cd',n:'Congo ',l:'DRC ',e:'🇨🇩',d:'+243'},
        {c:'cf',n:'Central African Republic ',l:'République Centrafricaine',e:'🇨🇫',d:'+236'},
        {c:'cg',n:'Congo ',l:'Republic ',e:'🇨🇬',d:'+242'},
        {c:'ch',n:'Switzerland ',l:'Schweiz',e:'🇨🇭',d:'+41'},
        {c:'ci',n:'Côte d’Ivoire',l:'',e:'🇨🇮',d:'+225'},
        {c:'ck',n:'Cook Islands',l:'',e:'🇨🇰',d:'+682'},
        {c:'cl',n:'Chile',l:'',e:'🇨🇱',d:'+56'},
        {c:'cm',n:'Cameroon ',l:'Cameroun',e:'🇨🇲',d:'+237'},
        {c:'cn',n:'China ',l:'中国',e:'🇨🇳',d:'+86',r:'zh,zhongguo'},
        {c:'co',n:'Colombia',l:'',e:'🇨🇴',d:'+57'},
        {c:'cr',n:'Costa Rica',l:'',e:'🇨🇷',d:'+506'},
        {c:'cu',n:'Cuba',l:'',e:'🇨🇺',d:'+53'},
        {c:'cv',n:'Cape Verde ',l:'Kabu Verdi',e:'🇨🇻',d:'+238'},
        {c:'cw',n:'Curaçao',l:'',e:'🇨🇼',d:''},
        {c:'cx',n:'Christmas Island',l:'',e:'🇨🇽',d:'+61'},
        {c:'cy',n:'Cyprus ',l:'Κύπρος',e:'🇨🇾',d:'+537'},
        {c:'cz',n:'Czech Republic ',l:'Česká republika',e:'🇨🇿',d:'+420'},
        {c:'de',n:'Germany ',l:'Deutschland',e:'🇩🇪',d:'+49'},
        {c:'dj',n:'Djibouti',l:'',e:'🇩🇯',d:'+253'},
        {c:'dk',n:'Denmark ',l:'Danmark',e:'🇩🇰',d:'+45'},
        {c:'dm',n:'Dominica',l:'',e:'🇩🇲',d:'+1 767'},
        {c:'do',n:'Dominican Republic ',l:'República Dominicana',e:'🇩🇴',d:'+1 849'},
        {c:'dz',n:'Algeria ',l:'الجزائر',e:'🇩🇿',d:'+213'},
        {c:'ec',n:'Ecuador',l:'',e:'🇪🇨',d:'+593'},
        {c:'ee',n:'Estonia ',l:'Eesti',e:'🇪🇪',d:'+372'},
        {c:'eg',n:'Egypt ',l:'مصر',e:'🇪🇬',d:'+20'},
        {c:'eh',n:'Western Sahara ',l:'الصحراء الغربية',e:'🇪🇭',d:''},
        {c:'er',n:'Eritrea',l:'',e:'🇪🇷',d:'+291'},
        {c:'es',n:'Spain ',l:'España',e:'🇪🇸',d:'+34'},
        {c:'et',n:'Ethiopia',l:'',e:'🇪🇹',d:'+251'},
        {c:'fi',n:'Finland ',l:'Suomi',e:'🇫🇮',d:'+358'},
        {c:'fj',n:'Fiji',l:'',e:'🇫🇯',d:'+679'},
        {c:'fk',n:'Falkland Islands ',l:'Islas Malvinas',e:'🇫🇰',d:'+500'},
        {c:'fm',n:'Micronesia',l:'',e:'🇫🇲',d:'+691'},
        {c:'fo',n:'Faroe Islands ',l:'Føroyar',e:'🇫🇴',d:'+298'},
        {c:'fr',n:'France',l:'',e:'🇫🇷',d:'+33'},
        {c:'ga',n:'Gabon',l:'',e:'🇬🇦',d:'+241'},
        {c:'gb',n:'United Kingdom',l:'',e:'🇬🇧',d:'+44',r:'uk,Britain,england'},
        {c:'gd',n:'Grenada',l:'',e:'🇬🇩',d:'+1 473'},
        {c:'ge',n:'Georgia ',l:'საქართველო',e:'🇬🇪',d:'+995'},
        {c:'gf',n:'French Guiana ',l:'Guyane française',e:'🇬🇫',d:'+594'},
        {c:'gg',n:'Guernsey',l:'',e:'🇬🇬',d:'+44'},
        {c:'gh',n:'Ghana ',l:'Gaana',e:'🇬🇭',d:'+233'},
        {c:'gi',n:'Gibraltar',l:'',e:'🇬🇮',d:'+350'},
        {c:'gl',n:'Greenland ',l:'Kalaallit Nunaat',e:'🇬🇱',d:'+299'},
        {c:'gm',n:'Gambia',l:'',e:'🇬🇲',d:'+220'},
        {c:'gn',n:'Guinea ',l:'Guinée',e:'🇬🇳',d:'+224'},
        {c:'gp',n:'Guadeloupe',l:'',e:'🇬🇵',d:'+590'},
        {c:'gq',n:'Equatorial Guinea ',l:'Guinea Ecuatorial',e:'🇬🇶',d:'+240'},
        {c:'gr',n:'Greece ',l:'Ελλάδα',e:'🇬🇷',d:'+30'},
        {c:'gs',n:'South Georgia & South Sandwich Islands',l:'',e:'🇬🇸',d:'+500'},
        {c:'gt',n:'Guatemala',l:'',e:'🇬🇹',d:'+502'},
        {c:'gu',n:'Guam',l:'',e:'🇬🇺',d:'+1 671'},
        {c:'gw',n:'Guinea-Bissau ',l:'Guiné Bissau',e:'🇬🇼',d:'+245'},
        {c:'gy',n:'Guyana',l:'',e:'🇬🇾',d:'+595'},
        {c:'hk',n:'Hong Kong ',l:'香港',e:'🇭🇰',d:'+852'},
        {c:'hn',n:'Honduras',l:'',e:'🇭🇳',d:'+504'},
        {c:'hr',n:'Croatia ',l:'Hrvatska',e:'🇭🇷',d:'+385'},
        {c:'ht',n:'Haiti',l:'',e:'🇭🇹',d:'+509'},
        {c:'hu',n:'Hungary ',l:'Magyarország',e:'🇭🇺',d:'+36'},
        {c:'id',n:'Indonesia',l:'',e:'🇮🇩',d:'+62'},
        {c:'ie',n:'Ireland',l:'',e:'🇮🇪',d:'+353'},
        {c:'il',n:'Israel ',l:'ישראל',e:'🇮🇱',d:'+972'},
        {c:'im',n:'Isle of Man',l:'',e:'🇮🇲',d:'+44'},
        {c:'in',n:'India ',l:'भारत',e:'🇮🇳',d:'+91'},
        {c:'io',n:'British Indian Ocean Territory',l:'',e:'🇮🇴',d:'+246'},
        {c:'iq',n:'Iraq ',l:'العراق',e:'🇮🇶',d:'+964'},
        {c:'ir',n:'Iran ',l:'ایران',e:'🇮🇷',d:'+98'},
        {c:'is',n:'Iceland ',l:'Ísland',e:'🇮🇸',d:'+354'},
        {c:'it',n:'Italy ',l:'Italia',e:'🇮🇹',d:'+39'},
        {c:'je',n:'Jersey',l:'',e:'🇯🇪',d:'+44'},
        {c:'jm',n:'Jamaica',l:'',e:'🇯🇲',d:'+1 876'},
        {c:'jo',n:'Jordan ',l:'الأردن',e:'🇯🇴',d:'+962'},
        {c:'jp',n:'Japan ',l:'日本',e:'🇯🇵',d:'+81'},
        {c:'ke',n:'Kenya',l:'',e:'🇰🇪',d:'+254'},
        {c:'kg',n:'Kyrgyzstan ',l:'Кыргызстан',e:'🇰🇬',d:'+996'},
        {c:'kh',n:'Cambodia ',l:'កម្ពុជា',e:'🇰🇭',d:'+855'},
        {c:'ki',n:'Kiribati',l:'',e:'🇰🇮',d:'+686'},
        {c:'km',n:'Comoros ',l:'جزر القمر',e:'🇰🇲',d:'+269'},
        {c:'kn',n:'Saint Kitts and Nevis',l:'',e:'🇰🇳',d:'+1 869'},
        {c:'kp',n:'North Korea ',l:'조선 민주주의 인민 공화국',e:'🇰🇵',d:'+850'},
        {c:'kr',n:'South Korea ',l:'대한민국',e:'🇰🇷',d:'+82'},
        {c:'kw',n:'Kuwait ',l:'الكويت',e:'🇰🇼',d:'+965'},
        {c:'ky',n:'Cayman Islands',l:'',e:'🇰🇾',d:'+ 345'},
        {c:'kz',n:'Kazakhstan ',l:'Казахстан',e:'🇰🇿',d:'+7 7'},
        {c:'la',n:'Laos ',l:'ລາວ',e:'🇱🇦',d:'+856'},
        {c:'lb',n:'Lebanon ',l:'لبنان',e:'🇱🇧',d:'+961'},
        {c:'lc',n:'Saint Lucia',l:'',e:'🇱🇨',d:'+1 758'},
        {c:'li',n:'Liechtenstein',l:'',e:'🇱🇮',d:'+423'},
        {c:'lk',n:'Sri Lanka ',l:'ශ්රී ලංකාව',e:'🇱🇰',d:'+94'},
        {c:'lr',n:'Liberia',l:'',e:'🇱🇷',d:'+231'},
        {c:'ls',n:'Lesotho',l:'',e:'🇱🇸',d:'+266'},
        {c:'lt',n:'Lithuania ',l:'Lietuva',e:'🇱🇹',d:'+370'},
        {c:'lu',n:'Luxembourg',l:'',e:'🇱🇺',d:'+352'},
        {c:'lv',n:'Latvia ',l:'Latvija',e:'🇱🇻',d:'+371'},
        {c:'ly',n:'Libya ',l:'ليبيا',e:'🇱🇾',d:'+218'},
        {c:'ma',n:'Morocco ',l:'المغرب',e:'🇲🇦',d:'+212'},
        {c:'mc',n:'Monaco',l:'',e:'🇲🇨',d:'+377'},
        {c:'md',n:'Moldova ',l:'Republica Moldova',e:'🇲🇩',d:'+373'},
        {c:'me',n:'Montenegro ',l:'Crna Gora',e:'🇲🇪',d:'+382'},
        {c:'mf',n:'Saint Martin ',l:'Saint-Martin ',e:'🇲🇫',d:'+590'},
        {c:'mg',n:'Madagascar ',l:'Madagasikara',e:'🇲🇬',d:'+261'},
        {c:'mh',n:'Marshall Islands',l:'',e:'🇲🇭',d:'+692'},
        {c:'mk',n:'Macedonia ',l:'FYROM ',e:'🇲🇰',d:'+389'},
        {c:'ml',n:'Mali',l:'',e:'🇲🇱',d:'+223'},
        {c:'mm',n:'Myanmar ',l:'Burma ',e:'🇲🇲',d:'+95'},
        {c:'mn',n:'Mongolia ',l:'Монгол',e:'🇲🇳',d:'+976'},
        {c:'mo',n:'Macau ',l:'澳門',e:'🇲🇴',d:'+853'},
        {c:'mp',n:'Northern Mariana Islands',l:'',e:'🇲🇵',d:'+1 670'},
        {c:'mq',n:'Martinique',l:'',e:'🇲🇶',d:'+596'},
        {c:'mr',n:'Mauritania ',l:'موريتانيا',e:'🇲🇷',d:'+222'},
        {c:'ms',n:'Montserrat',l:'',e:'🇲🇸',d:'+1664'},
        {c:'mt',n:'Malta',l:'',e:'🇲🇹',d:'+356'},
        {c:'mu',n:'Mauritius ',l:'Moris',e:'🇲🇺',d:'+230'},
        {c:'mv',n:'Maldives',l:'',e:'🇲🇻',d:'+960'},
        {c:'mw',n:'Malawi',l:'',e:'🇲🇼',d:'+265'},
        {c:'mx',n:'Mexico ',l:'México',e:'🇲🇽',d:'+52'},
        {c:'my',n:'Malaysia',l:'',e:'🇲🇾',d:'+60'},
        {c:'mz',n:'Mozambique ',l:'Moçambique',e:'🇲🇿',d:'+258'},
        {c:'na',n:'Namibia ',l:'Namibië',e:'🇳🇦',d:'+264'},
        {c:'nc',n:'New Caledonia ',l:'Nouvelle-Calédonie',e:'🇳🇨',d:'+687'},
        {c:'ne',n:'Niger ',l:'Nijar',e:'🇳🇪',d:'+227'},
        {c:'nf',n:'Norfolk Island',l:'',e:'🇳🇫',d:'+672'},
        {c:'ng',n:'Nigeria',l:'',e:'🇳🇬',d:'+234'},
        {c:'ni',n:'Nicaragua',l:'',e:'🇳🇮',d:'+505'},
        {c:'nl',n:'Netherlands ',l:'Nederland',e:'🇳🇱',d:'+31'},
        {c:'no',n:'Norway ',l:'Norge',e:'🇳🇴',d:'+47'},
        {c:'np',n:'Nepal ',l:'नेपाल',e:'🇳🇵',d:'+977'},
        {c:'nr',n:'Nauru',l:'',e:'🇳🇷',d:'+674'},
        {c:'nu',n:'Niue',l:'',e:'🇳🇺',d:'+683'},
        {c:'nz',n:'New Zealand',l:'',e:'🇳🇿',d:'+64'},
        {c:'om',n:'Oman ',l:'عُمان',e:'🇴🇲',d:'+968'},
        {c:'pa',n:'Panama ',l:'Panamá',e:'🇵🇦',d:'+507'},
        {c:'pe',n:'Peru ',l:'Perú',e:'🇵🇪',d:'+51'},
        {c:'pf',n:'French Polynesia ',l:'Polynésie française',e:'🇵🇫',d:'+689'},
        {c:'pg',n:'Papua New Guinea',l:'',e:'🇵🇬',d:'+675'},
        {c:'ph',n:'Philippines',l:'',e:'🇵🇭',d:'+63'},
        {c:'pk',n:'Pakistan ',l:'پاکستان',e:'🇵🇰',d:'+92'},
        {c:'pl',n:'Poland ',l:'Polska',e:'🇵🇱',d:'+48'},
        {c:'pm',n:'Saint Pierre and Miquelon ',l:'Saint-Pierre-et-Miquelon',e:'🇵🇲',d:'+508'},
        {c:'pn',n:'Pitcairn Islands',l:'',e:'🇵🇳',d:'+872'},
        {c:'pr',n:'Puerto Rico',l:'',e:'🇵🇷',d:'+1 939'},
        {c:'ps',n:'Palestine ',l:'فلسطين',e:'🇵🇸',d:'+970'},
        {c:'pt',n:'Portugal',l:'',e:'🇵🇹',d:'+351'},
        {c:'pw',n:'Palau',l:'',e:'🇵🇼',d:'+680'},
        {c:'py',n:'Paraguay',l:'',e:'🇵🇾',d:'+595'},
        {c:'qa',n:'Qatar ',l:'قطر',e:'🇶🇦',d:'+974'},
        {c:'re',n:'Réunion ',l:'La Réunion',e:'🇷🇪',d:'+262'},
        {c:'ro',n:'Romania ',l:'România',e:'🇷🇴',d:'+40'},
        {c:'rs',n:'Serbia ',l:'Србија',e:'🇷🇸',d:'+381'},
        {c:'ru',n:'Russia ',l:'Россия',e:'🇷🇺',d:'+7'},
        {c:'rw',n:'Rwanda',l:'',e:'🇷🇼',d:'+250'},
        {c:'sa',n:'Saudi Arabia ',l:'المملكة العربية السعودية',e:'🇸🇦',d:'+966'},
        {c:'sb',n:'Solomon Islands',l:'',e:'🇸🇧',d:'+677'},
        {c:'sc',n:'Seychelles',l:'',e:'🇸🇨',d:'+248'},
        {c:'sd',n:'Sudan ',l:'السودان',e:'🇸🇩',d:'+249'},
        {c:'se',n:'Sweden ',l:'Sverige',e:'🇸🇪',d:'+46'},
        {c:'sg',n:'Singapore',l:'',e:'🇸🇬',d:'+65'},
        {c:'sh',n:'Saint Helena',l:'',e:'🇸🇭',d:'+290'},
        {c:'si',n:'Slovenia ',l:'Slovenija',e:'🇸🇮',d:'+386'},
        {c:'sj',n:'Svalbard and Jan Mayen ',l:'Svalbard og Jan Mayen',e:'🇸🇯',d:'+47'},
        {c:'sk',n:'Slovakia ',l:'Slovensko',e:'🇸🇰',d:'+421'},
        {c:'sl',n:'Sierra Leone',l:'',e:'🇸🇱',d:'+232'},
        {c:'sm',n:'San Marino',l:'',e:'🇸🇲',d:'+378'},
        {c:'sn',n:'Senegal ',l:'Sénégal',e:'🇸🇳',d:'+221'},
        {c:'so',n:'Somalia ',l:'Soomaaliya',e:'🇸🇴',d:'+252'},
        {c:'sr',n:'Suriname',l:'',e:'🇸🇷',d:'+597'},
        {c:'ss',n:'South Sudan ',l:'جنوب السودان',e:'🇸🇸',d:''},
        {c:'st',n:'São Tomé and Príncipe ',l:'São Tomé e Príncipe',e:'🇸🇹',d:'+239'},
        {c:'sv',n:'El Salvador',l:'',e:'🇸🇻',d:'+503'},
        {c:'sx',n:'Sint Maarten',l:'',e:'🇸🇽',d:''},
        {c:'sy',n:'Syria ',l:'سوريا',e:'🇸🇾',d:'+963'},
        {c:'sz',n:'Swaziland',l:'',e:'🇸🇿',d:'+268'},
        {c:'tc',n:'Turks and Caicos Islands',l:'',e:'🇹🇨',d:'+1 649'},
        {c:'td',n:'Chad ',l:'Tchad',e:'🇹🇩',d:'+235'},
        {c:'tg',n:'Togo',l:'',e:'🇹🇬',d:'+228'},
        {c:'th',n:'Thailand ',l:'ไทย',e:'🇹🇭',d:'+66'},
        {c:'tj',n:'Tajikistan',l:'',e:'🇹🇯',d:'+992'},
        {c:'tk',n:'Tokelau',l:'',e:'🇹🇰',d:'+690'},
        {c:'tl',n:'Timor-Leste',l:'',e:'🇹🇱',d:'+670'},
        {c:'tm',n:'Turkmenistan',l:'',e:'🇹🇲',d:'+993'},
        {c:'tn',n:'Tunisia ',l:'تونس',e:'🇹🇳',d:'+216'},
        {c:'to',n:'Tonga',l:'',e:'🇹🇴',d:'+676'},
        {c:'tr',n:'Turkey ',l:'Türkiye',e:'🇹🇷',d:'+90'},
        {c:'tt',n:'Trinidad and Tobago',l:'',e:'🇹🇹',d:'+1 868'},
        {c:'tv',n:'Tuvalu',l:'',e:'🇹🇻',d:'+688'},
        {c:'tw',n:'Taiwan ',l:'台灣',e:'🇹🇼',d:'+886'},
        {c:'tz',n:'Tanzania',l:'',e:'🇹🇿',d:'+255'},
        {c:'ua',n:'Ukraine ',l:'Україна',e:'🇺🇦',d:'+380'},
        {c:'ug',n:'Uganda',l:'',e:'🇺🇬',d:'+256'},
        {c:'um',n:'U.S. Minor Outlying Islands',l:'',e:'🇺🇲',d:''},
        {c:'us',n:'United States',l:'',e:'🇺🇸',d:'+1',r:'usa,america'},
        {c:'uy',n:'Uruguay',l:'',e:'🇺🇾',d:'+598'},
        {c:'uz',n:'Uzbekistan ',l:'Oʻzbekiston',e:'🇺🇿',d:'+998'},
        {c:'va',n:'Vatican City ',l:'Città del Vaticano',e:'🇻🇦',d:'+379'},
        {c:'vc',n:'Saint Vincent and the Grenadines',l:'',e:'🇻🇨',d:'+1 784'},
        {c:'ve',n:'Venezuela',l:'',e:'🇻🇪',d:'+58'},
        {c:'vg',n:'British Virgin Islands',l:'',e:'🇻🇬',d:'+1 284'},
        {c:'vi',n:'U.S. Virgin Islands',l:'',e:'🇻🇮',d:'+1 340'},
        {c:'vn',n:'Vietnam ',l:'Việt Nam',e:'🇻🇳',d:'+84'},
        {c:'vu',n:'Vanuatu',l:'',e:'🇻🇺',d:'+678'},
        {c:'wf',n:'Wallis and Futuna',l:'',e:'🇼🇫',d:'+681'},
        {c:'ws',n:'Samoa',l:'',e:'🇼🇸',d:'+685'},
        {c:'xk',n:'Kosovo ',l:'Kosovë',e:'🇽🇰',d:'+383'},
        {c:'ye',n:'Yemen ',l:'اليمن',e:'🇾🇪',d:'+967'},
        {c:'yt',n:'Mayotte',l:'',e:'🇾🇹',d:'+262'},
        {c:'za',n:'South Africa',l:'',e:'🇿🇦',d:'+27'},
        {c:'zm',n:'Zambia',l:'',e:'🇿🇲',d:'+260'},
        {c:'zw',n:'Zimbabwe',l:'',e:'🇿🇼',d:'+263'},
      ];
  
      countryAll.value = countrysOrigin;
  
      //默认选中的国家或地区
      const selectedCountry = ref([]);
      //根据code得到country对象
      const selectCountry = (code) => {
        selectedCountry.value = getSelectedCountry(code);
        countryList.value.style.display = 'none'
        arrowText.value = ""
      }
  
      //根据code得到国家或地区信息
      const getSelectedCountry = (code) => {
        let len = countrysOrigin.length;
        console.log("当前length:"+len);
        for (let i = 0; i < len; i++) {
          let one = countrysOrigin[i];
          if (one.t != undefined && (one.t == '0' || one.t == '1')) {
            console.log(one);
            continue;
          } else {
              if (one.c == code) {
                return one;
              }
          }
        }
        return null;
      }
      //页面上的国家或地区列表div
      const countryList = ref(null);
      //显示或隐藏国家或地区列表div
      const dispList = () => {
        if (countryList.value.style.display == 'none') {
          countryList.value.style.display = ''
          arrowText.value = ""
        } else {
          countryList.value.style.display = 'none'
          arrowText.value = ""
        }
      }
  
      //输入框
      const searchKey = ref(null);
  
      //搜索
      const search  = () => {
          let key = searchKey.value.value;
          let countryRes = [];
          if (key == '') {
            countryAll.value = countrysOrigin;
          } else {
            let len = countrysOrigin.length;
            for (let i = 0; i < len; i++) {
                let one = countrysOrigin[i];
                if (one.t != undefined && (one.t == '0' || one.t == '1')) {
                    console.log(one);
                    continue;
                } else {
                  let str = one.c+"_"+one.n+"_"+one.e+"_"+one.l;
                  if (one.r != undefined) {
                    str+="_"+one.r;
                  }
                  if (str.toLowerCase().indexOf(key) != -1) {
                    countryRes.push(one);
                  }
                }
            }
            countryAll.value = countryRes;
          }
          console.log(countryAll.value);
      }
  
      //默认的箭头
      const arrowText = ref("▼");
  
      //页面加载后执行，根据组件的参数得到默认选中的国家或地区和推荐的国家或地区
      onMounted(() => {
        //接收到父组件调用时的参数
         selectCountry(props.selected);
         let arr = props.top.split(',');
         let arrLen = arr.length;
         if (arrLen > 0) {
           let divider = {t:'0'};
           countrysOrigin.unshift(divider);
           for (let i=arrLen-1;i>=0;i--) {
             let code = arr[i];
             let countryOne = getSelectedCountry(code);
             let { ...countryCopy } = countryOne
             countryCopy.t = '1';
             if (countryOne != null) {
               countrysOrigin.unshift(countryCopy);
             }
           }
         }
         countryAll.value = countrysOrigin;
      })
  
      return {
        countryAll,
        selectCountry,
        dispList,
        countryList,
        searchKey,
        search,
        arrowText,
        //选中的国家或地区
        selectedCountry,
      }
    }
  }
  </script>
  
  <style scoped>
  .divider {
    padding-bottom: 5px;
    margin-bottom: 5px;
    border-bottom: 1px solid #ccc;
  }
  .country-list {
    position: absolute;
    z-index: 2;
    list-style: none;
    text-align: left;
    padding: 0;
    margin: 0 0 0 -1px;
    -webkit-box-shadow: 1px 1px 4px rgb(0 0 0 / 20%);
    box-shadow: 1px 1px 4px rgb(0 0 0 / 20%);
    background-color: white;
    border: 1px solid #ccc;
    white-space: nowrap;
    max-height: 200px;
    overflow-y: scroll;
    width:390px;
  }
  .oneCountry {
    padding: 1px 10px;
    height:35px;
    line-height: 35px;
  }
  .oneCountry:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  .selCountry:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  .arrow {
    position: absolute;
    top: 50%;
    margin-top: -2px;
    right: 6px;
    width: 0;
    height: 0;
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
    border-top: 4px solid #555;
  }
  </style>