angular.module("cloudApp")
.controller("DashboardController", function ($scope, $window) {

  const token = localStorage.getItem("app_jwt");

  // 🚫 Not logged in
  if (!token) {
    $window.location.href = "/html/login.html";
    return;
  }

  // Read user info from localStorage
  $scope.user = {
    name: localStorage.getItem("user_name"),
    email: localStorage.getItem("user_email"),
    picture: localStorage.getItem("user_picture")
  };

  $scope.logout = function () {
    localStorage.clear();
    $window.location.href = "/html/login.html";
  };
});