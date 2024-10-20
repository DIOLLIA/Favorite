import dotenv from 'dotenv'

dotenv.config({path: __dirname+".env"})

interface ENV {
    POSTGRES_USER: string | undefined;
    POSTGRES_HOST: string | undefined;
    POSTGRES_PORT: number | undefined;
    POSTGRES_PASSWORD: string | undefined;
    POSTGRES_DATABASE: string | undefined;
}

interface Config {
    POSTGRES_USER: string;
    POSTGRES_HOST: string;
    POSTGRES_PORT: number;
    POSTGRES_PASSWORD: string;
    POSTGRES_DATABASE: string;
}

// Loading process.env as ENV interface

const getConfig = (): ENV => {
    return {
        POSTGRES_USER: process.env.POSTGRES_USER,
        POSTGRES_PORT: process.env.POSTGRES_PORT ? Number(process.env.POSTGRES_PORT) : undefined,
        POSTGRES_HOST: process.env.POSTGRES_HOST,
        POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
        POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,
    };
};

// Throwing an Error if any field was undefined we don't
// want our app to run if it can't connect to DB and ensure
// that these fields are accessible. If all is good return
// it as Config which just removes the undefined from our type
// definition.

const getSanitzedConfig = (config: ENV): Config => {
    for (const [key, value] of Object.entries(config)) {
        if (value === undefined) {
            throw new Error(`Missing key ${key} in config.env`);
        }
    }
    return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;