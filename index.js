function test() {

    var projectDiv = document.createElement("div");
    projectDiv.setAttribute("id","ProjectCard")
    var projectImage = document.createElement("img");
    projectImage.setAttribute("src","https://s3.amazonaws.com/nshavendan/placekitten.jpg?X-Amz-Date=20161027T003332Z&X-Amz-Expires=300&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Signature=3d5bea43ebcc5cee2979da05ddcd88399d47336fe802b49b4308f66c5b52a8f4&X-Amz-Credential=ASIAI43I3M5PMR5DSP6A/20161027/us-east-1/s3/aws4_request&X-Amz-SignedHeaders=Host&x-amz-security-token=FQoDYXdzEOH//////////wEaDPrjvFT3TrFSlC9UqSL6AWsUqf0N1Op1X79PnPfujbLhz92ay6KTHfSCm/JaySkHIzo3jt3beJDPXxK/Epdnyspqb6771/QVu5UNJ9yjOzFhTBIlLSLD1YgixHvONfZYnjKbyjjoy13IJ4/durvDzBd98KPbL4HI83vE%2Bdd9/vRoltU74w1zMJF/ocpHLn3cqNe%2Bn5WGph6h0EH2OSzI5CpbsxiCzRsPsWRtGKgCOnIDC/xyue7jq1M%2BfLPCiB/fJU3vX6wOMg5TRT6Uhkxk7KNNWgmHugc1RTU1bgFlo2bl8YKKRonV4bqjj8GzuqaIlTnBESqUxsGzo961rgBUDucbMUaj6hCUtWoo%2B4vFwAU%3D");
    projectImage.setAttribute("id","ProjectImage");
    document.body.appendChild(projectDiv);
    projectDiv.appendChild(projectImage);
    //document.getElementById('ProjectContainer').appendChild(element);
}

window.onload = function() {
    test();
};