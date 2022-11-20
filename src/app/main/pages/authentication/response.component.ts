import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoreConfigService } from '@core/services/config.service';
import { LoginSocialService } from './login-social.service';

@Component({
  selector: 'app-response',
  template: `<h1>Lin</h1>`,
  encapsulation: ViewEncapsulation.None
})
export class ResponseComponent implements OnInit {

  client_id = '78eygsqp7carij';
  client_secret = 'zoT6SZTxFHhqLguP';
  redirect_uri = 'http://localhost:4200/admin/response';
  code = '';
  state = '';

  constructor(
    private _coreConfigService: CoreConfigService,
    private activatedRoute: ActivatedRoute,
    private loginSocial: LoginSocialService
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.code = params['code'] || null;
      this.state = params['state'] || null;
      
    });

    this._coreConfigService.config = {
      
      layout: {
        navbar: {
          hidden: true
        },
        menu: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        customizer: false,
        enableLocalStorage: false
      }
    };
  }

  ngOnInit(): void {
    console.log(this.code)
    const param = {
      code: this.code
    }

    this.loginSocial.tokenLin(param).subscribe(response => {
      const data = 'code='+this.code+'&state='+this.state;
      this.loginSocial.datosLin(data, response.reponse).subscribe(res => {
        console.log(res)
      })
    })
    
  }


  

}
