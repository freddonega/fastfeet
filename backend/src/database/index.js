import Sequelize from 'sequelize';

import User from '../app/models/User';
import Recipient from '../app/models/Recipient';
import File from '../app/models/File';
import Deliveryman from '../app/models/Deliveryman';
import Package from '../app/models/Package';
import DeliveryProblem from '../app/models/DeliveryProblem';

import databaseConfig from '../config/database';

const models = [User, Recipient, Deliveryman, File, Package, DeliveryProblem];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map((model) => model.init(this.connection));
    models.map(
      (model) => model.associate && model.associate(this.connection.models)
    );
  }
}

export default new Database();
