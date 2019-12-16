

var allAccClas=[
    {id:'1001',number:'1001',name:'现金',parentId:'root',chidlren:[100101]},
    {id:'100101',number:'100101',name:'我的现金',parentId:'1001',chidlren:[{id:'10010101'},{id:'10010102'},]},
    {id:'10010101',number:'10010101',name:'支付宝',parentId:'100101',chidlren:[]},
    {id:'10010102',number:'10010102',name:'微信',parentId:'100101',chidlren:[]},

    {id:'2001',number:'1002',name:'债务',parentId:'root',chidlren:[{id:'20010101'}]},
    {id:'20010101',number:'20010101',name:'不想还',parentId:'20010101',chidlren:[]},
];

export default {

     getAll:()=>{
         setTimeout(() => {
            return allAccClas;
         }, 200);
        
     },

     getById:(id)=>{
         setTimeout(() => {
             return allAccClas.find(e=>e.id==id)
         }, 200);
     },

     deleteById:(id)=>{
         setTimeout(() => {
            let index= allAccClas.findIndex(e=>e.id==id)
            allAccClas.splice(index,1);

         }, 300);
     },
     update:(accCla)=>{
      setTimeout(() => {
          let old=allAccClas.find(e=>e.id==id);
          old=accCla;
      }, 200);
     }
}