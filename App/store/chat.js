

export const state = () => ({
    chatOpen: false,
    chatId: ''
});

export const mutations = {
    alterarEstado(state, payload){
        console.log("Estado settado como", payload.chatOpen);

        state.chatOpen = payload.chatOpen
        state.chatId = payload.chatId
    },
    setEstado(state, payload){
        console.log("Estado settado como", payload);
        state.chatOpen = payload
    }
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
    alterarEstado({commit}, payload){
        commit('alterarEstado', payload)
    },
    setEstado({commit}, payload){
        commit('setEstado', payload)
    }
  
}

export const getters = {
   
    getEstado(state){
        return state.chatOpen;
    },
    getChatId(state){
        return state.chatId;
    }
}

