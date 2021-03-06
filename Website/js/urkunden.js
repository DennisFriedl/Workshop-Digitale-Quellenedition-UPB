// Handlers for TEI elements
var CETEIcean_handlers = 
{
    // Adds span with appropriate classes for every tei:hi element
    // for convenient toggling
    "hi": function(elt) {
        var span = document.createElement('span');
        span.className = elt.getAttribute('rend');
        span.innerHTML = elt.innerHTML;
        return span;
    }
}

// Main init function for starting CETEIcean
// with our settings
function CETEIcean_init() {
    var CETEIcean = new CETEI(),
        filename = urkundeFromURL();
    
    CETEIcean.addBehaviors({"handlers": CETEIcean_handlers});
    
    CETEIcean.getHTML5('Urkunde3_Markup.xml' , function(data) {
        document.getElementById("urkunde").innerHTML = "";
        document.getElementById("urkunde").appendChild(data);
        CETEIcean.addStyle(document, data);
    });
};

/*$.fn.extend({
    myToggleClass: function (val) {
        $(this).each( function(a,b) {
            if($(b).hasClass(val)) {
                $(b).removeClass(val);
                $(b).addClass('no_' + val);
            }
            else if($(b).hasClass('no_' + val)) {
                $(b).removeClass('no_' + val);
                $(b).addClass(val);
            }
        })
        return $(this);
    }
});
*/
function urkundeFromURL() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    return url.searchParams.get("file");
};

function mylf() {
    $('tei-lb').hide();
    $('tei-abbr').hide();
    $('tei-expan').show();
    $('tei-del').hide();
    $('.gold').addClass('no_gold');
    $('.gold').removeClass('gold');
};

function myda() {
    $('tei-lb').show();
    $('tei-abbr').show();
    $('tei-expan').hide();
    $('tei-del').show();
    $('.no_gold').addClass('gold');
    $('.no_gold').removeClass('no_gold');
};

$('#ansichten input').change(
    function() {
        switch ($(this).val()) {
            case 'lf': mylf(); break;
            case 'da': myda(); break;
        }
    }
);
