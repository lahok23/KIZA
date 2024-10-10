import{u as d}from"./cartStore-CH0pxoK0.js";import{_ as m,c as a,a as s,F as p,r as h,b as E,w as f,v as g,t as o,d as c,o as l}from"./index-CHVVbvvo.js";import{_ as A}from"./黃聖安01-CzmbJbkL.js";const B={data(){return{showModal:!1,selectedProduct:null,quantity:1,purchaseSuccess:!1,products:[{id:1,name:"加禮宛木雕",artist:"卡兆・馬耀",image:new URL("/KIZA/assets/%E5%8A%A0%E7%A6%AE%E5%AE%9B%20%E6%9C%A8%E9%9B%95%20%E6%94%B9%E9%81%8E-BuraoJ-I.png",import.meta.url).href,description:"加禮宛木雕，達固湖灣被攻破後，二族慘遭滅族，倖存族人逃往縱谷、東海岸，隱身於阿美族之中，直至2007年才正名成功。2006年7月1日，撒奇萊雅族於花蓮市國福部落舉辦首次火神祭，喚醒逝去的靈魂其記取過去。",price:8e4},{id:2,name:"部落的土地",artist:"卡兆・馬耀",image:new URL("/KIZA/assets/%E6%88%BF%E5%AD%90%E9%98%BF%E7%BE%8E%E6%97%8F-DbBWUWsg.jpg",import.meta.url).href,description:"原住民的活動範圍逐漸受限，生活方式也被迫變遷，造成文化的流失，土地的淵源就是人的淵源。光是地名用來辨識當地資源、地貌、地形，族人不失去方向，是祖先們生活時留下來的智慧結晶。",price:6e4},{id:3,name:"母親的祝福",artist:"黃聖安",image:new URL("/KIZA/assets/%E9%BB%83%E8%81%96%E5%AE%8901-B465nOe9.JPG",import.meta.url).href,description:"阿美族社會是一個典型的母系社會，INA (依娜) 是媽媽，也是太陽，太陽是阿美族的精神象徵。太陽的光是慈祥的，是母親的手，溫暖並守護著族人，母親的角色象徵著生命的延續和大地的豐饒。",price:9e3},{id:4,name:"漁筌工具",artist:"文健站長輩",image:new URL("/KIZA/assets/%E9%AD%9A%E7%AD%8C%EF%BC%88%E9%98%BF%E7%BE%8E%E6%97%8F%EF%BC%89-B1R-Uuoe.png",import.meta.url).href,description:"魚筌為漁撈用編容器的一種，用以從事捕魚活動，該件物品的製作材質為黃藤與竹，用絞織編法縛紮而成，做漏斗狀，功用在於使魚、蝦進入之後無法游出去而被捕獲。",price:1200},{id:5,name:"竹鐘樂器",artist:"達魯·嘎照",image:new URL("/KIZA/assets/kakeng%E6%88%AA%E5%9C%96-CmPeRDnk.png",import.meta.url).href,description:"竹鐘（Kakeng）是阿美族獨有的樂器之一。傳統阿美族女方取男方時，女方家族為了告知部落家族即將再多增加一位男丁，便以長竹筒管擊地作為報喜訊的方式，日治時期政府以「文明」為名，禁止阿美族招贅的風俗，進而使敲擊竹鐘的傳統消逝。",price:5e3},{id:6,name:"木鼓樂器",artist:"達魯·嘎照",image:new URL("/KIZA/assets/%E6%9C%A8%E9%BC%93-CPBScO4u.JPG",import.meta.url).href,description:"過去阿美族人的木鼓是取樟樹或茄苳樹等不易腐爛的樹種，將樹幹挖空成鼓胴，再用繩索懸掛於聚會所，要召集族人時，便用杵棒撞擊使之產生宏亮聲響。族人也會依集合或緊急的狀況，決定敲擊鼓聲的長短與多少為信號，這樣的方式有效地傳遞訊息。",price:4e3}]}},computed:{totalAmount(){return this.selectedProduct?this.quantity*this.selectedProduct.price:0}},methods:{openModal(n){this.selectedProduct=n,this.showModal=!0,this.quantity=1,this.purchaseSuccess=!1},closeModal(){this.showModal=!1},confirmPurchase(){d().addToCart({id:this.selectedProduct.id,name:this.selectedProduct.name,price:this.selectedProduct.price,image:this.selectedProduct.image,quantity:this.quantity}),this.purchaseSuccess=!0,setTimeout(()=>{this.purchaseSuccess=!1,this.showModal=!1},2e3)}}},_={class:"wrap"},C={class:"course"},k={class:"card-image"},P=["src","alt"],w={class:"coursetext"},y={class:"subtitle"},b={class:"price"},v=["onClick"],M={key:0,class:"modal"},S={class:"modal-content"},F={key:0,style:{color:"green"}};function I(n,e,U,R,i,r){return l(),a("div",_,[e[8]||(e[8]=s("div",{class:"banner"},[s("img",{src:A,alt:"tony"}),s("div",{class:"text-banner"},[s("h2",null,"藝術"),s("h1",null,"延續文化脈動的傳承者")])],-1)),s("section",null,[e[5]||(e[5]=s("h2",null,"選擇藝術商品",-1)),s("ul",C,[(l(!0),a(p,null,h(i.products,(t,u)=>(l(),a("li",{key:u,class:"card-item"},[s("div",k,[s("img",{src:t.image,alt:t.name},null,8,P)]),s("ul",null,[s("div",w,[s("h3",null,o(t.name),1),s("p",null,o(t.artist),1)]),e[4]||(e[4]=s("br",null,null,-1)),s("span",y,o(t.description),1),s("li",null,[e[3]||(e[3]=s("a",{href:"#"},"金額",-1)),s("span",b,o(t.price)+"元",1)]),s("button",{class:"btn-filled-dark",onClick:q=>r.openModal(t)},"購買",8,v)])]))),128))])]),i.showModal?(l(),a("div",M,[s("div",S,[e[6]||(e[6]=s("img",{src:E,alt:"logo"},null,-1)),s("span",{class:"close",onClick:e[0]||(e[0]=(...t)=>r.closeModal&&r.closeModal(...t))},"×"),e[7]||(e[7]=s("p",null,"請輸入購買數量:",-1)),f(s("input",{type:"number","onUpdate:modelValue":e[1]||(e[1]=t=>i.quantity=t),min:"1",max:"50"},null,512),[[g,i.quantity]]),s("p",null,"總金額: "+o(r.totalAmount)+"元",1),s("button",{onClick:e[2]||(e[2]=(...t)=>r.confirmPurchase&&r.confirmPurchase(...t)),class:"btn-filled-dark"},"確定"),i.purchaseSuccess?(l(),a("p",F,"購買成功！")):c("",!0)])])):c("",!0)])}const L=m(B,[["render",I],["__scopeId","data-v-48c23deb"]]);export{L as default};
