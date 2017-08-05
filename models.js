var mongoose = require("mongoose");

var soupDataSchema = mongoose.Schema({ //NEED TO CREATE based on the json file....
	FIELD1: {type: String, required: true },
	FIELD2: {type: String},
	FIELD3: {type: String},
	FIELD4: {type: String, required: true},
	FIELD5: {type: String, required: true},
	FIELD6: {type: String, required: true},
	FIELD7: {type: String, required: true},
	FIELD8: {type: String, required: true},
	FIELD9: {type: String, required: true},
	FIELD10: {type: String},
	FIELD11: {type: String},
	FIELD12: {type: String},
	FIELD13: {type: String},
	FIELD14: {type: String},
	FIELD15: {type: String},
	FIELD16: {type: String},
	FIELD17: {type: String},
	FIELD18: {type: String},
	FIELD19: {type: String},
	FIELD20: {type: String},
	FIELD21: {type: String},
	FIELD22: {type: [Number], index:"2d"},
}, {collection: 'kitchens'});


soupDataSchema.methods.apiReturn = function(){
	return {
		id: this._id,
		name: this.FIELD1,
		brief_descr: this.FIELD2,
		proximity:this.FIELD3,
		street_ad:this.FIELD4,
		city:this.FIELD5,
		state:this.FIELD6,
		zip:this.FIELD7,
		phone:this.FIELD8,
		web_site:this.FIELD9,
		hours:this.FIELD10,
		lat:this.FIELD11,
		long:this.FIELD12,
		location : this.FIELD22,  //for mongo's $nearSphere
		acc_score:this.FIELD13,
		acc_type:this.FIELD14,
		street_num:this.FIELD15,
		street_street:this.FIELD16,
		street_city:this.FIELD17,
		street_state:this.FIELD18,
		street_county:this.FIELD19,
		street_zip:this.FIELD20,
		street_country:this.FIELD21,
	}
}

var SoupData = mongoose.model("SoupData", soupDataSchema);

module.exports = {SoupData}