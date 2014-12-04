
var map;
var layers;


$(document).ready(function () {

	map = L.map('map', {
		zoomControl: false
	}).setView([43.4180,-89.7297], 14);

	var zoomControl = new L.control.zoom({position: "topright"}).addTo(map);

	L.Icon.Default.imagePath = "img";

	L.tileLayer('https://a.tiles.mapbox.com/v4/nps.2yxv8n84,nps.jhd2e8lb/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibnBzIiwiYSI6Ik5yOFVUR2sifQ.lcpvx7UEgHGoeObibjqMBw').addTo(map);

	var basemaps = {};
	layers = {};


	$(document).on("layeradd", function (e, layer, layerName) {
		$("#legendContent").append("<div class='legendItem'><input type='checkbox' class='legendCheckbox' value='" + layerName + "' checked>" + layerName + "</div>");
	});

	$(document).on("change", ".legendCheckbox", function (e) {
		if($(this).prop("checked"))
		{
			var layerName = $(this).val();
			map.addLayer(layers[layerName]);
		}
		else
		{
			var layerName = $(this).val();
			map.removeLayer(layers[layerName]);
		}
	});

	// add all our data

	$.getJSON("data/buildings.json", function (data) {
		var style = {
			"color": "#7e7e7e",
		    "weight": 4,
		    "opacity": 0.8
		};
		layers["Buildings"] = L.geoJson(data, {
			style: style
		}).addTo(map);
	}).complete(function() {
		$(document).trigger("layeradd", [layers["Buildings"], "Buildings"]);
	});

	$.getJSON("data/campsites.json", function (data) {
		var style = {
			"color": "#cccccc",
		    "weight": 5,
		    "opacity": 0.65
		};
		layers["Campsites"] = L.geoJson(data, { 
			style: style
		}).addTo(map);
	}).complete(function() {
		$(document).trigger("layeradd", [layers["Campsites"], "Campsites"]);
	});

	$.getJSON("data/parkboundaries.json", function (data) {
		var style = {
			"color": "#33691E",
		    "weight": 0,
		    "opacity": 0.65
		};
		layers["Park Boundaries"] = L.geoJson(data, { 
			style: style
		}).addTo(map);
	}).complete(function() {
		$(document).trigger("layeradd", [layers["Park Boundaries"], "Park Boundaries"]);
	});

	$.getJSON("data/historicalPoints.json", function (data) {
		layers["Historical Points"] = L.geoJson(data, {
			pointToLayer: function (feature, latlng) {
				var marker = L.divIcon({
					className: "historicalPoints",
					//html: "<img src='img/historical-points.svg'>"
				});
				return L.marker(latlng, {icon: marker})
			},
			onEachFeature: function(feature, layer) {
				layer.bindPopup("<center><h3>" + feature.properties.Name + "</h3><br>" + feature.properties.Description + "</center>");
			}
		}).addTo(map);
	}).complete(function() {
		$(document).trigger("layeradd", [layers["Historical Points"], "Historical Points"]);
	});

	$.getJSON("data/pointsOfInterest.json", function (data) {
		layers["Points of Interest"] = L.geoJson(data, {
			pointToLayer: function (feature, latlng) {
				var marker = L.divIcon({
					className: "pointsOfInterest",
					html: "<img src='img/points-of-interest.svg'>"
				});
				return L.marker(latlng, {icon: marker})
			},
			onEachFeature: function(feature, layer) {
				layer.bindPopup("<center><h3>" + feature.properties.Name + "</h3></center>");
			}
		}).addTo(map);
	}).complete(function() {
		$(document).trigger("layeradd", [layers["Points of Interest"], "Points of Interest"]);
	});

	$.getJSON("data/campsiteCenterpoints.json", function (data) {
		layers["Campsite Centerpoints"] = L.geoJson(data, {
			pointToLayer: function (feature, latlng) {
				var marker = L.divIcon({
					className: "campsiteCenterpoints",
					html: "<img src='img/campsites.svg'>"
				});
				return L.marker(latlng, {icon: marker})
			},
			onEachFeature: function(feature, layer) {
				layer.bindPopup("<center><h3>" + feature.properties.Name + "</h3></center>");
			}
		}).addTo(map);
	}).complete(function() {
		$(document).trigger("layeradd", [layers["Campsite Centerpoints"], "Campsite Centerpoints"]);
	});

	$.getJSON("data/shelters.json", function (data) {
		layers["Shelters"]= L.geoJson(data, {
			pointToLayer: function (feature, latlng) {
				var marker = L.divIcon({
					className: "shelters",
					html: "<img src='img/shelters.svg'>"
				});
				return L.marker(latlng, {icon: marker})
			}
		}).addTo(map);
	}).complete(function() {
		$(document).trigger("layeradd", [layers["Shelters"], "Shelters"]);
	});



	$.getJSON("data/trails.json", function (data) {

		var style = {
			"color": "#856363",
		    "weight": 0.75,
		    "opacity": 0.65
		};
		layers["Trails"] = L.geoJson(data, {
			className: "trails",
			style: style,
			onEachFeature: function (feature, layer) {
				if(feature.properties.name != null)
				{
					layer.bindPopup("<center><h3>" + feature.properties.name + "</center></h3>");
				}
			}
		}).addTo(map);

	}).complete(function() {
		$(document).trigger("layeradd", [layers["Trails"], "Trails"]);
	});



	$(document).on("click","#legendChevron.fa-chevron-down", function () {
		$("#legendContent").show();
		$("#legendChevron.fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
	});

	$(document).on("click","#legendChevron.fa-chevron-up", function () {
		$("#legendContent").hide();
		$("#legendChevron.fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
	});

});
