
var map, geojson, layer_name, layerSwitcher, featureOverlay;
var container, content, closer;
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');

/**
 * Create an overlay to anchor the popup to the map.
 */
var overlay = new ol.Overlay({
    element: container,
    autoPan: true,
    autoPanAnimation: {
        duration: 250
    }
});


/**
 * Add a click handler to hide the popup.
 * @return {boolean} Don't follow the href.
*/
closer.onclick = function () {
    overlay.setPosition(undefined);
    closer.blur();
    return false;
};

var view = new ol.View({
    projection: 'EPSG:4326',
    center: [107, 20.8],
    zoom: 11,

});
var view_ov = new ol.View({
    projection: 'EPSG:4326',
    center: [107, 20.8],
    zoom: 11,
});
// bản đồ openstressmap
var OSM = new ol.layer.Tile({
    source: new ol.source.OSM,
    visible: true,
    type: 'base',
    title: 'Open stress map',
});

var OSM2 = new ol.layer.Tile({
    source: new ol.source.OSM,
    visible: false,
    type: 'base',
    title: 'OSM',
});
// bản đồ google
var lyr_GoogleSatelliteHybrid_0 = new ol.layer.Tile({
    'title': 'Bản đồ vệ tinh',
    'type': 'base',
    'opacity': 1.000000,
    source: new ol.source.XYZ({
        attributions: ' ',
        url: 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}'
    })
});
var lyr_GoogleMaps_1 = new ol.layer.Tile({
    'title': 'Bản đồ đường phố',
    'type': 'base',
    'opacity': 1.000000,
    source: new ol.source.XYZ({
        attributions: ' ',
        url: 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}'
    })
});
// add base map
var base_maps = new ol.layer.Group({
    'title': 'Nền bản đồ',
    layers: [
        lyr_GoogleSatelliteHybrid_0, lyr_GoogleMaps_1
    ]
});

// LỚP QUY HOACH CẢNG
var overlays = new ol.layer.Group({
    'title': 'Lớp quy hoạch cảng',
    layers: [
        new ol.layer.Image({
            // tên title trùng với Geoserver
            title: 'Quy hoạch khu bến',
            // extent: [-180, -90, -180, 90],
            source: new ol.source.ImageWMS({
                url: 'http://54.254.143.207:8080/geoserver/wms',
                params: { 'LAYERS': 'CangHP:Quy hoạch khu bến' },
                ratio: 1,
                serverType: 'geoserver'
            })
        }),
        new ol.layer.Image({
            title: 'Tên bến cảng',

            // extent: [-180, -90, -180, 90],
            source: new ol.source.ImageWMS({
                url: 'http://54.254.143.207:8080/geoserver/wms',
                params: { 'LAYERS': 'CangHP:Tên bến cảng' },
                ratio: 1,
                serverType: 'geoserver'
            })
        })

    ]
});
//LỚP QUY HOẠCH THÀNH PHỐ
var qh_tp = new ol.layer.Group({
    'title': 'Quy hoạch chung thành phố Hải Phòng',
    layers: [
        new ol.layer.Image({
            // tên title trùng với Geoserver
            title: 'Quy hoạch giao thông',
            visible: false,
            // extent: [-180, -90, -180, 90],
            source: new ol.source.ImageWMS({
                url: 'http://54.254.143.207:8080/geoserver/wms',
                params: { 'LAYERS': 'CangHP:Quy hoạch giao thông' },
                ratio: 1,
                serverType: 'geoserver'
            })
        }),
        new ol.layer.Image({
            title: 'Quy hoạch sử dụng đất',
            visible: false,
            // extent: [-180, -90, -180, 90],
            source: new ol.source.ImageWMS({
                url: 'http://54.254.143.207:8080/geoserver/wms',
                params: { 'LAYERS': 'CangHP:Quy hoạch sử dụng đất' },
                opacity: 0.7,
                ratio: 1,
                serverType: 'geoserver'
            })
        }),
        new ol.layer.Image({
            title: 'Ranh giới quy hoạch',
            visible: false,
            // extent: [-180, -90, -180, 90],
            source: new ol.source.ImageWMS({
                url: 'http://54.254.143.207:8080/geoserver/wms',
                params: { 'LAYERS': 'CangHP:Ranh giới quy hoạch' },
                ratio: 1,
                serverType: 'geoserver'
            })
        }),
        new ol.layer.Image({
            title: 'Ranh giới quận, huyện',
            visible: false,
            // extent: [-180, -90, -180, 90],
            source: new ol.source.ImageWMS({
                url: 'http://54.254.143.207:8080/geoserver/wms',
                params: { 'LAYERS': 'CangHP:Ranh giới quận, huyện' },
                ratio: 1,
                serverType: 'geoserver'
            })
        }),
    ]
});

var map = new ol.Map({
    target: 'map',
    view: view,
    overlays: [overlay]
});
map.addLayer(base_maps);
map.addLayer(overlays);
map.addLayer(qh_tp);

// Add thêm lớp vào bản đồ
var rainfall = new ol.layer.Image({
    title: 'Vùng nước cảng biển Hải Phòng',
    // extent: [-180, -90, -180, 90],
    source: new ol.source.ImageWMS({
        url: 'http://54.254.143.207:8080/geoserver/wms',
        params: { 'LAYERS': 'CangHP:Vùng nước cảng biển Hải Phòng' },
        ratio: 1,
        serverType: 'geoserver'
    })
});
// Add vào map
overlays.getLayers().push(rainfall);
//map.addLayer(rainfall);
//
// Add thêm lớp vào bản đồ
var phaotieu = new ol.layer.Image({
    title: 'Hệ thống phao báo hiệu tàu',
    visible: false,
    // extent: [-180, -90, -180, 90],
    source: new ol.source.ImageWMS({
        url: 'http://54.254.143.207:8080/geoserver/wms',
        params: { 'LAYERS': 'CangHP:Hệ thống phao báo hiệu tàu' },
        ratio: 1,
        serverType: 'geoserver'
    })
});
// Add vào map
overlays.getLayers().push(phaotieu);
//map.addLayer(rainfall);
// Add thêm lớp vào bản đồ
var vungneo = new ol.layer.Image({
    title: 'Vùng neo và vùng đón trả hoa tiêu',
    // extent: [-180, -90, -180, 90],
    source: new ol.source.ImageWMS({
        url: 'http://54.254.143.207:8080/geoserver/wms',
        params: { 'LAYERS': 'CangHP:Vùng neo và vùng đón trả hoa tiêu' },
        ratio: 1,
        serverType: 'geoserver'
    })
});
// Add vào map
overlays.getLayers().push(vungneo);
//map.addLayer(rainfall);
// Add thêm lớp vào bản đồ
var duongthuy = new ol.layer.Image({
    title: 'Đường thủy',
    visible: false,
    // extent: [-180, -90, -180, 90],
    source: new ol.source.ImageWMS({
        url: 'http://54.254.143.207:8080/geoserver/wms',
        params: { 'LAYERS': 'CangHP:Đường thủy' },
        ratio: 1,
        serverType: 'geoserver'
    })
});
// Add vào map
overlays.getLayers().push(duongthuy);
//map.addLayer(rainfall);

var mouse_position = new ol.control.MousePosition();
map.addControl(mouse_position);

var overview = new ol.control.OverviewMap({
    view: view_ov,
    collapseLabel: 'O',
    label: 'O',
    layers: [OSM]
});

map.addControl(overview);

var full_sc = new ol.control.FullScreen({ label: 'F' });
map.addControl(full_sc);

var zoom = new ol.control.Zoom({ zoomInLabel: '+', zoomOutLabel: '-' });
map.addControl(zoom);

var slider = new ol.control.ZoomSlider();
map.addControl(slider);

var zoom_ex = new ol.control.ZoomToExtent({
    extent: [
        106.42, 20.55,
        107.15, 21.0
    ]
});
map.addControl(zoom_ex);
// Thêm nút đo chiều dài

var layerSwitcher = new ol.control.LayerSwitcher({
    activationMode: 'click',
    startActive: false, // An
    tipLabel: 'Các lớp dữ liệu', // Optional label for button
    groupSelectStyle: 'children', // Can be 'children' [default], 'group' or 'none'
    collapseTipLabel: 'Ẩn các lớp dữ liệu',

});
map.addControl(layerSwitcher);

