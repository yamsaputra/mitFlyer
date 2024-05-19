import Sequelize from "sequelize";

// Local database
/* const sequelize = new Sequelize("flyer_db", "Yama", "Redcharmander98", {
  host: "localhost",
  dialect: "mysql",
  dialectOptions: {
    connectTimeout: 60000,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
}); */

// Remote database
const sequelize = new Sequelize("sql11681953", "sql11681953", "TGyZWQrZ2R", {
  host: "sql11.freemysqlhosting.net",
  dialect: "mysql",
  dialectOptions: {
    connectTimeout: 60000,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

// Define the user model
const User = sequelize.define(
  "users",
  {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    fname: {
      type: Sequelize.STRING(45), // VARCHAR(45)
      allowNull: false,
    },
    lname: {
      type: Sequelize.STRING(45), // VARCHAR(45)
      allowNull: false,
    },
    age: {
      type: Sequelize.INTEGER, // VARCHAR(45)
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(45), // VARCHAR(45)
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING(60), // VARCHAR(45)
      allowNull: false,
    },
    rating: {
      type: Sequelize.DOUBLE,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

const Ride = sequelize.define(
  "rides",
  {
    ride_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    origin: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    destination: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    time: {
      type: Sequelize.TIME,
      allowNull: false,
    },
    price: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },
    email: {
      type: Sequelize.STRING(45),
      allowNull: false,
    }
  },
  {
    timestamps: false,
  }
);

const Book = sequelize.define("user_has_rides", {
  user_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  ride_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  is_sender: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});

// Sync the model with the database
User.sync({ alter: true })
  .then(() => {
    console.log("User model synchronized with the database.");
  })
  .catch((error) => {
    console.error("Error synchronizing User model:", error);
  });

Ride.sync({ alter: true })
  .then(() => {
    console.log("Ride model synchronized with the database.");
  })
  .catch((error) => {
    console.error("Error synchronizing Rides model:", error);
  });

Book.sync({ alter: true })
  .then(() => {
    console.log("Book model synchronized with the database.");
  })
  .catch((error) => {
    console.error("Error synchronizing Book model:", error);
  });

  User.belongsToMany(Ride, { through: Book, foreignKey: 'user_id' });
  Ride.belongsToMany(User, { through: Book, foreignKey: 'ride_id' });
  Book.belongsTo(Ride, { foreignKey: 'ride_id' });
  Book.belongsTo(User, { foreignKey: 'user_id' });

// Create a new user
async function register(fname, lname, age, email, hashedPassword) {
  try {
    const newUser = await User.create({
      fname,
      lname,
      age,
      email,
      password: hashedPassword,
    });
    console.log("User created successfully. Yeyuh!", newUser);
    return true;
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      console.log("User already exists.");
      return { success: false, message: "User already exists." };
    } else if (error.name === "SequelizeValidationError") {
      console.error("Validation error creating user:", error);
      return { success: false, message: "Validation error creating user." };
    } else if (error.name === "SequelizeDatabaseError") {
      console.error("Database error creating user:", error);
      return { success: false, message: "Database error creating user." };
    } else {
      console.error("Error creating user:", error);
      return { success: false, message: "Error creating user." };
    }
  }
}

// Create a new ride
async function registerRouteDB(bringDataBE) {
  try {

    const bringDataDB = {
      origin: bringDataBE.origin,
      destination: bringDataBE.destination,
      date: new Date(bringDataBE.date),
      time: bringDataBE.time,
      price: parseFloat(bringDataBE.price),
      description: bringDataBE.description,
      email: bringDataBE.email
    };

    const newRide = await Ride.create({
      origin: bringDataDB.origin,
      destination: bringDataDB.destination,
      date: bringDataDB.date,
      time: bringDataDB.time,
      price: bringDataDB.price,
      description: bringDataDB.description,
      email: bringDataDB.email
    });

    console.log("Ride created successfully. Yeyuh!", newRide);
    const newRideID = newRide.dataValues.ride_id;
    return newRideID;
  } catch (error) {
    console.error("Error creating ride:", error);
    return false;
  }
}

export { User, Ride, Book, register, registerRouteDB };
