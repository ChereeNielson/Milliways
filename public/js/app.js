$(document).ready(function() {
  //deletes a reservation//
  $("#deleteRes").on("click", function() {
    var id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/reservations/" + id
    }).then(function() {
      location.reload();
    });
  });
  //deletes a menu item//
  $(document).on("click", "#deleteMenu", function() {
    var id = $(this).data("id");
    var r = confirm("Are you sure you want to delete this item?");
    if (r === true) {
      $.ajax({
        method: "DELETE",
        url: "/api/menu/" + id
      }).then(function() {
        location.reload();
      });
    } else {
      return false;
    }
  });
  //adds a menu item//
  $("#submit").on("click", function() {
    event.preventDefault();
    var newItem = {
      name: $("#name")
        .val()
        .trim(),
      ingredients: $("#ingredients")
        .val()
        .trim(),
      category: $("#category").val(),
      image: $("#image")
        .val()
        .trim(),
      price: $("#price")
        .val()
        .trim()
    };
    if (
      newItem.name === "" ||
      newItem.ingredients === "" ||
      newItem.ingredients === "" ||
      newItem.image === "" ||
      newItem.image === "" ||
      newItem.price === ""
    ) {
      alert("Oops! Make sure everything is filled out.");
    } else {
      $.post("/api/menu", newItem, function() {
        location.reload();
      });
    }
  });
  $(".order_items").hide();
  $("#enter_table").on("click", function() {
    event.preventDefault();
    getMenu();
    var newTable = {
      // eslint-disable-next-line camelcase
      table_number: $("#table_num").val()
    };
    $.post("/api/tables", newTable, function() {
      console.log("Post sent");
    });

    $(".select_table").hide();
    $(".order_items").show();
  });
  function getMenu() {
    $.ajax({
      url: "/api/menu",
      method: "GET"
    }).then(function(response) {
      console.log(response);
      for (var i = 0; i < response.length; i++) {
        var opt = $("<option>");
        opt.attr("value", response[i].name);
        opt.text(response[i].name);
        $(".custom-select").append(opt);
      }
    });
  }
});