function legend() {

    $('#legend').empty();

    var no_layers = overlays.getLayers().get('length');

    var head = document.createElement("h4");

    var txt = document.createTextNode("Chú thích:");

    head.appendChild(txt);
    var element = document.getElementById("legend");
    element.appendChild(head);
    var ar = [];
    var i;
    for (i = 0; i < no_layers; i++) {
        ar.push("http://54.254.143.207:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=" + overlays.getLayers().item(i).get('title'));
        //alert(overlays.getLayers().item(i).get('title'));
    }
    for (i = 0; i < no_layers; i++) {
        var head = document.createElement("p");
        var txt = document.createTextNode(overlays.getLayers().item(i).get('title'));
        //alert(txt[i]);
        head.appendChild(txt);
        var element = document.getElementById("legend");
        element.appendChild(head);
        var img = new Image();
        img.src = ar[i];
        var src = document.getElementById("legend");
        src.appendChild(img);
    }

}

legend();
// Lấy trường dữ liệu
function getFeatureTypeAttributes(layerName, callback) {
    var Att_name_pickobj = [];
    var Att_title_pickobj = [];

    $.ajax({
        type: "GET",
        url: "http://54.254.143.207:8080/geoserver/wfs?service=WFS&request=DescribeFeatureType&version=1.1.0&typeName=" + layerName,
        dataType: "xml",
        success: function (xml) {
            $(xml).find('xsd\\:sequence').each(function () {
                $(this).find('xsd\\:element').each(function () {
                    var documentationElement = $(this).find('xsd\\:documentation');
                    var text_content = documentationElement.text();
                    var value = $(this).attr('name');
                    if (value != 'geom' && value != 'the_geom' && text_content != "") {
                        Att_name_pickobj.push(value);
                        Att_title_pickobj.push(text_content);
                    }
                });
            });

            // Gọi hàm callback và truyền dữ liệu thu thập được
            callback(Att_name_pickobj, Att_title_pickobj);
        }
    });
}
// TẠO BẢNG
function createTableFromArrays(Att_title_pickobj, Att_value_pickobj) {
    var table = document.createElement("table");
    table.setAttribute("class", "table table-bordered");
    table.setAttribute("id", "table_popup");

    // Tạo hàng tiêu đề
    var tr = table.insertRow(-1);
    for (var i = 0; i < Att_title_pickobj.length; i++) {
        var th = document.createElement("th");
        th.innerHTML = Att_title_pickobj[i];
        tr.appendChild(th);
    }

    // Thêm giá trị từ mảng Att_value_pickobj
    tr = table.insertRow(-1);
    for (var i = 0; i < Att_value_pickobj.length; i++) {
        var tabCell = tr.insertCell(-1);
        tabCell.innerHTML = Att_value_pickobj[i];
    }
    return table;
}

// lấy thông tin đối tượng
function getinfo(evt) {
    if (geojson_pickobj) {
        map.removeLayer(geojson_pickobj);
    }


    var coordinate = evt.coordinate;
    var viewResolution = /** @type {number} */ (view.getResolution());

    //alert(coordinate1);
    $("#popup-content").empty();
    // Clear previously selected features
    // selectedFeatures.clear();

    document.getElementById('info').innerHTML = '';
    var no_layers = overlays.getLayers().get('length');
    // alert(no_layers);
    var url = new Array();
    //var url_2 = new Array();
    var wmsSource = new Array();
    var layer_title = new Array();
    var i;

    var Att_value_pickobj = [];
    //
    // Sử dụng hàm getFeatureTypeAttributes
    var layerName = 'Quy hoạch khu bến';
    getFeatureTypeAttributes(layerName, function (Att_name_pickobj, Att_title_pickobj) {

        //console.log('Attribute Names:', Att_name_pickobj);
        //console.log('Attribute Titles:', Att_title_pickobj);
        // Hoặc thực hiện các thao tác khác với danh sách thu thập được

        for (i = 0; i < no_layers; i++) {
            //alert(overlays.getLayers().item(i).getVisible());
            var visibility = overlays.getLayers().item(i).getVisible();
            //alert(visibility);
            layer_title[i] = overlays.getLayers().item(i).get('title');
            if (visibility == true && layer_title[i] == 'Quy hoạch khu bến') {

                //alert(i);
                //var type = overlays.getLayers().item(i).get('typeName');
                //alert(type);
                //alert(layer_title[i]);
                wmsSource[i] = new ol.source.ImageWMS({
                    url: 'http://54.254.143.207:8080/geoserver/wms',
                    params: { 'LAYERS': layer_title[i] },
                    serverType: 'geoserver',
                    crossOrigin: 'anonymous'

                });

                //console.log(wmsSource[i]);
                //var coordinate2 = evt.coordinate;
                //alert(coordinate[0]);
                url[i] = wmsSource[i].getFeatureInfoUrl(
                    evt.coordinate, viewResolution, 'EPSG:4326',
                    { 'INFO_FORMAT': 'text/html' });
                //console.log(url[i]);
                //assuming you use jquery
                $.get(url[i], function (data) {
                    //alert(i);
                    //append the returned html data
                    // $("#info").html(data);
                    //document.getElementById('info').innerHTML = data;
                    //document.getElementById('popup-content').innerHTML = '<p>Feature Info</p><code>' + data + '</code>';
                    //alert(dat[i]);
                    //alert(data);
                    var parser = new DOMParser();
                    var htmlDoc = parser.parseFromString(data, 'text/html');

                    // Lấy danh sách tiêu đề cột từ hàng đầu tiên (hàng tiêu đề)
                    var headerRow = htmlDoc.querySelector('table.featureInfo tr:first-child');
                    var headers = headerRow.querySelectorAll('th');

                    // Lấy danh sách tất cả các thẻ <tr> trong bảng (bỏ qua hàng đầu tiên)
                    var rows = htmlDoc.querySelectorAll('table.featureInfo tr:not(:first-child)');
                    var cells = rows[0].querySelectorAll('td');

                    for (i = 0; i < headers.length; i++) {
                        //console.log(headers[i].textContent);
                        for (j = 0; j < Att_name_pickobj.length; j++) {
                            if (headers[i].textContent == Att_name_pickobj[j]) {
                                Att_value_pickobj.push(cells[i].textContent);
                            }
                        }
                    }


                    // Tạo bảng HTML                    

                    var tableElement = createTableFromArrays(Att_title_pickobj, Att_value_pickobj);

                    $("#popup-content").append(tableElement);
                    //$("#popup-content").append(data);
                    //document.getElementById('popup-content').innerHTML = '<p>Feature Info</p><code>' + data + '</code>';
                    overlay.setPosition(coordinate);
                    layerSwitcher.renderPanel();

                });
                //alert(layer_title[i]);
                //alert(data);
                // Create a feature and add it to the highlight layer
                // Tạo CQL filter sử dụng CONTAINS
                var cqlFilter = "CONTAINS(geom, POINT(" + coordinate[0] + " " + coordinate[1] + "))";
                var url_json = "http://54.254.143.207:8080/geoserver/wfs?request=GetFeature&version=1.0.0&typeName=" + layer_title[i] + "&outputFormat=json&cql_filter=" + encodeURIComponent(cqlFilter)
                //console.log(url_json)
                //console.log(url);

                var style = new ol.style.Style({
                    fill: new ol.style.Fill({
                        color: 'transparent', // Đổi màu sắc tại đây
                    }),
                    stroke: new ol.style.Stroke({
                        color: '#ffcc33',
                        width: 3
                    }),

                    image: new ol.style.Circle({
                        radius: 7,
                        fill: new ol.style.Fill({
                            color: '#ffcc33'
                        })
                    })
                });

                geojson_pickobj = new ol.layer.Vector({
                    //title:'dfdfd',
                    //title: '<h5>' + value_crop+' '+ value_param +' '+ value_seas+' '+value_level+'</h5>',
                    source: new ol.source.Vector({
                        url: url_json,
                        format: new ol.format.GeoJSON()
                    }),
                    style: style,

                });

                map.addLayer(geojson_pickobj);

                //alert(Att_name_pickobj.length);
                /*
                // TẠO BẢNG HIỂN THỊ THÔNG TIN
                $.getJSON(url_json, function (data) {
                    //alert(data.features[0].properties);
                    //alert(data.features.length);
                    var col = [];
                    col.push('id');
                    for (var i = 0; i < data.features.length; i++) {
    
                        for (var key in data.features[i].properties) {
    
                            if (col.indexOf(key) === -1) {
                                col.push(key);
                            }
                        }
                    }
    
                    // TẠO BẢNG 
    
                    var table = document.createElement("table");
                    table.setAttribute("class", "table table-bordered");
                    table.setAttribute("id", "table");
                    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
    
                    var tr = table.insertRow(-1);                   // TABLE ROW.
                    for (var i = 0; i < col.length; i++) {
                        if (i == 0) {
                            var th = document.createElement("th");      // TABLE HEADER.
                            th.innerHTML = col[i];
                            tr.appendChild(th);
                        }
                        for (var j = 0; j < Att_name_pickobj.length; j++) {
                            if (col[i] == Att_name_pickobj[j]) {
                                var th = document.createElement("th");      // TABLE HEADER.
                                th.innerHTML = Att_title_pickobj[j];
                                tr.appendChild(th);
                                break;
                            }
                        }
    
                    }
    
                    // ADD JSON DATA TO THE TABLE AS ROWS.
                    for (var i = 0; i < data.features.length; i++) {
    
                        tr = table.insertRow(-1);
    
                        for (var j = 0; j < Att_name_pickobj.length + 1; j++) {
                            var tabCell = tr.insertCell(-1);
                            if (j == 0) { tabCell.innerHTML = data.features[i]['id']; }
                            else {
                                //alert(data.features[i]['id']);
                                for (var jj = 0; jj < col.length; jj++) {
                                    if (col[jj] == Att_name_pickobj[j - 1]) {
                                        tabCell.innerHTML = data.features[i].properties[col[jj]];
                                        //alert(tabCell.innerHTML);
                                        break;
                                    }
                                }
                            }
                        }
                    }
    
    
    
                    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
                    var divContainer = document.getElementById("table_data");
                    divContainer.innerHTML = "";
                    divContainer.appendChild(table);
                    addRowHandlers();
                    // ẩn cột ID
                    var rows = table.rows;
                    var cells = rows[0].cells;
                    for (var i = 0; i < rows.length; i++) {
                        var cells = rows[i].cells;
                        if (cells.length > 0) {
                            cells[0].style.display = 'none'; // Ẩn cột đầu tiên
                        }
                    }
                    document.getElementById('map').style.height = '85%';
                    document.getElementById('table_data').style.height = '11%';
                    map.updateSize();
                });
                //map.on('click', highlight);
                //addRowHandlers();
                */
            }
        }
    });
}


