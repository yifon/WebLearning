{
    /**
     * 阿里的一道面试题，看到的时候按照自己的画法去解，不是最优的，细节也可能还有问题，不过还是先mark下再优化:
     * 1.提供一个js的function,输入为一段字符串文本，文本长度不固定。
     * 2.该js函数运行时，找出文本字符串中所有的回文(即从前往后、从后往前结果是一致的)，例如：aba,abba,abcba
     * 3.重复的回文不需要去重复，找到打印即可，但是：同一个位置上同样的回文仅打印一次
     * 4.1个字符不算回文，即最少2个字符才算
     */
    var strs = "abcbaabadaadbci";
    var len = strs.length;
    var leftStr = strs[0] + strs[1] + strs[2],
        rightStr = strs[2] + strs[1] + strs[0];
    var arr = new Array();
    for (var j = 3; j <= len; j++) {
        if (leftStr == rightStr && leftStr != "" & rightStr != "") {
            arr.push(leftStr);
            leftStr = "";
            rightStr = ""
        }
        if (leftStr == "" && rightStr == "") {
            leftStr += strs[j] + strs[j + 1];
            rightStr = strs[j + 1] + strs[j] + rightStr;
            ++j;
        } else {
            leftStr += strs[j];
            rightStr = strs[j] + rightStr;
        }
    }
    for (var i = 0; i < arr.length; i++) {
        alert("结果：" + arr[i])
    }
}