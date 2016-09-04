var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost/webdxd');

var studentSchema = {
	firstName: String,
	lastName: String,
	email: String,
	age: Number
}

var Student = mongoose.model('Student', studentSchema, 'student')

var app = express();

app.use(cors());


app.get('/student', function(req, res) {

	Student.find().select('firstName age').exec(function(err,doc){
		res.send(doc);
	})

});

app.get('/student/:id', function(req,res){
	Student.findById(req.params.id, function(err,doc){
		res.send(doc);
	});
});

app.use(bodyParser.json());

app.post('/new', function(req, res){
	var newStudent = new Student(req.body);
	newStudent.save(function(err, doc){
		res.send(doc);
	});
});


app.listen(3000);