getinfotype.onchange = function () {
    map.removeInteraction(draw);
    if (vectorLayer) { vectorLayer.getSource().clear(); }
    map.removeOverlay(helpTooltip);
    if (measureTooltipElement) {
        var elem = document.getElementsByClassName("tooltip tooltip-static");
        for (var i = elem.length - 1; i >= 0; i--) {

            elem[i].remove();
            //alert(elem[i].innerHTML);
        }
    }

    if (getinfotype.value == 'activate_getinfo') {

        map.on('singleclick', getinfo);
    }
    else if (getinfotype.value == 'deactivate_getinfo') {

        if (geojson_pickobj) { geojson_pickobj.getSource().clear(); map.removeLayer(geojson_pickobj); }
        map.un('singleclick', getinfo);
        overlay.setPosition(undefined);
        closer.blur();
    }
};





// measure tool
var source = new ol.source.Vector();
var vectorLayer = new ol.layer.Vector({
    //title: 'layer',
    source: source,
    style: new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0.2)'
        }),
        stroke: new ol.style.Stroke({
            color: '#ffcc33',
            width: 2
        }),
        image: new ol.style.Circle({
            radius: 7,
            fill: new ol.style.Fill({
                color: '#ffcc33'
            })
        })
    })
});

//overlays.getLayers().push(vectorLayer);
map.addLayer(vectorLayer);

//layerSwitcher.renderPanel();


/**
   * Currently drawn feature.
   * @type {module:ol/Feature~Feature}
*/
var sketch;


/**
 * The help tooltip element.
 * @type {Element}
*/
var helpTooltipElement;


/**
 * Overlay to show the help messages.
 * @type {module:ol/Overlay}
*/
var helpTooltip;


/**
 * The measure tooltip element.
 * @type {Element}
*/
var measureTooltipElement;


/**
 * Overlay to show the measurement.
 * @type {module:ol/Overlay}
*/
var measureTooltip;


/**
 * Message to show when the user is drawing a polygon.
 * @type {string}
*/
var continuePolygonMsg = 'Click to continue drawing the polygon';


/**
 * Message to show when the user is drawing a line.
 * @type {string}
*/
var continueLineMsg = 'Click to continue drawing the line';
/**
 * Handle pointer move.
 * @param {module:ol/MapBrowserEvent~MapBrowserEvent} evt The event.
*/
var pointerMoveHandler = function (evt) {
    if (evt.dragging) {
        return;
    }
    /** @type {string} */
    var helpMsg = 'Click to start drawing';

    if (sketch) {
        var geom = (sketch.getGeometry());
        if (geom instanceof ol.geom.Polygon) {

            helpMsg = continuePolygonMsg;
        } else if (geom instanceof ol.geom.LineString) {
            helpMsg = continueLineMsg;
        }
    }
    if (helpTooltipElement !== undefined) {

        helpTooltipElement.innerHTML = helpMsg;
        helpTooltip.setPosition(evt.coordinate);
        helpTooltipElement.classList.remove('hidden');

    }
};

map.on('pointermove', pointerMoveHandler);
map.getViewport().addEventListener('mouseout', function () {
    //helpTooltipElement.classList.add('hidden');
});

//var measuretype = document.getElementById('measuretype');

var draw; // global so we can remove it later


/**
 * Format length output.
 * @param {module:ol/geom/LineString~LineString} line The line.
* @return {string} The formatted length.
*/
var formatLength = function (line) {
    var length = ol.sphere.getLength(line, { projection: 'EPSG:4326' });
    //var length = getLength(line);
    //var length = line.getLength({projection:'EPSG:4326'});

    var output;
    if (length > 100) {
        output = (Math.round(length / 1000 * 100) / 100) +
            ' ' + 'km';

    } else {
        output = (Math.round(length * 100) / 100) +
            ' ' + 'm';

    }
    return output;

};


/**
 * Format area output.
 * @param {module:ol/geom/Polygon~Polygon} polygon The polygon.
* @return {string}// Formatted area.
*/
var formatArea = function (polygon) {
    // var area = getArea(polygon);
    var area = ol.sphere.getArea(polygon, { projection: 'EPSG:4326' });
    // var area = polygon.getArea();
    //alert(area);
    var output;
    if (area > 10000) {
        output = (Math.round(area / 1000000 * 100) / 100) +
            ' ' + 'km<sup>2</sup>';
    } else {
        output = (Math.round(area * 100) / 100) +
            ' ' + 'm<sup>2</sup>';
    }
    return output;
};

function addInteraction() {

    var type;
    if (measuretype.value == 'area') { type = 'Polygon'; }
    else if (measuretype.value == 'length') { type = 'LineString'; }
    //alert(type);

    //var type = (measuretype.value == 'area' ? 'Polygon' : 'LineString');
    draw = new ol.interaction.Draw({
        source: source,
        type: type,
        style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255, 255, 255, 0.5)'
            }),
            stroke: new ol.style.Stroke({
                color: 'rgba(0, 0, 0, 0.5)',
                lineDash: [10, 10],
                width: 2
            }),
            image: new ol.style.Circle({
                radius: 5,
                stroke: new ol.style.Stroke({
                    color: 'rgba(0, 0, 0, 0.7)'
                }),
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 255, 0.5)'
                })
            })
        })
    });

    if (measuretype.value == 'select' || measuretype.value == 'clear') {

        map.removeInteraction(draw);
        if (vectorLayer) { vectorLayer.getSource().clear(); }
        map.removeOverlay(helpTooltip);

        if (measureTooltipElement) {
            var elem = document.getElementsByClassName("tooltip tooltip-static");
            //$('#measure_tool').empty(); 

            //alert(elem.length);
            for (var i = elem.length - 1; i >= 0; i--) {

                elem[i].remove();
                //alert(elem[i].innerHTML);
            }
        }

        //var elem1 = elem[0].innerHTML;
        //alert(elem1);

    }

    else if (measuretype.value == 'area' || measuretype.value == 'length') {

        map.addInteraction(draw);
        createMeasureTooltip();
        createHelpTooltip();

        var listener;
        draw.on('drawstart',
            function (evt) {
                // set sketch


                //vectorLayer.getSource().clear();

                sketch = evt.feature;

                /** @type {module:ol/coordinate~Coordinate|undefined} */
                var tooltipCoord = evt.coordinate;

                listener = sketch.getGeometry().on('change', function (evt) {
                    var geom = evt.target;

                    var output;
                    if (geom instanceof ol.geom.Polygon) {

                        output = formatArea(geom);
                        tooltipCoord = geom.getInteriorPoint().getCoordinates();

                    } else if (geom instanceof ol.geom.LineString) {

                        output = formatLength(geom);
                        tooltipCoord = geom.getLastCoordinate();
                    }
                    measureTooltipElement.innerHTML = output;
                    measureTooltip.setPosition(tooltipCoord);
                });
            }, this);

        draw.on('drawend',
            function () {
                measureTooltipElement.className = 'tooltip tooltip-static';
                measureTooltip.setOffset([0, -7]);
                // unset sketch
                sketch = null;
                // unset tooltip so that a new one can be created
                measureTooltipElement = null;
                createMeasureTooltip();
                ol.Observable.unByKey(listener);
            }, this);

    }
}


