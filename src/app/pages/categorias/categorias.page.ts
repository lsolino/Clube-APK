import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria';
import { CategoriasService } from "../../services/categorias.service"
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  categorias: any;
  categoria: Categoria;

  constructor(private router: Router, public api: CategoriasService, public loadingController: LoadingController) {
    
  }

  async getCategorias(){
    //this.categorias = [{"id":1, "nome":"Sub-15", "descricao":"Crianças até 15 anos"}, 
    //{"id":2, "nome":"Aspirantes", "descricao":"Até 23 anos podendo ter no máximo 3 acima de 23 anos"}];
    const loading = await this.loadingController.create({
      message:'Loading'
    }); 
    await loading.present();
    await this.api.getCategoria()
    .subscribe(res => {
      console.log(res);
      this.categorias = res;
      loading.dismiss();
    }, err => {
      console.log(err);
      loading.dismiss();
    });
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.getCategorias();
  }

  addCategoria(){
    this.router.navigate(['/edit-categoria', 0]);
  }

  editCategoria(id: number){
    this.router.navigate(['/edit-categoria', id]);
  }

  async removeCategoria(id: number){
    const loading = await this.loadingController.create({
      message: 'Apagando'
    });
    await loading.present();
    await this.api.deleteCategoria(id)
      .subscribe(res => { 
        console.log(res);
        this.getCategorias();
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }

}
