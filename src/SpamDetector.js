const _ = require('lodash');
const spamWordList = [
    '谢谢', '感谢', '多谢', '支持',
    '楼主', '老哥', '老铁', '大佬', '大神', '大牛', '高手', '技术帝',
    '分享', '辛苦',
    '好东西', '正好需要', '不错', '方便', '实用', '有用', '管用', '好用', '厉害', '厉害了', '666', '利害', '膜拜', '可以',
    '牛逼', '佩服', '不明觉厉', '很牛', '顶一下', '详细', '易懂',
    '回复看隐藏', '先回复', '占位', '收藏', 'Mark', '先占位', '坐下', '躺下', '路过',
    '慢看', '看看', '慢慢看', '看隐藏',
    '学到', '学习', '学学', '受教', '受益', '研究', '试一试', '刚好需要', '有空', '找个', '没看懂', '看不懂', '涨姿势', '姿势',
    '期待', '希望', '帮忙', '就更好了',
    '这个', '一下', '了', '啊', '哦', '哟', '的', '哇', '卧槽', '非常', '很', '挺', '好多', '慢慢',
    'Thanks', '感谢发布原创作品', '吾爱破解论坛因你更精彩', '吾爱破解论坛有你更精彩',
    '我很赞同', '热心回复', '用心讨论', '共获提升', '感谢您对吾爱破解论坛的支持'
];

function stripSymbols(text) {
    return text.replace(/[,.\/#!$%^&*;:'"{}=\-_+`~()\[\]|@\s]/g, '')
        .replace(/[、，。？！：；（）《》【】“”‘’￥…—·]/g, '');
}

function stripMeaninglessword(text) {
    return text.replace(/[吧吗呢啦嘛呐地得嘿嗨]/g, '');
}

function spamRatio(text) {
    let count = 0;
    _.each(spamWordList, function (word) {
        let pos = 0;
        while ((pos = text.indexOf(word, pos)) >= 0) {
            count += word.length;
            ++pos;
        }
    });
    return count / text.length;
}

function isSpam(text) {
    text = stripSymbols(text);
    text = stripMeaninglessword(text);
    return spamRatio(text) > 0.65;
}

exports.isSpam = isSpam;