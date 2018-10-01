import { Injectable } from '@angular/core';
import { Local } from 'protractor/built/driverProviders';

@Injectable({
  providedIn: 'root'
})
export class OrcamentosService {
  orcamentos = [{
    id: 1,
    nome: 'Jackson',
    email: 'jackson.souza@gmail.com',
    pecas: [
      {
        tipo: 'compartimento de armário',
        puxador: 'plástico',
        pintura: 'acabamento PU',
        largura: 1,
        altura: 1,
        profundidade: 1
      },
      {
        tipo: 'gaveteiro',
        puxador: 'metal',
        pintura: 'acabamento PU texturizado',
        largura: 15,
        altura: 30,
        profundidade: 70
      }
    ]
  }];
  constructor() { }
  salvar(orcamento) {
    // orcamento.id = this.orcamentos.length + 1;
    // localStorage.setItem('LastIndex', orcamento.id);
    let LastIndex = localStorage.getItem('LastIndex');
    if (LastIndex != null) {
      orcamento.id = Number.parseInt(LastIndex) + 1;
      localStorage.setItem('LastIndex', orcamento.id);
    } else {
    orcamento.id = 0;
    localStorage.setItem('LastIndex', orcamento.id);
    }
    let j = JSON.stringify(orcamento);
    localStorage.setItem(String(orcamento.id), j);
    this.orcamentos.push(orcamento);
  }
  calcular(orcamento) {
    let somatorio = 0;
    for (let peca of orcamento.pecas) {
      const area_frente = peca.largura * peca.altura;
      const area_lado = peca.altura * peca.profundidade;
      peca.area_total = area_frente + area_frente + area_lado + area_lado;
      peca.area_total /= 100;
      peca.custo_de_producao = 0;
      if (peca.tipo === 'compartimento de armário') {
        peca.custo_de_producao += 50 * peca.area_total;
      } else {
        peca.custo_de_producao += 75 * peca.area_total;
      }
      if (peca.puxador === 'plástico') {
        peca.custo_de_producao += 5;
      } else {
        peca.custo_de_producao += 8.5;
      }
      if (peca.pintura === 'acabamento PU') {
        peca.custo_de_producao += 15 * peca.area_total;
      } else if (peca.pintura === 'acabamento PU texturizado') {
        peca.custo_de_producao += 20 * peca.area_total;
      } else {
        peca.custo_de_producao += 35 * peca.area_total;
      }
      peca.custo_de_producao_ajustado = peca.custo_de_producao * 1.75;
      somatorio += peca.custo_de_producao_ajustado;
    }
    orcamento.custo_total = somatorio * 1.25;
    return orcamento.custo_total;
  }
  encontrar(id) {
    let j = localStorage.getItem(String(id));
    let orcamento = JSON.parse(j);
    return orcamento;
   // for (let orcamento of this.orcamentos) {
   //   if (orcamento.id === id) {
   //     return orcamento;
   //   }
   // }
    return null;
  }
}
