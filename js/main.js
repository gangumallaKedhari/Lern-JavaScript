
// Listen for form submit 
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// save bookmark
function saveBookmark(e){
    // Get form value
 var siteName = document.getElementById('siteName').value;
 var siteUrl = document.getElementById('siteUrl').value;

if(validateForm(siteName, siteUrl)){
return false;
}

 var bookmark = {
     name: siteName,
     url: siteUrl
 }



/*
//  localStorage.setItem('test', 'Hello world');
//  console.log(localStorage.getItem('test'));
//  localStorage.removeItem('test');
//  console.log(localStorage.getItem('test'));
// prevent from form submitting
*/


//Text if bookmark is null
if(localStorage.getItem('bookmarks') === null){
    // Init array
    var bookmarks = [];
    //add to array
    bookmarks.push(bookmark);
    //Set to LocalStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
} else {
    //get bookmarks from localstorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //add bookmark to array
    bookmarks.push(bookmark);
    //Re-set back ton localstorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

//clear form
document.getElementById('myForm').reset();
//fetch bookmarks
fetchBookmarks();

//preventing
 e.preventDefault();
}

//Delete bookmark
function deleteBookmark(url){
    //Get bookmsrks from localstorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //Loop through bookmarks
    for(var i =0; i<bookmarks.length; i++){
        if(bookmarks[i].url == url) {
            //Remove from array
            bookmarks.splice(i, 1);
        }

    }
    //Set to LocalStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    //fetch bookmarks
    fetchBookmarks();
}

//fetch bookmarks

function fetchBookmarks(){
    //Get bookmsrks from localstorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    var bookmarksResults = document.getElementById('bookmarksResults');
    // Bulld output
    bookmarksResults.innerHTML = '';
    for( var i=0; i<bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url; 

bookmarksResults.innerHTML += '<div class="well">'+
                              '<h3>'+name+
                              ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
                              ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger"  href="#">Delete</a> ' +

                              '</h3>'+
                               '</div>';


    }


}

// Validate form
function validateForm(siteName, siteUrl){
    if(!siteName || !siteUrl){
        alert('please fill in the form');
        return false;
    }
    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    if(!siteUrl.match(regex)){
     alert('Please use a valid URL');
     return false;
    }
}