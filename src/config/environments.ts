type EnvironmentType = {
  nodeEnv: string;
  appUrl: string;
  port: number;
  secret: string;
  expiresIn: string;
  defaultStrategy: string;
  property: string;
  session: string;
  host: string;
  username: String;
  password: String;
  database: String;
  portPostgres: number;
  hostRedis: string;
  portRedis: number;
};

export const environments = (): EnvironmentType => {
  return {
    nodeEnv: process.env.NODE_ENV,
    appUrl: process.env.APP_URL,
    port: +process.env.PORT,
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
    defaultStrategy: process.env.DEFAULT_STRATEGY,
    property: process.env.PROPERTY_USER,
    session: process.env.SESSION,
    host: process.env.POSTGRES_HOST,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    portPostgres: +process.env.POSTGRES_PORT,
    hostRedis: process.env.HOST_REDIS,
    portRedis: +process.env.PORT_REDIS,
  };
};

export default {
  folderPath: '.env',
};
