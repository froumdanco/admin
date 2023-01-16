import Vue from 'vue'
Vue.prototype.$url = 'http://localhost:8000/';
Vue.prototype.$storage ='http://localhost:8000/';
Vue.prototype.$domain ='http://localhost:8000';

Vue.prototype.$domainsale = 'http://localhost:8000';
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
app.$url = 'http://localhost:8000';

}
import moment from 'vue-jalali-moment';
Vue.use(moment);
