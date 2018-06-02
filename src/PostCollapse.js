const _ = require('lodash');
require('zepto/src/zepto');
require('zepto/src/event');
const $ = window.Zepto;

function getPostList() {
    return _.filter(document.querySelectorAll('#postlist > div'), function (el) {
        return /^post_\d+$/.test(el.id);
    });
}

function getPlcHeight(el) {
    let result = 0;
    _.each(el.children, function (el) {
        result += el.getBoundingClientRect().height;
    });
    return result;
}

function getPostCollapseHeight(el) {
    return getPlcHeight($(el).find('.t_fsz').closest('.plc').get(0));
}

function needCollapse(el) {
    if ($(el).find('.pcb').height() > 100
        || $(el).find('.t_f').textContent > 40
        || $(el).find('.authi').get(0).textContent.indexOf('自己') !== -1
        || $(el).find('.authi').get(0).textContent.indexOf('楼主') !== -1
        || $(el).find('.authicn.vm').get(0).src.indexOf('icn_lz') !== -1
        || $(el).find('.authicn.vm').get(0).src.indexOf('fanyiyin') !== -1
        || $(el).find('.authicn.vm').get(0).src.indexOf('fanyinwen') !== -1) {
        return false;
    }
    return true;
}

function collapse(el) {
    // 去除帖子最小高度
    $(el).find('.t_fsz').css('min-height', '0');
    // 隐藏时间
    $(el).find('.t_fsz').closest('.plc').find('.pi').hide();
    $(el).find('.t_fsz').closest('.plc').find('.pct').css('margin-top', $(el).find('.t_fsz').closest('.plc').find('.pi').css('margin-bottom'));
    // 隐藏签名
    $(el).find('.sign').closest('tr').hide();
    // 隐藏操作栏
    $(el).find('.replyadd').closest('em').hide();
    $(el).find('.replyadd').closest('.po')
        .css('border-top', 'none')
        .css('margin-top', -$(el).find('.replyadd').closest('.po').height());
    // 隐藏头像
    $(el).find('.pls.favatar .avatar').hide();
    // 用户信息栏缩小高度
    $(el).find('.pls.favatar')
        .css('overflow', 'hidden')
        .height(getPostCollapseHeight(el));
}

function expand(el) {
    $(el).find('.t_fsz').css('min-height', '');
    $(el).find('.t_fsz').closest('.plc').find('.pi').show();
    $(el).find('.t_fsz').closest('.plc').find('.pct').css('margin-top', '');
    $(el).find('.sign').closest('tr').show();
    $(el).find('.replyadd').closest('em').show();
    $(el).find('.replyadd').closest('.po')
        .css('border-top', '')
        .css('margin-top', '');
    $(el).find('.pls.favatar .avatar').show();
    $(el).find('.pls.favatar')
        .css('overflow', 'hidden')
        .css('height', '');
}

function addHook() {
    let postList = getPostList();
    _.each(postList, function (el) {
        if (needCollapse(el)) {
            collapse(el);
            $(el).on('click', function (e) {
                expand(this);
                var onMouseLeaveListener = function(e) {
                    collapse(this);
                    $(this).off('mouseleave', onMouseLeaveListener);
                };
                $(this).on('mouseleave', onMouseLeaveListener);
            });
        }
    });
}

exports.addHook = addHook;