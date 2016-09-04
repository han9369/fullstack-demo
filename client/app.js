var app = angular.module('Webdxd',[]);

app.controller('AppCtrl', function($http){

	var app = this;

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



});