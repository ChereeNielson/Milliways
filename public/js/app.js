$(document).ready(function() {
  $("#menu-form").hide();
  $("#deleteRes").on("click", function() {
    var id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/reservations/" + id
    }).then(function() {
      location.reload();
    });
  });
  $("#deleteMenu").on("click", function() {
    var id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/menu/" + id
    }).then(function() {
      location.reload();
    });
  });
  $("#add").on("click", function() {
    $("#menu-form").show();
    $("#add").hide();
  });
  $("#submit").on("click", function() {
    event.preventDefault();
    var newItem = {
      name: $("#name")
        .val()
        .trim(),
      ingredients: $("#ingredients")
        .val()
        .trim(),
      category: $("#category")
        .val()
        .trim(),
      image: $("#image")
        .val()
        .trim(),
      price: $("#price")
        .val()
        .trim()
    };
    $.post("/api/menu", newItem, function() {
      location.reload();
    });
  });
});
