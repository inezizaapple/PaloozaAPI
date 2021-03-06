module.exports = {
    path: "from-uuid",
    type: "POST",
    parent: "player",
    description: "Returns a player's data from his uuid",
    params: {
        uuid: {
            type: "string",
            description: "The player's uuid",
            length: 36,
            required: true
        }
    },
    example: {
        "a4c2c06f-c35d-42d4-87e8-87d74613ae85": {
            id: 1,
            name: "PaulBGD",
            uuid: "a4c2c06f-c35d-42d4-87e8-87d74613ae85",
            faction: "BGD",
            server: "factions",
            time: 373771
        }
    },
    handleRequest: function(_palooza, params, callback) {
        _palooza.database.execute('SELECT `name`,`uuid`,`faction`,`points`,`server`,`time` FROM `palooza`.`accounts` WHERE `uuid` = ?', [params.uuid], function(err, rows) {
            if(err) {
                _palooza.debug('Failed to select player from database using uuid "' + params.uuid + '"', err);
                return callback('Internal error occurred');
            }
            var row = rows[0];
            if(row) {
                var object = {};
                object[params.uuid] = {
                    id: row.id,
                    name: row.name,
                    uuid: params.uuid,
                    faction: row.faction,
                    server: row.server,
                    time: row.time
                };
                callback(undefined, object);
            } else {
                callback('Player with supplied uuid not found');
            }
        });
    }
};