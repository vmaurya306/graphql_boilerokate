import mongoose, { Document, Schema, Model } from 'mongoose';

interface IRole extends Document {
    name: string;
    code: string;
    permission: string;
}

interface UserInterface extends Document {
    fullName: string;
    email: string;
    experience: string;
    companyName: string;
    role: IRole;
}

interface UserModel extends Model<UserInterface> {
    findByIds(ids: string[]): Promise<UserInterface[]>;
}

const userSchema = new Schema<UserInterface, UserModel>({
    email: { type: String, required: true, unique: true },
    fullName: { type: String },
    experience: { type: String },
    companyName: { type: String },
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
});

userSchema.statics.findMany = async function (ids: string[]): Promise<UserInterface[]> {
    return await this.find({ _id: { $in: ids } });
};

const User = mongoose.model<UserInterface, UserModel>('User', userSchema);

export { User };
