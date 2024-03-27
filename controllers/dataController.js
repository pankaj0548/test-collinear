const axios = require('axios');

exports.getData = (req, res) => {
    // Your implementation here


const params = {
    // search: 'text classification', // Search for datasets containing the keyword 'text classification'
    // tags: 'text', // Filter datasets by the 'text' tag
    // categories: 'text',
    limit: 10,
    offset: 0,
    // sort_by: 'name'
};

// Make GET request with parameters
axios.get('https://huggingface.co/api/datasets', { params })
    .then(response => {
        // console.log(response.data);
        res.json(response.data)
    })
    .catch(error => {
        console.error('Error fetching datasets:', error);
    });
};

exports.getFollowedData = (req, res) => {
    console.log("followed Data")
}

exports.getDatasetById = async (req, res) => {
    try {
      const datasetId = req.params.id;
      const dataset = await Dataset.findById(datasetId);
      
      if (!dataset) {
        return res.status(404).json({ error: 'Dataset not found' });
      }
      
      res.json(dataset);
    } catch (error) {
      console.error('Error getting dataset by ID:', error);
      res.status(500).json({ error: 'An error occurred while getting dataset by ID' });
    }
  };