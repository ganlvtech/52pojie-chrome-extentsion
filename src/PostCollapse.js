const _ = require('lodash');
require('zepto/src/zepto');
require('zepto/src/event');
const $ = window.Zepto;
const SpamDetector = require('./SpamDetector');

function Post(post) {
    this.post = post;
    this.$post = $(this.post);
    this.$userinfo = this.$post.find('.pls.favatar');
    this.$avatar = this.$userinfo.find('.avatar');
    this.$authInfo = this.$post.find('.authi');
    this.$authIcon = this.$post.find('.authicn');
    this.$content = this.$post.find('.t_f');
    this.$contentContainer = this.$post.find('.t_fsz');
    this.$body = this.$post.find('.pcb');
    this.$bodyContainer = this.$body.closest('.plc');
    this.$postInfo = this.$bodyContainer.find('.pi');
    this.$sign = this.$post.find('.sign');
    this.$operation = this.$post.find('.po');
    this.$operationLeft = this.$operation.find('.pob > em');
    this.bodyText = this.$body.text().replace(/\s/g, '');
    this.authInfoText = this.$authInfo.text();
    this.authIconSrc = this.$authIcon.attr('src');
    this.isSpam = SpamDetector.isSpam(this.bodyText);
}

Post.prototype.needCollapse = function () {
    return !(this.$body.height() > 100
        || this.bodyText.length > 40
        || this.authInfoText.indexOf('自己') >= 0
        || this.authInfoText.indexOf('楼主') >= 0
        || this.authIconSrc.indexOf('icn_lz') >= 0
        || this.authIconSrc.indexOf('fanyiyin') >= 0
        || this.authIconSrc.indexOf('fanyinwen') >= 0);
};

Post.prototype.getBodyContainerHeight = function () {
    let result = 0;
    this.$bodyContainer.children().each(function () {
        result += this.getBoundingClientRect().height;
    });
    return result;
};

Post.prototype.collapse = function () {
    if (this.isSpam) {
        this.$userinfo.css('opacity', '0.1');
        this.$body.css('opacity', '0.1');
    }
    // 去除最小高度
    this.$contentContainer.css('min-height', '0');
    // 隐藏时间
    this.$postInfo.css('padding', '0').height(0).css('border-bottom', 'none');
    // 隐藏签名
    this.$sign.hide();
    // 隐藏操作栏
    this.$operationLeft.hide();
    this.$operation.css('border-top', 'none').css('margin-top', -this.$operation.height());
    // 隐藏头像
    this.$avatar.hide();
    // 用户信息栏缩小高度
    this.$userinfo.css('overflow', 'hidden').height(this.getBodyContainerHeight());
};

Post.prototype.expand = function () {
    this.$userinfo.css('opacity', '');
    this.$body.css('opacity', '');
    this.$contentContainer.css('min-height', '');
    this.$postInfo.css('padding', '').css('height', '').css('border-bottom', '');
    this.$sign.show();
    this.$operationLeft.show();
    this.$operation.css('border-top', '').css('margin-top', '');
    this.$avatar.show();
    this.$userinfo.css('overflow', '').css('height', '');
};

function getPostELements() {
    return _.filter(document.querySelectorAll('#postlist > div'), function (el) {
        return /^post_\d+$/.test(el.id);
    });
}

function addHook() {
    let posts = _.map(getPostELements(), function (post) {
        return new Post(post);
    });
    _.each(posts, function (post) {
        try {
            if (post.needCollapse()) {
                post.collapse();
                post.$post.on('click', function (e) {
                    post.expand();
                    let onMouseLeaveListener = function (e) {
                        post.collapse();
                        $(this).off('mouseleave', onMouseLeaveListener);
                    };
                    $(this).on('mouseleave', onMouseLeaveListener);
                });
            }
        } catch (e) {
            console.log(e);
        }
    });
}

exports.addHook = addHook;