var slideOpen = true;
var heightChecked = false;
var initHeight = 0;
var intval = null;
var mdiv = null;
var index;
var element, child;
let scrolled = false;

function toggleWhatsApp() {
    const chatBox = document.getElementById("chatBox");
    chatBox.classList.toggle('chat-box-expanded');
}

function slideToggle(selector) {
    window.clearInterval(intval);
    mdiv = document.querySelector(selector);
    if (!heightChecked) {
        initHeight = 183;
        heightChecked = true;
    }
    if (slideOpen) {
        let h = initHeight;
        slideOpen = false;
        intval = setInterval(function() {
            h--;
            mdiv.style.height = h + 'px';
            if (h <= 0)
                window.clearInterval(intval);
            if (h === 0) {
                mdiv.style.visibility = 'hidden';
            }
        }, 1);
    } else {
        let h = 0;
        slideOpen = true;
        intval = setInterval(function() {
            h++;
            mdiv.style.height = h + 'px';
            if (h >= initHeight)
                window.clearInterval(intval);
        }, 1);
        mdiv.style.visibility = 'visible';
    }
}
if (!!document.querySelector('.close-chat')) {
    document.querySelector('.close-chat').addEventListener('click', function() {
        document.querySelector(".chat-box").onclick = function() {
            toggleWhatsApp();
            chatboxElement.classList.remove('show-chat');
        };
    });
}
var serialize = function(form) {
    var field, l, s = [];
    if (typeof form == 'object' && form.nodeName == "FORM") {
        var len = form.elements.length;
        for (var i = 0; i < len; i++) {
            field = form.elements[i];
            if (field.name && !field.disabled && field.type != 'button' && field.type != 'file' && field.type != 'reset' && field.type != 'submit') {
                if (field.type == 'select-multiple') {
                    l = form.elements[i].options.length;
                    for (var j = 0; j < l; j++) {
                        if (field.options[j].selected) {
                            s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[j].value);
                        }
                    }
                } else if ((field.type != 'checkbox' && field.type != 'radio') || field.checked) {
                    s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value);
                }
            }
        }
    }
    return s.join('&').replace(/%20/g, '+');
};
var element = document.querySelector(".comment-form");
if (!!element && element.addEventListener) {
    element.addEventListener("submit", function(e) {
        e.preventDefault();
        const share_agreement = document.getElementById('share_agreement');
        const agreement_feedback = document.getElementById('agreement_feedback');
        if (share_agreement.checked == false) {
            agreement_feedback.innerText = 'يجب الموافقة لنشر التعليق'
            return
        }
        if (!!document.querySelector(".submit-btn")) {
            document.querySelector(".submit-btn").setAttribute("disabled", true);
        }
        let _this = this,
            form_data = serialize(_this),
            isArticle = (!!document.querySelector("#article_id") && document.querySelector("#article_id").value) ? true : false,
            isPage = (!!document.querySelector("#page_id") && document.querySelector("#page_id").value) ? true : false;
        ajaxUrl = (isArticle) ? '/article/comment' : '/company/review';
        if (isPage) ajaxUrl = '/page/comment';
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", ajaxUrl, true);
        xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                if (isArticle) {
                    var cardAddComment = document.querySelector(".card-add-comment");
                    if (cardAddComment) {
                        cardAddComment.style.backgroundColor = "var(--color-surface-surface-secondary-alt)";
                        cardAddComment.style.justifyContent = "flex-end";
                        cardAddComment.innerHTML = "<div class='alert alert-success text-center w-100 mb-0'>شكرا! سيتم نشر التعليق بعد الموافقة عليه.</div>";
                    } else {
                        document.querySelector(".comment-form").innerHTML = "<div class='alert alert-success text-center'>شكرا! سيتم نشر التعليق بعد الموافقة عليه.</div>";
                    }
                } else
                    document.querySelector(".comment-form").innerHTML = "<div class='alert alert-success text-center'>شكرا! سيتم نشر التقييم بعد الموافقة عليه.</div>";
            }
        };
        xhttp.send(form_data);
    }, true);
}
const modal = document.querySelector(".native-modal");
const trigger = document.querySelector(".native-trigger");
const closeButton = document.querySelector(".native-close-button");

function toggleModal() {
    modal.classList.toggle("native-show-modal");
}

