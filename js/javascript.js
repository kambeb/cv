
var eContainer = document.getElementById('tagcontainer');
var eSkills = document.getElementById('skills');

$(document).ready(function() {
    $( document ).tooltip();
    generateEducations();
    generateExperience();
    createSkills();
    createTags(7);
    iconsAnimate();
    var eArrows = document.getElementById("arrows");
    eArrows.addEventListener('click', moveSideBar);

    var lFollowX = 0,
        lFollowY = 0,
        x = 0,
        y = 0,
        friction = 1/5;

    function moveBackground() {
        x += (lFollowX - x) * friction;
        y += (lFollowY - y) * friction;

        translate = 'translate(' + x + 'px, ' + y + 'px) scale(1.1)';

        $('.bg').css({
            '-webit-transform': translate,
            '-moz-transform': translate,
            'transform': translate
        });

        window.requestAnimationFrame(moveBackground);
    }

    $(window).on('mousemove click', function(e) {

        var lMouseX = Math.max(-800, Math.min(800, $(window).width() / 2 - e.clientX));
        var lMouseY = Math.max(-800, Math.min(800, $(window).height() / 2 - e.clientY));
        lFollowX = (20 * lMouseX) / 800; // 100 : 12 = lMouxeX : lFollow
        lFollowY = (10 * lMouseY) / 800;

    });

    moveBackground();
});


function generateEducations(){
    data.education.forEach(function (entry) {
        $('#ul1').append('<li class="tooltip"><span>'+
            entry.datefrom.slice(-4)+' - '+
            entry.dateto.slice(-4)+
            '<span class="tooltiptext">'+entry.datefrom+
            ' - '+entry.dateto+'<br>'+entry.extrainfo +'</span>'+'</span>' +
            '<span>'+entry.name+'</span>' +
            '<span>'+entry.profile+'</span>' +
            '<span>'+entry.info+'</span></li>');
    })
}

function generateExperience(){
    data.experience.forEach(function (entry) {
        $('#ul2').append('<li class="tooltip"><span>'+
            entry.datefrom.slice(-4)+' - '+
            entry.dateto.slice(-4)+
            '<span class="tooltiptext">'+entry.datefrom+
            ' - '+entry.dateto+'<br>'+entry.extrainfo +'</span>'+'</span>' +
            '<span>'+entry.name+'</span>' +
            '<span>'+entry.function+'</span>' +
            '<span>'+entry.info+'</span></li>');
    })
}

function generateBasicInfo(){
    data.basicinfo.forEach(function (entry) {
        $('#ul2').append('<li class="tooltip"><span>'+
            entry.datefrom.slice(-4)+' - '+
            entry.dateto.slice(-4)+
            '<span class="tooltiptext">'+entry.datefrom+
            ' - '+entry.dateto+'<br>'+entry.extrainfo +'</span>'+'</span>' +
            '<span>'+entry.name+'</span>' +
            '<span>'+entry.profile+'</span></li>');
    })
}

function moveSideBar(){
    var eDiv = document.getElementById("right");
    var eTitle = document.getElementById("title");
    var eTags = document.getElementById("tagcontainer");
    if(eDiv.getAttribute('class') === 'r'){
        eDiv.style.order = '-1';
        eDiv.setAttribute('class','l');
        eTags.style.order = '3';
        eTitle.style.order = '1';
        eTitle.style.textAlign = 'left';
        eTags.style.textAlign = 'right';
    } else {
        eDiv.style.order = '2';
        eDiv.setAttribute('class','r');
        eTags.style.order = '1';
        eTitle.style.order = '3';
        eTitle.style.textAlign = 'right';
        eTags.style.textAlign = 'left';
    }
    iconsAnimate();
}

function iconsAnimate() {
    animate('#right', Math.floor((Math.random() * 750) + 250));
    animate('#main', Math.floor((Math.random() * 1000) + 400));
    animate('#info_','700');
    animate('#skills_','456');
    animate('#hobbies_','525');
    animate('#languages_','35');
    animate('#birth','423');
    animate('#place','273');
    animate('#tel','303');
    animate('#email','123');
    animate('#website','93');
    animate('#linkedin','213');
    animate('#auto','183');
    animate('#education','560');
    animate('#experience','595');
}

function animate(id, pos){
    var speed = 750;
    $(id).find('.icon .img').animate({'background-position-x' : '-'+pos+'px' }, speed);
}

function createTags(size){ //function generates tag cloud
    data.skills.sort(function() {  //random sort
        return .5 - Math.random();
    }).forEach(function (entry) {
        var eSpan = document.createElement('span');
        eSpan.innerHTML = entry.name;
        eSpan.setAttribute('class','tag');
        eSpan.style.fontSize = Math.log(entry.value)*size + 'px'; //size of a tag is based on a skill value, logarithmic scale
        eContainer.appendChild(eSpan);

    });
}

function createSkills(){ // functions generates skills bar
   data.skills.forEach(function (entry) {
        var eSpan = document.createElement('span');
        eSpan.innerHTML = entry.name;
        eSpan.setAttribute('class','skills');
        var eSpan2 = document.createElement('span');
        var eDiv = document.createElement('div');
        eDiv.setAttribute('class','bar');
        var eDiv2 = document.createElement('div');
        eDiv2.setAttribute('class','percentage');
        eDiv2.style.width = 0 + '%';
        var perc = entry.value + '%';
        $(eDiv2).animate({'width' : perc }, 2000);
        eSkills.appendChild(eSpan);
        eSkills.appendChild(eDiv);
        eDiv.appendChild(eDiv2);


    });
    var eSpan2 = document.createElement('span');
    eSpan2.innerHTML = "More: ";
    eSkills.appendChild(eSpan2);
   data.extraskills.forEach(function (entry,idx,array) {
       var eSpan = document.createElement('span');
       eSpan.innerHTML = entry.name;
       eSkills.appendChild(eSpan);
       if (!(idx === array.length - 1)) {
           var eSpan2 = document.createElement('span');
           eSpan2.innerHTML = ", ";
           eSkills.appendChild(eSpan2);
       }
   })
}

function showSource(){;
    var source = "<html>";
    source += document.getElementsByTagName('html')[0].innerHTML;
    source += "</html>";
    //now we need to escape the html special chars, javascript has escape
    //but this does not do what we want
    source = source.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    //now we add <pre> tags to preserve whitespace
    source = "<pre>"+source+"</pre>";
    //now open the window and set the source as the content
    sourceWindow = window.open('','Source of page','height=800,width=800,scrollbars=1,resizable=1');
    sourceWindow.document.write(source);
    sourceWindow.document.close(); //close the document for writing, not the window
    //give source window focus
    if(window.focus) sourceWindow.focus();
}





