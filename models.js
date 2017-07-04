var mongoose = require("mongoose");

var expenseSchema = mongoose.Schema({ //NEED TO CREATE
	name: {type: String, required: true },
	amount: {type: Number, required: true, default: 0},
	assignee: {type: String},
});


expenseSchema.methods.apiReturn = function(){
	return {
		id: this._id,
		name: this.name,
		amount: this.amount,
		assignee:this.assignee
	}
}


var Expenses = mongoose.model("Expenses", expenseSchema);

module.exports = {Expenses}