/**
 * Creates a new help tooltip
 */
function createHelpTooltip() {
    if (helpTooltipElement) {
        helpTooltipElement.parentNode.removeChild(helpTooltipElement);
    }
    helpTooltipElement = document.createElement('div');
    helpTooltipElement.className = 'tooltip hidden';
    helpTooltip = new ol.Overlay({
        element: helpTooltipElement,
        offset: [15, 0],
        positioning: 'center-left'
    });
    map.addOverlay(helpTooltip);
}


/**
 * Creates a new measure tooltip
 */
function createMeasureTooltip() {
    if (measureTooltipElement) {
        measureTooltipElement.parentNode.removeChild(measureTooltipElement);
    }
    measureTooltipElement = document.createElement('div');
    measureTooltipElement.className = 'tooltip tooltip-measure';

    measureTooltip = new ol.Overlay({
        element: measureTooltipElement,
        offset: [0, -15],
        positioning: 'bottom-center'
    });
    map.addOverlay(measureTooltip);

}


/**
 * Let user change the geometry type.
 */
measuretype.onchange = function () {

    map.un('singleclick', getinfo);
    overlay.setPosition(undefined);
    closer.blur();
    map.removeInteraction(draw);
    addInteraction();
};


// Đo chiều dài

// Lấy tham chiếu đến nút bằng ID
var btn_do_chieudai = document.getElementById("btn_do_chieu_dai");
var hoverContent = document.getElementById("dynamic-content");
// Gán sự kiện mouseover cho nút
btn_do_chieudai.addEventListener("mouseover", function (event) {
    // Thay đổi nội dung và vị trí của div khi hover
    hoverContent.textContent = "Đo khoảng cách";
    hoverContent.style.display = "block";
    hoverContent.style.top = 31 + "%";
    hoverContent.style.left = 2 + "%";


});

// Gán sự kiện mouseout cho nút
btn_do_chieudai.addEventListener("mouseout", function () {
    // Ẩn nội dung khi rời chuột khỏi nút
    hoverContent.style.display = "none";
});
// Gán sự kiện onclick cho nút
var buttonState = true; // Sử dụng biến để theo dõi trạng thái của nút
btn_do_chieudai.onclick = function () {
    // Đoạn mã JavaScript mà bạn muốn thực thi khi nút được nhấp
    //alert('Đo chiều dài');
    if (buttonState) {
        do_chieu_dai();
    } else {
        map.removeInteraction(draw);
        if (draw1) { map.removeInteraction(draw1); }
        if (vector1) { vector1.getSource().clear(); }

        if (vectorLayer) { vectorLayer.getSource().clear(); }
        map.removeOverlay(helpTooltip);
        if (measureTooltipElement) {
            var elem = document.getElementsByClassName("tooltip tooltip-static");

            for (var i = elem.length - 1; i >= 0; i--) {

                elem[i].remove();
                //alert(elem[i].innerHTML);
            }
        }
        map.un('singleclick', getinfo);
        overlay.setPosition(undefined);
        closer.blur();
        map.un('click', highlight);
    }
    buttonState = !buttonState; // Chuyển đổi trạng thái của biến
};
function do_chieu_dai() {
    //alert('Đo chiều dài');
    var measuretype_2 = document.getElementById("measuretype");
    measuretype_2.value = 'length';
    // Tạo sự kiện change để chạy sự kiện onchange của thẻ select
    var event = new Event("change");
    // Kích hoạt sự kiện change cho thẻ select
    measuretype_2.dispatchEvent(event);

}
// Đo diện tích

// Lấy tham chiếu đến nút bằng ID
var btn_do_dt = document.getElementById("btn_do_dt");
var hoverContent = document.getElementById("dynamic-content");
var buttonState_2 = true; // Sử dụng biến để theo dõi trạng thái của nút
// Gán sự kiện mouseover cho nút
btn_do_dt.addEventListener("mouseover", function (event) {
    // Thay đổi nội dung và vị trí của div khi hover
    hoverContent.textContent = "Đo diện tích";
    hoverContent.style.display = "block";
    hoverContent.style.top = 35 + "%";
    hoverContent.style.left = 2 + "%";


});

// Gán sự kiện mouseout cho nút
btn_do_dt.addEventListener("mouseout", function () {
    // Ẩn nội dung khi rời chuột khỏi nút
    hoverContent.style.display = "none";
});
// Gán sự kiện onclick cho nút
btn_do_dt.onclick = function () {
    // Đoạn mã JavaScript mà bạn muốn thực thi khi nút được nhấp
    //alert('Đo chiều dài');
    if (buttonState_2) {
        do_dt();
    } else {
        map.removeInteraction(draw);
        if (draw1) { map.removeInteraction(draw1); }
        if (vector1) { vector1.getSource().clear(); }

        if (vectorLayer) { vectorLayer.getSource().clear(); }
        map.removeOverlay(helpTooltip);
        if (measureTooltipElement) {
            var elem = document.getElementsByClassName("tooltip tooltip-static");

            for (var i = elem.length - 1; i >= 0; i--) {

                elem[i].remove();
                //alert(elem[i].innerHTML);
            }
        }
        map.un('singleclick', getinfo);
        overlay.setPosition(undefined);
        closer.blur();
        map.un('click', highlight);
    }
    buttonState_2 = !buttonState_2; // Chuyển đổi trạng thái của biến

};
function do_dt() {
    //alert('Đo chiều dài');
    var measuretype_2 = document.getElementById("measuretype");
    measuretype_2.value = 'area';
    // Tạo sự kiện change để chạy sự kiện onchange của thẻ select
    var event = new Event("change");
    // Kích hoạt sự kiện change cho thẻ select
    measuretype_2.dispatchEvent(event);

}
// wms_layers_window

// wms_layers_window

function wms_layers() {
    //alert('jdgf');

    $(function () {

        $("#wms_layers_window").dialog({
            height: 400,
            width: 800,
            modal: true
        });
        $("#wms_layers_window").show();

    });

    $(document).ready(function () {
        $.ajax({
            type: "GET",
            url: "http://54.254.143.207:8080/geoserver/wms?request=getCapabilities",
            dataType: "xml",
            success: function (xml) {
                $('#table_wms_layers').empty();
                console.log("here");
                $('<tr></tr>').html('<th>Name</th><th>Title</th><th>Abstract</th>').appendTo('#table_wms_layers');
                $(xml).find('Layer').find('Layer').each(function () {
                    var name = $(this).children('Name').text();
                    // alert(name);
                    //var name1 = name.find('Name').text();
                    //alert(name);
                    var title = $(this).children('Title').text();

                    var abst = $(this).children('Abstract').text();
                    //   alert(abst);


                    //   alert('test');
                    $('<tr></tr>').html('<td>' + name + '</td><td>' + title + '</td><td>' + abst + '</td>').appendTo('#table_wms_layers');


                });
                addRowHandlers();
            }
        });
    });


    var divContainer = document.getElementById("wms_layers_window");
    var table1 = document.getElementById("table_wms_layers");
    divContainer.innerHTML = "";
    divContainer.appendChild(table1);
    $("#wms_layers_window").show();

    var add_map_btn = document.createElement("BUTTON");
    add_map_btn.setAttribute("id", "add_map_btn");
    add_map_btn.innerHTML = "Add Layer to Map";
    add_map_btn.setAttribute("onclick", "add_layer()");
    divContainer.appendChild(add_map_btn);

    /*	function findRowNumber(cn1, v1){
    var table = document.querySelector('#table1');
  var rows = table.querySelectorAll("tr");
  var msg = "No such row exist"
  for(i=1;i<rows.length;i++){
      var tableData = rows[i].querySelectorAll("td");
  if(tableData[cn1-1].textContent==v1){
      msg = i;
  break;
      }
    }
  return msg;
  }
  */

    function addRowHandlers() {
        //alert('knd');
        var rows = document.getElementById("table_wms_layers").rows;
        var table = document.getElementById('table_wms_layers');
        var heads = table.getElementsByTagName('th');
        var col_no;
        for (var i = 0; i < heads.length; i++) {
            // Take each cell
            var head = heads[i];
            //alert(head.innerHTML);
            if (head.innerHTML == 'Name') {
                col_no = i + 1;
                //alert(col_no);
            }

        }
        for (i = 0; i < rows.length; i++) {

            rows[i].onclick = function () {
                return function () {

                    $(function () {
                        $("#table_wms_layers td").each(function () {
                            $(this).parent("tr").css("background-color", "white");
                        });
                    });
                    var cell = this.cells[col_no - 1];
                    layer_name = cell.innerHTML;
                    // alert(layer_name);

                    $(document).ready(function () {
                        $("#table_wms_layers td:nth-child(" + col_no + ")").each(function () {
                            if ($(this).text() == layer_name) {
                                $(this).parent("tr").css("background-color", "grey");



                            }
                        });
                    });

                    //alert("id:" + id);
                };
            }(rows[i]);
        }
        /*$("#add_map_btn").click(function () {
        // var value = $(".selected td:first").html();
        // value = value || "No row Selected";
        alert(layer_name);
         });*/
    }

}

