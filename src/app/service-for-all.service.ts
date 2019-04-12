import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
let wpUrl= 'http://commit.betaplanets.com/';
@Injectable({
  providedIn: 'root'
})
export class ServiceForAllService {

  
  url = 'http://commit.betaplanets.com/wp-json/wp/v2/';
  totalPosts = null;
  pages: any;
 
  constructor(private http: HttpClient) { 
  }



  getPosts(page = 1): Observable<any[]> {
    let options = {
      observe: "response" as 'body',
      params: {
        per_page: '10',
        page: ''+page
      }
    };
 
    return this.http.get<any[]>(this.url+'sports_feeds?_embed', options).pipe(
      map(resp => {
        this.pages = resp['headers'].get('x-wp-totalpages');
        this.totalPosts = resp['headers'].get('x-wp-total');
 
        let data = resp['body'];
 
        for (let post of data) {
          post.media_url = post['_embedded']['wp:featuredmedia'][0]['media_details'].sizes['medium'].source_url;
        }
        return data;
      })
    )
  }
 
  getPostContent(id) {
    return this.http.get(this.url+'sports_feeds/'+id+'?_embed').pipe(
      map(post => {
        post['media_url'] = post['_embedded']['wp:featuredmedia'][0]['media_details'].sizes['medium'].source_url;
        return post;
      })
    )
  }

  doRegister(user_data){   
    console.log("SERVICES === ",user_data);  
    
		return this.http.post(wpUrl + 'wp-json/mobileapi/v1/register',{
		email: user_data.email,
    password:user_data.password,
    role:user_data.role,
    name:user_data.name,
    jw_auth_sec:"wivxCNm$<(+WF#7}wivxCNmwivxCNm$<(+WF#7}1]TWMUl7OaU*TxS(r*$F8:akLdapjD[j.g0wgra#c/f,P`1$<(+WF#7}1]TWMUl7OaU*TxS(r*$F8:akLdapjD[j.g0wgra#c/f,P`11]TWMUl7OaU*TxS(r*$F8:akLdapjD[j.g0wgra#c/f,P`1"
		})
  }
  
  doLogin(email, password){
    console.log("SERVICE == "+email);
    return this.http.post(wpUrl + 'wp-json/jwt-auth/v1/token',{
      username: email,
      password: password,
      jw_auth_sec:"wivxCNm$<(+WF#7}wivxCNmwivxCNm$<(+WF#7}1]TWMUl7OaU*TxS(r*$F8:akLdapjD[j.g0wgra#c/f,P`1$<(+WF#7}1]TWMUl7OaU*TxS(r*$F8:akLdapjD[j.g0wgra#c/f,P`11]TWMUl7OaU*TxS(r*$F8:akLdapjD[j.g0wgra#c/f,P`1"
    })
  }

  getFeed( page:number = 1){
    return new Promise((resolve, reject) => {
      this.http.get(wpUrl + 'wp-json/wp/v2/sports_feeds?_embed&page=' + page).subscribe(res => {
          resolve(res);
      }, (err) => {
          reject(err);
      });
  });
}



}
