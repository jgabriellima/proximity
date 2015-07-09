module.exports = {
  attributes: {
    id: {
      type: 'string',
      primaryKey: true
    },
    lat: {
      type: 'string'
    },
    lng: {
      type: 'string'
    },
    beaconusers: {
      collection: 'Beaconuser',
      via: 'idbeacon'
    }
  }
};
