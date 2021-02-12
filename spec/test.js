// Require Package
let melkadb = require("../index.js");

let db = melkadb();

// Methods (everything should be true)
console.log("Numara Ekleme:", typeof db.add("myNumber", 100) === "number");
console.log(
    "Verileri Ayarlama:",
    typeof db.set("myData", "Bu veriler burada") === "string"
);
console.log("Verileri Silme:", db.delete("myData"));
console.log("Silinmiş Verileri Getirme:", db.get("myData") === null);
console.log("Eklenen Numara Getiriliyor:", typeof db.get("myNumber") === "number");
console.log("Bir diziye gönderme:", db.push("myVal", "val") instanceof Array);
console.log("Dizinin ilk pervanesi getiriliyor:", db.get("myVal.0") === "val");
console.log(
    "Nesnede pervane ayarlama:",
    db.set("myObj.prop", "myProp").prop === "myProp"
);
console.log("Nesnede pervane getiriliyor:", db.get("myObj.prop") === "myProp");
console.log("Nesnede pervane silme:", db.delete("myObj.prop"));
console.log("Silinen destek alınıyor:", db.get("myObj.prop") === undefined);
console.log(
    "Sayılardan Çıkarma:",
    typeof db.subtract("myNumber", 50) === "number"
);
console.log(
    "Nesnede dizi içinde itme:",
    db.push("myObj.arr", "myItem").arr instanceof Array
);

// Setting an object in the database:
console.log(db.set("userInfo", { difficulty: "Easy" }));
// -> { difficulty: 'Easy' }

// Pushing an element to an array (that doesn't exist yet) in an object:
console.log(db.push("userInfo.items", "Sword"));
// -> { difficulty: 'Easy', items: ['Sword'] }

// Adding to a number (that doesn't exist yet) in an object:
console.log(db.add("userInfo.balance", 500));
// -> { difficulty: 'Easy', items: ['Sword'], balance: 500 }

// Repeating previous examples:
console.log(db.push("userInfo.items", "İzle"));
// -> { difficulty: 'Easy', items: ['Sword', 'Watch'], balance: 500 }
console.log(db.add("userInfo.balance", 500));
// -> { difficulty: 'Easy', items: ['Sword', 'Watch'], balance: 1000 }

// Fetching individual properties
console.log(db.get("userInfo.balance")); // -> 1000
console.log(db.get("userInfo.items")); // -> [ 'Sword', 'Watch' ]

// All function (doesn't return only strings)
console.log(!db.all().every(e => typeof e == "string")); // -> true
console.log(db.all()[3].data.items); // -> [ 'Sword', 'Watch' ]

// Fetching properties from specific tables
const test = new db.table("test");
test.set("data", "Merhaba Dünya");
console.log(db.get("data")); // -> null
console.log(db.get("data", { table: "test" })); // -> 'hello world'
console.log(test.get("data")); // -> 'hello world'