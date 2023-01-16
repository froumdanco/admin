import Vue from 'vue'
Vue.prototype.$url = 'https://api2.dancocoin.io/';
Vue.prototype.$storage ='https://api2.dancocoin.io/';
Vue.prototype.$domain ='https://api2.dancocoin.io';

Vue.prototype.$domainsale = 'https://api2.dancocoin.io';
Vue.prototype.$lang ='fa';


Vue.prototype.changeUrl = arg => {
  let url=null;
  url= arg.replace(/\//g, '-');
  url= url.replace(/ /g, '-');
  url= url.replace(/;/g, '-');
  url= url.replace(/,/g, '-');
  url= url.replace(')', '-');
  url= url.replace('(', '-');
  url= url.replace(/،/g, '-');
  url= url.replace(/ /g, '-');
  url= url.replace('?', '-');
  return url;
};
export default ({app}) => {
app.$url = 'https://api2.dancocoin.io';

}
import moment from 'vue-jalali-moment';
Vue.use(moment);
