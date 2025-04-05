// const Warehouse = require("../modals/PropertyModals/WarehouseSchema.js");
// const Residential = require("../modals/PropertyModals/ResidentialSchema.js");
// const Hotel = require("../modals/PropertyModals/HotelSchema.js");
// const Office = require("../modals/PropertyModals/OfficeSchema.js");
// const SharedWarehouse = require("../modals/PropertyModals/SharedWarehouseSchema.js");
// const Shop = require("../modals/PropertyModals/ShopSchema.js");
// const EventSpace = require("../modals/PropertyModals/EventspaceSchema.js");
// const dummyData = require("./test.js");
// const connectDB = require("../config/db.js");
// const PG = require("../modals/PropertyModals/pgSchema.js"); 

// const pushTestData = async () => {
//   try {
//     console.log("Connecting to database");
//     await connectDB();
    
//     for (const data of dummyData) {
//       switch (data.category) {
//         case "Warehouse":
//           await new Warehouse(data).save();
//           console.log("Warehouse data saved successfully");
//           break;
//         case "PG":
//           await new PG(data).save();
//           console.log("PG data saved successfully");
//           break;
//         case "Residential":
//           await new Residential(data).save();
//           console.log("Residential data saved successfully");
//           break;
//         case "Hotel":
//           await new Hotel(data).save();
//           console.log("Hotel data saved successfully");
//           break;
//         case "Office":
//           await new Office(data).save();
//           console.log("Office data saved successfully");
//           break;
//         case "Shared Warehouse":
//           await new SharedWarehouse(data).save();
//           console.log("Shared Warehouse data saved successfully");
//           break;
//         case "Shop":
//           await new Shop(data).save();
//           console.log("Shop data saved successfully");
//           break;
//         case "EventSpace":
//           await new EventSpace(data).save();
//           console.log("Event Space data saved successfully");
//           break;
//         default:
//           console.log("Unknown category");
//       }
//     }
//   } catch (error) {
//     console.error("Error saving test data:", error);
//   }
// };

// module.exports = { pushTestData };
