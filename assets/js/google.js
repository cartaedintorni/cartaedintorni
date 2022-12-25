var genurl =function (mode,foglio) {return "https://sheets.googleapis.com/v4/spreadsheets/1opQsMabvYY9XBNyoX4jLiIz2VFDaVJ-6zYPruKAKNF4/"+mode+"/"+foglio+"?key=AIzaSyCqdr8_RYbGV1pkfrZ81blCKD8eNWWO9GA"}
var url = genurl("values","Prodotti")

var fetchAll = function (callback) {$.get(url,(a)=>{
    if (callback) callback(a)
})}

class Product {
    constructor(name, type, desc, img, price) {
        this.name=name
        this.type=type
        this.desc=desc
        this.img=img
        this.price=price
    }

    static fromArrays(ia) {
        var arr = Array.from(ia)
        var x = arr.shift().map(x=>x.toLowerCase())
        var i = {
            name: x.indexOf("nome"),
            type: x.indexOf("marca"),
            desc: x.indexOf("descrizione"),
            img: x.indexOf("foto"),
            price: x.indexOf("prezzo")
        }
        var prods = []
        arr.forEach(function (ap) {
            if (ap.length!=x.length) {return}
            prods.push(new Product(
                ap[i.name],
                ap[i.type],
                ap[i.desc],
                ap[i.img],
                ap[i.price]
            ))
        })
        return prods
    }
}
var log = ()=>{fetchAll((a)=>{console.log(Product.fromArrays(a.values))})}