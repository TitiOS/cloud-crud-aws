export default function MoneyManager() {
  const transactions = [
    {
      id: 1,
      title: "Salário",
      amount: 5000,
      type: "income",
      category: "Salary",
      date: "2026-05-20",
    },
    {
      id: 2,
      title: "Mercado",
      amount: 250,
      type: "expense",
      category: "Food",
      date: "2026-05-21",
    },
    {
      id: 3,
      title: "Internet",
      amount: 120,
      type: "expense",
      category: "Bills",
      date: "2026-05-22",
    },
  ];

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

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

          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Título"
              className="border border-gray-300 rounded-xl p-3"
            />

            <input
              type="number"
              placeholder="Valor"
              className="border border-gray-300 rounded-xl p-3"
            />

            <select className="border border-gray-300 rounded-xl p-3">
              <option>Selecione o tipo</option>
              <option>income</option>
              <option>expense</option>
            </select>

            <input
              type="text"
              placeholder="Categoria"
              className="border border-gray-300 rounded-xl p-3"
            />

            <input
              type="date"
              className="border border-gray-300 rounded-xl p-3"
            />

            <input
              type="text"
              placeholder="Descrição"
              className="border border-gray-300 rounded-xl p-3"
            />

            <button
              type="submit"
              className="bg-blue-600 text-white rounded-xl p-3 hover:bg-blue-700 transition col-span-1 md:col-span-2"
            >
              Adicionar Transação
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
                    R$ {transaction.amount.toFixed(2)}
                  </td>
                  <td className="p-4">{transaction.date}</td>
                  <td className="p-4 flex gap-2">
                    <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg transition">
                      Editar
                    </button>

                    <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition">
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
