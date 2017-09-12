/**
 * Created by USER on 8/23/2017.
 */

$("#list").children().first().text("Paniya");

//Clone the images
var clone = $("#list").parents("body").children("img").clone();

// Remove the image form  DOM tree
$("#list").parents("body").children("img").remove();

// Add image again to the  last unorderd list
$("#list").parents("div").children("ol").find("ul").children().first().append(clone);




//Clone input
var cloneOne = $("#list").parents("div").find("input").clone();

// Append the input into the div tag with Customer Name : txt
$("#list").parents("body").children("div:nth-child(2)").html("Customer Name :");
$("#list").parents("body").children("div:nth-child(2)").append(cloneOne);

//Replace the input tag with <span> Final Item</span>
$("#list").parents("div").find("input").replaceWith("<span>Final Item</span>");