function add_layer() {
    //alert("jd");
    //alert(layer_name);
    //map.removeControl(layerSwitcher);

    var name = layer_name.split(":");

    var layer_wms = new ol.layer.Image({
        title: name[1],
        // extent: [-180, -90, -180, 90],
        source: new ol.source.ImageWMS({
            url: 'http://54.254.143.207:8080/geoserver/wms',
            params: { 'LAYERS': layer_name },
            ratio: 1,
            serverType: 'geoserver'
        })
    });
    overlays.getLayers().push(layer_wms);

    var url = 'http://54.254.143.207:8080/geoserver/wms?request=getCapabilities';
    var parser = new ol.format.WMSCapabilities();


    $.ajax(url).then(function (response) {
        //window.alert("word");
        var result = parser.read(response);
        // console.log(result);
        // window.alert(result);
        var Layers = result.Capability.Layer.Layer;
        var extent;
        for (var i = 0, len = Layers.length; i < len; i++) {

            var layerobj = Layers[i];
            //  window.alert(layerobj.Name);

            if (layerobj.Name == layer_name) {
                extent = layerobj.BoundingBox[0].extent;
                //alert(extent);
                map.getView().fit(
                    extent,
                    { duration: 1590, size: map.getSize() }
                );

            }
        }
    });
    //alert(layer_wms.get('source').get('extent'));
    /*layer_wms.getSource().on('singleclick', function(){
      map.getView().fit(
          layer_wms.getExtent(),
          { duration: 1590, size: map.getSize() }
      );
 });*/

    layerSwitcher.renderPanel();
    //map.addControl(layerSwitcher);
    legend();
    //map.addLayer(layer_wms);
}

// layers_name

$(document).ready(function () {

    $.ajax({
        type: "GET",
        url: "http://54.254.143.207:8080/geoserver/wfs?request=getCapabilities",
        dataType: "xml",
        success: function (xml) {
            var select = $('#layer');
            $(xml).find('FeatureType').each(function () {
                //var title = $(this).find('ows:Operation').attr('name');
                //alert(title);
                var name = $(this).find('Name').text();
                //select.append("<option/><option class='ddheader' value='"+ name +"'>"+title+"</option>");
                var no_layers = overlays.getLayers().get('length');
                //Thêm dữ liệu vào Combobox
                $(this).find('Title').each(function () {
                    var value = $(this).text();
                    //alert(value);
                    for (i = 0; i < no_layers; i++) {
                        var nametitle = overlays.getLayers().item(i).get('title')
                        if (nametitle == value) {
                            select.append("<option class='ddindent' value='" + value + "'>" + value + "</option>");
                        }
                    };
                });

                //Thêm dữ liệu vào Combobox
                $(this).find('Name').each(function () {
                    var value = $(this).text();
                    //alert(value);
                    //select.append("<option class='ddindent' value='" + value + "'>" + value + "</option>");
                });
            });
            //select.children(":first").text("please make a selection").attr("selected", true);
            //select.prop("selectedIndex", 1);
        }

    });


});
/*
// Add layer name
$(document).ready(function () {
    var select = $('#layer');
    for (i = 0; i < no_layers; i++) {
        var nametitle = overlays.getLayers().item(i).get('title')
        alert(nametitle);
    };

});
*/
// attributes_dropdown
var Att_name = [];

$(function () {
    $("#layer").change(function () {
        // Xóa mảng dữ liệu cũ
        Att_name = [];
        var att_index = 1;
        var attributes = document.getElementById("attributes");
        var length = attributes.options.length;
        for (i = length - 1; i >= 0; i--) {
            attributes.options[i] = null;
        }

        var value_layer = $(this).val();

        //alert(value_crop);

        //var level = document.getElementById("level");
        //var value_level = level.options[level.selectedIndex].value;
        //var url = "http://54.254.143.207:8080/geoserver/wfs?service=WFS&request=DescribeFeatureType&version=1.1.0&typeName=" + value_layer;
        //alert(url);
        //console.log(url);
        attributes.options[0] = new Option('--Chọn trường dữ liệu--', "");
        //  alert(url);

        $(document).ready(function () {
            $.ajax({
                type: "GET",
                url: "http://54.254.143.207:8080/geoserver/wfs?service=WFS&request=DescribeFeatureType&version=1.1.0&typeName=" + value_layer,
                dataType: "xml",
                success: function (xml) {

                    var select = $('#attributes');
                    //var title = $(xml).find('xsd\\:complexType').attr('name');
                    //	alert(title);
                    $(xml).find('xsd\\:sequence').each(function () {

                        $(this).find('xsd\\:element').each(function () {
                            // Find the <xsd:documentation> element within the current <xsd:element>
                            var documentationElement = $(this).find('xsd\\:documentation');
                            // Extract the text content of the <xsd:documentation> element
                            var text_content = documentationElement.text();
                            //alert(text_content);
                            var value = $(this).attr('name');
                            //alert(value);
                            var type = $(this).attr('type');
                            //alert(type);
                            //var Nillable = $(this).attr('nillable');
                            //alert(Nillable);
                            if (value != 'geom' && value != 'the_geom' && text_content != "") {
                                Att_name[att_index] = value;
                                att_index = att_index + 1;
                                select.append("<option class='ddindent' value='" + type + "'>" + text_content + "</option>");

                            }
                        });

                    });

                }

            });
        });


    });
});


// operator combo
$(function () {
    $("#attributes").change(function () {

        var operator = document.getElementById("operator");
        var length = operator.options.length;
        for (i = length - 1; i >= 0; i--) {
            operator.options[i] = null;
        }

        var value_type = $(this).val();
        // alert(value_type);
        var value_attribute = $('#attributes option:selected').text();
        //operator.options[0] = new Option('--Phương pháp tìm kiếm--', "");

        if (value_type == 'xsd:short' || value_type == 'xsd:int' || value_type == 'xsd:double') {
            var operator1 = document.getElementById("operator");
            operator1.options[0] = new Option('Lớn hơn', '>');
            operator1.options[1] = new Option('Nhỏ hơn', '<');
            operator1.options[2] = new Option('Bằng', '=');
        }
        else if (value_type == 'xsd:string') {
            var operator1 = document.getElementById("operator");
            operator1.options[0] = new Option('Nhập tên', 'Like');

        }

    });
});

var highlightStyle = new ol.style.Style({
    fill: new ol.style.Fill({
        color: 'transparent', // Đổi màu sắc tại đây
    }),
    stroke: new ol.style.Stroke({
        color: '#3399CC',
        width: 3,
    }),
    image: new ol.style.Circle({
        radius: 10,
        fill: new ol.style.Fill({
            color: '#3399CC'
        })
    })
});

featureOverlay = new ol.layer.Vector({
    source: new ol.source.Vector(),
    map: map,
    style: highlightStyle
});
var highlight1;

function findRowNumber(cn1, v1) {

    var table = document.querySelector('#table');
    var rows = table.querySelectorAll("tr");
    var msg = "No such row exist"
    for (i = 1; i < rows.length; i++) {
        var tableData = rows[i].querySelectorAll("td");
        if (tableData[cn1 - 1].textContent == v1) {
            msg = i;
            break;
        }
    }
    return msg;
}


