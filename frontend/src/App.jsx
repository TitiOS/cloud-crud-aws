import { useEffect, useState } from "react";
import axios from "axios";

export default function MoneyManager() {

  const [transactions, setTransactions] = useState([]);


  const [formData, setFormData] = useState({
  title: "",
  amount: "",
  type: "",
  category: "",
  description: "",
  transaction_date: "",
  });

  const [editingId, setEditingId] = useState(null);

  const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          "http://money-lb-bcf217a5a0019ebf.elb.us-east-1.amazonaws.com/transactions"
        );

        setTransactions(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (editingId) {

        await axios.put(
          `http://money-lb-bcf217a5a0019ebf.elb.us-east-1.amazonaws.com/transactions/${editingId}`,
          formData
        );

        setEditingId(null);

      } else {

        await axios.post(
          "http://money-lb-bcf217a5a0019ebf.elb.us-east-1.amazonaws.com/transactions",
          formData
        );
      }

      await fetchTransactions();

      setFormData({
        title: "",
        amount: "",
        type: "",
        category: "",
        description: "",
        transaction_date: "",
      });

    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://money-lb-bcf217a5a0019ebf.elb.us-east-1.amazonaws.com/transactions/${id}`
      );

      await fetchTransactions();

    } catch (error) {
      console.error(error);
    }
    };

    const handleEdit = (transaction) => {
    setEditingId(transaction.id);

    setFormData({
      title: transaction.title,
      amount: transaction.amount,
      type: transaction.type,
      category: transaction.category,
      description: transaction.description || "",
      transaction_date: transaction.transaction_date.split("T")[0],
    });
  };

  useEffect(() => {
    fetchTransactions();
  }, []);


  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const balance = totalIncome - totalExpense;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Money Manager</h1>
          <p className="text-gray-500 mt-2">
            Controle suas receitas e despesas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-600 mb-2">
              Receita Total
            </h2>
            <p className="text-3xl font-bold text-green-600">
              R$ {totalIncome.toFixed(2)}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-600 mb-2">
              Despesas
            </h2>
            <p className="text-3xl font-bold text-red-600">
              R$ {totalExpense.toFixed(2)}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-600 mb-2">Saldo</h2>
            <p className="text-3xl font-bold text-blue-600">
              R$ {balance.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Nova Transação
          </h2>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Título"
              className="border border-gray-300 rounded-xl p-3"
            />

            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Valor"
              className="border border-gray-300 rounded-xl p-3"
            />

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="border border-gray-300 rounded-xl p-3"
            >
              <option value="">Selecione o tipo</option>
              <option value="income">income</option>
              <option value="expense">expense</option>
            </select>

            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Categoria"
              className="border border-gray-300 rounded-xl p-3"
            />

            <input
              type="date"
              name="transaction_date"
              value={formData.transaction_date}
              onChange={handleChange}
              className="border border-gray-300 rounded-xl p-3"
            />

            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Descrição"
              className="border border-gray-300 rounded-xl p-3"
            />

            <button
              type="submit"
              className="bg-blue-600 text-white rounded-xl p-3 hover:bg-blue-700 transition col-span-1 md:col-span-2"
            >
              {editingId ? "Atualizar Transação" : "Adicionar Transação"}
            </button>
          </form>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 overflow-x-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Transações</h2>

            <input
              type="text"
              placeholder="Buscar transação"
              className="border border-gray-300 rounded-xl p-3 w-64"
            />
          </div>

          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-left">
                <th className="p-4">Título</th>
                <th className="p-4">Categoria</th>
                <th className="p-4">Tipo</th>
                <th className="p-4">Valor</th>
                <th className="p-4">Data</th>
                <th className="p-4">Ações</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="p-4 font-medium">{transaction.title}</td>
                  <td className="p-4">{transaction.category}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        transaction.type === "income"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {transaction.type}
                    </span>
                  </td>
                  <td
                    className={`p-4 font-semibold ${
                      transaction.type === "income"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    R$ {Number(transaction.amount).toFixed(2)}
                  </td>
                  <td className="p-4">{new Date(transaction.transaction_date).toLocaleDateString("pt-BR")}</td>
                  <td className="p-4 flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(transaction)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg transition"
                    >
                      Editar
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(transaction.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
