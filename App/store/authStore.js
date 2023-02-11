import {auth, refUsers} from "@/plugins/firebase"
// import createPersistedState from 'vuex-persistedstate'

export const state = () => ({
    userProfile: null,
    loginError: null,
    loading: false,
    diaAtual: new Date().getDate(),
    
    //permisao1 = hash md5
    permissoes: {
      '506481A50E6CEDDED6C48B52CAB9A2A9' : 1, // md5 de permissao 1 // usuario comum
      '7F2CB9F1C1E54E71000175B5BDD2ADD0' : 2, //permissao 2 // usuario pago
      '5A1017C0D03F3B3A2FC48D30027AA71B' : 3, //permissao 3 // gestor
      '4A3BB12B0552F49A6BE92431FE2A1231' : 4, //permissao 4
      'EB64284B81296A3D0B08D7925A9E09D9' : 5, //permissao 5 // admin sistema
    },
    permissoesList:[ 
      {label: '1 - Usuário comum', permissao: '506481A50E6CEDDED6C48B52CAB9A2A9'}, // md5 de permissao 1
      {label: '2 - Usuário premium', permissao: '7F2CB9F1C1E54E71000175B5BDD2ADD0'}, //permissao 2 // barbeiro
      {label: '3 - Gestor site', permissao: '5A1017C0D03F3B3A2FC48D30027AA71B'}, //permissao 3 // gestor
      {label: '4 - A definir', permissao: '4A3BB12B0552F49A6BE92431FE2A1231'}, //permissao 4
      {label: '5 - Admin sistema', permissao: 'EB64284B81296A3D0B08D7925A9E09D9'}, //permissao 5 // admin sistema
    ]
});

export const mutations = {
    setUser(state, val){
        
        state.userProfile = val;

    },
    
    setError(state, payload){
        state.loginError = payload;
      },
      
      resetError(state){
        state.loginError = null;
      },
     
      changeLoading(state, payload){
        state.loading = payload
      },
      
      logoutUser(state){

         state.userProfile = null;
         window.localStorage.removeItem("vuex")
         console.log("logout");
         document.location.reload()
      }
}

