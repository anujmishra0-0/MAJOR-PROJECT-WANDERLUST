const Joi = require('joi');

// Valid listing categories for Wanderlust
const VALID_CATEGORIES = [
    'Beach',
    'Mountain',
    'Camping',
    'Heritage',
    'Countryside',
    'City',
    'Desert',
    'Lakeside',
    'Treehouse',
    'Other'
];

// Valid amenities a host can list
const VALID_AMENITIES = [
    'WiFi',
    'AC',
    'Parking',
    'Kitchen',
    'Pool',
    'Pet Friendly',
    'Wheelchair Accessible',
    'Heating',
    'Washer',
    'TV'
];

/**
 * Joi validation schema for Listing creation and updates.
 * Enforces field types, lengths, and allowed values before
 * any data reaches the database.
 */
module.exports.listingSchema = Joi.object({
    listing: Joi.object({

        title: Joi.string().min(5).max(100).required()
            .messages({
                'string.min': 'Title must be at least 5 characters long.',
                'string.max': 'Title cannot exceed 100 characters.',
                'any.required': 'A listing title is required.'
            }),

        description: Joi.string().min(10).max(1000).required()
            .messages({
                'string.min': 'Description must be at least 10 characters.',
                'string.max': 'Description cannot exceed 1000 characters.',
                'any.required': 'Please provide a description for your listing.'
            }),

        location: Joi.string().required()
            .messages({ 'any.required': 'Location is required.' }),

        country: Joi.string().required()
            .messages({ 'any.required': 'Country is required.' }),

        price: Joi.number().required().min(1).max(100000)
            .messages({
                'number.base': 'Price must be a number.',
                'number.min': 'Price must be at least ₹1.',
                'number.max': 'Price cannot exceed ₹1,00,000 per night.',
                'any.required': 'Please set a price for your listing.'
            }),

        image: Joi.string().uri({ allowRelative: false }).allow('', null)
            .messages({ 'string.uri': 'Image must be a valid URL.' }),

        category: Joi.string().valid(...VALID_CATEGORIES).default('Other')
            .messages({
                'any.only': `Category must be one of: ${VALID_CATEGORIES.join(', ')}.`
            }),

        amenities: Joi.array()
            .items(Joi.string().valid(...VALID_AMENITIES))
            .max(10)
            .default([])
            .messages({
                'array.max': 'You can add a maximum of 10 amenities.',
                'any.only': `Each amenity must be one of: ${VALID_AMENITIES.join(', ')}.`
            }),

        maxGuests: Joi.number().integer().min(1).max(50).default(1)
            .messages({
                'number.min': 'At least 1 guest must be allowed.',
                'number.max': 'Max guests cannot exceed 50.',
                'number.integer': 'Max guests must be a whole number.'
            }),

        contactEmail: Joi.string().email({ tlds: { allow: false } }).allow('', null)
            .messages({ 'string.email': 'Please provide a valid contact email.' }),

    }).required()
});

/**
 * Joi validation schema for Reviews.
 * Validates rating range and minimum comment length.
 * Optionally captures what kind of trip the reviewer was on.
 */
module.exports.reviewSchema = Joi.object({
    review: Joi.object({

        rating: Joi.number().integer().required().min(1).max(5)
            .messages({
                'number.min': 'Rating must be between 1 and 5.',
                'number.max': 'Rating must be between 1 and 5.',
                'number.integer': 'Rating must be a whole number.',
                'any.required': 'Please provide a rating.'
            }),

        comment: Joi.string().min(5).max(500).required()
            .messages({
                'string.min': 'Your review must be at least 5 characters.',
                'string.max': 'Review cannot exceed 500 characters.',
                'any.required': 'Please write a comment for your review.'
            }),

        tripType: Joi.string()
            .valid('Solo', 'Couple', 'Family', 'Group', 'Business')
            .allow('', null)
            .messages({
                'any.only': 'Trip type must be Solo, Couple, Family, Group, or Business.'
            }),

    }).required()
});

// Export constants so models and views can reuse them
module.exports.VALID_CATEGORIES = VALID_CATEGORIES;
module.exports.VALID_AMENITIES = VALID_AMENITIES;
