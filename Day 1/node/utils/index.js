const { Artist, Album, Song } = require("../models");

async function add({add, name, id, title}) {
    if (add === "artist") {
        await Artist.create({name});
    } else if (add === "album") {
        const band = await Artist.findByPk(id);
        await Album.create({name, ArtistId: band.id});
    } else if (add === "song") {
        const record = await Album.findByPk(id);
        await Song.create({title, AlbumId: record.id});
    }
};

async function list({list}) {
    let results = [];

    if (list === "artists") {
        results = await Artist.findAll({attributes: ["id", "name"]});
    } else if (list === "albums") {
        results = await Album.findAll({attributes: ["id", "name", "ArtistId"]});
    } else if (list === "songs") {
        results = await Song.findAll({attributes: ["id", "title", "AlbumId"]});
    }

    console.table(results.map(result => result.dataValues));
};

async function update({update, id, name, album, artist, title}) {
    if (update === "artist") {
        const band = await Artist.findByPk(id);
        await Artist.update({ name: name || band.name }, { where: {id} });
    } else if (update === "album") {
        const record = await Album.findByPk(id);
        await Album.update({ name: name || record.name, ArtistId: artist || record.ArtistId }, { where: {id} });
    } else if (update === "song") {
        const song = await Song.findByPk(id);
        await Song.update({ title: title || song.title, AlbumId: album || song.AlbumId }, { where : {id} });
    }
};

async function remove({remove, id}) {
    if (remove === "artist") {
        await Artist.destroy({ where: {id} });
    } else if (remove === "album") {
        await Album.destroy({ where: {id} });
    } else if (remove === "song") {
        await Song.destroy({ where : {id} });
    }
};

module.exports = {add, update, list, remove};