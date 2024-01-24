var headerCollapse = document.getElementById('contentHeader');
var openCollapse = document.getElementById('collapseOne');
var btnCollapse = document.getElementById('btnCollapse');
var line = document.querySelector('.card');

function collapse() {
    headerCollapse.classList.remove("show");
    openCollapse.classList.toggle("show");
    line.classList.toggle("show");
    if (btnCollapse.classList.contains("collapsed")) {
        btnCollapse.classList.remove("collapsed");
    } else {
        btnCollapse.classList.add("collapsed");
    }
}
if (!!headerCollapse) {
    headerCollapse.addEventListener("click", collapse);
}
const h = document.querySelector(".fixed-onscroll");
const fixReflection = document.querySelector(".fix-reflection");
const companyHeader = document.querySelector(".company-header");
const navigation = document.querySelector(".top-header");
var topScrollValue;
let stuck = false;
const stickPoint = getDistance();
window.onscroll = function(e) {
    var distance = getDistance() - window.pageYOffset;
    var offset = window.pageYOffset;
    topScrollValue = companyHeader && navigation ? companyHeader.offsetHeight + navigation.offsetHeight : 0;
    if (distance <= 0 && !stuck) {
        h ? h.classList.add("sticky") : null;
        fixReflection ? fixReflection.classList.add("fixes") : null;
        stuck = true;
    } else if (stuck && offset <= topScrollValue) {
        h ? h.classList.remove("sticky") : null;
        fixReflection ? fixReflection.classList.remove("fixes") : null;
        stuck = false;
    }
};

function getDistance() {
    return topDist = h ? h.offsetTop + topScrollValue : null;
}

function toggleAccordion() {
    const content = document.getElementById('accordionContent');
    content.classList.toggle('open');
}
var loadMore = document.getElementById('load-more-btn');
if (loadMore) {
    loadMore.addEventListener('click', function() {
        var offset = this.getAttribute('data-offset');
        var articleId = this.getAttribute('data-article');
        var articleSlug = this.getAttribute('data-slug');
        loadMoreComments(articleId, offset, articleSlug);
    });
}

function loadMoreComments(articleId, offset, slug) {
    axios.get('/articles/' + slug + '/articleId/' + articleId + '/comments/' + offset).then(function(response) {
        var commentsContainer = document.getElementById('comments-container');
        commentsContainer.innerHTML += response.data.html;
        if (response.data.moreComments) {
            document.getElementById('load-more-btn').style.display = "none";
        }
        var nextOffset = +offset + 4;
        document.getElementById('load-more-btn').setAttribute('data-offset', nextOffset);
    }).catch(function(error) {
        console.error('Error fetching comments: ' + error);
    });
}

function more() {
    document.getElementById('more-articles').style.backgroundColor = "#042240";
    const img = document.createElement('img');
    img.setAttribute('class', 'img');
    img.setAttribute('src', "/img/arrowleft.svg");
    document.getElementById('more-articles').append(img);
}

function leave() {
    document.getElementById('more-articles').style.backgroundColor = "#007bff";
    const imgs = document.querySelectorAll('.img');
    imgs.forEach(img => {
        img.remove();
    })
}
const appDiv = document.getElementById('app');
const paragraphs = appDiv.getElementsByTagName('p');
for (let i = paragraphs.length - 1; i >= 0; i--) {
    if (paragraphs[i].innerHTML.trim() === '') {
        paragraphs[i].parentNode.removeChild(paragraphs[i]);
    }
}
const summary = document.querySelector('.summary');
if (summary) {
    summary.removeAttribute('style');
}