function addRowHandlers() {

    var rows = document.getElementById("table").rows;
    var heads = table.getElementsByTagName('th');
    var col_no;
    for (var i = 0; i < heads.length; i++) {
        // Take each cell
        var head = heads[i];
        //alert(head.innerHTML);
        if (head.innerHTML == 'id') {
            col_no = i + 1;
            //alert(col_no);
        }

    }
    for (i = 0; i < rows.length; i++) {



        rows[i].onclick = function () {
            return function () {
                featureOverlay.getSource().clear();

                $(function () {
                    $("#table td").each(function () {
                        $(this).parent("tr").css("background-color", "white");
                    });
                });
                var cell = this.cells[col_no - 1];
                var id = cell.innerHTML;


                $(document).ready(function () {
                    $("#table td:nth-child(" + col_no + ")").each(function () {
                        if ($(this).text() == id) {
                            $(this).parent("tr").css("background-color", "grey");
                        }
                    });
                });

                var features = geojson.getSource().getFeatures();
                //alert(features.length);


                for (i = 0; i < features.length; i++) {



                    if (features[i].getId() == id) {
                        featureOverlay.getSource().addFeature(features[i]);

                        featureOverlay.getSource().on('addfeature', function () {
                            map.getView().fit(
                                featureOverlay.getSource().getExtent(),
                                { duration: 1590, size: map.getSize() }
                            );
                        });

                    }
                }

                //alert("id:" + id);
            };
        }(rows[i]);
    }
}


function highlight(evt) {
    featureOverlay.getSource().clear();
    var feature = map.forEachFeatureAtPixel(evt.pixel,
        function (feature, layer) {
            return feature;
        });

    if (feature) {

        var geometry = feature.getGeometry();
        var coord = geometry.getCoordinates();
        var coordinate = evt.coordinate;
        //alert(feature.get('gid'));
        // alert(coordinate);
        /*var content1 = '<h3>' + feature.get([name]) + '</h3>';
    content1 += '<h5>' + feature.get('crop')+' '+ value_param +' '+ value_seas+' '+value_level+'</h5>'
    content1 += '<h5>' + feature.get([value_param]) +' '+ unit +'</h5>';

    // alert(content1);
    content.innerHTML = content1;
    overlay.setPosition(coordinate);*/

        // console.info(feature.getProperties());

        $(function () {
            $("#table td").each(function () {
                $(this).parent("tr").css("background-color", "white");
            });
        });

        featureOverlay.getSource().addFeature(feature);
    }

    /*$(function() {
      $("#table td").each(function () {
          if ($(this).text() == feature.get('gid')) {
              // $(this).css('color', 'red');
              $(this).parent("tr").css("background-color", "grey");
          }
      });
});*/


    var table = document.getElementById('table');
    var cells = table.getElementsByTagName('td');
    var rows = document.getElementById("table").rows;
    var heads = table.getElementsByTagName('th');
    var col_no;
    for (var i = 0; i < heads.length; i++) {
        // Take each cell
        var head = heads[i];
        //alert(head.innerHTML);
        if (head.innerHTML == 'id') {
            col_no = i + 1;
            //alert(col_no);
        }

    }
    var row_no = findRowNumber(col_no, feature.getId());
    //alert(row_no);

    var rows = document.querySelectorAll('#table tr');

    rows[row_no].scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });

    $(document).ready(function () {
        $("#table td:nth-child(" + col_no + ")").each(function () {

            if ($(this).text() == feature.getId()) {
                $(this).parent("tr").css("background-color", "grey");

            }
        });
    });




};

function query() {

    $('#table').empty();
    if (geojson) {
        map.removeLayer(geojson);

    }

    if (featureOverlay) {
        featureOverlay.getSource().clear();
        map.removeLayer(featureOverlay);

    }
    //alert('jsbchdb');	
    var layer = document.getElementById("layer");
    var value_layer = layer.options[layer.selectedIndex].value;
    //alert(value_layer);

    var attribute = document.getElementById("attributes");
    //var value_attribute = attribute.options[attribute.selectedIndex].text;
    //var value_attribute = attribute.options[attribute.selectedIndex].value;
    var value_attribute = Att_name[attribute.selectedIndex];
    //alert(value_attribute);

    var operator = document.getElementById("operator");
    var value_operator = operator.options[operator.selectedIndex].value;
    //alert(value_operator);

    var txt = document.getElementById("value");
    var value_txt = txt.value;

    if (value_operator == 'Like') {
        value_txt = "%25" + value_txt + "%25";
        //alert(value_txt);
        //value_attribute = 'strToLowerCase('+value_attribute+')';
    }
    else {
        value_txt = value_txt;
        //value_attribute = value_attribute;
    }
    //alert(value_txt);

    var url = "http://54.254.143.207:8080/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=" + value_layer + "&CQL_FILTER=" + value_attribute + "+" + value_operator + "+'" + value_txt + "'&outputFormat=application/json"
    //alert(url);
    //console.log(url);
    var style = new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'transparent', // Đổi màu sắc tại đây
        }),
        stroke: new ol.style.Stroke({
            color: '#ffcc33',
            width: 3
        }),

        image: new ol.style.Circle({
            radius: 7,
            fill: new ol.style.Fill({
                color: '#ffcc33'
            })
        })
    });


    geojson = new ol.layer.Vector({
        //title:'dfdfd',
        //title: '<h5>' + value_crop+' '+ value_param +' '+ value_seas+' '+value_level+'</h5>',
        source: new ol.source.Vector({
            url: url,
            format: new ol.format.GeoJSON()
        }),
        style: style,

    });
    //
    geojson.getSource().on('addfeature', function () {
        //alert(geojson.getSource().getExtent());
        map.getView().fit(
            geojson.getSource().getExtent(),
            { duration: 1590, size: map.getSize() }
        );
    });

    //overlays.getLayers().push(geojson);
    //console.log(geojson);
    map.addLayer(geojson);
    //console.log(url);
    $.getJSON(url, function (data) {
        //alert(data.features[0].properties);
        //alert(data.features.length);
        var col = [];
        col.push('id');
        for (var i = 0; i < data.features.length; i++) {

            for (var key in data.features[i].properties) {

                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }


        // Tạo bảng hiển thị thông tin
        var table = document.createElement("table");


        table.setAttribute("class", "table table-bordered");
        table.setAttribute("id", "table");
        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
        var attributes = document.getElementById("attributes"); // Lấy trường thông tin
        var tr = table.insertRow(-1);                   // TABLE ROW.

        for (var i = 0; i < col.length; i++) {
            if (i == 0) {
                var th = document.createElement("th");      // TABLE HEADER.
                th.innerHTML = col[i];
                tr.appendChild(th);
            }
            for (var j = 0; j < Att_name.length; j++) {
                if (col[i] == Att_name[j]) {
                    var th = document.createElement("th");      // TABLE HEADER.
                    th.innerHTML = attributes.options[j].text;
                    tr.appendChild(th);
                    break;
                }
            }

        }

        // ADD JSON DATA TO THE TABLE AS ROWS.
        for (var i = 0; i < data.features.length; i++) {

            tr = table.insertRow(-1);

            for (var j = 0; j < Att_name.length; j++) {
                var tabCell = tr.insertCell(-1);
                if (j == 0) { tabCell.innerHTML = data.features[i]['id']; }
                else {
                    //alert(data.features[i]['id']);
                    for (var jj = 0; jj < col.length; jj++) {
                        if (col[jj] == Att_name[j]) {
                            tabCell.innerHTML = data.features[i].properties[col[jj]];
                            //alert(tabCell.innerHTML);
                            break;
                        }
                    }
                }
            }
        }



        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        var divContainer = document.getElementById("table_data");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
        addRowHandlers();
        // ẩn cột ID
        var rows = table.rows;
        var cells = rows[0].cells;
        for (var i = 0; i < rows.length; i++) {
            var cells = rows[i].cells;
            if (cells.length > 0) {
                cells[0].style.display = 'none'; // Ẩn cột đầu tiên
            }
        }

        document.getElementById('map').style.height = '71%';
        document.getElementById('table_data').style.height = '20%';
        //map.updateSize();
    });


    map.on('click', highlight);

    addRowHandlers();





}

// Draw_layer_dropdown

