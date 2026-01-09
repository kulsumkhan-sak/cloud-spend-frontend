angular.module("cloudApp")
.controller("SigninOptionsController", function ($scope, $window, $timeout) {

  $scope.initGoogle = function () {
    if (!window.google || !google.accounts || !google.accounts.id) {
      console.log("Google SDK not ready yet");
      return;
    }

    google.accounts.id.initialize({
      client_id: "517732252158-8se8po3adhi9qc21ihmui4m776tj86n4.apps.googleusercontent.com",
      callback: handleGoogleResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("googleSignInBtn"),
      {
        theme: "outline",
        size: "large",
      }
    );
  };
  
 function handleGoogleResponse(response) {
  var googleIdToken = response.credential;

  fetch("https://cloudspend-api-hdc4d0f3e4h7cjdu.centralindia-01.azurewebsites.net/api/auth/google", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      IdToken: googleIdToken
    })
  })
  .then(function (res) {
    if (!res.ok) {
      throw new Error("Google login failed");
    }
    return res.json();
  })
  .then(function (data) {
    console.log("Backend response:", data);

    localStorage.setItem("app_jwt", data.token);
    localStorage.setItem("user_name", data.user.name);
    localStorage.setItem("user_email", data.user.email);
    localStorage.setItem("user_picture", data.user.picture);

    // ✅ Redirect ONLY
    window.location.href = "/html/dashboard.html";
  })
  .catch(function (err) {
    console.error("UI error:", err);
    alert("Google login failed");
  });
}
  // ✅ Correct initialization
  $timeout($scope.initGoogle, 300);

  $scope.goBack = function () {
    $window.location.href = "/html/login.html";
  };
});