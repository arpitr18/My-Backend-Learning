db.cars.aggregate([
  { $match: { maker: "Hyundai" } },
  { $group: { _id: "$fuel_type", TotalCars: { $sum: 1 } } },
]);

db.cars.aggregate([
  { $match: { maker: "Hyundai" } },
  {
    $project: {
      _id: 0,
      brand: "$maker",
      Fuel: "$fuel_type",
    },
  },
]);

db.cars.aggregate([
  { $match: { maker: "Hyundai" } },
  {
    $project: {
      _id: 0,
      brand: "$maker",
      Model: "$model",
      Fuel: "$fuel_type",
    },
  },
  { $sort: { Model: -1 } },
]);

db.cars.aggregate([
  {
    $group: {
      _id: "$maker", // Group by the maker
      count: { $sum: 1 }, // Count the number of cars for each maker
    },
  },
  {
    $sort: { count: -1 }, // Sort by the maker (which is now the _id)
  },
]);
//☝️❌
// use below instead of above
//👇✅
db.cars.aggregate([{ $sortByCount: "$maker" }]);

db.cars.aggregate([{ $unwind: "$owners" }]);

// String Operators in Aggregate Framework

db.cars.aggregate([
  { $match: { maker: "Hyundai" } },
  { $project: { _id: 0, CarName: { $concat: ["$maker", " ", "$model"] } } },
]);

db.cars.aggregate([
  {
    $project: {
      _id: 0,
      model: 1,
      is_Diesel: {
        $regexMatch: {
          input: "$fuel_type",
          regex: "Dies",
        },
      },
    },
  },
]);

db.cars.aggregate([
  { $match: { maker: "Hyundai" } },
  { $project: { _id: 0, CarName: { $concat: ["$maker", " ", "$model"] } } },
  { $out: "Hyundai_cars" },
]);
