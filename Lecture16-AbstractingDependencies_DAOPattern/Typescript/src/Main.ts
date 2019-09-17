import { Navigator } from "./view/Navigator";
import { ConnectionFactory } from "./database/ConnectionFactory";

async function run(sql: string, params: any[] = []): Promise<boolean> {
  return new Promise(resolve => {
    ConnectionFactory.getConnection().run(sql, params, (err: any) => {
      if (err) {
        console.log(`Error running sql: ${sql}, Error: ${err}`);
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}

async function main() {
  const BUDGET_CREATE_STATEMENT: string =
    "create table if not exists budgets ("
    + "id text not null primary key,"
    + "month text not null,"
    + "year integer not null,"
    + "monthlyAllowance real not null"
    + " );";
  const INCOME_CREATE_STATEMENT: string =
    "create table if not exists incomes ("
    + "id text not null primary key,"
    + "projected real,"
    + "actual real"
    + " );";
  const EXPENSE_CREATE_STATEMENT: string =
    "create table if not exists expenses ("
    + "id text not null primary key,"
    + "month text not null,"
    + "day integer not null,"
    + "year integer not null,"
    + "name text not null,"
    + "amount real not null,"
    + "budgetId text not null"
    + " );";

  let databaseInitialized: boolean =
    await run(`${BUDGET_CREATE_STATEMENT}`)
    && await run(`${INCOME_CREATE_STATEMENT}`)
    && await run(`${EXPENSE_CREATE_STATEMENT}`);

  if (databaseInitialized) {
    console.log('database initialized');
    Navigator.push('main');
  }
}

main();