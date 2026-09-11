const Shelter = require('../models/Shelter');

// @desc    Create a new Emergency Shelter
// @route   POST /api/shelters
// @access  Public / Private
exports.createShelter = async (req, res) => {
  try {
    const { name, district, town, capacity, contactPhone, facilities, longitude, latitude, address } = req.body;

    const newShelter = new Shelter({
      name,
      district,
      town,
      address: address || `${town}, ${district}`,
      capacity,
      contactPhone,
      facilities: facilities || '',
      ...(longitude && latitude && {
        location: {
          type: 'Point',
          coordinates: [parseFloat(longitude), parseFloat(latitude)]
        }
      })
    });

    const savedShelter = await newShelter.save();
    res.status(201).json(savedShelter);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get all Emergency Shelters
// @route   GET /api/shelters
// @access  Public
exports.getAllShelters = async (req, res) => {
  try {
    const shelters = await Shelter.find().sort({ createdAt: -1 });
    res.json(shelters);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update Shelter Occupancy or Status
// @route   PUT /api/shelters/:id
// @access  Private
exports.updateShelter = async (req, res) => {
  try {
    const { currentOccupancy, status } = req.body;

    const shelter = await Shelter.findById(req.params.id);
    if (!shelter) {
      return res.status(404).json({ message: 'Shelter not found' });
    }

    if (currentOccupancy !== undefined) shelter.currentOccupancy = currentOccupancy;
    if (status) shelter.status = status;

    const updatedShelter = await shelter.save();
    res.json(updatedShelter);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get shelters near a specific location
// @route   GET /api/shelters/nearby?longitude=80.2170&latitude=6.0535&dist=5000
// @access  Public
exports.getNearbyShelters = async (req, res) => {
  try {
    const { longitude, latitude, dist } = req.query;

    if (!longitude || !latitude) {
      return res.status(400).json({ message: 'Longitude and latitude are required' });
    }

    const maxDistanceInMeters = dist ? parseInt(dist) : 5000;

    const shelters = await Shelter.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: maxDistanceInMeters
        }
      }
    });

    res.json(shelters);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};