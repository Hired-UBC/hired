import mongoose from 'mongoose';

const { String, Date } = mongoose.Schema.Types;

const SlotSchema = new mongoose.Schema(
    {
        date: {
            type: Date,
            required: true
        },
        time: {
            type: String,
            required: true
        },
        interviewees: {
            type: String,
            required: true
        },
        interviewers: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Slot = mongoose.model("Slot", SlotSchema);

module.exports = Slot;