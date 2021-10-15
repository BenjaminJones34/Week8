const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const mongoose = require("mongoose");

const argv = yargs(hideBin(process.argv)).argv;

mongoose.connect(
    "mongodb://localhost:27017/my_friends", //my_friends can be what you want
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }    
);

const Friend = mongoose.model("Friend",
    {
        name: String
    }
);

async function addFriend(name) {
    const friend = new Friend({name});
    console.log(friend);
    await friend.save();
}

async function findFriends(name) {
    let list = [];
    name ? list = await Friend.find({ name }) : list = await Friend.find({ });
    console.log(list);
}

async function updateFriend(name, newName, newKey, newKeyValue) {
    await Friend.updateOne({ name }, { name: newName });
}

async function removeFriend(name) {
    await Friend.deleteOne({ name });
}

async function removeAll() {
    await Friend.deleteMany({ });
}

async function main(argv) {
    try {
        if (argv.add) {
            await addFriend(argv.name);
        } else if (argv.list) {
            await findFriends(argv.name);
        } else if (argv.update) {
            await updateFriend(argv.name, argv.newName);
        } else if (argv.remove) {
            await removeFriend(argv.name);
        } else if (argv.removeAll) {
	    await removeAll();
	}

        process.exit();
    } catch (error) {
        console.error(error);
    }
}

main(argv);
