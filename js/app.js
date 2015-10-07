var urlPrefix ='http://localhost:8082/Overlord';

angular.module('iot', ['ionic','chart.js','ngCordova'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('router', {
      url: "/route",
	  cache: false,
      templateUrl: "templates/side-menu-left.html"
    })
    .state('router.dashboard', {
      url: "/dashboard",
	  cache: false,
	  abstract: true,
      views: {
        'menuContent' :{
          templateUrl: "templates/dashboard.html"
        }
      }
    })
	.state('router.dashboard.home', {
      url: "/home",
	  cache: false,
      views: {
        'home-tab' :{
          templateUrl: "templates/home.html",
		  controller: 'MainCtrl'
        }
      }
    })
	.state('router.dashboard.areas', {
      url: "/areas",
	  cache: false,
      views: {
        'areas-tab' :{
          templateUrl: "templates/areas.html",
		  controller: 'MainCtrl'
		  
        }
      }
    })
	.state('router.dashboard.settings', {
      url: "/settings",
	  cache: false,
      views: {
        'settings-tab' :{
          templateUrl: "templates/settings.html",
		  controller: 'MainCtrl'
        }
      }
    })
	.state('router.dashboard.charts', {
      url: "/charts",
	  cache: false,
      views: {
        'charts-tab' :{
          templateUrl: "templates/charts.html",
		  controller: 'MainCtrl'
        }
      }
    })
	.state('router.positions', {
      url: "/positions",
	  cache: false,
      views: {
        'menuContent' :{
          templateUrl: "templates/positions.html"
        }
      }
    })
	.state('router.position', {
      url: "/position",
	  cache: false,
      views: {
        'menuContent' :{
          templateUrl: "templates/position-single.html",
		  controller: 'PositionCtrl'
        }
      }
    })
	.state('router.events', {
      url: "/events",
	  cache: false,
      views: {
        'menuContent' :{
          templateUrl: "templates/events.html",
		  controller: 'EventCtrl'
        }
      }
    })
	.state('router.users', {
      url: "/users",
	  cache: false,
      views: {
        'menuContent' :{
          templateUrl: "templates/users.html"
        }
      }
    })
	.state('router.attendantview', {
      url: "/attendantview",
	  cache: false,
      views: {
        'menuContent' :{
          templateUrl: "templates/attendantview.html",
		  controller: 'AttendantController'
        }
      }
    })
	.state('router.addUser', {
      url: "/add-user",
	  cache: false,
      views: {
        'menuContent' :{
          templateUrl: "templates/add-user.html"
        }
      }
    })
	.state('router.addEvent', {
      url: "/add-event",
	  cache: false,
      views: {
        'menuContent' :{
          templateUrl: "templates/add-event.html"
        }
      }
    })
	.state('router.addPosition', {
      url: "/add-position",
	  cache: false,
      views: {
        'menuContent' :{
          templateUrl: "templates/add-position.html"
        }
      }
    })
	.state('router.addArea', {
      url: "/add-area",
	  cache: false,
      views: {
        'menuContent' :{
          templateUrl: "templates/add-area.html"
        }
      }
    })
	.state('router.addVenue', {
      url: "/add-venue",
	  cache: false,
      views: {
        'menuContent' :{
          templateUrl: "templates/add-venue.html"
        }
      }
    })
	.state('intro', {
      url: "/intro",
	  cache: false,
      templateUrl: "templates/intro.html"
    })
  $urlRouterProvider.otherwise("/intro");
})
.controller('MainCtrl', function($scope, $ionicSideMenuDelegate, $ionicPopover, $state, $timeout, $window, $location, SideMenuSwitcher, $http) {
	$scope.leftSide = SideMenuSwitcher.leftSide;
	$scope.user = JSON.parse(window.localStorage['user'] || '{}');
	
	$scope.userTypes = [
		{ name: 'Event Manager', id: 'Event Manager' },
		{ name: 'Supervisor', id: 'Supervisor' },
		{ name: 'Attendant', id: 'Attendant' },
	];

	$scope.positionTypes = [
		{ name: 'External', id: 'External' },
		{ name: 'Internal', id: 'Internal' }
	];

	$scope.positionFunctions = [
		{ name: 'Entry/Exit', id: 'Entry/Exit' },
		{ name: 'Entry Only', id: 'Entry' },
		{ name: 'Exit Only', id: 'Exit' },
	];
		
	$scope.venue = { id: null, venueName: 'New Venue', capacity: 'Exit', eventId: '' },
	$scope.venues = [
		{ id: '1', venueName: 'New Venue 1', capacity: '100', eventId: '' },
		{ id: '2',  venueName: 'New Venue 2', capacity: '50', eventId: ''  },
		{ id: '3',  venueName: 'New Venue 3', capacity: '20', eventId: '' },
	];

	$scope.positions = [
		{ id: '3', positionName: 'New Position 1', positionFunction: 'Exit', positionType: 'External', icon: 'ion-log-in', entryCount: "0", exitCount: "0", enabled: false },
		{ id: '4', positionName: 'New Position 2', positionFunction: 'Exit', positionType: 'External', icon: 'ion-log-in', entryCount: "0", exitCount: "0", enabled: false  },
		{ id: '5', positionName: 'New Position 3', positionFunction: 'Exit', positionType: 'External', icon: 'ion-log-in', entryCount: "0", exitCount: "0", enabled: false },
	];

	
	$scope.toggleLeft = function() {
		$ionicSideMenuDelegate.toggleLeft();
	};
	$scope.positionTap = function(route, position) {
		window.localStorage['position'] = JSON.stringify(position);
		$state.go(route);
	};
	$ionicPopover.fromTemplateUrl('templates/alerts.html', {
		scope: $scope,
	}).then(function(popover) {
		$scope.popover = popover;
	});
	$scope.openAlerts = function($event) {
		$scope.popover.show($event);
	};
	$scope.closeAlerts = function() {
		$scope.popover.hide();
	};

	
})
.controller('EventCtrl', function($scope, $ionicSideMenuDelegate, $ionicPopover, $state, $timeout, $window, $location, SideMenuSwitcher, $http) {

	$scope.leftSide = SideMenuSwitcher.leftSide;
	
	$scope.user = JSON.parse(window.localStorage['user'] || '{}');
	$scope.companyId = $scope.user.usersCompanyID;

		
		// Simple GET request example :
	$http.get(urlPrefix + '/rest/events?companyId='+$scope.user.usersCompanyID).
	  then(function(response) {
	  	$scope.events= response.data;
		
		for (var i =0; i < $scope.events.length; i++) {
			$scope.events[i].icon  = "ion-log-in";
			$scope.events[i].resetEnabled  = false;
		}
		
	    // this callback will be called asynchronously
	    // when the response is available
	  }, function(response) {
	  	alert("Error retrieving events");
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	  });
	
	$scope.toggleLeft = function() {
		$ionicSideMenuDelegate.toggleLeft();
	};
	
	$ionicPopover.fromTemplateUrl('templates/alerts.html', {
		scope: $scope,
	}).then(function(popover) {
		$scope.popover = popover;
	});
	$scope.openAlerts = function($event) {
		$scope.popover.show($event);
	};
	$scope.closeAlerts = function() {
		$scope.popover.hide();
	};
	$scope.$on('$destroy', function() {
		$scope.popover.remove();
	});

})
.controller('SingleEventCtrl', function($scope, $ionicSideMenuDelegate, $ionicPopover, $state, $timeout, $window, $location, SideMenuSwitcher, $http, $interval) {

	$scope.leftSide = SideMenuSwitcher.leftSide;
	
	$scope.user = JSON.parse(window.localStorage['user'] || '{}');
	$scope.companyId = $scope.user.usersCompanyID;
	
		  
	if($location.search().eventId){
		window.localStorage['eventID'] =$location.search().eventId;
		$scope.eventIDD = $location.search().eventId;
		
		$http.get(urlPrefix + '/rest/events/'+$scope.eventIDD).
			  then(function(response) {
				$scope.event= response.data;
				$scope.areas = [];
				for(var i =0; i< $scope.event.venues.length; i++){
					$scope.areas.push.apply($scope.areas, $scope.event.venues[i].areas);
				}

				$scope.mainarea = {
					value:0,
					iconBefore:'ion-unlocked',
					iconAfter : 'ion-locked',
					capacity : 0
				}

				for(var i =0; i< $scope.areas.length; i++){
					$scope.areas[i].value = 0;
					$scope.areas[i].iconBefore = 'ion-unlocked';
					$scope.areas[i].iconAfter = 'ion-locked';
					for(var x =0; x< $scope.areas[i].positions.length; x++){
						$scope.areas[i].positions[x].icon ='ion-log-in';
						if($scope.areas[i].positions[x].positionFunction =='In'){
							$scope.areas[i].positions[x].color ='balanced';
							$scope.areas[i].positions[x].positionFunction ='Entry Only';
						}
						if($scope.areas[i].positions[x].positionFunction =='Out'){
							$scope.areas[i].positions[x].color ='assertive';
							$scope.areas[i].positions[x].positionFunction ='Exit Only';
						}
						if($scope.areas[i].positions[x].positionFunction =='Both'){
							$scope.areas[i].positions[x].positionFunction ='Entry/Exit';
						}

						$scope.areas[i].value = $scope.areas[i].value + $scope.areas[i].positions[x].numVisitors;
					}

					$scope.mainarea.value = $scope.mainarea.value + $scope.areas[i].value;
					$scope.mainarea.capacity = $scope.mainarea.capacity + $scope.areas[i].capacity;
				}
				// this callback will be called asynchronously
				// when the response is available
			  }, function(response) {
				alert("Error retrieving event");
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			  });
		
	}
	// Simple GET request example :
	var timer = undefined;
	if($scope.eventIDD !=null && $scope.eventIDD !='undefined'){
	
	  var poll = function() {
			$http.get(urlPrefix + '/rest/events/'+$scope.eventIDD).
			  then(function(response) {
				$scope.event= response.data;
				$scope.areas = [];
				for(var i =0; i< $scope.event.venues.length; i++){
					$scope.areas.push.apply($scope.areas, $scope.event.venues[i].areas);
				}

				$scope.mainarea = {
					value:0,
					iconBefore:'ion-unlocked',
					iconAfter : 'ion-locked',
					capacity : 0
				}

				for(var i =0; i< $scope.areas.length; i++){
					$scope.areas[i].value = 0;
					$scope.areas[i].iconBefore = 'ion-unlocked';
					$scope.areas[i].iconAfter = 'ion-locked';
					for(var x =0; x< $scope.areas[i].positions.length; x++){
						$scope.areas[i].positions[x].icon ='ion-log-in';
						if($scope.areas[i].positions[x].positionFunction =='In'){
							$scope.areas[i].positions[x].color ='balanced';
							$scope.areas[i].positions[x].positionFunction ='Entry Only';
						}
						if($scope.areas[i].positions[x].positionFunction =='Out'){
							$scope.areas[i].positions[x].color ='assertive';
							$scope.areas[i].positions[x].positionFunction ='Exit Only';
						}
						if($scope.areas[i].positions[x].positionFunction =='Both'){
							$scope.areas[i].positions[x].positionFunction ='Entry/Exit';
						}

						$scope.areas[i].value = $scope.areas[i].value + $scope.areas[i].positions[x].numVisitors;
					}

					$scope.mainarea.value = $scope.mainarea.value + $scope.areas[i].value;
					$scope.mainarea.capacity = $scope.mainarea.capacity + $scope.areas[i].capacity;
					timer = $timeout(poll, 5000);
				}
				// this callback will be called asynchronously
				// when the response is available
			  }, function(response) {
				timer = $timeout(poll, 5000);
				alert("Error retrieving event");
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			  });
	  }
	  poll();
	}
	
		// Simple GET request example :++
	  $scope.updateAreaNumbers = function(updateAreaId, newValue) {
		// Simple POST request example (passing data) :
		$http.post(urlPrefix + '/rest/areas/'+updateAreaId+'/updateNumbers?numVisitors='+newValue).
		  then(function(response) {
		  if(response.data.id==0){
			console.log("There was an error updating the area, Please try again.");
		  }
		  for(var x=0; x<$scope.areas.length;x++){
		  	if($scope.areas[x].id == updateAreaId){
		  		$scope.areas[x].value = newValue;
		  	}
		  }
			// this callback will be called asynchronously
			// when the response is available
		  }, function(response) {
			console.log("There was an error updating the area, Please try again.");
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		  });
	};
	
	var maximum = 150;
	$scope.data = [[]];
	$scope.labels = [];
	for (var i = 0; i < maximum; i++) {
		$scope.data[0].push(0);
		$scope.labels.push("");
	}
	$scope.options =  {
		responsive: true,
		showTooltips: false,
		animation: false,
		pointDot : false,
		scaleShowLabels: true,
		showScale: true,
		maintainAspectRatio: false,
		datasetStrokeWidth : 1,
		datasetFill : true,
    }; 

    function getLiveChartData () {
      if ($scope.data[0].length) {
        $scope.labels = $scope.labels.slice(1);
        $scope.data[0] = $scope.data[0].slice(1);
      }

      while ($scope.data[0].length < maximum) {
        $scope.labels.push('');
        $scope.data[0].push(getRandomValue($scope.data[0]));
      }
    }
	function getRandomValue (data) {
		return $scope.mainarea.value;
	}
	// Simulate async data update
	$interval(function () {
		getLiveChartData();
	}, 500);

	$scope.$on('$destroy', function() {
		$scope.popover.remove();
		if (timer) {
            $timeout.cancel(timer);
        }
	});
	
	$scope.toggleLeft = function() {
		$ionicSideMenuDelegate.toggleLeft();
	};
	$scope.positionTap = function(route, position) {
		window.localStorage['position'] = JSON.stringify(position);
		$state.go(route);
	};
	$ionicPopover.fromTemplateUrl('templates/alerts.html', {
		scope: $scope,
	}).then(function(popover) {
		$scope.popover = popover;
	});
	$scope.openAlerts = function($event) {
		$scope.popover.show($event);
	};
	$scope.closeAlerts = function() {
		$scope.popover.hide();
	};
})
.controller('Intro', function($scope, $ionicSlideBoxDelegate, $timeout, $ionicLoading, $ionicPopup, $location, $http, $window, $state, SideMenuSwitcher) {
	$scope.cred={
		username:'',
		password:''
	}
	$scope.login = function() {
		$ionicLoading.show({
		  template: 'Logging in...'
		});
		$http.post(urlPrefix + '/rest/users/signin?uname='+ $scope.cred.username +'&pass='+$scope.cred.password).
		    success(function(data, status, headers, config) {
		      $scope.user = data;
		      if($scope.user ==='' || $scope.user ==undefined || $scope.user.id===0){
		      	$ionicLoading.show({
					template: 'Invalid credentials, please try again...'
				});
		
		     	$timeout( function() {
		      		$ionicLoading.hide();
		      	}, 1600);
		      }else{
				$ionicLoading.show({
					template: 'Success'
				});

		     	$timeout( function() {
		      		$ionicLoading.hide();
					window.localStorage['user'] = JSON.stringify($scope.user);
		      		if($scope.user.userType==='Attendant'){
						SideMenuSwitcher.leftSide.src='Attendant';
						$state.go('router.attendantview');
		      		}else if($scope.user.userType==='Supervisor'){
		      			SideMenuSwitcher.leftSide.src='Supervisor';
						$state.go('router.events');
		      		}
		      		else{
						SideMenuSwitcher.leftSide.src='Admin';
		      			$state.go('router.events');
		      		}
		      	}, 1600);
				
		      }
		    }).
		    error(function(data, status, headers, config) {
		        $ionicLoading.show({
                	template: 'There was an error, please try again...'
				});
		     	$timeout( function() {
		      		$ionicLoading.hide();
		      	}, 1600);
		    });

	}
	$scope.nextSlide = function() {
		$ionicSlideBoxDelegate.next();
	}
	$scope.prevSlide = function() {
		$ionicSlideBoxDelegate.previous();
	}
	$scope.showRegister = function() {
		$scope.data = {}
		var myPopup = $ionicPopup.show({
			template: '<input type="email" ng-model="data.email">',
			title: 'Enter Your Email Address',
			subTitle: 'You will be contacted shortyl',
			scope: $scope,
			buttons: [
				{ text: 'Cancel' },
				{
				 text: '<b>Submit</b>',
				 type: 'button-balanced',
				 onTap: function(e) {
				   if (!$scope.data.email) {
					 e.preventDefault();
				   } else {
					 return $scope.data.email;
				   }
				 }
				},
			]
		});
	};
})
.controller('Dashboard', function($scope) {
	
})
.controller('Charts', function($scope, $interval, $http) {

		$scope.linedata = [
				[0]
			];
		$scope.linelabels = ["0"];
			// Simple GET request example :
		$http.get(urlPrefix + '/rest/stats/'+$scope.eventIDD).
		  then(function(response) {
			$scope.allStats= response.data;
			$scope.linedata = [
				$scope.allStats.entries
			];
			$scope.linelabels = $scope.allStats.hours;

			// this callback will be called asynchronously
			// when the response is available
		  }, function(response) {
			alert("Error retrieving company");
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		  });

		
		
		function ConvertToCSV(objArray) {
			//If JSONData is not an object then JSON.parse will parse the JSON string in an Object
			var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
            var str = '';

            for (var i = 0; i < array.length; i++) {
                var line = '';
                for (var index in array[i]) {
                    if (line != '') line += ','

                    line += array[i][index];
                }

                str += line + '\r\n';
            }

			//Generate a file name
			var fileName = "EventReport";
			//this will remove the blank-spaces from the title and replace it with an underscore
			 if (!str.match(/^data:text\/csv/i)) {
            str = 'data:text/csv;charset=utf-8,' + str;
			}
			//Initialize file format you want csv or xls
			data = encodeURI(str);
			// Now the little tricky part.
			// you can use either>> window.open(uri);
			// but this will not work in some browsers
			// or you will not get the correct file extension    

			//this trick will generate a temp <a /> tag
			var link = document.createElement("a");
			link.setAttribute('href',data);
			link.setAttribute('download',fileName  + ".csv");

			//set the visibility hidden so it will not effect on your web-layout
			//link.style = "visibility:hidden";


			//this part will append the anchor tag and remove it after automatic click
			link.click();
		};

		
				//Export Excel 
		$scope.exportExcel = function() {
		
		
							// Simple GET request example :
			$http.get(urlPrefix + '/rest/allstats/'+$scope.eventIDD).
			  then(function(response) {
				var jsonObject = JSON.stringify(response.data);
				ConvertToCSV(jsonObject)

				// this callback will be called asynchronously
				// when the response is available
			  }, function(response) {
				alert("Error retrieving company");
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			  });
		
		};

		$scope.lineseries = ['Entries'];
	
	$scope.options =  {
		responsive: true,
		showTooltips: true,
		animation: true,
		pointDot : true,
		scaleShowLabels: true,
		showScale: true,
		maintainAspectRatio: false,
		datasetStrokeWidth : 1,
    };
})
.controller('Actions', function($scope, $ionicActionSheet, $ionicModal) {
	$ionicModal.fromTemplateUrl('templates/edit-action.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modal = modal;
		$scope.editaction = {};
	});
	$scope.actionHold = function(action) {
		var hideSheet = $ionicActionSheet.show({
			buttons: [
				{ text: 'Edit' },
			],
			destructiveText: 'Delete',
			titleText: 'Modify Action',
			cancelText: 'Cancel',
			cancel: function() {
				return true;
			},
			buttonClicked: function(index) {
				$scope.editaction = action;
				$scope.modal.show();
				return true;
			},
			destructiveButtonClicked: function(index) {
				$scope.actions.splice($scope.actions.indexOf(action), 1);
				return true;
			}
		});
	}
})
.controller('Users', function($scope, $ionicActionSheet, $http) {
		$scope.user = JSON.parse(window.localStorage['user'] || '{}');
		$scope.companyId = $scope.user.usersCompanyID;
		// Simple GET request example :
		$http.get(urlPrefix + '/rest/companies/'+$scope.companyId).
		  then(function(response) {
			$scope.company= response.data;
			$scope.users = $scope.company.users;

			// this callback will be called asynchronously
			// when the response is available
		  }, function(response) {
			alert("Error retrieving company");
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		  });
	ionic.DomUtil.ready(addMaps);
	var adminLat = new google.maps.LatLng(43.07493,-89.381388);
	var userLat = new google.maps.LatLng(45.07493,-88.381388);
	var mapOptions = {
		center: adminLat,
		zoom: 16,
		draggable: false,
		scrollwheel: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var mapOptions2 = {
		center: userLat,
		zoom: 11,
		draggable: false,
		scrollwheel: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	function addMaps () {
		var map = new google.maps.Map(document.getElementById("map_admin"),
		mapOptions);
		$scope.map = map;
		var map2 = new google.maps.Map(document.getElementById("map_stacy"),
		mapOptions2);
		$scope.map2 = map2;
	};
	$scope.userHold = function(user) {
		var hideSheet = $ionicActionSheet.show({
			buttons: [
				{ text: 'Sample Button' }
			],
			destructiveText: 'Delete',
			titleText: 'Modify a User',
			cancelText: 'Cancel',
			cancel: function() {
			},
			buttonClicked: function(index) {
				return true;
			},
			destructiveButtonClicked: function(index) {
				$scope.users.splice($scope.users.indexOf(user), 1);
				return true;
			}
		});
	}
})
.controller('addUser', function($scope, $http) {
	$scope.user = JSON.parse(window.localStorage['user'] || '{}');
	$scope.setFormScope = function(scope){
		this.formScope = scope;
	}
	$scope.newuser = {};
	$scope.userSubmit = function() {
		if(!$scope.newuser.username) {
			alert('Username required');
			return;
		}
		if(!$scope.newuser.password) {
			alert('Password required');
			return;
		}
		if(!$scope.newuser.userType) {
			alert('Please Select a User Type');
			return;
		}
		if(!$scope.newuser.phone) {
			alert('Phone Number required');
			return;
		}
		if(!$scope.newuser.name) {
			alert('Full name required');
			return;
		}
		//TODO: USER IMAGE UPLOAD
		if(!$scope.newuser.avatar) {
			$scope.newuser.avatar = 'img/noavatar.png';
		}
		$scope.newuser.lastLogin = 'Last login: never';
		
		// Simple POST request example (passing data) :
		$http.post(urlPrefix + '/rest/users?email='+$scope.newuser.email+'&userType='+$scope.newuser.userType+'&username='+$scope.newuser.username+'&password='+$scope.newuser.password+'&phone='+$scope.newuser.phone+'&name='+$scope.newuser.name+'&companyId='+$scope.user.usersCompanyID).
		  then(function(response) {
		 	if(response.data ==='Error creating user'){
		 		alert("There was an error creating user, Please try again.");
		 	}else{
				alert(response.data);
			}
			// this callback will be called asynchronously
			// when the response is available
		  }, function(response) {
			alert("There was an error creating user, Please try again.");
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		  });
		
		
		this.formScope.addUserForm.$setPristine();
		var defaultForm = {
			id : "",
			username : "",
			password: "",
			userType: "",
			email: "",
			avatar : "",
			companyId: $scope.user.usersCompanyId,
			enabled: false
		};
		$scope.newuser = defaultForm;
	};
})
.controller('addEvent', function($scope, $http) {
	$scope.user = JSON.parse(window.localStorage['user'] || '{}');
	$scope.setFormScope = function(scope){
		this.formScope = scope;
	}
	
	$scope.newevent = {};
	$scope.eventSubmit = function() {
		if(!$scope.newevent.eventName) {
			alert('Name required');
			return;
		}
		if(!$scope.newevent.capacity) {
			alert('Capacity required');
			return;
		}
		if(!$scope.newevent.start) {
			alert('Start date required');
			return;
		}
		if(!$scope.newevent.end) {
			alert('End date required');
			return;
		}

		// Simple POST request example (passing data) :
		$http.post(urlPrefix + '/rest/events?eventName='+$scope.newevent.eventName+'&description='+$scope.newevent.description +'&start='+$scope.newevent.start+'&end='+$scope.newevent.end+'&capacity='+$scope.newevent.capacity+'&companyId='+$scope.user.usersCompanyID).
		  then(function(response) {
		  if(response.data.id==0){
			alert("There was an error creating event, Please try again.");
		  }else{
			alert(response.data.eventName +" Created");
		  }
			// this callback will be called asynchronously
			// when the response is available
		  }, function(response) {
			alert("There was an error creating event, Please try again.");
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		  });
		
		this.formScope.addEventForm.$setPristine();
		var defaultForm = {
			id : "",
			eventName : "",
			description : "",
			capacity: "",
			start: "",
			end: "0", 
			reset: "0",
			resetEnabled : false
		};
		$scope.newevent = defaultForm;
	};
})
.controller('addArea', function($scope, $http) {
	$scope.user = JSON.parse(window.localStorage['user'] || '{}');
	$scope.setFormScope = function(scope){
		this.formScope = scope;
	}
	$scope.newarea = {};
	
		// Simple GET request example :
	$http.get(urlPrefix + '/rest/venues').
	  then(function(response) {
	  	$scope.venues= response.data;
	    // this callback will be called asynchronously
	    // when the response is available
	  }, function(response) {
	  	alert("Error retrieving venues");
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	  });
	
	$scope.areaSubmit = function() {
		if(!$scope.newarea.areaName) {
			alert('Name required');
			return;
		}
		if(!$scope.newarea.capacity) {
			alert('Capacity required');
			return;
		}
		if(!$scope.newarea.venueid) {
			alert('Venue required');
			return;
		}
		
		// Simple POST request example (passing data) :
		$http.post(urlPrefix + '/rest/areas?areaName='+$scope.newarea.areaName+'&capacity='+$scope.newarea.capacity+'&venueId='+$scope.newarea.venueid).
		  then(function(response) {
		  if(response.data.id==0){
			alert("There was an error creating area, Please try again.");
		  }else{
			alert(response.data.areaName +" Created");
		  }
			// this callback will be called asynchronously
			// when the response is available
		  }, function(response) {
			alert("There was an error creating area, Please try again.");
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		  });

		this.formScope.addAreaForm.$setPristine();
		var defaultForm = {
			areaName: '', 
			capacity: '',
			venueid: ''
		};
		$scope.newarea = defaultForm;
	};
})
.controller('addPosition', function($scope, $http) {
	$scope.user = JSON.parse(window.localStorage['user'] || '{}');
	$scope.setFormScope = function(scope){
		this.formScope = scope;
	}

	// Simple GET request example :
	$http.get(urlPrefix + '/rest/areas').
	  then(function(response) {
	  	$scope.areas= response.data;
	    // this callback will be called asynchronously
	    // when the response is available
	  }, function(response) {
	  	alert("Error retriving areas");
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	  });

	$scope.newposition = {};
	$scope.positionSubmit = function() {
		if(!$scope.newposition.positionName) {
			alert('Name required');
			return;
		}
		if(!$scope.newposition.icon) {
			$scope.newposition.icon = 'ion-log-in';
		}
		if(!$scope.newposition.positionType){
			alert('Position type required');
			return;
		}
		if(!$scope.newposition.positionFunction){
			alert('Position function required');
			return;
		}
		if(!$scope.newposition.areaid){
			alert('Area required');
			return;
		}
		
				// Simple POST request example (passing data) :
		$http.post(urlPrefix + '/rest/positions?positionName='+$scope.newposition.positionName+'&positionType='+$scope.newposition.positionType+'&positionFunction='+$scope.newposition.positionFunction+'&areaId='+$scope.newposition.areaid).
		  then(function(response) {
		  if(response.data.id==0){
			alert("There was an error creating position, Please try again.");
		  }else{
			alert(response.data.positionName +" Created");
		  }
			// this callback will be called asynchronously
			// when the response is available
		  }, function(response) {
			alert("There was an error creating position, Please try again.");
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		  });

		this.formScope.addPositionForm.$setPristine();
		var defaultForm = {
			positionName: '', 
			positionFunction: '',
			positionType: '', 
			icon: 'ion-log-in',
			entryCount: "0",
			exitCount: "0",
			enabled: true
		};
		$scope.newposition = defaultForm;
	};
})
.controller('addVenue', function($scope, $http) {
	$scope.user = JSON.parse(window.localStorage['user'] || '{}');
	$scope.setFormScope = function(scope){
		this.formScope = scope;
	}
			
		// Simple GET request example :
	$http.get(urlPrefix + '/rest/events?companyId='+$scope.user.usersCompanyID).
	  then(function(response) {
	  	$scope.events= response.data;
		
		for (var i =0; i < $scope.events.length; i++) {
			$scope.events[i].icon  = "ion-log-in";
			$scope.events[i].resetEnabled  = false;
		}
		
	    // this callback will be called asynchronously
	    // when the response is available
	  }, function(response) {
	  	alert("Error retrieving events");
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	  });
	
	
	$scope.newvenue = {};
	$scope.venueSubmit = function() {
		if(!$scope.newvenue.venueName) {
			alert('Name required');
			return;
		}
		if(!$scope.newvenue.capacity) {
			alert('Capacity required');
			return;
		}
		if(!$scope.newvenue.eventId) {
			alert('Event required');
			return;
		}

		// Simple POST request example (passing data) :
		$http.post(urlPrefix + '/rest/venues?venueName='+$scope.newvenue.venueName+'&capacity='+$scope.newvenue.capacity+'&eventId='+$scope.newvenue.eventId).
		  then(function(response) {
		  if(response.data.id==0){
			alert("There was an error creating venue, Please try again.");
		  }else{
			alert(response.data.venueName +" Created");
		  }
			// this callback will be called asynchronously
			// when the response is available
		  }, function(response) {
			alert("There was an error creating venue, Please try again.");
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		  });
		
		this.formScope.addVenueForm.$setPristine();
		var defaultForm = {
			capacity : "",
			eventId : "",
			venueName : ""
		};
		$scope.newvenue = defaultForm;
	};
})
.controller('AttendantController', function($scope, $state, $location, SideMenuSwitcher, $http, $cordovaVibration) {
	$scope.leftSide = SideMenuSwitcher.leftSide;
	
	$scope.user = JSON.parse(window.localStorage['user'] || '{}');
	$scope.positionId = $scope.user.usersPositionID;
	
	$scope.setFormScope = function(scope){
		this.formScope = scope;
	}
	
	//TODO: Call this or simplified version in order to get position count before each clicker event. Allow for multiple doormen.
	$http.get(urlPrefix + '/rest/positions/'+$scope.positionId).
		  then(function(response) {
			$scope.attendantposition= response.data;
			$scope.attendantposition.icon ='ion-log-in';
			
			if($scope.attendantposition.positionFunction =='In'){
				$scope.attendantposition.positionFunction = 'Entry Only';
				$scope.attendantposition.color ='balanced';
			}
			if($scope.attendantposition.positionFunction =='Out'){
				$scope.attendantposition.positionFunction = 'Exit Only';
				$scope.attendantposition.color ='assertive';
			}
			if($scope.attendantposition.positionFunction =='Both'){
				$scope.attendantposition.positionFunction = 'Entry/Exit';
			}
			// this callback will be called asynchronously
			// when the response is available
		  }, function(response) {
			alert("Error retrieving position");
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		  });
	
	$scope.entrySubmit = function() {
	//$cordovaVibration.vibrate(100);
	if($scope.attendantposition.positionFunction != 'Exit Only'){
		$scope.attendantposition.numVisitors = $scope.attendantposition.numVisitors +1;
		
		$http.post(urlPrefix + '/rest/positions/'+$scope.attendantposition.id+'/enter?numVisitors='+$scope.attendantposition.numVisitors).
		  then(function(response) {
			if(response.data !='Entry Successful'){
				if($scope.attendantposition.numVisitors >0){
					$scope.attendantposition.numVisitors = $scope.attendantposition.numVisitors -1;
				}
				alert(response.data);
			}
			// this callback will be called asynchronously
			// when the response is available
		  }, function(response) {
			alert("There was an error entering the position, Please try again.");
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		  });
		  
	}else{
		alert("Exit Only");
	}
	};

	$scope.exitSubmit = function() {
	//$cordovaVibration.vibrate(100);
	if($scope.attendantposition.positionFunction != 'Entry Only'){
	
		if($scope.attendantposition.numVisitors > 0){
	
		$scope.attendantposition.numVisitors = $scope.attendantposition.numVisitors -1;
				$http.post(urlPrefix + '/rest/positions/'+$scope.attendantposition.id+'/exit?numVisitors='+$scope.attendantposition.numVisitors).
		  then(function(response) {
			if(response.data !='Exit Successful'){
				$scope.attendantposition.numVisitors = $scope.attendantposition.numVisitors +1;
				alert(response.data);
			}
			// this callback will be called asynchronously
			// when the response is available
		  }, function(response) {
			alert("There was an error existing the position, Please try again.");
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		  });
		  }
		  else{
			alert("Area is empty");
		  }
	}else{
		alert("Entrance Only");
	}
	};
})
.controller('PositionCtrl', function($scope, $state, $location, SideMenuSwitcher, $http) {
	$scope.leftSide = SideMenuSwitcher.leftSide;
	$scope.position = JSON.parse(window.localStorage['position'] || '{}');
	$scope.user = JSON.parse(window.localStorage['user'] || '{}');
	
	$scope.companyId = $scope.user.usersCompanyID;
		// Simple GET request example :
		$http.get(urlPrefix + '/rest/companies/'+$scope.companyId).
		  then(function(response) {
			$scope.company= response.data;
			$scope.users = $scope.company.users;

			// this callback will be called asynchronously
			// when the response is available
		  }, function(response) {
			alert("Error retrieving company");
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		  });
	//Get Users Positions
	$scope.setFormScope = function(scope){
		this.formScope = scope;
	}
	
	$scope.newuserposition = {};
	$scope.addUserPositionSubmit = function() {
		if(!$scope.newuserposition.userid) {
			alert('Please select a user');
			return;
		}

		// Simple POST request example (passing data) :
		$http.post(urlPrefix + '/rest/users/'+$scope.newuserposition.userid+'/setposition?positionId='+$scope.position.id).
		  then(function(response) {
		  if(response.data.id==0){
			alert("There was an error assigning the position, Please try again.");
		  }else{
			$scope.position.attendants.push(response.data);
			alert("User Assigned to Position");
		  }
			// this callback will be called asynchronously
			// when the response is available
		  }, function(response) {
			alert("There was an error assigning the position, Please try again.");
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		  });
		
		this.formScope.addUserToPositionForm.$setPristine();
		var defaultForm = {
			userid : ""
		};
		$scope.newuserposition = defaultForm;
	};
})
.factory('SideMenuSwitcher', function ($rootScope) {
        return {
            leftSide: {src: ''}
        };
    })
.directive('wrapOwlcarousel', function () {
    return {
        restrict: 'E',
        link: function (scope, element, attrs) {
            var options = scope.$eval($(element).attr('data-options'));
            $(element).owlCarousel(options);
        }
    };
});