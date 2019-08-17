import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/categoria';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriasService } from "../../services/categorias.service"
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-edit-categoria',
  templateUrl: './edit-categoria.page.html',
  styleUrls: ['./edit-categoria.page.scss'],
})
export class EditCategoriaPage implements OnInit {

  categoria: Categoria;

  constructor(private actRoute: ActivatedRoute, private router: Router, private api: CategoriasService, public loadingController: LoadingController) {
    this.categoria = new Categoria();
  }

  async getById(id:number) {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present();
    await this.api.getCategoriaById(id)
      .subscribe(res => {
        console.log(res);
        this.categoria = res;
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }

  async save(){
    await this.api.postCategoria(this.categoria)
    .subscribe(res => {
        this.router.navigateByUrl('/categorias');
      }, (err) => {
        console.log(err);
      });
  }

  ngOnInit() {
    this.actRoute.params.subscribe(params => {
      let id:number = params['id']; 
      console.log('Valor  do parametro id: '+id);
      if (id!=0 && id!=null) {
        this.getById(id);
      }
      else {
        this.categoria.id = 0;
        this.categoria.nome = "";
        this.categoria.descricao = "";
      }
      console.log('Valor de categoria id: '+ this.categoria.id);
    });
  }

  // ionViewWillEnter(){
  //   this.actRoute.params.subscribe(params => {
  //     let id:number = params['id'];
  //     console.log('Valor do parâmetro id: ' + id ) // Teste
  //     if (id!=0 && id != null){
  //       this.categoria.id = id;
  //       this.categoria.nome = "Categoria"
  //       this.categoria.descricao = "Descrição Categoria"
  //     } else {
  //       this.categoria.id = 0;
  //       this.categoria.nome = "Nova Categoria"
  //       this.categoria.descricao = "Nova Descrição"
  //     }
  //     console.log('Valor de categoria id: ' + this.categoria.id);
  //   });
  // }

}
