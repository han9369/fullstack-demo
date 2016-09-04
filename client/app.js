var app = angular.module('Webdxd',[]);

app.controller('AppCtrl', function($http){

	var app = this;
	app.value = true;
	app.addNewButton = "Add New";

	$http.get('http://localhost:3000/student').success(function(studentList){
		app.student = studentList;
	});

	app.selectStudent = function(student){
		$http.get('http://localhost:3000/student/' + student._id).success(function(studentDetail){
			app.selectedStudent = studentDetail;
			app.fullName = studentDetail.firstName + studentDetail.lastName;
			app.email = studentDetail.email;
			app.age = studentDetail.age;
		});
	};

	app.addNew = function() {
		app.addNewButton = app.value ? "Close" : "Add New";
		app.value = !app.value;
		app.newStudent = "";
	};

	app.submitForm = function () {
		console.log(app.newStudent);
		$http.post('http://localhost:3000/new', app.newStudent)
			.success(function(newStudent){
				if (newStudent.firstName == null || newStudent.lastName == null || newStudent.email == null){
					console.log("no value");
				}else{
					app.student.push(newStudent);
					app.addNew();
				}
		});
	};

});