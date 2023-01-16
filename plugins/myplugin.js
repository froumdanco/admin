export default (context, inject) => {
  const lang =function (mode,item){
    if(typeof item[context.app.i18n.locale] !== 'undefined'){  return item[context.app.i18n.locale][mode]}
    else{  return item[mode] }

  }
  // Inject $hello(msg) in Vue, context and store.
  inject('lang', lang)
  // For Nuxt <= 2.12, also add 👇
  context.$lang = lang

}
