use("db2")

// db.createCollection("courses")
// db.courses.insertOne({
//     name:"Web dev course",
//     price:10000,
//     Instructor:"Xeerak"
// })

// db.courses.insertOne({
//     name:"FULLSTACK",
//     price:500,
//     Instructor:"Xeerak"
// })

// let a=db.courses.find({price:500})
// console.log(a)
// console.log(a.count())

// //UPDATING RECORDS

// // db.courses.updateMany({price:10000},{$set:{price:8000}})
// // db.courses.updateOne({price:2000},{$set:{price:1500}})


// //DELETING RECORDS

// // db.courses.deleteOne({price:8000})
// db.courses.deleteMany({price:8000})

// db.createCollection("products")


// db.products.insertMany([{ 
//   _id: 1,
//   name: "Coffee Mug",
//   price: 12.99,
//   category: "Kitchen",
//   tags: ["drinkware", "ceramic"],
//   ratings: [5,4,4,3],
//   inStock: true,
//   dimensions: { length: 4, width: 3, height: 3 },
//   location: { type: "Point", coordinates: [ -73.97, 40.77 ] },
//   createdAt: ISODate("2025-05-20")
// },
// { 
//   _id: 2,
//   name: "Notebook",
//   price: 4.50,
//   category: "Stationery",
//   tags: ["paper","school"],
//   ratings: [3,3,2],
//   inStock: false,
//   dimensions: { length: 8, width: 5, height: 0.5 },
//   location: { type: "Point", coordinates: [ -73.88, 40.69 ] },
//   createdAt: ISODate("2025-05-25")
// }])


// $eq: price equal to 12.99
db.products.find({ price: { $eq: 12.99 } });

// $gt: price greater than 10
db.products.find({ price: { $gt: 10 } });

// $gte: price ≥ 12.99
db.products.find({ price: { $gte: 12.99 } });

// $lt: price less than 5
db.products.find({ price: { $lt: 5 } });

// $lte: price ≤ 4.50
db.products.find({ price: { $lte: 4.50 } });

// $ne: category not equal to "Kitchen"
db.products.find({ category: { $ne: "Kitchen" } });

// $in: category is either "Kitchen" or "Stationery"
db.products.find({ category: { $in: ["Kitchen","Stationery"] } });

// $nin: category is neither "Kitchen" nor "Stationery"
db.products.find({ category: { $nin: ["Kitchen","Stationery"] } });


// $and: inStock is true AND price > 10
db.products.find({
  $and: [
    { inStock: true },
    { price: { $gt: 10 } }
  ]
});

// $or: either category is "Kitchen" OR inStock is false
db.products.find({
  $or: [
    { category: "Kitchen" },
    { inStock: false }
  ]
});

// $nor: neither price < 5 NOR inStock is true
db.products.find({
  $nor: [
    { price: { $lt: 5 } },
    { inStock: true }
  ]
});

// $not: invert a predicate—in this case, price NOT ≥ 12.99
db.products.find({
  price: { $not: { $gte: 12.99 } }
});



// $exists: documents that have the field "dimensions"
db.products.find({ dimensions: { $exists: true } });

// $type: documents where "tags" is an array
db.products.find({ tags: { $type: "array" } });


// $expr: compare two fields—find docs where price > (average rating * 2)
db.products.find({
  $expr: { $gt: ["$price", { $multiply: [{ $avg: "$ratings" }, 2] }] }
});

// $jsonSchema: validate against a schema (e.g., name must be string, price number)
db.products.find({
  $jsonSchema: {
    bsonType: "object",
    required: ["name","price"],
    properties: {
      name: { bsonType: "string" },
      price: { bsonType: "double" }
    }
  }
});

// $mod: find docs where price % 1 == 0.99
db.products.find({ price: { $mod: [1, 0.99] } });

// $regex: name contains "note" (case-insensitive)
db.products.find({ name: { $regex: /note/i } });

// $text: text search on a text index (assumes you’ve run `db.products.createIndex({ name: "text", tags: "text" })`)
db.products.find({ $text: { $search: "ceramic" } });

// $where: use a JavaScript expression—find docs with more ratings than tags
db.products.find({
  $where: "this.ratings.length > this.tags.length"
});


// Ensure a 2dsphere index on location:
db.products.createIndex({ location: "2dsphere" });

// $near: find products within ~5 km of a point
db.products.find({
  location: {
    $near: {
      $geometry: { type: "Point", coordinates: [ -73.96, 40.75 ] },
      $maxDistance: 5000
    }
  }
});

// $geoWithin: find products inside a polygon
db.products.find({
  location: {
    $geoWithin: {
      $geometry: {
        type: "Polygon",
        coordinates: [[
          [ -73.99, 40.70 ],
          [ -73.99, 40.80 ],
          [ -73.90, 40.80 ],
          [ -73.90, 40.70 ],
          [ -73.99, 40.70 ]
        ]]
      }
    }
  }
});

// $geoIntersects: find products whose location intersects a given polygon
db.products.find({
  location: {
    $geoIntersects: {
      $geometry: {
        type: "Polygon",
        coordinates: [[
          [ -73.98, 40.72 ],
          [ -73.98, 40.78 ],
          [ -73.92, 40.78 ],
          [ -73.92, 40.72 ],
          [ -73.98, 40.72 ]
        ]]
      }
    }
  }
});


// $all: tags must include both "ceramic" AND "drinkware"
db.products.find({ tags: { $all: ["ceramic","drinkware"] } });

// $size: tags array has exactly 2 elements
db.products.find({ tags: { $size: 2 } });

// $elemMatch (query): find docs with at least one rating ≥ 5
db.products.find({ ratings: { $elemMatch: { $gte: 5 } } });

// $elemMatch (projection): only project the first rating ≥ 4
db.products.find(
  { }, 
  { ratings: { $elemMatch: { $gte: 4 } } }
);


// Assume bitMaskField holds an integer with feature flags…

// $bitsAllSet: all of bits 0 and 2 are 1
db.products.find({ bitMaskField: { $bitsAllSet: [0,2] } });

// $bitsAllClear: bits 1 and 3 are 0
db.products.find({ bitMaskField: { $bitsAllClear: [1,3] } });

// $bitsAnySet: any of bits 4 or 5 is 1
db.products.find({ bitMaskField: { $bitsAnySet: [4,5] } });

// $bitsAnyClear: any of bits 6 or 7 is 0
db.products.find({ bitMaskField: { $bitsAnyClear: [6,7] } });


// $: project the first array element in "ratings" that matches filter price > 10
db.products.find(
  { price: { $gt: 10 } },
  { "ratings.$": 1 }
);

// $elemMatch (projection): as above, but with explicit condition
db.products.find(
  { },
  { ratings: { $elemMatch: { $gte: 4 } } }
);

// $slice: get only the first two ratings
db.products.find(
  { },
  { ratings: { $slice: 2 } }
);

// $meta: project text‐search score (requires a $text query)
db.products.find(
  { $text: { $search: "drinkware" } },
  { score: { $meta: "textScore" } }
);


// $rand (in aggregation): add a random value to each doc
db.products.aggregate([
  { $addFields: { randomSort: { $rand: {} } } },
  { $sort: { randomSort: 1 } }
]);

// $natural: return in reverse insertion order (newest first)
db.products.find().sort({ $natural: -1 }).limit(5);
