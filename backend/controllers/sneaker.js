const data = require("../data/data.json");

// Get all sneakers
exports.getSneakers = (req, res) => {
    console.log(`req on ${req.url}`);
    const sneakers = data.sneakers;
    console.log(`${sneakers.length} sneakers found`);
    if (!sneakers) {
        return res.status(404).json({
            code: '404 Not Found',
            message: 'No sneakers found'
        });
    }
    return res.status(200).json({
        code: '200 Ok',
        sneakers
    })
};

// Get a sneaker by id
exports.getSneakerById = (req, res) => {
    console.log(`req on ${req.url}`);
    const sneakerId = parseInt(req.params.id);
    const sneakers = data.sneakers;
    if (!sneakerId) {
        console.log('No sneakerId found');
        return res.status(404).json({
            code: '404 Not Found',
            message: 'No id provided'
        });
    }
    const sneaker = sneakers.find(s => s.id === sneakerId);
    if (!sneaker) {
        console.log(`sneaker ${sneakerId} not found`);
        return res.status(404).json({
            code: '404 Not Found',
            message: 'Sneaker Not Found'
        });
    }
    console.log(`sneaker ${sneakerId} found`);
    return res.status(200).json({
        code: '200 Ok',
        sneaker
    });
}