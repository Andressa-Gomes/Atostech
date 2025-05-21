import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wisdom',
  templateUrl: './wisdom.component.html',
  styleUrls: ['./wisdom.component.css']
})
export class WisdomComponent implements OnInit {
  versiculo: string = 'Carregando...';

  private versiculos: string[] = [
    "O Senhor é a minha luz e a minha salvação; de quem terei medo? (Salmos 27:1)",
    "Entregue o seu caminho ao Senhor; confie nele, e ele agirá. (Salmos 37:5)",
    "Porque sou eu que conheço os planos que tenho para vocês, diz o Senhor. (Jeremias 29:11)",
    "No mundo tereis aflições, mas tende bom ânimo; eu venci o mundo. (João 16:33)",
    "Busquem, pois, em primeiro lugar, o Reino de Deus e a sua justiça. (Mateus 6:33)"
  ];

  ngOnInit() {
    const index = Math.floor(Math.random() * this.versiculos.length);
    this.versiculo = this.versiculos[index];
  }
}
