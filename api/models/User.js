module.exports = {
  attributes: {
    id: {
      type: 'string',
      primaryKey: true
      //unique: true
    },
    userstatus: {
      collection: 'Userstatus',
      via: 'iduser'
    },
    beaconusers: {
      collection: 'Beaconuser',
      via: 'iduser'
    }
  }
};
