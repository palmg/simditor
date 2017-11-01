var simditor = require('../lib/simditor'),
    $ = require('jquery'),
    upUtil = require('./upUtil').upUtil
require('../styles/simditor.css')

var Form = function (fileUrl, policy, accessid, signature, callback) {
    this.policy = policy
    this.accessid = accessid
    this.signature = signature
    this.callback = callback
    this.url = fileUrl
}
Form.prototype.generate = function (file ,up, $) {//an handle to create formData
    var formData = new FormData(),
        key = upUtil.randKey()
    file.file_path = this.url + key
    formData.append('name', file.name)
    formData.append('key', key)
    formData.append('policy', this.policy);
    formData.append('OSSAccessKeyId', this.accessid);
    formData.append('signature', this.signature);
    formData.append('success_action_status', '200');
    formData.append('callback', this.callback);
    formData.append('x:name', encodeURI(encodeURI(file.name)));
    formData.append('x:sys', JSON.stringify({extType: 'NaN'}));
    formData.append('x:cus', 'NaN');
    formData.append('Content-Disposition', 'filename=' + file.name);
    formData.append('file', file.obj);
    return formData
}

$.getJSON('http://file.mlhang.com/res/policy/get', {}, function(res){
    var edit = new simditor({
        textarea: $('#root'),
        pasteImage: true,
        upload: {
            url: 'bb',
            params: null,
            connectionCount: 3,
            leaveConfirm: 'Uploading is in progress, are you sure to leave this page?',
            base64:true, //support base64 format img. if xhr error, base64 code will tack place 'Src' attribute.
            formData: new Form(res.fileService , res.policy, res.accessid, res.signature, res.callback)
            /*function(file ,up, $){//an handle to create formData
                var formData = new FormData()
                formData.append('name', file.name)
                formData.append('key', upUtil.randKey())
                formData.append('policy', res.policy);
                formData.append('OSSAccessKeyId', res.accessid);
                formData.append('signature', res.signature);
                formData.append('success_action_status', '200');
                formData.append('callback', res.callback);
                formData.append('x:name', encodeURI(encodeURI(file.name)));
                formData.append('x:sys', JSON.stringify({extType: 'NaN'}));
                formData.append('x:cus', 'NaN');
                formData.append('Content-Disposition', 'filename=' + file.name);
                formData.append('file', file.obj);
                return formData
            }*/
        }
    })
})