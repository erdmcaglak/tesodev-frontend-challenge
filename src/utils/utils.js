import _ from 'lodash'
import moment from 'moment'
import io from "socket.io-client"
import uniqid from "uniqid"
import axios from "axios"
import browser from 'browser-detect'
//timestamp ı tarihe çevirir 
//112345246346 -> 02.11.2020
export function timeStampToDay(date){
    return moment.unix(date).format('DD/MM/YYYY HH:mm')
}

export function timeStampToHour(date) {
  return moment.unix(date).format('HH:mm')
}

// uzun sitring'in sonuna 3 nokta ekler 
// Erdem Çağ...
export function stringShorter(str, len = 16) {
    if(str.length > len)
      return str.substring(0, len) + '...'
    else
      return str
}

//verilen stringi json olarak döndürür
export function jsonParser(str) {
    if (_.isEmpty(str))
      return str
    else {
      var t = '',
        special = '[]{} :,',
        qt;

      str = str.split('');

      for (var i = 0; i < str.length; i++) {
        if ((qt = str[i]) === "'" || qt === '"') {
          do {
            t += str[i++].replace("'", '"');
          } while (i < str.length && str[i] !== qt);
          t += qt.replace("'", '"');
        }
        else if (special.indexOf(str[i]) === -1) {
          t += '"';
          do {
            t += str[i++];
          } while (i < str.length && special.indexOf(str[i]) == -1)
          t += '"';
          i--;
        }
        else {
          t += str[i];
        }
      }
      try {
        let parsed = JSON.parse(t);
        return parsed
      } catch (e) {
        console.log(e);
        return 'Hata! Veri JSON değil.';
      }
    }
}

//verilen arr veya objeyi istenilen düzende sıralar
export function sortAll(item,sort='up',sortedBy){
  if(!Array.isArray(item)) return item;
  else if (item.length == 0) return item;

  if(typeof item[0] == 'string'){
    if(!isNaN(parseInt(item[0]))){
      if(sort == 'down'){
        item.sort((a,b)=>{
          return b-a;
        })
      }
      else{
        item.sort((a,b)=>{
          return a-b;
        })
      }
    }
    else{
      if(sort=='down'){
        item.sort((a,b)=>{
          return b.localeCompare(a)
        })
      }
      else{
        item.sort((a,b)=>{
          return a.localeCompare(b)
        })
      }
    }
  }

  else if(typeof item[0] == 'number'){
    if(sort == 'down'){
      item.sort((a,b)=>{
        return b-a;
      })
    }
    else{
      item.sort((a,b)=>{
        return a-b;
      })
    }
  }

  else if(typeof item[0]=='object'){
    if(sort == 'down'){
      item.sort((a,b)=>{
        if(b[sortedBy]=='number')
          return b[sortedBy]-a[sortedBy];
        else{
          if ( a[sortedBy] < b[sortedBy] ){
            return 1;
          }
          if ( a[sortedBy] > b[sortedBy] ){
            return -1;
          }
          return 0;
        }
      })
    }
    else{
      item.sort((a,b)=>{
        if(b[sortedBy]=='number')
          return a[sortedBy]-b[sortedBy];
        else{
          if ( a[sortedBy] < b[sortedBy] ){
            return -1;
          }
          if ( a[sortedBy] > b[sortedBy] ){
            return 1;
          }
          return 0;
        }
      })
    }
  }
  return item;
  
}

//cookie deki verileri obje olarak döndürür
export function cookieParser(){
  let cookieObj={}
  let cookieArr = document.cookie.split('; ')
  for(let item of cookieArr){
    let itemArr = item.split('=');
    _.set(cookieObj,[`${itemArr[0]}`],`${itemArr[1]}`)
  }
  return cookieObj || {};
}

//cookieden istenilen elemani siler
export function cookieRemover(key){
  if(typeof key === 'object'){
    for(let content of key){
      document.cookie = `${content}` + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
  }
  else{
    document.cookie = `${key}` + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
}

//cookie eleman ekler
export function cookieSetter(key,value,path='/'){
  document.cookie = `${key}=${value}; path=${path}`
}

//socket i tekrar başlatır
export const restartSocket = (token)=>{
  console.log('Restart Socket')
  const socket = io(`https://localhost:8081`, {
    autoConnect: false,
    auth: {
      token,
    }
  })
  socket.connect()
}

//string yerine istenilen şeyi yazmaya yarar
export const textReplacer = (text,replacedText,value)=>{
  return text.replace(`${replacedText}`,value)
}

// dakikada 1 yeni uniqid oluşturur 2.yi localde tutar 3. gelirse 2.yi siler 1.yi 2.ye alır yeniyi 1.ye ekler
// ayrıca ip ve lokasyon bilgisi alır
export const utidCreator=async ()=>{
  if(window.localStorage.getItem('utid-1')){
    let control = Date.now() - parseInt(window.localStorage.getItem('utid-1').split('-')[1]);
    if(!(control<120000)){
      if(window.localStorage.getItem('utid-2')){
        let control2 = Date.now() - window.localStorage.getItem('utid-2').split('-')[1];
        if(control2<120000){
          window.localStorage.setItem('utid-1',window.localStorage.getItem('utid-2'))
          window.localStorage.removeItem('utid-2');
        }
        else{
          window.localStorage.setItem('utid-1',`${uniqid()}-${Date.now()}`);
          window.localStorage.removeItem('utid-2');
        }
      }
      else{
        window.localStorage.setItem('utid-1',`${uniqid()}-${Date.now()}`);
      }
    }
    else{
      if(window.localStorage.getItem('utid-2')){
        let control2 = Date.now() - window.localStorage.getItem('utid-2').split('-')[1];
        if(control > control2){
          // Vue.prototype.$utid = window.localStorage.getItem('utid-2')
        }
      }
      else{
        // Vue.prototype.$utid = window.localStorage.getItem('utid-1')
      }
    }
  }
  else{
    window.localStorage.setItem('utid-1',`${uniqid()}-${Date.now()}`);
  }
}

// ip yi döndürür
export const whatMyIp = async ()=>{
  const res = await axios.get('https://ifconfig.me').catch(err=>{
      console.log({err})
  })
  
  return res.data;
}

// lokasyonu döndürür
export const whatMyLocation = async ()=>{
  let ipv4 = whatMyIp()
  const response = await axios.get(`https://ipapi.co/${ipv4}/json`).catch(err=>{
      console.log({err})
  });
  return response.data;
}

//browser info döndürür
export const whatMyBrowser = async ()=>{
  return browser();
}