function regNow() {
    toggleModal();
}
if (trigger) {
    trigger.addEventListener("click", toggleModal);
    closeButton.addEventListener("click", toggleModal);
}
const chatboxElement = document.getElementById('chatBox');
window.addEventListener('scroll', function() {
    const pageHeight = document.documentElement.scrollHeight;
    const pageContent = document.getElementById('page-content');
    let scrollPosition = window.pageYOffset;
    if (pageContent && scrollPosition >= pageContent.offsetHeight * 0.25 && chatboxElement.classList.contains('show-chat')) {
        chatboxElement.classList.add('chat-box-expanded');
    }
    if (scrollPosition >= pageHeight * 0.25 && chatboxElement.classList.contains('show-chat')) {
        chatboxElement.classList.add('chat-box-expanded');
    }
});
if (!!document.querySelector(".popup-widget")) {
    window.addEventListener('scroll', function() {
        const pageHeight = document.documentElement.scrollHeight;
        const pageContent = document.getElementById('page-content');
        let scrollPosition = window.pageYOffset;
        if (scrollPosition >= pageContent.offsetHeight * 0.8) {
            document.querySelector(".popup-widget").style.border = '1px solid #ccc';
            document.querySelector(".popup-widget").classList.add('popup-box-expanded');
        }
    });
}
var btn = document.querySelectorAll(`[aria-expanded="true"]`);
if (btn !== undefined) {
    btn.forEach(element => {
        element.addEventListener('click', function() {
            closeAll();
            var colId = element.getAttribute("data-target");
            var colBody = document.querySelector(colId);
            colBody.classList.add('show');
        })
    });

    function closeAll() {
        var btn = document.querySelectorAll(`[data-toggle="collapse"]`);
        btn.forEach(element => {
            var colId = element.getAttribute("data-target");
            var colBody = document.querySelector(colId);
            colBody.classList.remove('show');
        });
    }
}
if (!!document.querySelector('.close-popup')) {
    document.querySelector('.close-popup').addEventListener('click', function() {
        document.querySelector(".popup-widget").onclick = function() {
            closePopup('.popup-widget');
        };
    });
}

function closePopup(selector) {
    mdiv = document.querySelector(selector);
    mdiv.style.display = 'none';
}
window.addEventListener("click", windowOnClick);

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
    element = event.target.parentElement;
}
document.addEventListener('click', function(e) {
    e = e || window.event;
    var element = e.target || e.srcElement;
    element = element.parentElement;
    child = element.children[1];
    if (child !== undefined && child.classList.contains('dropdown-menu') || !element.classList.contains('card')) {
        if (!!child) {
            index = child.getAttribute("data-index");
            element.classList.toggle("show");
            child.classList.toggle("show");
        }
    }
    let liList = document.querySelectorAll('.show');
    liList.forEach(ele => {
        if (ele.classList.contains('show') && (ele.classList.contains('nav-item') || ele.classList.contains('dropdown-menu'))) {
            if (ele.getAttribute("data-index") != index && !!ele.getAttribute("data-index")) {
                ele.classList.remove('show');
            }
        }
    });
}, false);

function whatsappClickCta() {
    const url = '{{ url()->current() }}';
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/whatsapp-click", true);
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send(`url=${url}&&type=whatsapp_cta`);
    whatsappCtaButton.removeEventListener("click", whatsappClickCta);
}

function whatsappClickChat() {
    const url = '{{ url()->current() }}';
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/whatsapp-click", true);
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send(`url=${url}&type=whatsapp_chat`);
    whatsappChatButton.removeEventListener("click", whatsappClickChat);
}
const whatsappCtaButton = document.querySelector('.whatsup_cta-btn');
const whatsappChatButton = document.querySelector('.whatsapp-chat-btn');
if (whatsappCtaButton) {
    whatsappCtaButton.addEventListener('click', whatsappClickCta);
}
if (whatsappChatButton) {
    whatsappChatButton.addEventListener('click', whatsappClickChat);
}
var hamburger = document.querySelector(".hamburger");
var mobileMenu = document.querySelector(".top-nav");
var close = document.querySelector(".close");
var overlay = document.querySelector(".overlay");
hamburger.addEventListener("click", () => {
    mobileMenu.style.transform = "translateX(0)";
    mobileMenu.style.opacity = '1';
    overlay.style.display = "block";
    document.body.style.overflow = "hidden";
});
close.addEventListener("click", () => {
    mobileMenu.style.transform = "translateX(110%)";
    overlay.style.display = "none";
    document.body.style.overflow = "unset";
});
overlay.addEventListener("click", () => {
    mobileMenu.style.transform = "translateX(110%)";
    overlay.style.display = "none";
    document.body.style.overflow = "unset";
});
(() => {
    const testClasses = document.querySelectorAll('.summary');
    testClasses.forEach((el) => {
        el.removeAttribute('style');
    })
})();

function checkForm() {
    if (document.querySelector('#terms-of-use:checkbox:checked').length == 0) {
        alert('عليك الموافقة على شروط الإستخدام');
        document.querySelector("#terms-of-use").focus();
        return false;
    }
    return true;
}

function openWindow(url) {
    window.open(url, 'sharer', 'toolbar=0,status=0,width=580,height=400');
    return false;
};
const myButton = document.getElementById("backToTop");
window.onscroll = function() {
    scrollFunction()
};

function scrollFunction() {
    myButton.style.display = (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) ? "block" : "none";
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
if (!!document.querySelector(".registerModal")) {
    document.querySelector(".registerModal").addEventListener('click', function() {
        let id = this.id.replace("register", "");
        document.querySelector('#company_id_field').value = id;
    });
}
document.addEventListener('DOMContentLoaded', function() {
    let searchForm = document.getElementById('searchForm'),
        searchInput = document.getElementById('searchInp');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            if (searchInput.value.trim() === '') {
                e.preventDefault();
            }
        });
    }
});