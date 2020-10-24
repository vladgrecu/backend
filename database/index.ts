import { Sequelize } from "sequelize";
import { DATABASE_CONFIG } from "./config";
import { User } from "../models/user/entity";
import { Categories } from "../models/category/entity";
import { Products } from "../models/products/entity";

class DatabaseConnection {
  private sequalize: Sequelize;

  constructor() {
    if (this.sequalize) {
      throw new Error(`Sequalize already initialized`);
    }
    this.sequalize = new Sequelize(DATABASE_CONFIG);
  }

  getInstance() {
    return this.sequalize;
  }

  public initializeModels = async () => {
    const models = [User, Categories, Products];
    models.forEach((model) => model.initModel());
    models.forEach((model) => model.initAssociations());
  };
}

const instance = new DatabaseConnection();
Object.freeze(instance);
export { instance as DatabaseConnection };
