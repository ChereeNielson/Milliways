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
    var tableNumber = $("#table_num").val();
    var newTable = {
      // eslint-disable-next-line camelcase
      table_number: tableNumber
    };
    $.ajax({
      // eslint-disable-next-line camelcase
      url: "/api/tables/" + tableNumber,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      if (response.length === 0) {
        $.post("/api/tables", newTable, function() {
          console.log("Post sent");
        }).then(function(res) {
          $(".custom-select").attr("data-tableid", res.id);
          $(".custom-select").attr("data-tablenumber", res.table_number);
        });
      } else {
        $(".custom-select").attr("data-tableid", response[0].id);
        $(".custom-select").attr("data-tablenumber", tableNumber);
        getTableOrders();
      }
    });

    $(".select_table").hide();
    $(".order_items").show();
  });
  $(".add_item").on("click", function() {
    event.preventDefault();
    var newOrder = {
      // eslint-disable-next-line camelcase
      item_ordered: $(".custom-select").val(),
      TableId: $(".custom-select").attr("data-tableid")
    };
    $.post("/api/orders", newOrder, function(response) {
      console.log(response);
      getTableOrders();
    });
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
  function getTableOrders() {
    $.ajax({
      url: "/api/orders/" + $(".custom-select").attr("data-tableid"),
      method: "GET"
    }).then(function(response) {
      console.log(response);
      $("#tableOrders").empty();
      for (var i = 0; i < response.length; i++) {
        var li = $("<li>");
        li.text(response[i].item_ordered);
        $("#tableOrders").append(li);
      }
    });
  }
});
