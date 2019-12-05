function draw_table(){
    $("#results").empty();
    $.getJSONuncached = function(url) {
        return $.ajax({
            url: url,
            type: 'GET',
            cache: false,
            success: function(html) {
                $("#results").append(html);
                select_row();
            }
        });
    };
    $.getJSONuncached("/get/html")
};

function select_row()
{
	$("#menuTable tbody tr[id]").click(function ()
	{
		$(".selected").removeClass("selected");
		$(this).addClass("selected");
		var florenceDiscography = $(this).prevAll("tr").children("td[colspan='3']").length - 1;
		var cd = $(this).attr("id") - 1;
		delete_row(florenceDiscography, cd);
	})
};

function delete_row(sec, ent)
{
	$("#delete").click(function ()
	{
		$.ajax(
		{
			url: "/post/delete",
			type: "POST",
			data:
			{
                cd: ent,
                florenceDiscography: sec
			},
			cache: false,
			success: setTimeout(draw_table, 1000)
		})
	})
};

$(document).ready(function(){
    draw_table();
})

function validateForm() {
  var title = document.forms["myForm"]["title"].value;
  var year = document.forms["myForm"]["year"].value;
  var price = document.forms["myForm"]["price"].value;

  if (title == "") {
    alert("Title must be filled out");
    return false;
}

else if (year == "") {
    alert("Year must be filled out");
    return false;
}

else if (price == ""); {
    alert("Price must be filled out");
    return false;
  }
}