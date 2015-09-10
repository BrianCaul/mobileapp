angular.module('iot', ['ionic','chart.js'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('router', {
      url: "/route",
      abstract: true,
      templateUrl: "templates/side-menu-left.html"
    })
    .state('router.dashboard', {
      url: "/dashboard",
	  abstract: true,
      views: {
        'menuContent' :{
          templateUrl: "templates/dashboard.html"
        }
      }
    })
	.state('router.dashboard.home', {
      url: "/home",
      views: {
        'home-tab' :{
          templateUrl: "templates/home.html"
        }
      }
    })
	.state('router.dashboard.favorites', {
      url: "/favorites",
      views: {
        'favorites-tab' :{
          templateUrl: "templates/favorites.html"
        }
      }
    })
	.state('router.dashboard.settings', {
      url: "/settings",
      views: {
        'settings-tab' :{
          templateUrl: "templates/settings.html"
        }
      }
    })
	.state('router.dashboard.charts', {
      url: "/charts",
      views: {
        'charts-tab' :{
          templateUrl: "templates/charts.html"
        }
      }
    })
	.state('router.positions', {
      url: "/positions",
      views: {
        'menuContent' :{
          templateUrl: "templates/positions.html"
        }
      }
    })
	.state('router.position', {
      url: "/position",
      views: {
        'menuContent' :{
          templateUrl: "templates/position-single.html"
        }
      }
    })
	.state('router.events', {
      url: "/events",
      views: {
        'menuContent' :{
          templateUrl: "templates/events.html"
        }
      }
    })
	.state('router.users', {
      url: "/users",
      views: {
        'menuContent' :{
          templateUrl: "templates/users.html"
        }
      }
    })
	.state('router.actions', {
      url: "/actions",
      views: {
        'menuContent' :{
          templateUrl: "templates/actions.html"
        }
      }
    })
	.state('router.addUser', {
      url: "/add-user",
      views: {
        'menuContent' :{
          templateUrl: "templates/add-user.html"
        }
      }
    })
	.state('router.addDevice', {
      url: "/add-device",
      views: {
        'menuContent' :{
          templateUrl: "templates/add-device.html"
        }
      }
    })
	.state('router.addLocation', {
      url: "/add-location",
      views: {
        'menuContent' :{
          templateUrl: "templates/add-location.html"
        }
      }
    })
	.state('router.addAction', {
      url: "/add-action",
      views: {
        'menuContent' :{
          templateUrl: "templates/add-action.html"
        }
      }
    })
	.state('intro', {
      url: "/intro",
      templateUrl: "templates/intro.html"
    })
  $urlRouterProvider.otherwise("/intro");
})
.controller('MainCtrl', function($scope, $ionicSideMenuDelegate, $ionicPopover, $state, $timeout) {
	$scope.users = [
		{ username: 'Admin', email: 'admin@test.domain', location: true, id: 'admin', avatar: 'img/men.jpg', enabled: 'true', lastLogin: 'Online', userType: 'Event Manager' },
		{ username: 'David', email: 'david@test.domain', location: true, id: 'david', avatar: 'img/girl.jpg', enabled: 'true', lastLogin: 'Last login: 01/09/2014' , userType: 'Supervisor' },
		{ username: 'Paul', email: 'paul@test.domain', location: false, id: 'paul', avatar: 'img/noavatar.png', enabled: 'false', lastLogin: 'Last login: never' , userType: 'Attendant' },
		{ username: 'Mary', email: 'mary@test.domain', location: false, id: 'mary', avatar: 'img/noavatar.png', enabled: 'true', lastLogin: 'Last login: never' , userType: 'Attendant' },
	];
		
	$scope.position = { id: null, name: 'No Position', icon: 'ion-ios7-help-empty', status: 'Offline' },
	$scope.positions = [
		{ id: '1', name: 'Thermostat (bedroom)', icon: 'ion-thermometer', status: 'Away', featured: true, userSelect: "stacy", entryCount: "3" , exitCount :"0" },
		{ id: '2', name: 'Coffee Machine', icon: 'ion-coffee', status: 'Finished', color: 'balanced', featured: true, userSelect: "mom", entryCount: null, exitCount :"0"  },
		{ id: '3', name: 'Smoke Sensor', icon: 'ion-no-smoking', status: 'Idle', color: 'assertive', featured: true, userSelect: "admin", entryCount: null, exitCount :"0"  },
	];
	$scope.events = [
		{ id: '1', name: 'Event 1', icon: 'ion-log-in', note: 'Test event 1', featured: true },
		{ id: '2', name: 'Event 2', icon: 'ion-log-in', note: 'Test event 2 description', featured: true },
	];
	$scope.areas = [
		{ id: '1', name: 'Overall Event', type: "range", value: '68', minValue : "0", maxValue : "250", units: " Visitors", iconBefore: 'ion-unlocked', iconAfter: 'ion-locked', positionSelect : "", script: "", featured: true, 
			positions : []
		},
		{ id: '2', name: 'Main Hall', type: "range", value: '24', minValue : "0", maxValue : "250", units: " Visitors", iconBefore: 'ion-unlocked', iconAfter: 'ion-locked', positionSelect : "", script: "", featured: false,
			positions : [
			{ id: '1', name: 'VIP Door', icon: 'ion-log-in', status: 'Entry/Exit', featured: true, userSelect: "stacy", entryCount: "21", exitCount: "2" , 
				users : [
					{ username: 'Paul', email: 'paul@test.domain', location: false, id: 'paul', avatar: 'img/noavatar.png', enabled: 'false', lastLogin: 'Last login: never' , userType: 'Attendant' },
					{ username: 'Mary', email: 'mary@test.domain', location: false, id: 'mary', avatar: 'img/noavatar.png', enabled: 'true', lastLogin: 'Last login: never' , userType: 'Attendant' },
				]  
			},
			{ id: '2', name: 'General Entrance', icon: 'ion-log-in', status: 'Entry Only', color: 'balanced', featured: true, userSelect: "mom", entryCount: "124", exitCount :"0" },
			{ id: '3', name: 'General Exit', icon: 'ion-log-in', status: 'Exit Only', color: 'assertive', featured: true, userSelect: "admin", entryCount: "0", exitCount: "12" }]
		},
		{ id: '3', name: 'Bar Area', type: "range", value: '40', minValue : "0", maxValue : "100", units: " Visitors", iconBefore: 'ion-unlocked', iconAfter: 'ion-locked', positionSelect : "", script: "", featured: false, 
			positions : [
			{ id: '1', name: 'General Entrance', icon: 'ion-log-in', status: 'Entry Only', color: 'balanced', featured: true, userSelect: "stacy", entryCount: "29", exitCount :"0", 
				users : [
					{ username: 'Paul', email: 'paul@test.domain', location: false, id: 'paul', avatar: 'img/noavatar.png', enabled: 'false', lastLogin: 'Last login: never' , userType: 'Attendant' },
					{ username: 'Mary', email: 'mary@test.domain', location: false, id: 'mary', avatar: 'img/noavatar.png', enabled: 'true', lastLogin: 'Last login: never' , userType: 'Attendant' },
				]  
			},
			{ id: '2', name: 'General Exit', icon: 'ion-log-in', status: 'Exit Only', color: 'assertive', featured: true, userSelect: "mom", entryCount: "0", exitCount: "24"  }]
		},
	];
	$scope.toggleLeft = function() {
		$ionicSideMenuDelegate.toggleLeft();
	};
	$scope.positionTap = function(route, position) {
		$scope.position = position;
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
	$scope.$on('$destroy', function() {
		$scope.popover.remove();
	});
	$timeout(function () {
		ionic.EventController.trigger("resize", "", true, false);
	}, 1500);
})
.controller('Intro', function($scope, $ionicSlideBoxDelegate, $timeout, $ionicLoading, $ionicPopup, $location,$http) {
	$scope.cred={
		username:'',
		password:''
	}

	$scope.login = function() {
		$ionicLoading.show({
		  template: 'Logging in...'
		});
		$http.post('http://overlord.elasticbeanstalk.com/rest/users/signin?uname='+ $scope.cred.username +'&pass='+$scope.cred.password).
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
		      		$location.path('route/events');
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
.controller('Dashboard', function($scope, $interval) {
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
		var l = data.length, previous = l ? data[l - 1] : 50;
		var y = previous + Math.random() * 10 - 5;
		return y < 0 ? 0 : y > 100 ? 100 : y;
	}
	// Simulate async data update
	$interval(function () {
		getLiveChartData();
	}, 500);
})
.controller('Charts', function($scope, $interval) {
	$scope.linelabels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	$scope.lineseries = ['Series A', 'Series B'];
	$scope.linedata = [
		[65, 76, 50, 47, 36, 30, 25, 48, 56, 55, 59, 63],
		[50, 48, 40, 57, 86, 99, 90, 58, 48, 80, 57, 60]
	];
	$scope.barlabels = ['2008', '2009', '2010', '2011', '2012', '2013', '2014'];
	$scope.barseries = ['Series A', 'Series B'];
	$scope.bardata = [
		[65, 59, 80, 81, 56, 55, 40],
		[28, 48, 40, 19, 86, 27, 90]
	];
	$scope.polarLabels = ["Water", "Energy", "Gas", "Internet", "Fees"];
	$scope.polarData = [300, 500, 100, 40, 120];
	$scope.doughnutLabels = ["Water", "Energy", "Gas", "Fees"];
	$scope.doughnutData = [300, 500, 100, 20];
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
	$interval(function () {
		$scope.doughnutData = [];
		$scope.polarData = [];
		
		for (var i = 0; i < 5; i++) {
			$scope.polarData.push(Math.floor(Math.random() * 500));
		}
		for (var i = 0; i < 4; i++) {
			$scope.doughnutData.push(Math.floor(Math.random() * 500));
		}
	}, 2500);
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
.controller('Users', function($scope, $ionicActionSheet) {
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
.controller('addUser', function($scope) {
	$scope.setFormScope = function(scope){
		this.formScope = scope;
	}
	$scope.newuser = {};
	$scope.userSubmit = function() {
		if(!$scope.newuser.username) {
			alert('Username required');
			return;
		}
		if(!$scope.newuser.avatar) {
			$scope.newuser.avatar = 'img/noavatar.png';
		}
		$scope.newuser.lastLogin = 'Last login: never';
		$scope.newuser.id = $scope.users.length + 1;
		$scope.users.push($scope.newuser);
		this.formScope.addUserForm.$setPristine();
		var defaultForm = {
			id : "",
			username : "",
			avatar : "",
			location: false
		};
		$scope.newuser = defaultForm;
	};
})
.controller('addDevice', function($scope) {
	$scope.setFormScope = function(scope){
		this.formScope = scope;
	}
	$scope.newposition = {};
	$scope.deviceSubmit = function() {
		if(!$scope.newposition.name) {
			alert('Name required');
			return;
		}
		if(!$scope.newposition.icon) {
			$scope.newposition.icon = 'ion-alert';
		}
		$scope.newposition.id = $scope.positions.length + 2;
		$scope.positions.push($scope.newposition);
		this.formScope.addDeviceForm.$setPristine();
		var defaultForm = {
			id : "",
			name : "",
			icon : "",
			status: "",
			color: "",
			userSelect : "",
			actionSelect : "",
			locationSelect : ""
		};
		$scope.newposition = defaultForm;
	};
})
.controller('addLocation', function($scope) {
	$scope.setFormScope = function(scope){
		this.formScope = scope;
	}
	$scope.newlocation = {};
	$scope.locationSubmit = function() {
		if(!$scope.newlocation.name) {
			alert('Name required');
			return;
		}
		if(!$scope.newlocation.icon) {
			$scope.newlocation.icon = 'ion-alert';
		}
		$scope.locations.push($scope.newlocation);
		this.formScope.addLocationForm.$setPristine();
		var defaultForm = {
			name : "",
			icon : "",
			note : ""
		};
		$scope.newlocation = defaultForm;
	};
})
.controller('addAction', function($scope) {
	$scope.setFormScope = function(scope){
		this.formScope = scope;
	}
	$scope.newaction = {};
	$scope.newaction.type = 'range';
	$scope.newaction.state = 'on';
	$scope.actionSubmit = function() {
		if(!$scope.newaction.name) {
			alert('Name required');
			return;
		}
		if(!$scope.newaction.iconBefore) {
			$scope.newaction.iconBefore = 'ion-ios7-minus-empty';
		}
		if(!$scope.newaction.iconAfter) {
			$scope.newaction.iconAfter = 'ion-ios7-plus-empty';
		}
		if(!$scope.newaction.units) {
			$scope.newaction.units = 'units';
		}
		if(!$scope.newaction.minValue) {
			$scope.newaction.minValue = '0';
		}
		if(!$scope.newaction.maxValue) {
			$scope.newaction.maxValue = '100';
		}
		$scope.actions.push($scope.newaction);
		this.formScope.addActionForm.$setPristine();
		var defaultForm = {
			name : "",
			value : "",
			state: "",
			minValue : "",
			maxValue : "",
			units : "",
			iconBefore : "",
			iconAfter : "",
			deviceSelect : "",
			script : "",
			featured : ""
		};
		$scope.newaction = defaultForm;
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