// export default function ({ store, route, redirect }) {
export default function (context) {
    // console.log("temp");
    // console.log(context.store.getters["authStore/isUserAuth"]);
    if(!context.store.getters["authStore/isUserAuth"]){
      context.redirect("/login")
    }
    
    
    let val = context.route.meta[0].auth.authority;
    
    // console.log("context",context);
    // console.log("process",process);
    // console.log(context.route);
     if(typeof val !== 'undefined'){
       console.log("There is a authority level here");
      if(process.browser){

        if(context.store.getters["authStore/getUserLvl"] < val){
          console.log("Mandar para tela de LOGIN");
          // context.route.back()
          context.redirect("/")

          // return error({
          //       statusCode: 401,
          //       message: 'Você não tem permissão para acessar esta página'
          //     })

        }
      }
    }
     
       
       
       

    // // Check if user is connected first
    
    // Get authorizations for matched routes (with children routes too)
    // let authorizationLevels = context.route.meta.map((meta) => {
    //   if (meta.auth && typeof meta.auth.authority !== 'undefined')
    //     return meta.auth.authority
    //   return 0
    // })
    // console.log("authorizationLevels",authorizationLevels);
    // // Get highest authorization level
    // const highestAuthority = Math.max.apply(null, authorizationLevels)
  
    // if (store.getters['authStore/getUserLvl'] < highestAuthority) {
    //   return error({
    //     statusCode: 401,
    //     message: 'Você não tem permissão para acessar esta página'
    //   })
    // }
  }