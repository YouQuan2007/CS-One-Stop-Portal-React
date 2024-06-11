import mongoose from "mongoose";

const UserPermissionsSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'students', required: true },
    resourceId: { type: mongoose.Schema.Types.ObjectId, ref: 'resourcesdetails', required: true },
    accessLevel: { type: String, enum: ['read', 'write'], required: true, default: 'read' }
  });
  
  const UserPermissionsModel = mongoose.model("UserPermissions", UserPermissionsSchema);

  export { UserPermissionsModel as UserPermissions }