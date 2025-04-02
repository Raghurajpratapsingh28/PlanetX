const Warehouse = require("../modals/PropertyModals/WarehouseSchema.js");
const Residential = require("../modals/PropertyModals/ResidentialSchema.js");
const Hotel = require("../modals/PropertyModals/HotelSchema.js");
const Office = require("../modals/PropertyModals/OfficeSchema.js");
const SharedWarehouse = require("../modals/PropertyModals/SharedWarehouseSchema.js");
const Shop = require("../modals/PropertyModals/ShopSchema.js");
const EventSpace = require("../modals/PropertyModals/EventspaceSchema.js");
const dummyData = require("./test.js");
const connectDB = require("../config/db.js");
const { default: PG } = require("../modals/PropertyModals/pgSchema.js");

exports.pushTestData = async () => {
  try {
    console.log("Connecting to database");
    await connectDB();
    for (const data of dummyData) {
      switch (data.category) {
        case "Warehouse":
          const warehouse = new Warehouse(data);
          await warehouse.save();
          console.log("Warehouse data saved successfully");
          break;
        case "PG":
          const pg = new PG(data);
          await pg.save();
          console.log("PG data saved successfully");
          break;
        case "Residential":
          const residential = new Residential(data);
          await residential.save();
          console.log("Residential data saved successfully");
          break;
        case "Hotel":
          const hotel = new Hotel(data);
          await hotel.save();
          console.log("Hotel data saved successfully");
          break;
        case "Office":
          const office = new Office(data);
          await office.save();
          console.log("Office data saved successfully");
          break;
        case "Shared Warehouse":
          const sharedWarehouse = new SharedWarehouse(data);
          await sharedWarehouse.save();
          console.log("Shared Warehouse data saved successfully");
          break;
        case "Shop":
          const shop = new Shop(data);
          await shop.save();
          console.log("Shop data saved successfully");
          break;
        case "EventSpace":
          const eventSpace = new EventSpace(data);
          await eventSpace.save();
          console.log("Event Space data saved successfully");
          break;
        default:
          console.log("Unknown category");
      }
    }
  } catch (error) {
    console.error("Error saving test data:", error);
  }
};
