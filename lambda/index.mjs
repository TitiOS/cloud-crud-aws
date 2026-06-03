export const handler = async () => {
  try {

    const API_URL =
      "http://54.175.168.246:3000/transactions";

    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Erro ao buscar transações: ${response.status}`);
    }

    const transactions = await response.json();

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((transaction) => {

      if (transaction.type === "income") {
        totalIncome += Number(transaction.amount);
      }

      if (transaction.type === "expense") {
        totalExpense += Number(transaction.amount);
      }

    });

    const report = {
      totalTransactions: transactions.length,
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
      generatedAt: new Date().toISOString()
    };

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "*"
      },
      body: JSON.stringify(report)
    };

  } catch (error) {

    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "*"
      },
      body: JSON.stringify({
        error: error.message
      })
    };

  }
};
