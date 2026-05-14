const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

// These must match VALID_CATEGORIES and VALID_AMENITIES in schema.js exactly
const VALID_CATEGORIES = [
    'Beach', 'Mountain', 'Camping', 'Heritage',
    'Countryside', 'City', 'Desert', 'Lakeside', 'Treehouse', 'Other'
];

const VALID_AMENITIES = [
    'WiFi', 'AC', 'Parking', 'Kitchen', 'Pool',
    'Pet Friendly', 'Wheelchair Accessible', 'Heating', 'Washer', 'TV'
];

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100,
        trim: true,
    },
    description: {
        type: String,
        minlength: 10,
        maxlength: 1000,
        trim: true,
    },
    image: {
        url: String,
        filename: String,
    },
    price: {
        type: Number,
        min: 1,
        max: 100000,
    },
    location: {
        type: String,
        trim: true,
    },
    country: {
        type: String,
        trim: true,
    },

    // New fields
    category: {
        type: String,
        enum: VALID_CATEGORIES,
        default: "Other",
    },
    amenities: {
        type: [String],
        enum: VALID_AMENITIES,
        default: [],
    },
    maxGuests: {
        type: Number,
        min: 1,
        max: 50,
        default: 1,
    },
    contactEmail: {
        type: String,
        trim: true,
        default: "",
    },

    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
}, { timestamps: true });

// Cascade delete all reviews when a listing is removed
listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
