angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('MapCtrl', function($scope, $rootScope, $document) {
  
  $rootScope.geo = {};
  
  var suc = function(p){
    $scope.$apply(function(){
      $rootScope.geo.latitude = p.coords.latitude;
      $rootScope.geo.longitude = p.coords.longitude;
    });
  }
  
  var err = function(e){
    navigator.geolocation.getCurrentPosition(suc, function(err){
      console.log(err);
      $scope.$apply(function(){
        $rootScope.geo.error = [e, err];
      });
    }, {
      timeout: 3000,
      enableHighAccuracy: true
    });
  }
  
  $scope.gps = 'aguardando';
  
  $scope.checkGPS = function(){
    CheckGPS.check(function(){
      //GPS is enabled!
      $scope.$apply(function(){
        $scope.gps = 'ligado';
      });

    },
    function(){
      //GPS is disabled!
      $scope.$apply(function(){
        $scope.gps = 'desligado';
      });

    });
  }
  
  $scope.online = 'offline';
  
  $scope.con = function(){
    console.log(navigator.connection.type);
  }
  
  $document.bind('online', function(){
    console.log('online');
    $scope.$apply(function(){
      $scope.online = 'online';
    });
  });
  $document.bind('offline', function(){
    console.log('online');
    $scope.$apply(function(){
      $scope.online = 'offline';
    });
  });
  
  $scope.geolocalizacao = function(){
    console.log('evento lançado');
    navigator.geolocation.getCurrentPosition(suc, err, {
      timeout: 15000,
      enableHighAccuracy: false
    });
  }
});
