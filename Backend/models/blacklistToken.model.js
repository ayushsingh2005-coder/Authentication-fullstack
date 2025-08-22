const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema({
    token : {
        type : String,
        required : true,
        unique :true
    },
    creditedAt :{
        type : Date,
        degault : Date.now , expires : 60 * 60 * 24
    }
});

module.exports = mongoose.model('BlacklistToken' ,blacklistTokenSchema);