// 
$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "http://54.254.143.207:8080/geoserver/wfs?request=getCapabilities",
        dataType: "xml",
        success: function (xml) {
            var select = $('#layer1');
            $(xml).find('FeatureType').each(function () {
                //var title = $(this).find('ows:Operation').attr('name');
                //alert(title);
                var name = $(this).find('Name').text();
                //select.append("<option/><option class='ddheader' value='"+ name +"'>"+title+"</option>");
                var no_layers = overlays.getLayers().get('length');
                //Thêm dữ liệu vào Combobox
                $(this).find('Title').each(function () {
                    var value = $(this).text();
                    //alert(value);
                    for (i = 0; i < no_layers; i++) {
                        var nametitle = overlays.getLayers().item(i).get('title')
                        if (nametitle == value) {
                            select.append("<option class='ddindent' value='" + value + "'>" + value + "</option>");
                        }
                    };
                });
                $(this).find('Name').each(function () {
                    var value = $(this).text();
                    // Thêm dữ liệu vào Combobox
                    //select.append("<option class='ddindent' value='" + value + "'>" + value + "</option>");
                });
            });
            //select.children(":first").text("please make a selection").attr("selected",true);
        }
    });
});
// attributes_dropdown
var Att_name_dropdown = [];
var Att_title_dropdown = [];
$(function () {
    $("#layer1").change(function () {

        var value_layer = $(this).val();
        //alert(value_layer);
        //var url = "http://54.254.143.207:8080/geoserver/wfs?service=WFS&request=DescribeFeatureType&version=1.1.0&typeName=" + value_layer;
        //alert(url);
        //console.log(url);
        // Xóa mảng dữ liệu cũ
        Att_name_dropdown = [];
        Att_title_dropdown = [];
        var att_index_dropdown = 0;
        $(document).ready(function () {
            $.ajax({
                type: "GET",
                url: "http://54.254.143.207:8080/geoserver/wfs?service=WFS&request=DescribeFeatureType&version=1.1.0&typeName=" + value_layer,
                dataType: "xml",
                success: function (xml) {

                    var select = $('#attributes');
                    //var title = $(xml).find('xsd\\:complexType').attr('name');
                    //	alert(title);
                    $(xml).find('xsd\\:sequence').each(function () {

                        $(this).find('xsd\\:element').each(function () {
                            // Find the <xsd:documentation> element within the current <xsd:element>
                            var documentationElement = $(this).find('xsd\\:documentation');
                            // Extract the text content of the <xsd:documentation> element
                            var text_content = documentationElement.text();
                            //alert(text_content);
                            var value = $(this).attr('name');
                            //alert(value);
                            var type = $(this).attr('type');
                            //alert(type);
                            //var Nillable = $(this).attr('nillable');
                            //alert(Nillable);
                            if (value != 'geom' && value != 'the_geom' && text_content != "") {
                                Att_name_dropdown.push(value);
                                Att_title_dropdown.push(text_content);
                                att_index_dropdown = att_index_dropdown + 1;
                                //select.append("<option class='ddindent' value='" + type + "'>" + text_content + "</option>");

                            }
                        });

                    });

                }

            });
        });
    });

});
// draw shapes

var source1 = new ol.source.Vector({ wrapX: false });
var vector1 = new ol.layer.Vector({
    source: source1
});
map.addLayer(vector1);
var draw_typeSelect = document.getElementById('draw_type');


var draw1; // global so we can remove it later
function add_draw_Interaction() {
    var value = draw_typeSelect.value;
    //alert(value);
    if (value !== 'None') {
        var geometryFunction;
        if (value === 'Square') {
            value = 'Circle';
            geometryFunction = new ol.interaction.Draw.createRegularPolygon(4);

        } else if (value === 'Box') {
            value = 'Circle';

            geometryFunction = new ol.interaction.Draw.createBox();

        } else if (value === 'Star') {
            value = 'Circle';
            geometryFunction = function (coordinates, geometry) {
                //alert(value);
                var center = coordinates[0];
                var last = coordinates[1];
                var dx = center[0] - last[0];
                var dy = center[1] - last[1];
                var radius = Math.sqrt(dx * dx + dy * dy);
                var rotation = Math.atan2(dy, dx);
                var newCoordinates = [];
                var numPoints = 12;
                for (var i = 0; i < numPoints; ++i) {
                    var angle = rotation + i * 2 * Math.PI / numPoints;
                    var fraction = i % 2 === 0 ? 1 : 0.5;
                    var offsetX = radius * fraction * Math.cos(angle);
                    var offsetY = radius * fraction * Math.sin(angle);
                    newCoordinates.push([center[0] + offsetX, center[1] + offsetY]);
                }
                newCoordinates.push(newCoordinates[0].slice());
                if (!geometry) {
                    geometry = new ol.geom.Polygon([newCoordinates]);
                } else {
                    geometry.setCoordinates([newCoordinates]);
                }
                return geometry;
            };
        }
        draw1 = new ol.interaction.Draw({
            source: source1,
            type: value,
            geometryFunction: geometryFunction
        });
        // map.addInteraction(draw1);

        if (draw_typeSelect.value == 'select' || draw_typeSelect.value == 'clear') {

            map.removeInteraction(draw1);
            vector1.getSource().clear();
            if (geojson) { geojson.getSource().clear(); map.removeLayer(geojson); }

        }
        else if (draw_typeSelect.value == 'Square' || draw_typeSelect.value == 'Polygon' || draw_typeSelect.value == 'Circle' || draw_typeSelect.value == 'Star' || draw_typeSelect.value == 'Box') {

            map.addInteraction(draw1);

            draw1.on('drawstart', function (evt) {
                if (vector1) { vector1.getSource().clear(); }
                if (geojson) { geojson.getSource().clear(); map.removeLayer(geojson); }

                //alert('bc');

            });

            draw1.on('drawend', function (evt) {
                var feature = evt.feature;
                var coords = feature.getGeometry();
                //alert(coords.toString());
                var format = new ol.format.WKT();
                var wkt = format.writeGeometry(coords);
                //console.log(wkt);
                var layer_name = document.getElementById("layer1");
                var value_layer = layer_name.options[layer_name.selectedIndex].value;
                // console.log(value_layer);
                //var url = "http://54.254.143.207:8080/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=" + value_layer + "&CQL_FILTER=INTERSECTS(geom," + wkt + ")" + "'&outputFormat=application/json"
                var url = "http://54.254.143.207:8080/geoserver/wfs?request=GetFeature&version=1.0.0&typeName=" + value_layer + "&outputFormat=json&cql_filter=INTERSECTS(geom," + wkt + ")"

                //alert(url);
                //console.log(url);
                var style = new ol.style.Style({
                    fill: new ol.style.Fill({
                        color: 'transparent', // Đổi màu sắc tại đây
                    }),
                    stroke: new ol.style.Stroke({
                        color: '#ffcc33',
                        width: 3
                    }),

                    image: new ol.style.Circle({
                        radius: 7,
                        fill: new ol.style.Fill({
                            color: '#ffcc33'
                        })
                    })
                });
                /*
                var style = new ol.style.Style({
                    fill: new ol.style.Fill({
                        color: 'rgba(255, 255, 255, 0.7)'
                    }),
                    stroke: new ol.style.Stroke({
                        color: '#ffcc33',
                        width: 3
                    }),
                    image: new ol.style.Icon({
                        anchor: [0.5, 46],
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'pixels',
                        src: 'img/marker.png',
                    }),
                    /*image: new ol.style.Circle({
              radius: 7,
          fill: new ol.style.Fill({
              color: '#ffcc33'
                      })
                    })
                });
                */
                geojson = new ol.layer.Vector({
                    //title: '<h5>' + value_crop+' '+ value_param +' '+ value_seas+' '+value_level+'</h5>',
                    source: new ol.source.Vector({
                        url: url,
                        format: new ol.format.GeoJSON()
                    }),
                    style: style,

                });

                geojson.getSource().on('addfeature', function () {
                    //alert(geojson.getSource().getExtent());
                    map.getView().fit(
                        geojson.getSource().getExtent(),
                        { duration: 1590, size: map.getSize() }
                    );
                });
                //console.log(geojson);
                //overlays.getLayers().push(geojson);
                map.addLayer(geojson);
                map.removeInteraction(draw1);

                // Lấy thông tin thuộc tính của đối tượng
                //alert(Att_name_dropdown.length);


                $.getJSON(url, function (data) {
                    //alert(data.features[0].properties);
                    //alert(data.features.length);
                    var col = [];
                    col.push('id');
                    for (var i = 0; i < data.features.length; i++) {

                        for (var key in data.features[i].properties) {

                            if (col.indexOf(key) === -1) {
                                col.push(key);
                            }
                        }
                    }

                    // tạo bảng hiển thị thông tin đổi tượng

                    var table = document.createElement("table");
                    table.setAttribute("class", "table table-bordered");
                    table.setAttribute("id", "table");
                    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

                    var tr = table.insertRow(-1);                   // TABLE ROW.
                    for (var i = 0; i < col.length; i++) {
                        if (i == 0) {
                            var th = document.createElement("th");      // TABLE HEADER.
                            th.innerHTML = col[i];
                            tr.appendChild(th);
                        }
                        for (var j = 0; j < Att_name_dropdown.length; j++) {
                            if (col[i] == Att_name_dropdown[j]) {
                                var th = document.createElement("th");      // TABLE HEADER.
                                th.innerHTML = Att_title_dropdown[j];
                                tr.appendChild(th);
                                break;
                            }
                        }

                    }

                    // ADD JSON DATA TO THE TABLE AS ROWS.
                    for (var i = 0; i < data.features.length; i++) {

                        tr = table.insertRow(-1);

                        for (var j = 0; j < Att_name_dropdown.length + 1; j++) {
                            var tabCell = tr.insertCell(-1);
                            if (j == 0) { tabCell.innerHTML = data.features[i]['id']; }
                            else {
                                //alert(data.features[i]['id']);
                                for (var jj = 0; jj < col.length; jj++) {
                                    if (col[jj] == Att_name_dropdown[j - 1]) {
                                        tabCell.innerHTML = data.features[i].properties[col[jj]];
                                        //alert(tabCell.innerHTML);
                                        break;
                                    }
                                }
                            }
                        }
                    }



                    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
                    var divContainer = document.getElementById("table_data");
                    divContainer.innerHTML = "";
                    divContainer.appendChild(table);
                    addRowHandlers();
                    // ẩn cột ID
                    var rows = table.rows;
                    var cells = rows[0].cells;
                    for (var i = 0; i < rows.length; i++) {
                        var cells = rows[i].cells;
                        if (cells.length > 0) {
                            cells[0].style.display = 'none'; // Ẩn cột đầu tiên
                        }
                    }
                    document.getElementById('map').style.height = '71%';
                    document.getElementById('table_data').style.height = '20%';
                    map.updateSize();
                });


                map.on('click', highlight);

                addRowHandlers();

            });





        }


    }
}


