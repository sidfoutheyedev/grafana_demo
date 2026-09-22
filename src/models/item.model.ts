import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true, min: 0 },
  },
  { timestamps: true },
);

const ItemModel = mongoose.model("Item", itemSchema);

export const createItem = (data: any) => ItemModel.create(data);
export const findItems = () => ItemModel.find().sort({ createdAt: -1 });
export const findItemById = (id: string) => ItemModel.findById(id).catch(() => null);
export const updateItemById = (id: string, data: any) => ItemModel.findByIdAndUpdate(id, data, { new: true, runValidators: true }).catch(() => null);
export const deleteItemById = (id: string) => ItemModel.findByIdAndDelete(id).catch(() => null);
