import mongoose, { Document, Schema, Model } from 'mongoose';

interface RoleInterface extends Document {
    name: string;
    code: string;
    permission: string;
}

interface RoleModel extends Model<RoleInterface> {
    findByIds(ids: string[]): Promise<RoleInterface[]>;
}

const roleSchema = new Schema<RoleInterface, RoleModel>({
    name: String,
    code: String,
    permission: String,
});

roleSchema.statics.findByIds = async function (ids: string[]): Promise<RoleInterface[]> {
    return await this.find({ _id: { $in: ids } });
};

const Role = mongoose.model<RoleInterface, RoleModel>('Role', roleSchema);

export default Role;