export const actions = {
    setUser({commit}, payload){

        commit('setUser', payload)
    },
    // async login({commit}, usuario){
        
    //     refUsers.where("email", "=").get().then(snap =>{
    //     console.log("quantidade de snaps",snap.size);
    // });
 
    // },
    logout({ commit }){
        auth.signOut().then(() => {
            commit('logoutUser')    
          }).catch((error) => {
            console.log("erro", error);
          });
        
        
    },
     login({dispatch, commit}, form){
       commit('changeLoading', true);
       auth.signInWithEmailAndPassword(form.email, form.senha,).then((ref) =>{
         //console.log(user.user);
        //  this._vm.$toast.global.defaultSuccess("Login realizado com sucesso!");
        refUsers.where("uid", "==", ref.user.uid).get().then(uRef => {

          // console.log("userLog",uRef.docs[0].data());
          console.log("refreshToken",ref.user.refreshToken);
          dispatch('fetchUserProfile', uRef.docs[0].data())
        });
        
 
     }).catch(err => {
         
       commit('setError', err.message);
       commit('changeLoading', false);
       console.log(err.message);
       this.$toast.error(err.message, {duration: 2000})

       //this._vm.$toast.global.defaultError(err.message)
 
         //this.loading = false;
     });
     },
     async signup({ dispatch, }, form) {
       // sign user up
       auth.createUserWithEmailAndPassword(form.email, form.password).then(ref => {
         const user = ref.user;
          // create user profile object in userCollections
         refUsers.doc(user.uid).set({
         name: form.name,
         email: form.email,
         uid: user.uid,
         lvl: form.lvl
       }).then(user => {
         // fetch user profile and set in state
         this.$toast.success('Usuário criado com sucesso!',{duration: 2000})

 
       dispatch('fetchUserProfile', user)
       });
       
       }).catch(err => {
         this.commit('setError', err.message);
         this.commit('changeLoading', false);
         console.log(err.message);
       });
     
      
     
       
     },

     async signupUser({commit},form) {
      // sign user up
      return auth.createUserWithEmailAndPassword(form.email, form.password).then(ref => {
        const user = ref.user;
         // create user profile object in userCollections
        refUsers.doc(user.uid).set({
        name: form.name,
        email: form.email,
        uid: user.uid,
        
        //padrao lvl 2 (s)
        lvl: '7F2CB9F1C1E54E71000175B5BDD2ADD0'}).then(() => {
        // fetch user profile and set in state
          
                // this._vm.$toast.global.defaultSuccess("Usuário criado com sucesso!");
                this.$toast.success('Usuário criado com sucesso!',{duration: 2000})

                commit('resetError');
                commit('changeLoading', false);
                return true
              //dispatch('fetchUserProfile', user)
              });
              return true
      }).catch(err => {
        this.commit('setError', err.message);
        console.log(err.message);
        this.commit('changeLoading', false);
        return false
      });
   
    },
     async signupCommonUser({commit},form) {
      // sign user up
      return auth.createUserWithEmailAndPassword(form.email, form.password).then(ref => {
        const user = ref.user;
         // create user profile object in userCollections
        refUsers.doc(user.uid).set({
        name: form.name,
        email: form.email,
        uid: user.uid,
        //padrao lvl 2 (s)
        lvl: '7F2CB9F1C1E54E71000175B5BDD2ADD0'}).then(() => {
        // fetch user profile and set in state

        this.$toast.success('Usuário criado com sucesso!',{duration: 2000})
                

                commit('resetError');
                commit('changeLoading', false);
                return true
              //dispatch('fetchUserProfile', user)
              });
              return true
      }).catch(err => {
        this.commit('setError', err.message);
        console.log(err.message);
        this.commit('changeLoading', false);
        return false
      });
   
    },
    
     async fetchUserProfile({ commit }, user) {
       // fetch user profile
       const userProfile = await refUsers.doc(user.uid).get();
       //console.log(userProfile.data());
       // set user profile in state
       commit('setUser', userProfile.data());
       commit('resetError');
       commit('changeLoading', false);
       this.$toast.success("Login realizado com sucesso!", {duration: 2000})
        
       if(userProfile.data().lvl !== 'EB64284B81296A3D0B08D7925A9E09D9'){
         this.app.router.push('/user/')
       }else{

         this.app.router.push('/admin/')
       }
       //.catch(err => {console.log(err.message)})
       // change route to dashboard
      // this.$router.replace('home')
     },
     checkLoggedIn({commit}){
        var user = JSON.parse(window.localStorage.getItem("user"))

        if(user){
            refUsers.where("email", "==", user.email).get().then((snap)=>{
                //console.log(snap.docs)
                let userBuscado = snap.docs[0].data();
                //console.log(userBuscado)
                // let idUserEncrypted =  CryptoJS.MD5(userBuscado.uid + new Date().getDate().toString()).toString();
                 let idUserEncrypted =  userBuscado.uid + new Date().getDate().toString();
                //console.log("user.id",user.uid);
               // console.log("idUserEncrypted",idUserEncrypted);
                if(user.uid === idUserEncrypted){
                    commit("setUser", userBuscado)
                    //console.log(userBuscado);
                    this.app.router.push('/')
                    console.log("Usuário logado");

                }
            });
            
            
        }
       
     },
     recuperarSenha({commit},email){
         //payload é oque eu quiser passar (email)
         console.log(commit);
         
         auth.sendPasswordResetEmail(email).then(()=>{
          // this.$toast.global.my_error()

          this.$toast.success('Email enviado com sucesso!',{duration: 2000})

            // this._vm.$toast.global.defaultSuccess("Email enviado com sucesso!");

         }).catch((err)=>{
             console.log("erro", err);
         });
     }
}

export const getters = {
    
      getCurrentUser(state){
        //return fb.getUser
        return state.userProfile;
      },
      getPermissoes(state){
       return state.permissoes
      },
      getPermissoesList(state){
       return state.permissoesList
      },
      isUserAuth(state) {
       
        return state.userProfile != null;
      },
      getLoginError(state){
        return state.loginError;
      },
      getLoadingState(state){
        return state.loading;
      },
     
      getUserLvl(state){
        
       return state.permissoes[state.userProfile.lvl]
      }
}
