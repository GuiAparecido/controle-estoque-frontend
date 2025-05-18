import React, { useEffect, useState } from "react";
import type { Product } from "../types/Product";

const API_URL = "http://localhost:8080/estoque";

export const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar produtos");
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch(() => setError("Erro ao buscar produtos"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Carregando produtos...</p>;
  if (error) return <p>{error}</p>;
  if (!products.length) return <p>Nenhum produto cadastrado.</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Descrição</th>
          <th>Preço</th>
          <th>Quantidade</th>
        </tr>
      </thead>
      <tbody>
        {products.map((prod) => (
          <tr key={prod.id}>
            <td>{prod.id}</td>
            <td>{prod.nome}</td>
            <td>{prod.descricao}</td>
            <td>R$ {prod.preco.toFixed(2)}</td>
            <td>{prod.quantidade}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};