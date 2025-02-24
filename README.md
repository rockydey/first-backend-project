# Module Pattern

## Architecture

graph LR
A[Interface] --> B[Schema]
B --> C[Model]
C --> D[DB Query]
E[.interface.ts] --> F[.model.ts]
F --> G[.route.ts]
G --> H[.controller.ts]
H --> I[.service.ts]

### Request-Response Flow

1. **Client** => (req) **route.ts**
2. **route.ts** => (req) **controller.ts**
3. **controller.ts** => (req) **service.ts**
4. **service.ts** => (req) **DB Query**
5. **DB Query** => (res) **service.ts**
6. **service.ts** => (res) **controller.ts**
7. **controller.ts** => (res) **Client**

---

## Mongoose Static Methods

- **Definition:** Used for defining model-level methods.
- **Flow:**

schema => statics => model => call on model

### Example

import mongoose, { Schema, Model, Document } from 'mongoose';

interface IUser extends Document {
username: string;
email: string;
}

interface IUserModel extends Model<IUser> {
findByEmail(email: string): Promise<IUser | null>;
}

const UserSchema = new Schema<IUser>({
username: { type: String, required: true },
email: { type: String, required: true, unique: true },
});

UserSchema.statics.findByEmail = function (email: string) {
return this.findOne({ email });
};

const User = mongoose.model<IUser, IUserModel>('User', UserSchema);

export default User;

### Usage

const user = await User.findByEmail('test@example.com');

---

## Mongoose Instance Methods

- **Definition:** Used for defining instance-level methods.
- **Flow:**

schema => methods => model => instance => call on instance

### Example

import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
username: string;
email: string;
getDisplayName(): string;
}

const UserSchema = new Schema<IUser>({
username: { type: String, required: true },
email: { type: String, required: true, unique: true },
});

UserSchema.methods.getDisplayName = function () {
return `User: ${this.username}`;
};

const User = mongoose.model<IUser>('User', UserSchema);

export default User;

### Usage

const user = await User.findOne({ username: 'JohnDoe' });
if (user) {
console.log(user.getDisplayName());
}
