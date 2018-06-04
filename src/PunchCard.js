const _ = require('lodash');

function doPunchCard() {
    let div = document.createElement('div');
    div.style.display = 'none';
    div.style.position = 'fixed';
    div.style.top = '112px';
    div.style.right = '12px';
    div.style.width = '626px';
    div.style.height = '98px';
    div.style.overflow = 'hidden';
    div.style.zIndex = '9999';
    div.style.boxShadow = '0 3px 6px #999';
    div.onscroll = function () {
        div.scrollLeft = 0;
        div.scrollTop = 0;
    };

    let iframe = document.createElement('iframe');
    iframe.style.border = 'none';
    iframe.width = '1280';
    iframe.height = '5000';
    iframe.onload = function () {
        iframe.style.position = 'absolute';
        iframe.style.left = '-328px';
        iframe.style.top = '-264px';
        div.style.display = '';
        setTimeout(function () {
            div.remove();
        }, 3000);
    };
    div.appendChild(iframe);

    let wrapper = document.createElement('div');
    wrapper.style.position = 'absolute';
    wrapper.style.left = '0';
    wrapper.style.top = '0';
    wrapper.style.width = '1280px';
    wrapper.style.height = '5000px';
    wrapper.style.zIndex = '10000';
    wrapper.onclick = function () {
        div.remove();
    };
    div.appendChild(wrapper);

    document.body.appendChild(div);

    iframe.src = 'https://www.52pojie.cn/home.php?mod=task&do=apply&id=2';
}

function addHook() {
    _.each(document.querySelectorAll('img.qq_bind'), function (el) {
        if (el.src.indexOf('image/common/qds.png') >= 0
            && el.parentNode instanceof HTMLAnchorElement
            && el.parentNode.href.indexOf('home.php?mod=task&do=apply&id=2') >= 0) {
            doPunchCard();
        }
    });
}

exports.addHook = addHook;