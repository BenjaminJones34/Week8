const { DataTypes } = require("sequelize");
const { connection } = require("../connection");

const Artist = connection.define("Artist", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    indexes: [{unique: true, fields: ["name"]}]
});

const Album = connection.define("Album", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { });

const Song = connection.define("Song", {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    indexes: [{unique: true, fields: ["title"]}]
});

Album.belongsTo(Artist, {onDelete: "cascade"});
Song.belongsTo(Album, {onDelete: "cascade"}); // Songs <- Album <- Artist many songs can belong to one album and many albums can have on artist

module.exports = {Artist, Album, Song};