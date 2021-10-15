const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv =  yargs(hideBin(process.argv)).argv;

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/vegetables", {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const id = mongoose.Types.ObjectId();

const Veg = mongoose.model("Veg", {
	name: {
		type: String,
		required: true,
		unique: true
	},
	price: {
		type: Number,
		required: true,
		unique: false
	}
});

const Fruits = mongoose.model("Fruit", {
	name: {
		type: String,
		required: true,
		unique: true
	},
	price: {
		type: Number,
		required: true,
		unique: false
	}
});

async function add(type, name, price) {
	let item = "";
	type === "fruit" ? item = new Fruits({name, price}) : null;
	type === "vegetable" ? item = new Veg({name, price}) : null;
	console.log(item.name);
	await item.save();
}

async function findAll(type) {
	let items = [];
	type === "fruits" ? items = await Fruits.find({ }) : null;
	type === "vegetables" ? items = await Veg.find({ }) : null;
	console.log(items);
}

async function updateOne(type, name, newName) {
	type === "fruit" ? await Fruits.updateOne({ name }, { name: newName }) :  null;
	type === "vegetable" ? await Veg.updateOne({ name }, { name: newName }) : null;
}

async function deleteOne(type, name) {
	type === "fruit" ? await Fruits.deleteOne({ name }) : null;
	type === "vegetable" ? await Veg.deleteOne({ name }) : null;
}

async function main(argv) {
	try {
		if (argv.add) {
			await add(argv.type, argv.name, argv.price);
		} else if (argv.list) {
			await findAll(argv.type);
		} else if (argv.update) {
			await updateOne(argv.type, argv.name, argv.newName);
		} else if (argv.remove) {
			await deleteOne(argv.type, argv.name);
		}

	} catch (error) {
		console.error(error);
	}
	process.exit();
}

main(argv);


