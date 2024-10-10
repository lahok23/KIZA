import{u}from"./cartStore-C0_l0_FC.js";import{_ as m,c as r,a as s,F as p,r as h,b as g,w as f,v as _,t as l,d as c,o}from"./index-BcgWTCgo.js";import{_ as k}from"./黃聖安01-D84O23aP.js";const y={data(){return{showModal:!1,selectedProduct:null,quantity:1,purchaseSuccess:!1,products:[{id:1,name:"加禮宛木雕",artist:"卡兆・馬耀",image:"../src/assets/image/加禮宛 木雕 改過.png",description:"加禮宛木雕，達固湖灣被攻破後，二族慘遭滅族，倖存族人逃往縱谷、東海岸，隱身於阿美族之中，直至2007年才正名成功。2006年7月1日，撒奇萊雅族於花蓮市國福部落舉辦首次火神祭，喚醒逝去的靈魂其記取過去。",price:8e4},{id:2,name:"部落的土地",artist:"卡兆・馬耀",image:"../src/assets/image/房子阿美族.jpg",description:"原住民的活動範圍逐漸受限，生活方式也被迫變遷，造成文化的流失，土地的淵源就是人的淵源。光是地名用來辨識當地資源、地貌、地形，族人不失去方向，是祖先們生活時留下來的智慧結晶。",price:6e4},{id:3,name:"母親的祝福",artist:"黃聖安",image:"../src/assets/image/黃聖安01.JPG",description:"阿美族社會是一個典型的母系社會，INA (依娜) 是媽媽，也是太陽，太陽是阿美族的精神象徵。太陽的光是慈祥的，是母親的手，溫暖並守護著族人，母親的角色象徵著生命的延續和大地的豐饒。",price:9e3},{id:4,name:"漁筌工具",artist:"文健站長輩",image:"../src/assets/image/魚筌（阿美族）.png",description:"魚筌為漁撈用編容器的一種，用以從事捕魚活動，該件物品的製作材質為黃藤與竹，用絞織編法縛紮而成，做漏斗狀，功用在於使魚、蝦進入之後無法游出去而被捕獲。",price:1200},{id:5,name:"竹鐘樂器",artist:"達魯·嘎照",image:"../src/assets/image/kakeng截圖.png",description:"竹鐘（Kakeng）是阿美族獨有的樂器之一。傳統阿美族女方取男方時，女方家族為了告知部落家族即將再多增加一位男丁，便以長竹筒管擊地作為報喜訊的方式，日治時期政府以「文明」為名，禁止阿美族招贅的風俗，進而使敲擊竹鐘的傳統消逝。",price:5e3},{id:6,name:"木鼓樂器",artist:"達魯·嘎照",image:"../src/assets/image/木鼓.JPG",description:"過去阿美族人的木鼓是取樟樹或茄苳樹等不易腐爛的樹種，將樹幹挖空成鼓胴，再用繩索懸掛於聚會所，要召集族人時，便用杵棒撞擊使之產生宏亮聲響。族人也會依集合或緊急的狀況，決定敲擊鼓聲的長短與多少為信號，這樣的方式有效地傳遞訊息。",price:4e3}]}},computed:{totalAmount(){return this.selectedProduct?this.quantity*this.selectedProduct.price:0}},methods:{openModal(n){this.selectedProduct=n,this.showModal=!0,this.quantity=1,this.purchaseSuccess=!1},closeModal(){this.showModal=!1},confirmPurchase(){u().addToCart({id:this.selectedProduct.id,name:this.selectedProduct.name,price:this.selectedProduct.price,image:this.selectedProduct.image,quantity:this.quantity}),this.purchaseSuccess=!0,setTimeout(()=>{this.purchaseSuccess=!1,this.showModal=!1},2e3)}}},P={class:"wrap"},v={class:"course"},M={class:"card-image"},b=["src","alt"],S={class:"coursetext"},w={class:"subtitle"},q={class:"price"},x=["onClick"],C={key:0,class:"modal"},A={class:"modal-content"},B={key:0,style:{color:"green"}};function N(n,t,T,V,a,i){return o(),r("div",P,[t[8]||(t[8]=s("div",{class:"banner"},[s("img",{src:k,alt:"tony"}),s("div",{class:"text-banner"},[s("h2",null,"藝術"),s("h1",null,"延續文化脈動的傳承者")])],-1)),s("section",null,[t[5]||(t[5]=s("h2",null,"選擇藝術商品",-1)),s("ul",v,[(o(!0),r(p,null,h(a.products,(e,d)=>(o(),r("li",{key:d,class:"card-item"},[s("div",M,[s("img",{src:e.image,alt:e.name},null,8,b)]),s("ul",null,[s("div",S,[s("h3",null,l(e.name),1),s("p",null,l(e.artist),1)]),t[4]||(t[4]=s("br",null,null,-1)),s("span",w,l(e.description),1),s("li",null,[t[3]||(t[3]=s("a",{href:"#"},"金額",-1)),s("span",q,l(e.price)+"元",1)]),s("button",{class:"btn-filled-dark",onClick:D=>i.openModal(e)},"購買",8,x)])]))),128))])]),a.showModal?(o(),r("div",C,[s("div",A,[t[6]||(t[6]=s("img",{src:g,alt:"logo"},null,-1)),s("span",{class:"close",onClick:t[0]||(t[0]=(...e)=>i.closeModal&&i.closeModal(...e))},"×"),t[7]||(t[7]=s("p",null,"請輸入購買數量:",-1)),f(s("input",{type:"number","onUpdate:modelValue":t[1]||(t[1]=e=>a.quantity=e),min:"1",max:"50"},null,512),[[_,a.quantity]]),s("p",null,"總金額: "+l(i.totalAmount)+"元",1),s("button",{onClick:t[2]||(t[2]=(...e)=>i.confirmPurchase&&i.confirmPurchase(...e)),class:"btn-filled-dark"},"確定"),a.purchaseSuccess?(o(),r("p",B,"購買成功！")):c("",!0)])])):c("",!0)])}const J=m(y,[["render",N],["__scopeId","data-v-d5c2114d"]]);export{J as default};
