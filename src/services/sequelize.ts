import * as dotenv from 'dotenv'

import { DataTypes, Sequelize } from 'sequelize'

import { SequelizeModels } from '../typescript'

dotenv.config()

export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  ssl: false,
  dialect: 'postgres',
})

const baseAttributes = {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
}

// movella

const Category = sequelize.define<SequelizeModels.CategoryInstance>(
  'category',
  {
    ...baseAttributes,
    name: DataTypes.STRING,
  }
)

const Furniture = sequelize.define<SequelizeModels.FurnitureInstance>(
  'furniture',
  {
    ...baseAttributes,
    available: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    depth: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    description: DataTypes.TEXT,
    height: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    monthlyCost: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    width: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  }
)

const Payment = sequelize.define<SequelizeModels.PaymentInstance>('payment', {
  ...baseAttributes,
  key: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['cpf']],
    },
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
})

const Rent = sequelize.define<SequelizeModels.RentInstance>('rent', {
  ...baseAttributes,
  deliveryCost: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  description: DataTypes.TEXT,
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  furnitureId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  monthlyCost: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  paymentKey: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  picture: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
})

const User = sequelize.define<SequelizeModels.UserInstance>('user', {
  ...baseAttributes,
  access: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['admin', 'verified', 'default']],
    },
  },
  city: DataTypes.STRING,
  country: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  line1: DataTypes.STRING,
  line2: DataTypes.STRING,
  password: {
    type: DataTypes.STRING(256),
    allowNull: false,
  },
  phone: DataTypes.STRING,
  picture: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: DataTypes.STRING,
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  zipCode: DataTypes.STRING,
})

// old

// const Post = sequelize.define('post', {
//   content: DataTypes.TEXT,
//   userId: DataTypes.INTEGER,
// })

// const FriendRequest = sequelize.define('friendrequest', {
//   requesteeId: DataTypes.INTEGER,
//   requesterId: DataTypes.INTEGER,
// })

// const Friend = sequelize.define('friend', {
//   user1Id: DataTypes.INTEGER,
//   user2Id: DataTypes.INTEGER,
// })

// const Like = sequelize.define('like', {
//   postId: DataTypes.INTEGER,
//   userId: DataTypes.INTEGER,
// })

// const Comment = sequelize.define('comment', {
//   content: DataTypes.STRING,
//   postId: DataTypes.INTEGER,
//   userId: DataTypes.INTEGER,
// })

// const Chat = sequelize.define('chat', {
//   user1Id: DataTypes.INTEGER,
//   user2Id: DataTypes.INTEGER,
// })

// const Message = sequelize.define('message', {
//   chatId: DataTypes.INTEGER,
//   content: DataTypes.STRING,
//   userId: DataTypes.INTEGER,
// })

User.prototype.toJSON = function () {
  let values = Object.assign({}, this.get())
  delete values.password

  return values
}

// movella

// Category -> Furniture

Category.hasMany(Furniture, { foreignKey: 'categoryId' })
Furniture.belongsTo(Category, { foreignKey: 'categoryId' })

// Furniture -> Rent

Furniture.hasMany(Rent, { foreignKey: 'furnitureId' })
Rent.belongsTo(Furniture, { foreignKey: 'furnitureId' })

// User -> Furniture

User.hasMany(Furniture, { foreignKey: 'userId' })
Furniture.belongsTo(User, { foreignKey: 'userId' })

// User -> Payment

User.hasMany(Payment, { foreignKey: 'userId' })
Payment.belongsTo(User, { foreignKey: 'userId' })

// User -> Rent

User.hasMany(Rent, { foreignKey: 'userId' })
Rent.belongsTo(User, { foreignKey: 'userId' })

// old

// // User -> Post

// User.hasMany(Post, { foreignKey: 'userId' })
// Post.belongsTo(User, { foreignKey: 'userId' })

// // User -> FriendRequest

// User.hasMany(FriendRequest, { foreignKey: 'requesterId' })
// FriendRequest.belongsTo(User, {
//   foreignKey: 'requesterId',
//   as: 'requesterUser',
// })
// User.hasMany(FriendRequest, { foreignKey: 'requesteeId' })
// FriendRequest.belongsTo(User, {
//   foreignKey: 'requesteeId',
//   as: 'requesteeUser',
// })

// // User -> Friend

// User.hasMany(Friend, { foreignKey: 'user1Id' })
// Friend.belongsTo(User, { foreignKey: 'user1Id', as: 'user1' })
// User.hasMany(Friend, { foreignKey: 'user2Id' })
// Friend.belongsTo(User, { foreignKey: 'user2Id', as: 'user2' })

// // Post -> Like

// Post.hasMany(Like, { foreignKey: 'postId' })
// Like.belongsTo(Post, { foreignKey: 'postId' })

// // User -> Like

// User.hasMany(Like, { foreignKey: 'userId' })
// Like.belongsTo(User, { foreignKey: 'userId' })

// // Post -> Comment

// Post.hasMany(Comment, { foreignKey: 'postId' })
// Comment.belongsTo(Post, { foreignKey: 'postId' })

// // User -> Comment

// User.hasMany(Comment, { foreignKey: 'userId' })
// Comment.belongsTo(User, { foreignKey: 'userId' })

// // User -> Chat

// User.hasMany(Chat, { foreignKey: 'user1Id' })
// Chat.belongsTo(User, { foreignKey: 'user1Id', as: 'user1' })
// User.hasMany(Chat, { foreignKey: 'user2Id' })
// Chat.belongsTo(User, { foreignKey: 'user2Id', as: 'user2' })

// // Chat -> Message

// Chat.hasMany(Message, { foreignKey: 'chatId' })
// Message.belongsTo(Chat, { foreignKey: 'chatId' })

// // User -> Message

// User.hasMany(Message, { foreignKey: 'userId' })
// Message.belongsTo(User, { foreignKey: 'userId' })

export const Models = {
  Category,
  Furniture,
  Payment,
  Rent,
  User,
  // Post,
  // FriendRequest,
  // Friend,
  // Like,
  // Comment,
  // Chat,
  // Message,
}
