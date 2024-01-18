

import mongoose, { Document, Schema, Model } from 'mongoose';

interface UserInterface extends Document {
  fullName: string;
  email: string; 
  experience: string;
  companyName: string;
}

interface UserModel extends Model<UserInterface> {
  findByIds(ids: string[]): Promise<UserInterface[]>;
}

const userSchema = new Schema<UserInterface, UserModel>({
  email: { type: String, required: true, unique: true },
  fullName:{type: String},
  experience: {type: String},
  companyName: {type: String}
});

userSchema.statics.findByIds = function (ids: string[]): Promise<UserInterface[]> {
  return this.find({ _id: { $in: ids } }).exec();
};

const User = mongoose.model<UserInterface, UserModel>('User', userSchema);

export { User };