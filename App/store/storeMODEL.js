import {refProdutos} from "@/plugins/firebase"




export const state = () => ({
});

export const mutations = {
    // carregarProdutos(){
        
    // // },
    // async carregarProdutosDestaquesMut(state){
    //     state.listaProdutosDestaques = []

    //     await refProdutos.where("destaque", "==", true).get().then(ref =>{

    //         ref.forEach(produto =>{
    //             console.log(produto);
    //             state.listaProdutosDestaques.push(produto.data());

    //         })
    //     });
        
    // }
}

export const actions = {
    carregarProdutosDestaques({commit}){
        commit('carregarProdutosDestaquesMut')
    }
    // addAgendamento({commit}, agendamento){
    //     commit('addAgendamento', agendamento)
    // }
}

export const getters = {
    // agendamento(state){
    //     return state.agendamentoRealizado
    // }
    produtosDestaque(state){
        return state.listaProdutosDestaques;
    }
}

