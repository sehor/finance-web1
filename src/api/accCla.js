

var allAccClas = [
    { id: '1001', number: '1001', name: '现金', parentId: 'root' },
    { id: '100101', number: '100101', name: '我的现金', parentId: '1001' },
    { id: '10010101', number: '10010101', name: '支付宝', parentId: '100101' },
    { id: '10010102', number: '10010102', name: '微信', parentId: '100101' },

    { id: '2001', number: '1002', name: '债务', parentId: 'root' },
    { id: '200101', number: '200101', name: '不想还', parentId: '2001' },
];

import axios from 'axios'
export default {

    getAll: () => {

        axios({
            baseURL:'http://localhost:8083',
            url:'/AccCla/findAll',
            type:'get'
        }).then(resp=>{
            return resp;
        }).catch(err=>{
            throw err;
        })
    },

    getById: (id) => {

        return allAccClas.find(e => e.id == id)

    },

    deleteById: (id) => {

        let index = allAccClas.findIndex(e => e.id == id)
        allAccClas.splice(index, 1);


    },
    update: (accCla) => {

        let index = allAccClas.findIndex(e => e.id == accCla.id);
        allAccClas.splice(index, 1, accCla)
    },

    add: (accCla) => {

        allAccClas.push(accCla);
    }

}