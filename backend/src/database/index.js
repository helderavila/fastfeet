import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import User from '../app/models/User';
import Recipient from '../app/models/Recipient';
import File from '../app/models/File';
import Deliverer from '../app/models/Deliverer';
import Order from '../app/models/Order';
import Signature from '../app/models/Signature';
import OrderProblem from '../app/models/OrderProblem';

const models = [
  User,
  Recipient,
  File,
  Deliverer,
  Order,
  Signature,
  OrderProblem,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
