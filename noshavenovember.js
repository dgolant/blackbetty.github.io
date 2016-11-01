//run immediately



function generateDivs(urls) {
    for (i = 0; i < urls.length; i++) {
        var div = document.createElement("div");
        div.setAttribute('class', 'photoDiv')
        div.id = "photoDiv"+i;

        var img = document.createElement("img");
        img.setAttribute('src',urls[i]);
        img.setAttribute('class','dayImage');
        img.setAttribute('title', urls[i]);

        var caption = document.createElement("figcaption");
        caption.innerHTML = "Day "+(i+1);
        div.appendChild(img);
        div.appendChild(caption);
        document.getElementsByClassName("november")[0].appendChild(div);
    }
}

window.onload = function() {
    fetchImageURLs(generateDivs);
}


function fetchImageURLs(callback) {
    var request = new XMLHttpRequest();
    request.open('GET', 'https://nshavendan.s3.amazonaws.com', true);
``
    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            // Success!
            var parser = new DOMParser();
            var xml = parser.parseFromString(request.responseText, "text/xml");
            data = xmlToJson(xml);
            var imageURLArray;
            if(!isArray(data.ListBucketResult.Contents)){
            	tempArray = [data.ListBucketResult.Contents];
            	imageURLArray = createURLS(tempArray);
            } else{
            	imageURLArray = createURLS(data.ListBucketResult.Contents);
            }
            console.log(imageURLArray);
            if(callback){
                callback(imageURLArray);
            }
            else{
                return(imageURLArray);
            }
        } else {
            // We reached our target server, but it returned an error
            console.log("We reached our target server, but it returned an error")

        }
    };

    request.onerror = function() {
        // There was a connection error of some sort
        console.log("COnnection error")
    };

    request.send();
}


function xmlToJson(xml) {
    //Props tp David Walsh
    // Create the return object
    var obj = {};

    if (xml.nodeType == 1) { // element
        // do attributes
        if (xml.attributes.length > 0) {
            obj["@attributes"] = {};
            for (var j = 0; j < xml.attributes.length; j++) {
                var attribute = xml.attributes.item(j);
                obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
            }
        }
    } else if (xml.nodeType == 3) { // text
        obj = xml.nodeValue;
    }

    // do children
    if (xml.hasChildNodes()) {
        for (var i = 0; i < xml.childNodes.length; i++) {
            var item = xml.childNodes.item(i);
            var nodeName = item.nodeName;
            if (typeof(obj[nodeName]) == "undefined") {
                obj[nodeName] = xmlToJson(item);
            } else {
                if (typeof(obj[nodeName].push) == "undefined") {
                    var old = obj[nodeName];
                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                }
                obj[nodeName].push(xmlToJson(item));
            }
        }
    }
    return obj;
}

function createURLS(Contents) {
    var urls = [];
    for (i = 0; i < Contents.length || i < 1; i++) {
        //Check to make sure we're dealing with a file, not a folder (size = 0 or name contains a /)
        if (Contents[i] && Contents[i].Size != 0 && Contents[i].Key['#text'] && !((Contents[i].Key['#text']).includes("/"))) {
            name = (Contents[i].Key['#text']);
            console.log('name'+name);
            if (name.includes(".jpg") || name.includes(".png")) {
            	console.log('hit');
                if (name.includes(" ")) {
                    name = name.split(' ').join('+');
                }
                urls.push("https://s3.amazonaws.com/nshavendan/" + name);
            } else {
                console.log("Not a png or jpg");
            }
        } else {
            console.log("Not a file, could be a folder");
        }
    }
    return urls;
}

function isArray(what) {
    return Object.prototype.toString.call(what) === '[object Array]';
}