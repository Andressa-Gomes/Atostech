import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CookieService } from '../services/cookie/cookie.service'; 
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'] // Corrigido: 'styleUrls' no plural
})
export class HeaderComponent implements OnInit, OnDestroy {

  userRole: string | null = null;
  isPaused = false;
  selectedOption = '';
  speechInstance: SpeechSynthesisUtterance | null = null;

  constructor(public cookieService: CookieService, public authService: AuthService) {}

  ngOnInit() {
    this.userRole = sessionStorage.getItem('userRole');
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', this.verificarFimDaPagina);
    }
  }

  ngOnDestroy() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.verificarFimDaPagina);
    }
  }

  leitorDeTexto() {
    if (typeof window === 'undefined') return;

    if (speechSynthesis.speaking && !this.isPaused) {
      speechSynthesis.pause();
      this.isPaused = true;
    } else if (this.isPaused) {
      speechSynthesis.resume();
      this.isPaused = false;
    } else {
      speechSynthesis.cancel();

      const selectedText = window.getSelection()?.toString().trim();
      const text = selectedText || document.body.innerText;

      if (text.length > 0) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'pt-BR';
        utterance.onend = () => {
          this.isPaused = false;
        };

        this.speechInstance = utterance;
        speechSynthesis.speak(this.speechInstance);
      }
    }
  }

  pararLeitura() {
    if (typeof window !== 'undefined') {
      speechSynthesis.cancel();
      this.isPaused = false;
    }
  }

  verificarFimDaPagina = () => {
    if (typeof window !== 'undefined') {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        speechSynthesis.speaking
      ) {
        speechSynthesis.pause();
        this.isPaused = true;
      }
    }
  };

  alterarCorDaPagina() {
    if (typeof document === 'undefined') return;

    const body = document.body;
    const footer = document.getElementById('pageFooter');

    body.style.backgroundColor = '#000';
    if (footer) footer.style.backgroundColor = '#000';

    const secoes = [
      ...document.querySelectorAll('section'),
      ...document.querySelectorAll('.welcome'),
      ...document.querySelectorAll('.know-us'),
      ...document.querySelectorAll('.historia'),
      ...document.querySelectorAll('.content-container'),
      ...document.querySelectorAll('.pastors-section'),
      ...document.querySelectorAll('.courses'),
      ...document.querySelectorAll('.eventos'),
      ...document.querySelectorAll('.doacao'),
      ...document.querySelectorAll('h2.sub-titulo'),
      ...document.querySelectorAll('div.imag-footer span'),
      ...document.querySelectorAll('table.agenda'),
      ...document.querySelectorAll('div.pesquisa'),
      ...document.querySelectorAll('div.on'),
      ...document.querySelectorAll('div.testemunho'),
      ...document.querySelectorAll('div.course'),
      ...document.querySelectorAll('section.testemunhos'),
      ...document.querySelectorAll('p.versiculo')
    ];
    

    secoes.forEach(secao => {
      const secaoElement = secao as HTMLElement;
      secaoElement.style.backgroundColor = '#000';
      secaoElement.style.color = '#fff';

      secaoElement.querySelectorAll<HTMLElement>('h1, h2, h3, h4, p, span, a, strong, div, li, td, th, footer')
        .forEach(el => el.style.color = '#fff');

      if (secao.tagName === 'TABLE') {
        secaoElement.style.borderColor = '#fff';
        secaoElement.querySelectorAll<HTMLElement>('td, th').forEach(celula => {
          celula.style.borderColor = '#fff';
        });
      }
    });
  }

  alterarFonte(tamanho: string) {
    if (typeof document === 'undefined') return;

    document.querySelectorAll<HTMLElement>('body, body *').forEach(el => {
      el.style.fontSize = tamanho;
    });
  }

  resetarConfiguracoes() {
    if (typeof document === 'undefined') return;

    const body = document.body;
    const footer = document.getElementById('pageFooter');
    const welcomeSection = document.querySelector('.welcome');

    body.removeAttribute('style');
    if (footer) footer.removeAttribute('style');
    if (welcomeSection) (welcomeSection as HTMLElement).removeAttribute('style');

    document.querySelectorAll<HTMLElement>('body, body *').forEach(el => {
      el.style.fontSize = '';
      el.style.backgroundColor = '';
      el.style.color = '';
    });

    this.selectedOption = '';
  }

  handleChange(event: Event) {
    const valor = (event.target as HTMLSelectElement).value;
    this.selectedOption = valor;

    const tamanhosDeFonte: { [key: string]: string } = {
      'fonte-pequena': '0.8rem',
      'fonte-media': '1.3rem',
      'fonte-grande': '1.7rem'
    };

    if (valor === 'cor') {
      this.alterarCorDaPagina();
    } else if (valor in tamanhosDeFonte) {
      this.alterarFonte(tamanhosDeFonte[valor]);
    } else if (valor === 'reset') {
      this.resetarConfiguracoes();
    }
  }
}
