angular.module("cloudApp").controller("LoginController", function ($scope, $http) {

  $scope.user = {};
  $scope.loading = false;
$scope.goToSignInOptions = function () {
  window.location.href = "/html/signin-options.html";
};

  $scope.login = function () {
    $scope.loading = true;
    $scope.successMessage = "";
    $scope.errorMessage = "";

    $http.post(
      "https://cloudspend-api-hdc4d0f3e4h7cjdu.centralindia-01.azurewebsites.net/api/auth/login",
      {
        email: $scope.user.email,
        password: $scope.user.password
      }
    )
    .then(function (response) {
      console.log("API response:", response.data);

      if (response.data.success) {
        $scope.successMessage = response.data.message;
      } else {
        $scope.errorMessage = response.data.message;
      }
    })
    .catch(function (error) {
      console.error("Login error:", error);
      $scope.errorMessage = "Login failed";
    })
    .finally(function () {
      $scope.loading = false;
    });
  };
});
