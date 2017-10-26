var simditor = require('../lib/simditor'),
    $ = require('jquery'),
    upUtil = require('./upUtil').upUtil
require('../styles/simditor.css')


$.getJSON('http://file.mlhang.com/res/policy/get', {}, function(res){
    var edit = new simditor({
        textarea: $('#root'),
        upload: {
            url: res.host,
            params: null,
            connectionCount: 3,
            leaveConfirm: 'Uploading is in progress, are you sure to leave this page?',
            genformData:function(file ,up, $){//an handle to create formData
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
            }
        }
    })
})