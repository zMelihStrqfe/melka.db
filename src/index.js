module.exports = function(file) {
// Require Database
    const Database = require("better-sqlite3");
    const util = require("util");
    let db;

    // Create Database Under Conditions
    if (!db) db = new Database(file || "./json.sqlite");

    // Declare Methods
    var methods = {
        fetch: require("./methods/fetch.js"),
        set: require("./methods/set.js"),
        add: require("./methods/add.js"),
        subtract: require("./methods/subtract.js"),
        push: require("./methods/push.js"),
        delete: require("./methods/delete.js"),
        has: require("./methods/has.js"),
        all: require("./methods/all.js"),
        type: require("./methods/type"),
    };

    module = {
        /**
         * Package version. Community requested feature.
         * console.log(require('quick.db').version);
         */
        version: require("../package.json").version,

        /**
         * This function fetches data from a key in the database. (alias: .get())
         * @param {key} input any string as a key. Also allows for dot notation following the key.
         * @param {options} [input={ target: null }] Any options to be added to the request.
         * @returns {data} the data requested.
         */

        fetch: function (key, ops) {
            if (!key)
                throw new TypeError(
                    "Anahtar belirtilmedi. Yardıma mı ihtiyacınız var? Kontrol et: discord.gg/ghostcode"
                );
            return arbitrate("fetch", { id: key, ops: ops || {} });
        },
        get: function (key, ops) {
            if (!key)
                throw new TypeError(
                    "Anahtar belirtilmedi. Yardıma mı ihtiyacınız var? Kontrol et: discord.gg/ghostcode"
                );
            return arbitrate("fetch", { id: key, ops: ops || {} });
        },

        /**
         * This function sets new data based on a key in the database.
         * @param {key} input any string as a key. Also allows for dot notation following the key.
         * @param {options} [input={ target: null }] Any options to be added to the request.
         * @returns {data} the updated data.
         */

        set: function (key, value, ops) {
            if (!key)
                throw new TypeError(
                    "Anahtar belirtilmedi. Yardıma mı ihtiyacınız var? Kontrol et: discord.gg/ghostcode"
                );
            if (value === undefined)
                throw new TypeError(
                    "Değer belirtilmedi. Yardıma mı ihtiyacınız var? Kontrol et: discord.gg/ghostcode"
                );
            return arbitrate("set", {
                id: key,
                data: value,
                ops: ops || {},
            });
        },

        /**
         * This function adds a number to a key in the database. (If no existing number, it will add to 0)
         * @param {key} input any string as a key. Also allows for dot notation following the key.
         * @param {options} [input={ target: null }] Any options to be added to the request.
         * @returns {data} the updated data.
         */

        add: function (key, value, ops) {
            if (!key)
                throw new TypeError(
                    "Anahtar belirtilmedi. Yardıma mı ihtiyacınız var? Kontrol et: discord.gg/ghostcode"
                );
            if (isNaN(value))
                throw new TypeError(
                    "Eklenecek değer belirtilmelidir. Yardıma mı ihtiyacınız var? Kontrol et: discord.gg/ghostcode"
                );
            return arbitrate("add", { id: key, data: value, ops: ops || {} });
        },

        /**
         * This function subtracts a number to a key in the database. (If no existing number, it will subtract from 0)
         * @param {key} input any string as a key. Also allows for dot notation following the key.
         * @param {options} [input={ target: null }] Any options to be added to the request.
         * @returns {data} the updated data.
         */

        subtract: function (key, value, ops) {
            if (!key)
                throw new TypeError(
                    "Anahtar belirtilmedi. Yardıma mı ihtiyacınız var? Kontrol et: discord.gg/ghostcode"
                );
            if (isNaN(value))
                throw new TypeError(
                    "Eklenecek değer belirtilmelidir. Yardıma mı ihtiyacınız var? Kontrol et: discord.gg/ghostcode"
                );
            return arbitrate("subtract", { id: key, data: value, ops: ops || {} });
        },

        /**
         * This function will push into an array in the database based on the key. (If no existing array, it will create one)
         * @param {key} input any string as a key. Also allows for dot notation following the key.
         * @param {options} [input={ target: null }] Any options to be added to the request.
         * @returns {data} the updated data.
         */

        push: function (key, value, ops) {
            if (!key)
                throw new TypeError(
                    "Anahtar belirtilmedi. Yardıma mı ihtiyacınız var? Kontrol et: discord.gg/ghostcode"
                );
            if (!value && value != 0)
                throw new TypeError(
                    "Eklenecek değer belirtilmelidir. Yardıma mı ihtiyacınız var? Kontrol et: discord.gg/ghostcode"
                );
            return arbitrate("push", {
                id: key,
                data: value,
                ops: ops || {},
            });
        },

        /**

     */

        /**
         * This function will delete an object (or property) in the database.
         * @param {key} input any string as a key. Also allows for dot notation following the key, this will delete the prop in the object.
         * @param {options} [input={ target: null }] Any options to be added to the request.
         * @returns {boolean} if it was a success or not.
         */

        delete: function (key, ops) {
            if (!key)
                throw new TypeError(
                    "Anahtar belirtilmedi. Yardıma mı ihtiyacınız var? Kontrol et: discord.gg/ghostcode"
                );
            return arbitrate("delete", { id: key, ops: ops || {} });
        },

        /**
         * This function returns a boolean indicating whether an element with the specified key exists or not.
         * @param {key} input any string as a key. Also allows for dot notation following the key, this will return if the prop exists or not.
         * @param {options} [input={ target: null }] Any options to be added to the request.
         * @returns {boolean} if it exists.
         */

        has: function (key, ops) {
            if (!key)
                throw new TypeError(
                    "Anahtar belirtilmedi. Yardıma mı ihtiyacınız var? Kontrol et: discord.gg/ghostcode"
                );
            return arbitrate("has", { id: key, ops: ops || {} });
        },

        includes: function (key, ops) {
            if (!key)
                throw new TypeError(
                    "Anahtar belirtilmedi. Yardıma mı ihtiyacınız var? Kontrol et: discord.gg/ghostcode"
                );
            return arbitrate("has", { id: key, ops: ops || {} });
        },

        /**
         * This function fetches the entire active table
         * @param {options} [input={ target: null }] Any options to be added to the request.
         * @returns {boolean} if it exists.
         */

        all: function (ops) {
            return arbitrate("all", { ops: ops || {} });
        },

        fetchAll: function (ops) {
            return arbitrate("all", { ops: ops || {} });
        },

        /*
         * Used to get the type of the value.
         */

        type: function (key, ops) {
            if (!key)
                throw new TypeError(
                    "Anahtar belirtilmedi. Yardıma mı ihtiyacınız var? Kontrol et: discord.gg/ghostcode"
                );
            return arbitrate("type", { id: key, ops: ops || {} });
        },

        /**
         * Using 'new' on this function creates a new instance of a table.
         * @param {name} input any string as the name of the table.
         * @param {options} options.
         */

        table: function (tableName, options = {}) {
            // Set Name
            if (typeof tableName !== "string")
                throw new TypeError(
                    "Tablo adı bir dize olmalıdır. Yardıma mı ihtiyacınız var? Kontrol et: discord.gg/ghsotcode"
                );
            else if (tableName.includes(" "))
                throw new TypeError(
                    "Tablo adı boşluk içeremez. Yardıma mı ihtiyacınız var? Kontrol et: discord.gg/ghostcode"
                );
            this.tableName = tableName;

            // Methods
            this.fetch = function (key, ops) {
                if (!key)
                    throw new TypeError(
                        "Anahtar belirtilmedi. Yardıma mı ihtiyacınız var? Kontrol et: discord.gg/ghostcode"
                    );
                return arbitrate(
                    "fetch",
                    { id: key, ops: ops || {} },
                    this.tableName
                );
            };

            this.get = function (key, ops) {
                if (!key)
                    throw new TypeError(
                        "Anahtar belirtilmedi. Yardıma mı ihtiyacınız var? Kontrol et: discord.gg/ghostcode"
                    );
                return arbitrate(
                    "fetch",
                    { id: key, ops: ops || {} },
                    this.tableName
                );
            };

            this.set = function (key, value, ops) {
                if (!key)
                    throw new TypeError(
                        "Anahtar belirtilmedi. Yardıma mı ihtiyacınız var? Kontrol et: discord.gg/ghostcode"
                    );
                if (!value && value != 0)
                    throw new TypeError(
                        "Değer belirtilmedi. Yardıma mı ihtiyacınız var? Kontrol et: discord.gg/ghostcode"
                    );
                return arbitrate(
                    "set",
                    { id: key, data: value, ops: ops || {} },
                    this.tableName
                );
            };

            this.add = function (key, value, ops) {
                if (!key)
                    throw new TypeError(
                        "Anahtar belirtilmedi. Yardıma mı ihtiyacınız var? Kontrol et: discord.gg/ghostcode"
                    );
                if (isNaN(value))
                    throw new TypeError(
                        "Eklenecek değer belirtilmelidir. Yardıma mı ihtiyacınız var? Kontrol et: discord.gg/ghostcode"
                    );
                return arbitrate(
                    "add",
                    { id: key, data: value, ops: ops || {} },
                    this.tableName
                );
            };

            this.subtract = function (key, value, ops) {
                if (!key)
                    throw new TypeError(
                        "Anahtar belirtilmedi. Yardıma mı ihtiyacınız var? Kontrol et: discord.gg/ghostcode"
                    );
                if (isNaN(value))
                    throw new TypeError(
                        "Eklenecek değer belirtilmelidir. Yardıma mı ihtiyacınız var? Kontrol et: discord.gg/ghostcode"
                    );
                return arbitrate(
                    "subtract",
                    { id: key, data: value, ops: ops || {} },
                    this.tableName
                );
            };

            this.push = function (key, value, ops) {
                if (!key)
                    throw new TypeError(
                        "Anahtar belirtilmedi. Yardıma mı ihtiyacınız var? Kontrol et: discord.gg/ghostcode"
                    );
                if (!value && value != 0)
                    throw new TypeError(
                        "Eklenecek değer belirtilmelidir. Yardıma mı ihtiyacınız var? Kontrol et: discord.gg/ghostcode"
                    );
                return arbitrate(
                    "push",
                    { id: key, data: value, ops: ops || {} },
                    this.tableName
                );
            };

            this.delete = function (key, ops) {
                if (!key)
                    throw new TypeError(
                        "Anahtar belirtilmedi. Yardıma mı ihtiyacınız var? Kontrol et: discord.gg/ghostcode"
                    );
                return arbitrate(
                    "delete",
                    { id: key, ops: ops || {} },
                    this.tableName
                );
            };

            this.has = function (key, ops) {
                if (!key)
                    throw new TypeError(
                        "Anahtar belirtilmedi. Yardıma mı ihtiyacınız var? Kontrol et: discord.gg/ghostcode"
                    );
                return arbitrate(
                    "has",
                    { id: key, ops: ops || {} },
                    this.tableName
                );
            };

            this.includes = function (key, ops) {
                if (!key)
                    throw new TypeError(
                        "Anahtar belirtilmedi. Yardıma mı ihtiyacınız var? Kontrol et: discord.gg/ghostcode"
                    );
                return arbitrate(
                    "has",
                    { id: key, ops: ops || {} },
                    this.tableName
                );
            };

            this.fetchAll = function (ops) {
                return arbitrate("all", { ops: ops || {} }, this.tableName);
            };

            this.all = function (ops) {
                return arbitrate("all", { ops: ops || {} }, this.tableName);
            };
        },
    };

    function arbitrate(method, params, tableName) {
        // Configure Options
        let options = {
            table: tableName || params.ops.table || "json",
        };

        // Access Database
        db.prepare(
            `${options.table} (KİMLİK METİN, json METİN) MEVCUT DEĞİLSE TABLO OLUŞTUR`
        ).run();

        // Verify Options
        if (params.ops.target && params.ops.target[0] === ".")
            params.ops.target = params.ops.target.slice(1); // Remove prefix if necessary
        if (params.data && params.data === Infinity)
            throw new TypeError(
                `Infinity'yi veritabanına @ ID: ${params.id} olarak ayarlayamazsınız`
            );

        // Stringify
        try {
            params.data = JSON.stringify(params.data);
        } catch (e) {
            throw new TypeError(
                `Lütfen geçerli bir kimlik girin @ ID: ${params.id}\nHata: ${e.message}`
            );
        }

        // Translate dot notation from keys
        if (params.id && params.id.includes(".")) {
            let unparsed = params.id.split(".");
            params.id = unparsed.shift();
            params.ops.target = unparsed.join(".");
        }

        // Run & Return Method
        return methods[method](db, params, options);
    }
    
    return module;
}
