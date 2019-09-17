export class ConnectionFactory {
  static URL: string = './budget.sqlite';

  static connection: any;

  static sqlite3 = require('sqlite3').verbose();

  /// also creates database
  static getConnection() {
    this.connection = new this.sqlite3.Database(this.URL, (err: any) => {
      if (err) {
        console.log(`Could not connect to database: ${err}`);
      }
    });

    return this.connection;
  }

  static closeConnection() {
    this.connection.close();
  }
}