/**
 * Handle change event.
 */
draw_typeSelect.onchange = function () {
    map.removeInteraction(draw1);
    //	if (draw2) {map.removeInteraction(draw2)};
    if (draw) { map.removeInteraction(draw); map.removeOverlay(helpTooltip); map.removeOverlay(measureTooltip); }
    if (vectorLayer) { vectorLayer.getSource().clear(); }
    if (vector1) { vector1.getSource().clear(); }

    if (measureTooltipElement) {
        var elem = document.getElementsByClassName("tooltip tooltip-static");
        //$('#measure_tool').empty(); 

        //alert(elem.length);
        for (var i = elem.length - 1; i >= 0; i--) {

            elem[i].remove();
            //alert(elem[i].innerHTML);
        }
    }

    add_draw_Interaction();
};

function clear_all() {
    document.getElementById('map').style.height = '91%';
    document.getElementById('table_data').style.height = '0%';
    map.updateSize();
    $('#table').empty();
    //$('#table1').empty();
    if (geojson) { geojson.getSource().clear(); map.removeLayer(geojson); }
    if (geojson_pickobj) { geojson_pickobj.getSource().clear(); map.removeLayer(geojson_pickobj); }
    if (featureOverlay) { featureOverlay.getSource().clear(); map.removeLayer(featureOverlay); }
    map.removeInteraction(draw);
    if (draw1) { map.removeInteraction(draw1); }
    if (vector1) { vector1.getSource().clear(); }

    if (vectorLayer) { vectorLayer.getSource().clear(); }
    map.removeOverlay(helpTooltip);
    if (measureTooltipElement) {
        var elem = document.getElementsByClassName("tooltip tooltip-static");

        for (var i = elem.length - 1; i >= 0; i--) {

            elem[i].remove();
            //alert(elem[i].innerHTML);
        }
    }
    map.un('singleclick', getinfo);
    overlay.setPosition(undefined);
    closer.blur();
    map.un('click', highlight);
    // Chuyển trạng thái nút
    buttonState = true;
    buttonState_2 = true;
    // Alway uncheck
    //toggleSwitch.checked = false;

}


// JavaScript để xử lý sự kiện khi checkbox tắt
const toggleSwitch = document.getElementById("toggleSwitch");
toggleSwitch.addEventListener("change", function () {
    if (!this.checked) {
        // Thực hiện hành động khi checkbox tắt ở đây
        var op_tat = document.getElementById("getinfotype");
        op_tat.value = 'deactivate_getinfo';
        // Tạo sự kiện change để chạy sự kiện onchange của thẻ select
        var event = new Event("change");
        // Kích hoạt sự kiện change cho thẻ select
        op_tat.dispatchEvent(event);
    }
    else {
        // Thực hiện hành động khi checkbox tắt ở đây
        var op_bat = document.getElementById("getinfotype");
        op_bat.value = 'activate_getinfo';
        // Tạo sự kiện change để chạy sự kiện onchange của thẻ select
        var event = new Event("change");
        // Kích hoạt sự kiện change cho thẻ select
        op_bat.dispatchEvent(event);
    }
});


// Bấm chuột trên màn hinh
map.on('singleclick', Click_onscreen);
// 
function Click_onscreen(evt) {
    if (buttonState && buttonState_2) {
        if (!toggleSwitch.checked) {
            map.on('singleclick', Selected_obj);
        }
        else {
            // Thực hiện hành động khi checkbox tắt ở đây
            var op_bat = document.getElementById("getinfotype");
            op_bat.value = 'activate_getinfo';
            // Tạo sự kiện change để chạy sự kiện onchange của thẻ select
            var event = new Event("change");
            // Kích hoạt sự kiện change cho thẻ select
            op_bat.dispatchEvent(event);
        }
    }
}
///

// lấy thông tin đối tượng
var geojson_pickobj;
function Selected_obj(evt) {

    if (geojson_pickobj) {
        map.removeLayer(geojson_pickobj);
    }


    var coordinate = evt.coordinate;
    var viewResolution = /** @type {number} */ (view.getResolution());
    var no_layers = overlays.getLayers().get('length');
    // alert(no_layers);
    var wmsSource = new Array();
    var layer_title = new Array();
    var i;
    for (i = 0; i < no_layers; i++) {
        //alert(overlays.getLayers().item(i).getVisible());
        var visibility = overlays.getLayers().item(i).getVisible();
        //alert(visibility);
        layer_title[i] = overlays.getLayers().item(i).get('title');
        //alert(layer_title[i]);
        if (visibility == true && layer_title[i] == 'Quy hoạch khu bến') {
            //alert(i);
            wmsSource[i] = new ol.source.ImageWMS({
                url: 'http://54.254.143.207:8080/geoserver/wms',
                params: { 'LAYERS': layer_title[i] },
                serverType: 'geoserver',
                crossOrigin: 'anonymous'
            });
            // Create a feature and add it to the highlight layer
            // Tạo CQL filter sử dụng CONTAINS
            var cqlFilter = "CONTAINS(geom, POINT(" + coordinate[0] + " " + coordinate[1] + "))";
            var url_json = "http://54.254.143.207:8080/geoserver/wfs?request=GetFeature&version=1.0.0&typeName=" + layer_title[i] + "&outputFormat=json&cql_filter=" + encodeURIComponent(cqlFilter)
            //console.log(url_json)
            //console.log(url);


            //alert(Att_name_pickobj.length);     

            // CHỈNH STYLE HIỂN THỊ CHO ĐỐI TƯỢNG
            var style = new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'transparent', // Đổi màu sắc tại đây
                }),
                stroke: new ol.style.Stroke({
                    color: '#ffcc33',
                    width: 3
                }),

                image: new ol.style.Circle({
                    radius: 7,
                    fill: new ol.style.Fill({
                        color: '#ffcc33'
                    })
                })
            });

            geojson_pickobj = new ol.layer.Vector({
                //title:'dfdfd',
                //title: '<h5>' + value_crop+' '+ value_param +' '+ value_seas+' '+value_level+'</h5>',
                source: new ol.source.Vector({
                    url: url_json,
                    format: new ol.format.GeoJSON()
                }),
                style: style,

            });
            map.addLayer(geojson_pickobj);

        }
    }


}