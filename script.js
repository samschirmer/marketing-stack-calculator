var totalPrice = 0;
var hubspotPrice = 4450;

// Resets row after a selection is made or changed
function clearRow(row, selectionOwner) {
	$("td[data-row='" + row + "']").each(function() {
		if ($(this).data("family") !== 'undefined' && selectionOwner == 'undefined') {
			clearFamily("hatchbuck");
			clearFamily("infusionsoft");
		}
		$(this).removeClass("active");
	});
	updateTotal();
};

// Resets family after a selection is made or changed
function clearFamily(family) {
	$("td[data-family='" + family + "']").removeClass("active");
	$("td[data-parent='" + family + "']").removeClass("active");
	updateTotal();
};

// Sets included categories to active when parent selected
function activateFamily(family) {
	$("td[data-family='" + family + "']").each(function() {
		if (family == "hatchbuck") {
			clearRow($(this).data("row"));
			clearFamily("infusionsoft");
			$(this).addClass("active");
		} else if (family == "infusionsoft") {
			clearRow($(this).data("row"));
			clearFamily("hatchbuck");
			$(this).addClass("active");
		} 
	})
};

// Updates the total upon selections
function updateTotal() {
	totalPrice = 0;
	hubspotPrice = 4450;
	$(".active").each(function() {
		if ($(this).data("parent") == "hubspot") {
			hubspotPrice += $(this).data("price");
			$("#hubspot_price").text(hubspotPrice.toFixed(2));	
		} else {
			totalPrice += $(this).data("price");
			$("#total_price").text(totalPrice.toFixed(2));	
		}
	});
};

// window.alert("DEBUG");

// toggles .active on elements when clicked
$(function() { 
	$(".selectable").click(function() { 
		// UNSELECT
		if ($(this).hasClass("active")) {
			// if element has family (HB/IS), clear them all on deselection of one
			if ($(this).data("family") !== 'undefined') {
				clearFamily($(this).data("family"));
			}
			$(this).removeClass("active");
		// SELECT
		} else {
			// determines if the selection is part of a family
			var owner = $(this).data("family");
			clearRow($(this).data("row"), owner);
			$(this).toggleClass("active");     
			activateFamily($(this).data("family"));
			// activating whole family when child is selected
			if ($(this).data("parent") !== 'undefined') {
				activateFamily($(this).data("parent"));
			}
			if (owner == 'undefined' || $(this).data("hack") == "yep") {
				clearFamily("hatchbuck");
				clearFamily("infusionsoft");
			} else if (owner == 'undefined' || $(this).data("hack") == "kinda") {
				clearFamily("hatchbuck");
			}
		}
		updateTotal();  
		$("#hubspot_price").text(hubspotPrice.toFixed(2));	
		$("#total_price").text(totalPrice.toFixed(2));	
	});
});
