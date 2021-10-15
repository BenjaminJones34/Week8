require("dotenv").config();

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const { add, update, list, remove } = require("./utils/") //with nothing inside it automatically searches for index
const { connection } = require("./connection");
const { Album, Artist, Song } = require("./models/");

const argv = yargs(hideBin(process.argv)).argv;

async function main() {
    try {
        await connection.authenticate();
        await Artist.sync({alter: true});
        await Album.sync({alter: true});
        await Song.sync({alter: true});

        if (argv.add) {
            await add(argv);
        } else if (argv.list) {
            await list(argv);
        } else if (argv.remove && argv.id) {
            await remove(argv);
        } else if (argv.update && argv.id) {
            await update(argv);
        }
        
        await connection.close();
    } catch (error) {
        console.error(`Unable to connect to the DB: ${error}`);
    }

    process.exit();
}

main();