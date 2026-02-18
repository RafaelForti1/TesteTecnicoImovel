export interface Caracteristica {
  icone: string;
  label: string;
  valor: string;
}

export interface Imovel {
  id: string;
  titulo: string;
  descricao: string;
  bairroTag: string;
  preco: number;
  imagem: string;
  caracteristicas: Caracteristica[];
}
