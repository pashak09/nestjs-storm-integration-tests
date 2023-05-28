import DatabaseConfig from '@app/config/config/DatabaseConfig';
import { Env } from '@app/config/config/Env';

export default new DatabaseConfig(new Env(process.env)).getDataSource();
