var require = meteorInstall({"lib":{"collections":{"branchs.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// lib/collections/branchs.js                                                                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _regenerator = require("babel-runtime/regenerator");                                                              //
                                                                                                                      //
var _regenerator2 = _interopRequireDefault(_regenerator);                                                             //
                                                                                                                      //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                     //
                                                                                                                      //
var Meteor = void 0;                                                                                                  // 1
module.watch(require("meteor/meteor"), {                                                                              // 1
    Meteor: function (v) {                                                                                            // 1
        Meteor = v;                                                                                                   // 1
    }                                                                                                                 // 1
}, 0);                                                                                                                // 1
Branchs = new Mongo.Collection('branchs');                                                                            // 3
                                                                                                                      //
if (Meteor.isServer) {                                                                                                // 5
    Meteor.methods({                                                                                                  // 6
        addNewBranch: function () {                                                                                   // 7
            function _callee(data) {                                                                                  // 7
                var user, branch;                                                                                     // 7
                return _regenerator2.default.async(function () {                                                      // 7
                    function _callee$(_context) {                                                                     // 7
                        while (1) {                                                                                   // 7
                            switch (_context.prev = _context.next) {                                                  // 7
                                case 0:                                                                               // 7
                                    check(Meteor.userId(), String);                                                   // 8
                                    check(data, {                                                                     // 9
                                        id_record: Match.Maybe(String),                                               // 10
                                        name: String,                                                                 // 11
                                        active: Boolean                                                               // 12
                                    });                                                                               // 9
                                    user = Meteor.user();                                                             // 15
                                    branch = _.extend(data, {                                                         // 16
                                        id_owner: user._id,                                                           // 17
                                        date_create: new Date().getTime()                                             // 18
                                    });                                                                               // 16
                                    delete branch.id_record;                                                          // 20
                                    _context.next = 7;                                                                // 7
                                    return _regenerator2.default.awrap(Branchs.insert(branch));                       // 7
                                                                                                                      //
                                case 7:                                                                               // 7
                                    return _context.abrupt("return", _context.sent);                                  // 7
                                                                                                                      //
                                case 8:                                                                               // 7
                                case "end":                                                                           // 7
                                    return _context.stop();                                                           // 7
                            }                                                                                         // 7
                        }                                                                                             // 7
                    }                                                                                                 // 7
                                                                                                                      //
                    return _callee$;                                                                                  // 7
                }(), null, this);                                                                                     // 7
            }                                                                                                         // 7
                                                                                                                      //
            return _callee;                                                                                           // 7
        }(),                                                                                                          // 7
        updateBranch: function () {                                                                                   // 23
            function _callee2(data) {                                                                                 // 23
                var _id, branch;                                                                                      // 23
                                                                                                                      //
                return _regenerator2.default.async(function () {                                                      // 23
                    function _callee2$(_context2) {                                                                   // 23
                        while (1) {                                                                                   // 23
                            switch (_context2.prev = _context2.next) {                                                // 23
                                case 0:                                                                               // 23
                                    check(Meteor.userId(), String);                                                   // 24
                                    check(data, {                                                                     // 25
                                        id_record: String,                                                            // 26
                                        name: String,                                                                 // 27
                                        active: Boolean                                                               // 28
                                    });                                                                               // 25
                                    _id = data.id_record;                                                             // 30
                                    branch = _.extend(data, {                                                         // 31
                                        date_update: new Date().getTime()                                             // 32
                                    });                                                                               // 31
                                    delete branch.id_record;                                                          // 34
                                    _context2.next = 7;                                                               // 23
                                    return _regenerator2.default.awrap(Branchs.update(_id, {                          // 23
                                        $set: branch                                                                  // 36
                                    }));                                                                              // 35
                                                                                                                      //
                                case 7:                                                                               // 23
                                    return _context2.abrupt("return", _context2.sent);                                // 23
                                                                                                                      //
                                case 8:                                                                               // 23
                                case "end":                                                                           // 23
                                    return _context2.stop();                                                          // 23
                            }                                                                                         // 23
                        }                                                                                             // 23
                    }                                                                                                 // 23
                                                                                                                      //
                    return _callee2$;                                                                                 // 23
                }(), null, this);                                                                                     // 23
            }                                                                                                         // 23
                                                                                                                      //
            return _callee2;                                                                                          // 23
        }(),                                                                                                          // 23
        removeBranch: function () {                                                                                   // 40
            function _callee3(_id) {                                                                                  // 40
                var ids, branch;                                                                                      // 40
                return _regenerator2.default.async(function () {                                                      // 40
                    function _callee3$(_context3) {                                                                   // 40
                        while (1) {                                                                                   // 40
                            switch (_context3.prev = _context3.next) {                                                // 40
                                case 0:                                                                               // 40
                                    check(Meteor.userId(), String);                                                   // 41
                                    check(_id, String); /* check term using other document */                         // 42
                                    ids = [_id];                                                                      // 44
                                    _context3.next = 5;                                                               // 40
                                    return _regenerator2.default.awrap(Documents.findOne({                            // 40
                                        branch: {                                                                     // 46
                                            $elemMatch: {                                                             // 47
                                                "$in": ids                                                            // 48
                                            }                                                                         // 47
                                        }                                                                             // 46
                                    }));                                                                              // 45
                                                                                                                      //
                                case 5:                                                                               // 40
                                    branch = _context3.sent;                                                          // 45
                                                                                                                      //
                                    if (!branch) {                                                                    // 40
                                        _context3.next = 8;                                                           // 40
                                        break;                                                                        // 40
                                    }                                                                                 // 40
                                                                                                                      //
                                    return _context3.abrupt("return", null);                                          // 40
                                                                                                                      //
                                case 8:                                                                               // 40
                                    if (!Branchs.find(_id).count()) {                                                 // 40
                                        _context3.next = 14;                                                          // 40
                                        break;                                                                        // 40
                                    }                                                                                 // 40
                                                                                                                      //
                                    _context3.next = 11;                                                              // 40
                                    return _regenerator2.default.awrap(Branchs.remove({                               // 40
                                        _id: _id                                                                      // 58
                                    }));                                                                              // 58
                                                                                                                      //
                                case 11:                                                                              // 40
                                    return _context3.abrupt("return", _context3.sent);                                // 40
                                                                                                                      //
                                case 14:                                                                              // 40
                                    return _context3.abrupt("return", null);                                          // 40
                                                                                                                      //
                                case 15:                                                                              // 40
                                case "end":                                                                           // 40
                                    return _context3.stop();                                                          // 40
                            }                                                                                         // 40
                        }                                                                                             // 40
                    }                                                                                                 // 40
                                                                                                                      //
                    return _callee3$;                                                                                 // 40
                }(), null, this);                                                                                     // 40
            }                                                                                                         // 40
                                                                                                                      //
            return _callee3;                                                                                          // 40
        }()                                                                                                           // 40
    });                                                                                                               // 6
} // Branchs.find().observeChanges({                                                                                  // 64
//     added: function(id, object) {                                                                                  // 68
//     },                                                                                                             // 69
//     changed: function (id, object) {                                                                               // 70
//     },                                                                                                             // 71
//     removed: function (id, object) {                                                                               // 72
//     }                                                                                                              // 73
// });                                                                                                                // 74
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"categorys.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// lib/collections/categorys.js                                                                                       //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _regenerator = require("babel-runtime/regenerator");                                                              //
                                                                                                                      //
var _regenerator2 = _interopRequireDefault(_regenerator);                                                             //
                                                                                                                      //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                     //
                                                                                                                      //
var Meteor = void 0;                                                                                                  // 1
module.watch(require("meteor/meteor"), {                                                                              // 1
    Meteor: function (v) {                                                                                            // 1
        Meteor = v;                                                                                                   // 1
    }                                                                                                                 // 1
}, 0);                                                                                                                // 1
Categorys = new Mongo.Collection('categorys');                                                                        // 3
                                                                                                                      //
if (Meteor.isServer) {                                                                                                // 5
    Meteor.methods({                                                                                                  // 6
        addNewCategory: function () {                                                                                 // 7
            function _callee(data) {                                                                                  // 7
                var user, category;                                                                                   // 7
                return _regenerator2.default.async(function () {                                                      // 7
                    function _callee$(_context) {                                                                     // 7
                        while (1) {                                                                                   // 7
                            switch (_context.prev = _context.next) {                                                  // 7
                                case 0:                                                                               // 7
                                    check(Meteor.userId(), String);                                                   // 8
                                    check(data, {                                                                     // 9
                                        id_record: Match.Maybe(String),                                               // 10
                                        name: String,                                                                 // 11
                                        active: Boolean                                                               // 12
                                    });                                                                               // 9
                                    user = Meteor.user();                                                             // 15
                                    category = _.extend(data, {                                                       // 16
                                        id_owner: user._id,                                                           // 17
                                        date_create: new Date().getTime()                                             // 18
                                    });                                                                               // 16
                                    delete category.id_record;                                                        // 20
                                    _context.next = 7;                                                                // 7
                                    return _regenerator2.default.awrap(Categorys.insert(category));                   // 7
                                                                                                                      //
                                case 7:                                                                               // 7
                                    return _context.abrupt("return", _context.sent);                                  // 7
                                                                                                                      //
                                case 8:                                                                               // 7
                                case "end":                                                                           // 7
                                    return _context.stop();                                                           // 7
                            }                                                                                         // 7
                        }                                                                                             // 7
                    }                                                                                                 // 7
                                                                                                                      //
                    return _callee$;                                                                                  // 7
                }(), null, this);                                                                                     // 7
            }                                                                                                         // 7
                                                                                                                      //
            return _callee;                                                                                           // 7
        }(),                                                                                                          // 7
        updateCategory: function () {                                                                                 // 23
            function _callee2(data) {                                                                                 // 23
                var _id, category;                                                                                    // 23
                                                                                                                      //
                return _regenerator2.default.async(function () {                                                      // 23
                    function _callee2$(_context2) {                                                                   // 23
                        while (1) {                                                                                   // 23
                            switch (_context2.prev = _context2.next) {                                                // 23
                                case 0:                                                                               // 23
                                    check(Meteor.userId(), String);                                                   // 24
                                    check(data, {                                                                     // 25
                                        id_record: String,                                                            // 26
                                        name: String,                                                                 // 27
                                        active: Boolean                                                               // 28
                                    });                                                                               // 25
                                    _id = data.id_record;                                                             // 30
                                    category = _.extend(data, {                                                       // 31
                                        date_update: new Date().getTime()                                             // 32
                                    });                                                                               // 31
                                    delete category.id_record;                                                        // 34
                                    _context2.next = 7;                                                               // 23
                                    return _regenerator2.default.awrap(Categorys.update(_id, {                        // 23
                                        $set: category                                                                // 36
                                    }));                                                                              // 35
                                                                                                                      //
                                case 7:                                                                               // 23
                                    return _context2.abrupt("return", _context2.sent);                                // 23
                                                                                                                      //
                                case 8:                                                                               // 23
                                case "end":                                                                           // 23
                                    return _context2.stop();                                                          // 23
                            }                                                                                         // 23
                        }                                                                                             // 23
                    }                                                                                                 // 23
                                                                                                                      //
                    return _callee2$;                                                                                 // 23
                }(), null, this);                                                                                     // 23
            }                                                                                                         // 23
                                                                                                                      //
            return _callee2;                                                                                          // 23
        }(),                                                                                                          // 23
        removeCategory: function () {                                                                                 // 40
            function _callee3(_id) {                                                                                  // 40
                var document;                                                                                         // 40
                return _regenerator2.default.async(function () {                                                      // 40
                    function _callee3$(_context3) {                                                                   // 40
                        while (1) {                                                                                   // 40
                            switch (_context3.prev = _context3.next) {                                                // 40
                                case 0:                                                                               // 40
                                    check(Meteor.userId(), String);                                                   // 41
                                    check(_id, String); //check document using category                               // 42
                                                                                                                      //
                                    _context3.next = 4;                                                               // 40
                                    return _regenerator2.default.awrap(Documents.findOne({                            // 40
                                        category: _id                                                                 // 44
                                    }));                                                                              // 44
                                                                                                                      //
                                case 4:                                                                               // 40
                                    document = _context3.sent;                                                        // 44
                                                                                                                      //
                                    if (!document) {                                                                  // 40
                                        _context3.next = 7;                                                           // 40
                                        break;                                                                        // 40
                                    }                                                                                 // 40
                                                                                                                      //
                                    return _context3.abrupt("return", null);                                          // 40
                                                                                                                      //
                                case 7:                                                                               // 40
                                    if (!Categorys.find(_id).count()) {                                               // 40
                                        _context3.next = 13;                                                          // 40
                                        break;                                                                        // 40
                                    }                                                                                 // 40
                                                                                                                      //
                                    _context3.next = 10;                                                              // 40
                                    return _regenerator2.default.awrap(Categorys.remove({                             // 40
                                        _id: _id                                                                      // 49
                                    }));                                                                              // 49
                                                                                                                      //
                                case 10:                                                                              // 40
                                    return _context3.abrupt("return", _context3.sent);                                // 40
                                                                                                                      //
                                case 13:                                                                              // 40
                                    return _context3.abrupt("return", null);                                          // 40
                                                                                                                      //
                                case 14:                                                                              // 40
                                case "end":                                                                           // 40
                                    return _context3.stop();                                                          // 40
                            }                                                                                         // 40
                        }                                                                                             // 40
                    }                                                                                                 // 40
                                                                                                                      //
                    return _callee3$;                                                                                 // 40
                }(), null, this);                                                                                     // 40
            }                                                                                                         // 40
                                                                                                                      //
            return _callee3;                                                                                          // 40
        }()                                                                                                           // 40
    });                                                                                                               // 6
}                                                                                                                     // 55
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"client.document.in.queues.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// lib/collections/client.document.in.queues.js                                                                       //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
DocumentInQueues = new Mongo.Collection('document-in-queues');                                                        // 1
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"document.attachment.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// lib/collections/document.attachment.js                                                                             //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _regenerator = require("babel-runtime/regenerator");                                                              //
                                                                                                                      //
var _regenerator2 = _interopRequireDefault(_regenerator);                                                             //
                                                                                                                      //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                     //
                                                                                                                      //
var Meteor = void 0;                                                                                                  // 1
module.watch(require("meteor/meteor"), {                                                                              // 1
    Meteor: function (v) {                                                                                            // 1
        Meteor = v;                                                                                                   // 1
    }                                                                                                                 // 1
}, 0);                                                                                                                // 1
Attachments = new Mongo.Collection('attachments');                                                                    // 3
                                                                                                                      //
if (Meteor.isServer) {                                                                                                // 5
    Meteor.methods({                                                                                                  // 6
        addNewAttachment: function () {                                                                               // 7
            function _callee(document) {                                                                              // 7
                return _regenerator2.default.async(function () {                                                      // 7
                    function _callee$(_context) {                                                                     // 7
                        while (1) {                                                                                   // 7
                            switch (_context.prev = _context.next) {                                                  // 7
                                case 0:                                                                               // 7
                                    _context.next = 2;                                                                // 7
                                    return _regenerator2.default.awrap(Attachments.insert(document));                 // 7
                                                                                                                      //
                                case 2:                                                                               // 7
                                    return _context.abrupt("return", _context.sent);                                  // 7
                                                                                                                      //
                                case 3:                                                                               // 7
                                case "end":                                                                           // 7
                                    return _context.stop();                                                           // 7
                            }                                                                                         // 7
                        }                                                                                             // 7
                    }                                                                                                 // 7
                                                                                                                      //
                    return _callee$;                                                                                  // 7
                }(), null, this);                                                                                     // 7
            }                                                                                                         // 7
                                                                                                                      //
            return _callee;                                                                                           // 7
        }()                                                                                                           // 7
    });                                                                                                               // 6
}                                                                                                                     // 11
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"document.remind.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// lib/collections/document.remind.js                                                                                 //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
DocumentRemind = new Mongo.Collection('document-remind');                                                             // 1
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"documents.in.remind.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// lib/collections/documents.in.remind.js                                                                             //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
DocumentsInRemind = new Mongo.Collection('documents-in-remind');                                                      // 1
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"documents.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// lib/collections/documents.js                                                                                       //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _regenerator = require("babel-runtime/regenerator");                                                              //
                                                                                                                      //
var _regenerator2 = _interopRequireDefault(_regenerator);                                                             //
                                                                                                                      //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                     //
                                                                                                                      //
var Meteor = void 0;                                                                                                  // 1
module.watch(require("meteor/meteor"), {                                                                              // 1
    Meteor: function (v) {                                                                                            // 1
        Meteor = v;                                                                                                   // 1
    }                                                                                                                 // 1
}, 0);                                                                                                                // 1
Documents = new Mongo.Collection('documents');                                                                        // 2
                                                                                                                      //
var StrFunc = require('../../imports/string-helpers');                                                                // 3
                                                                                                                      //
if (Meteor.isServer) {                                                                                                // 6
    var deleteFolderRecursive = function (path, fs) {                                                                 // 6
        try {                                                                                                         // 179
            if (fs.existsSync(path)) {                                                                                // 180
                fs.readdirSync(path).forEach(function (file, index) {                                                 // 181
                    var curPath = path + "/" + file;                                                                  // 182
                                                                                                                      //
                    if (fs.lstatSync(curPath).isDirectory()) {                                                        // 183
                        // recurse                                                                                    // 183
                        deleteFolderRecursive(curPath, fs);                                                           // 184
                    } else {                                                                                          // 185
                        // delete file                                                                                // 185
                        fs.unlinkSync(curPath);                                                                       // 186
                    }                                                                                                 // 187
                });                                                                                                   // 188
                fs.rmdirSync(path);                                                                                   // 189
            }                                                                                                         // 190
        } catch (e) {}                                                                                                // 191
    };                                                                                                                // 192
                                                                                                                      //
    Meteor.methods({                                                                                                  // 7
        addNewDocument: function () {                                                                                 // 8
            function _callee(document) {                                                                              // 8
                var page_uuid, idDocument, folderUpload, base, mkdirp, Fiber, fs;                                     // 8
                return _regenerator2.default.async(function () {                                                      // 8
                    function _callee$(_context) {                                                                     // 8
                        while (1) {                                                                                   // 8
                            switch (_context.prev = _context.next) {                                                  // 8
                                case 0:                                                                               // 8
                                    check(Meteor.userId(), String);                                                   // 9
                                    console.log(document);                                                            // 10
                                    check(document, {                                                                 // 11
                                        branch: Match.Optional(Match.OneOf(undefined, null, Array)),                  // 12
                                        category: Match.Optional(Match.OneOf(undefined, null, String)),               // 13
                                        hashtags: Match.Optional(Match.OneOf(undefined, null, Array)),                // 14
                                        name: String,                                                                 // 15
                                        document_number: Match.Optional(Match.OneOf(undefined, null, String)),        // 16
                                        term: Match.Optional(Match.OneOf(undefined, null, Array)),                    // 17
                                        note: Match.Optional(Match.OneOf(undefined, null, String)),                   // 18
                                        startStamp: Match.Optional(Match.OneOf(undefined, null, Number)),             // 19
                                        dueStamp: Match.Optional(Match.OneOf(undefined, null, Number)),               // 20
                                        page_uuid: String,                                                            // 21
                                        every: Number,                                                                // 22
                                        unit: String,                                                                 // 23
                                        firstAttachment: Match.Optional(Match.OneOf(undefined, null, String))         // 24
                                    });                                                                               // 11
                                    user = Meteor.user();                                                             // 26
                                    document = _.extend(document, {                                                   // 27
                                        id_owner: user._id,                                                           // 28
                                        date_create: new Date().getTime(),                                            // 29
                                        name_search: StrFunc.strWithoutSpec(document.name),                           // 30
                                        document_number_search: StrFunc.strWithoutSpec(document.document_number)      // 31
                                    });                                                                               // 27
                                    page_uuid = document.page_uuid; // create new document without attachments        // 33
                                                                                                                      //
                                    _context.next = 8;                                                                // 8
                                    return _regenerator2.default.awrap(Documents.insert(document));                   // 8
                                                                                                                      //
                                case 8:                                                                               // 8
                                    idDocument = _context.sent;                                                       // 35
                                    folderUpload = process.env.PWD + '/.uploads/';                                    // 36
                                    base = process.env.PWD + '/.uploads/' + idDocument;                               // 37
                                    mkdirp = require('mkdirp');                                                       // 38
                                    Fiber = require('fibers');                                                        // 39
                                    fs = require('fs-extra');                                                         // 40
                                    mkdirp(base, function (err) {                                                     // 41
                                        if (err) {                                                                    // 42
                                            console.log(err);                                                         // 43
                                        } else {                                                                      // 44
                                            console.log('create new folder: ' + base); //move attachment from tmp to documents-folder
                                                                                                                      //
                                            Fiber(function () {                                                       // 47
                                                var folderUploadReplace = '/upload/';                                 // 48
                                                Uploads.find({                                                        // 49
                                                    'uuid_page': page_uuid                                            // 49
                                                }).fetch().map(function (el, idx) {                                   // 49
                                                    var pathFileUpload = folderUpload + el.path;                      // 50
                                                    var newPathFile = base + '/' + el.new_name;                       // 51
                                                    fs.copy(pathFileUpload, newPathFile).then(function () {           // 52
                                                        // save new file to attachment                                // 54
                                                        var attachment = el;                                          // 55
                                                        var oldImageId = attachment._id;                              // 56
                                                        delete attachment._id;                                        // 57
                                                        attachment.pathReactive = idDocument + '/' + el.path;         // 58
                                                        attachment.idDocument = idDocument;                           // 59
                                                        Meteor.call('addNewAttachment', attachment);                  // 60
                                                        Meteor.call('deleteFile', {                                   // 61
                                                            _id: oldImageId                                           // 61
                                                        });                                                           // 61
                                                    }).catch(function (err) {                                         // 62
                                                        return console.error(err);                                    // 62
                                                    });                                                               // 62
                                                });                                                                   // 63
                                            }).run();                                                                 // 64
                                        } // path exists unless there was an error                                    // 65
                                                                                                                      //
                                    });                                                                               // 67
                                                                                                                      //
                                case 15:                                                                              // 8
                                case "end":                                                                           // 8
                                    return _context.stop();                                                           // 8
                            }                                                                                         // 8
                        }                                                                                             // 8
                    }                                                                                                 // 8
                                                                                                                      //
                    return _callee$;                                                                                  // 8
                }(), null, this);                                                                                     // 8
            }                                                                                                         // 8
                                                                                                                      //
            return _callee;                                                                                           // 8
        }()                                                                                                           // 8
    });                                                                                                               // 7
    Meteor.methods({                                                                                                  // 71
        updateDocument: function () {                                                                                 // 72
            function _callee2(document) {                                                                             // 72
                var idDoc;                                                                                            // 72
                return _regenerator2.default.async(function () {                                                      // 72
                    function _callee2$(_context2) {                                                                   // 72
                        while (1) {                                                                                   // 72
                            switch (_context2.prev = _context2.next) {                                                // 72
                                case 0:                                                                               // 72
                                    check(Meteor.userId(), String);                                                   // 73
                                    check(document, {                                                                 // 74
                                        _id: String,                                                                  // 75
                                        branch: Match.Optional(Match.OneOf(undefined, null, Array)),                  // 76
                                        category: Match.Optional(Match.OneOf(undefined, null, String)),               // 77
                                        hashtags: Match.Optional(Match.OneOf(undefined, null, Array)),                // 78
                                        name: String,                                                                 // 79
                                        document_number: Match.Optional(Match.OneOf(undefined, null, String)),        // 80
                                        term: Match.Optional(Match.OneOf(undefined, null, Array)),                    // 81
                                        note: Match.Optional(Match.OneOf(undefined, null, String)),                   // 82
                                        startStamp: Match.Optional(Match.OneOf(undefined, null, Number)),             // 83
                                        dueStamp: Match.Optional(Match.OneOf(undefined, null, Number)),               // 84
                                        page_uuid: String,                                                            // 85
                                        every: Number,                                                                // 86
                                        unit: String,                                                                 // 87
                                        firstAttachment: Match.Optional(Match.OneOf(undefined, null, String))         // 88
                                    });                                                                               // 74
                                    user = Meteor.user();                                                             // 90
                                    document.name_search = StrFunc.strWithoutSpec(document.name);                     // 91
                                    document.document_number_search = StrFunc.strWithoutSpec(document.document_number);
                                    document = _.extend(document, {                                                   // 93
                                        date_update: new Date().getTime()                                             // 94
                                    });                                                                               // 93
                                    idDoc = document._id;                                                             // 96
                                    delete document._id;                                                              // 97
                                    _context2.next = 10;                                                              // 72
                                    return _regenerator2.default.awrap(Documents.update(idDoc, {                      // 72
                                        $set: document                                                                // 99
                                    }));                                                                              // 98
                                                                                                                      //
                                case 10:                                                                              // 72
                                    return _context2.abrupt("return", _context2.sent);                                // 72
                                                                                                                      //
                                case 11:                                                                              // 72
                                case "end":                                                                           // 72
                                    return _context2.stop();                                                          // 72
                            }                                                                                         // 72
                        }                                                                                             // 72
                    }                                                                                                 // 72
                                                                                                                      //
                    return _callee2$;                                                                                 // 72
                }(), null, this);                                                                                     // 72
            }                                                                                                         // 72
                                                                                                                      //
            return _callee2;                                                                                          // 72
        }()                                                                                                           // 72
    });                                                                                                               // 71
    Meteor.methods({                                                                                                  // 105
        setDefaultDocumentWithIdDoc: function () {                                                                    // 106
            function _callee3(data) {                                                                                 // 106
                var idDoc, doc;                                                                                       // 106
                return _regenerator2.default.async(function () {                                                      // 106
                    function _callee3$(_context3) {                                                                   // 106
                        while (1) {                                                                                   // 106
                            switch (_context3.prev = _context3.next) {                                                // 106
                                case 0:                                                                               // 106
                                    check(Meteor.userId(), String);                                                   // 107
                                    check(data, {                                                                     // 108
                                        _id: String,                                                                  // 109
                                        pageUUID: String,                                                             // 110
                                        idDocument: String                                                            // 111
                                    }); // _id is attachment id                                                       // 108
                                                                                                                      //
                                    idDoc = data.idDocument;                                                          // 114
                                    doc = Documents.findOne(idDoc);                                                   // 115
                                                                                                                      //
                                    if (doc) {                                                                        // 116
                                        Attachments.update({                                                          // 117
                                            idDocument: idDoc                                                         // 117
                                        }, {                                                                          // 117
                                            $set: {                                                                   // 118
                                                isDefault: false                                                      // 119
                                            }                                                                         // 118
                                        }, {                                                                          // 117
                                            multi: true                                                               // 121
                                        });                                                                           // 121
                                        Attachments.update(data._id, {                                                // 122
                                            $set: {                                                                   // 123
                                                isDefault: true                                                       // 124
                                            }                                                                         // 123
                                        });                                                                           // 122
                                    }                                                                                 // 127
                                                                                                                      //
                                case 5:                                                                               // 106
                                case "end":                                                                           // 106
                                    return _context3.stop();                                                          // 106
                            }                                                                                         // 106
                        }                                                                                             // 106
                    }                                                                                                 // 106
                                                                                                                      //
                    return _callee3$;                                                                                 // 106
                }(), null, this);                                                                                     // 106
            }                                                                                                         // 106
                                                                                                                      //
            return _callee3;                                                                                          // 106
        }()                                                                                                           // 106
    });                                                                                                               // 105
    Meteor.methods({                                                                                                  // 132
        setDefaultDocumentPageUUID: function () {                                                                     // 133
            function _callee4(data) {                                                                                 // 133
                return _regenerator2.default.async(function () {                                                      // 133
                    function _callee4$(_context4) {                                                                   // 133
                        while (1) {                                                                                   // 133
                            switch (_context4.prev = _context4.next) {                                                // 133
                                case 0:                                                                               // 133
                                    check(Meteor.userId(), String);                                                   // 134
                                    check(data, {                                                                     // 135
                                        _id: String,                                                                  // 136
                                        pageUUID: String                                                              // 137
                                    });                                                                               // 135
                                    Uploads.update({                                                                  // 139
                                        uuid_page: data.pageUUID                                                      // 139
                                    }, {                                                                              // 139
                                        $set: {                                                                       // 140
                                            isDefault: false                                                          // 141
                                        }                                                                             // 140
                                    }, {                                                                              // 139
                                        multi: true                                                                   // 143
                                    });                                                                               // 143
                                    Uploads.update(data._id, {                                                        // 144
                                        $set: {                                                                       // 145
                                            isDefault: true                                                           // 146
                                        }                                                                             // 145
                                    });                                                                               // 144
                                                                                                                      //
                                case 4:                                                                               // 133
                                case "end":                                                                           // 133
                                    return _context4.stop();                                                          // 133
                            }                                                                                         // 133
                        }                                                                                             // 133
                    }                                                                                                 // 133
                                                                                                                      //
                    return _callee4$;                                                                                 // 133
                }(), null, this);                                                                                     // 133
            }                                                                                                         // 133
                                                                                                                      //
            return _callee4;                                                                                          // 133
        }()                                                                                                           // 133
    });                                                                                                               // 132
    Meteor.methods({                                                                                                  // 152
        deleteDocument: function (idDoc) {                                                                            // 153
            check(Meteor.userId(), String);                                                                           // 154
            check(idDoc, String);                                                                                     // 155
                                                                                                                      //
            try {                                                                                                     // 156
                var Fiber = require('fibers');                                                                        // 157
                                                                                                                      //
                var fs = require('fs-extra');                                                                         // 158
                                                                                                                      //
                Fiber(function () {                                                                                   // 159
                    var doc = Documents.findOne(idDoc);                                                               // 160
                                                                                                                      //
                    if (!doc) {                                                                                       // 161
                        return false;                                                                                 // 162
                    }                                                                                                 // 163
                                                                                                                      //
                    Attachments.remove({                                                                              // 164
                        idDocument: idDoc                                                                             // 164
                    }, {                                                                                              // 164
                        multi: true                                                                                   // 164
                    });                                                                                               // 164
                    Documents.remove(idDoc);                                                                          // 165
                                                                                                                      //
                    var fs = require('fs-extra');                                                                     // 166
                                                                                                                      //
                    var folderUpload = process.env.PWD + '/.uploads/' + idDoc;                                        // 167
                    console.log('delete: ' + folderUpload);                                                           // 168
                    deleteFolderRecursive(folderUpload, fs);                                                          // 169
                    return true;                                                                                      // 170
                }).run();                                                                                             // 171
            } catch (e) {                                                                                             // 172
                return false;                                                                                         // 173
            }                                                                                                         // 174
        }                                                                                                             // 175
    });                                                                                                               // 152
    ;                                                                                                                 // 192
    Meteor.methods({                                                                                                  // 194
        addQuickDocument: function () {                                                                               // 195
            function _callee5(data) {                                                                                 // 195
                var user, Fiber;                                                                                      // 195
                return _regenerator2.default.async(function () {                                                      // 195
                    function _callee5$(_context5) {                                                                   // 195
                        while (1) {                                                                                   // 195
                            switch (_context5.prev = _context5.next) {                                                // 195
                                case 0:                                                                               // 195
                                    check(Meteor.userId(), String);                                                   // 196
                                    check(data, {                                                                     // 197
                                        branch: Match.Optional(Match.OneOf(undefined, null, Array)),                  // 198
                                        category: Match.Optional(Match.OneOf(undefined, null, String)),               // 199
                                        page_uuid: String                                                             // 200
                                    });                                                                               // 197
                                    user = Meteor.userId();                                                           // 202
                                    Fiber = require('fibers');                                                        // 203
                                    Fiber(function () {                                                               // 204
                                        //get all attachment in page uuid                                             // 205
                                        Uploads.find({                                                                // 206
                                            'uuid_page': data.page_uuid                                               // 206
                                        }).fetch().map(function (el, idx) {                                           // 206
                                            var name = el.path;                                                       // 207
                                                                                                                      //
                                            var document = _.extend(data, {                                           // 208
                                                id_owner: user._id,                                                   // 209
                                                date_create: new Date().getTime(),                                    // 210
                                                name: name,                                                           // 211
                                                name_search: StrFunc.strWithoutSpec(name),                            // 212
                                                firstAttachment: el.key_unique                                        // 213
                                            });                                                                       // 208
                                                                                                                      //
                                            var p = new Promise(function (rs, rj) {                                   // 215
                                                rs(Documents.insert(document));                                       // 216
                                            });                                                                       // 217
                                            p.then(function (idDoc) {                                                 // 219
                                                if (idDoc) {                                                          // 220
                                                    var folderUpload = process.env.PWD + '/.uploads/';                // 221
                                                    var base = process.env.PWD + '/.uploads/' + idDoc;                // 222
                                                                                                                      //
                                                    var mkdirp = require('mkdirp');                                   // 223
                                                                                                                      //
                                                    var fs = require('fs-extra');                                     // 224
                                                                                                                      //
                                                    mkdirp(base, function (err) {                                     // 225
                                                        if (err) {                                                    // 226
                                                            console.log(err);                                         // 227
                                                        } else {                                                      // 228
                                                            console.log('create new folder: ' + base);                // 229
                                                            console.log('save attachment');                           // 230
                                                            var pathFileUpload = folderUpload + el.path;              // 231
                                                            var newPathFile = base + '/' + el.new_name;               // 232
                                                            fs.copy(pathFileUpload, newPathFile).then(function () {   // 233
                                                                console.log('copy');                                  // 235
                                                                var attachment = el;                                  // 236
                                                                var oldImageId = attachment._id;                      // 237
                                                                delete attachment._id;                                // 238
                                                                attachment.pathReactive = idDoc + '/' + el.path;      // 239
                                                                attachment.idDocument = idDoc;                        // 240
                                                                attachment.isDefault = true;                          // 241
                                                                Meteor.call('addNewAttachment', attachment);          // 242
                                                                Meteor.call('deleteFile', {                           // 243
                                                                    _id: oldImageId                                   // 243
                                                                });                                                   // 243
                                                            }).catch(function (err) {                                 // 244
                                                                return console.error(err);                            // 244
                                                            });                                                       // 244
                                                        }                                                             // 245
                                                    });                                                               // 246
                                                }                                                                     // 247
                                            });                                                                       // 248
                                            p.catch(function (e) {                                                    // 250
                                                console.log(e);                                                       // 251
                                            });                                                                       // 252
                                            return p;                                                                 // 253
                                        });                                                                           // 254
                                    }).run();                                                                         // 255
                                                                                                                      //
                                case 5:                                                                               // 195
                                case "end":                                                                           // 195
                                    return _context5.stop();                                                          // 195
                            }                                                                                         // 195
                        }                                                                                             // 195
                    }                                                                                                 // 195
                                                                                                                      //
                    return _callee5$;                                                                                 // 195
                }(), null, this);                                                                                     // 195
            }                                                                                                         // 195
                                                                                                                      //
            return _callee5;                                                                                          // 195
        }()                                                                                                           // 195
    });                                                                                                               // 194
}                                                                                                                     // 258
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"favorites.js":function(require){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// lib/collections/favorites.js                                                                                       //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _regenerator = require("babel-runtime/regenerator");                                                              //
                                                                                                                      //
var _regenerator2 = _interopRequireDefault(_regenerator);                                                             //
                                                                                                                      //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                     //
                                                                                                                      //
Favorites = new Mongo.Collection('favorites');                                                                        // 1
                                                                                                                      //
if (Meteor.isServer) {                                                                                                // 3
    Meteor.methods({                                                                                                  // 4
        addNewFavorite: function () {                                                                                 // 5
            function _callee(data) {                                                                                  // 5
                var user, favorite;                                                                                   // 5
                return _regenerator2.default.async(function () {                                                      // 5
                    function _callee$(_context) {                                                                     // 5
                        while (1) {                                                                                   // 5
                            switch (_context.prev = _context.next) {                                                  // 5
                                case 0:                                                                               // 5
                                    check(Meteor.userId(), String);                                                   // 6
                                    check(data, {                                                                     // 7
                                        id_record: Match.Maybe(String),                                               // 8
                                        name: String,                                                                 // 9
                                        active: Boolean                                                               // 10
                                    });                                                                               // 7
                                    user = Meteor.user();                                                             // 13
                                    favorite = _.extend(data, {                                                       // 14
                                        id_owner: user._id,                                                           // 15
                                        date_create: new Date().getTime()                                             // 16
                                    });                                                                               // 14
                                    delete favorite.id_record;                                                        // 18
                                    _context.next = 7;                                                                // 5
                                    return _regenerator2.default.awrap(Favorites.insert(favorite));                   // 5
                                                                                                                      //
                                case 7:                                                                               // 5
                                    return _context.abrupt("return", _context.sent);                                  // 5
                                                                                                                      //
                                case 8:                                                                               // 5
                                case "end":                                                                           // 5
                                    return _context.stop();                                                           // 5
                            }                                                                                         // 5
                        }                                                                                             // 5
                    }                                                                                                 // 5
                                                                                                                      //
                    return _callee$;                                                                                  // 5
                }(), null, this);                                                                                     // 5
            }                                                                                                         // 5
                                                                                                                      //
            return _callee;                                                                                           // 5
        }(),                                                                                                          // 5
        updateFavorite: function () {                                                                                 // 21
            function _callee2(data) {                                                                                 // 21
                var _id, favorite;                                                                                    // 21
                                                                                                                      //
                return _regenerator2.default.async(function () {                                                      // 21
                    function _callee2$(_context2) {                                                                   // 21
                        while (1) {                                                                                   // 21
                            switch (_context2.prev = _context2.next) {                                                // 21
                                case 0:                                                                               // 21
                                    check(Meteor.userId(), String);                                                   // 22
                                    check(data, {                                                                     // 23
                                        id_record: String,                                                            // 24
                                        name: String,                                                                 // 25
                                        active: Boolean                                                               // 26
                                    });                                                                               // 23
                                    _id = data.id_record;                                                             // 28
                                    favorite = _.extend(data, {                                                       // 29
                                        date_update: new Date().getTime()                                             // 30
                                    });                                                                               // 29
                                    delete favorite.id_record;                                                        // 32
                                    _context2.next = 7;                                                               // 21
                                    return _regenerator2.default.awrap(Favorites.update(_id, {                        // 21
                                        $set: favorite                                                                // 34
                                    }));                                                                              // 33
                                                                                                                      //
                                case 7:                                                                               // 21
                                    return _context2.abrupt("return", _context2.sent);                                // 21
                                                                                                                      //
                                case 8:                                                                               // 21
                                case "end":                                                                           // 21
                                    return _context2.stop();                                                          // 21
                            }                                                                                         // 21
                        }                                                                                             // 21
                    }                                                                                                 // 21
                                                                                                                      //
                    return _callee2$;                                                                                 // 21
                }(), null, this);                                                                                     // 21
            }                                                                                                         // 21
                                                                                                                      //
            return _callee2;                                                                                          // 21
        }(),                                                                                                          // 21
        removeFavorite: function () {                                                                                 // 38
            function _callee3(_id) {                                                                                  // 38
                return _regenerator2.default.async(function () {                                                      // 38
                    function _callee3$(_context3) {                                                                   // 38
                        while (1) {                                                                                   // 38
                            switch (_context3.prev = _context3.next) {                                                // 38
                                case 0:                                                                               // 38
                                    check(Meteor.userId(), String);                                                   // 39
                                    check(_id, String);                                                               // 40
                                    _context3.next = 4;                                                               // 38
                                    return _regenerator2.default.awrap(Favorites.remove({                             // 38
                                        _id: _id                                                                      // 41
                                    }));                                                                              // 41
                                                                                                                      //
                                case 4:                                                                               // 38
                                    return _context3.abrupt("return", _context3.sent);                                // 38
                                                                                                                      //
                                case 5:                                                                               // 38
                                case "end":                                                                           // 38
                                    return _context3.stop();                                                          // 38
                            }                                                                                         // 38
                        }                                                                                             // 38
                    }                                                                                                 // 38
                                                                                                                      //
                    return _callee3$;                                                                                 // 38
                }(), null, this);                                                                                     // 38
            }                                                                                                         // 38
                                                                                                                      //
            return _callee3;                                                                                          // 38
        }()                                                                                                           // 38
    });                                                                                                               // 4
}                                                                                                                     // 44
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"hashtags.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// lib/collections/hashtags.js                                                                                        //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _regenerator = require("babel-runtime/regenerator");                                                              //
                                                                                                                      //
var _regenerator2 = _interopRequireDefault(_regenerator);                                                             //
                                                                                                                      //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                     //
                                                                                                                      //
var Meteor = void 0;                                                                                                  // 1
module.watch(require("meteor/meteor"), {                                                                              // 1
    Meteor: function (v) {                                                                                            // 1
        Meteor = v;                                                                                                   // 1
    }                                                                                                                 // 1
}, 0);                                                                                                                // 1
Hashtags = new Mongo.Collection('hashtags');                                                                          // 3
                                                                                                                      //
if (Meteor.isServer) {                                                                                                // 5
    Meteor.methods({                                                                                                  // 6
        addNewHashtag: function () {                                                                                  // 7
            function _callee(data) {                                                                                  // 7
                var user, hashtag;                                                                                    // 7
                return _regenerator2.default.async(function () {                                                      // 7
                    function _callee$(_context) {                                                                     // 7
                        while (1) {                                                                                   // 7
                            switch (_context.prev = _context.next) {                                                  // 7
                                case 0:                                                                               // 7
                                    check(Meteor.userId(), String);                                                   // 8
                                    check(data, {                                                                     // 9
                                        id_record: Match.Maybe(String),                                               // 10
                                        name: String,                                                                 // 11
                                        active: Boolean                                                               // 12
                                    });                                                                               // 9
                                    user = Meteor.user();                                                             // 15
                                    hashtag = _.extend(data, {                                                        // 16
                                        id_owner: user._id,                                                           // 17
                                        date_create: new Date().getTime()                                             // 18
                                    });                                                                               // 16
                                    delete hashtag.id_record;                                                         // 20
                                    _context.next = 7;                                                                // 7
                                    return _regenerator2.default.awrap(Hashtags.insert(hashtag));                     // 7
                                                                                                                      //
                                case 7:                                                                               // 7
                                    return _context.abrupt("return", _context.sent);                                  // 7
                                                                                                                      //
                                case 8:                                                                               // 7
                                case "end":                                                                           // 7
                                    return _context.stop();                                                           // 7
                            }                                                                                         // 7
                        }                                                                                             // 7
                    }                                                                                                 // 7
                                                                                                                      //
                    return _callee$;                                                                                  // 7
                }(), null, this);                                                                                     // 7
            }                                                                                                         // 7
                                                                                                                      //
            return _callee;                                                                                           // 7
        }(),                                                                                                          // 7
        updateHashtag: function () {                                                                                  // 23
            function _callee2(data) {                                                                                 // 23
                var _id, hashtag;                                                                                     // 23
                                                                                                                      //
                return _regenerator2.default.async(function () {                                                      // 23
                    function _callee2$(_context2) {                                                                   // 23
                        while (1) {                                                                                   // 23
                            switch (_context2.prev = _context2.next) {                                                // 23
                                case 0:                                                                               // 23
                                    check(Meteor.userId(), String);                                                   // 24
                                    check(data, {                                                                     // 25
                                        id_record: String,                                                            // 26
                                        name: String,                                                                 // 27
                                        active: Boolean                                                               // 28
                                    });                                                                               // 25
                                    _id = data.id_record;                                                             // 30
                                    hashtag = _.extend(data, {                                                        // 31
                                        date_update: new Date().getTime()                                             // 32
                                    });                                                                               // 31
                                    delete hashtag.id_record;                                                         // 34
                                    _context2.next = 7;                                                               // 23
                                    return _regenerator2.default.awrap(Hashtags.update(_id, {                         // 23
                                        $set: hashtag                                                                 // 36
                                    }));                                                                              // 35
                                                                                                                      //
                                case 7:                                                                               // 23
                                    return _context2.abrupt("return", _context2.sent);                                // 23
                                                                                                                      //
                                case 8:                                                                               // 23
                                case "end":                                                                           // 23
                                    return _context2.stop();                                                          // 23
                            }                                                                                         // 23
                        }                                                                                             // 23
                    }                                                                                                 // 23
                                                                                                                      //
                    return _callee2$;                                                                                 // 23
                }(), null, this);                                                                                     // 23
            }                                                                                                         // 23
                                                                                                                      //
            return _callee2;                                                                                          // 23
        }(),                                                                                                          // 23
        removeHashtag: function () {                                                                                  // 40
            function _callee3(_id) {                                                                                  // 40
                var ids, hashtag;                                                                                     // 40
                return _regenerator2.default.async(function () {                                                      // 40
                    function _callee3$(_context3) {                                                                   // 40
                        while (1) {                                                                                   // 40
                            switch (_context3.prev = _context3.next) {                                                // 40
                                case 0:                                                                               // 40
                                    check(Meteor.userId(), String);                                                   // 41
                                    check(_id, String); /* check term using other document */                         // 42
                                    ids = [_id];                                                                      // 44
                                    _context3.next = 5;                                                               // 40
                                    return _regenerator2.default.awrap(Documents.findOne({                            // 40
                                        hashtag: {                                                                    // 46
                                            $elemMatch: {                                                             // 47
                                                "$in": ids                                                            // 48
                                            }                                                                         // 47
                                        }                                                                             // 46
                                    }));                                                                              // 45
                                                                                                                      //
                                case 5:                                                                               // 40
                                    hashtag = _context3.sent;                                                         // 45
                                                                                                                      //
                                    if (!hashtag) {                                                                   // 40
                                        _context3.next = 8;                                                           // 40
                                        break;                                                                        // 40
                                    }                                                                                 // 40
                                                                                                                      //
                                    return _context3.abrupt("return", null);                                          // 40
                                                                                                                      //
                                case 8:                                                                               // 40
                                    if (!Hashtags.find(_id).count()) {                                                // 40
                                        _context3.next = 14;                                                          // 40
                                        break;                                                                        // 40
                                    }                                                                                 // 40
                                                                                                                      //
                                    _context3.next = 11;                                                              // 40
                                    return _regenerator2.default.awrap(Hashtags.remove({                              // 40
                                        _id: _id                                                                      // 58
                                    }));                                                                              // 58
                                                                                                                      //
                                case 11:                                                                              // 40
                                    return _context3.abrupt("return", _context3.sent);                                // 40
                                                                                                                      //
                                case 14:                                                                              // 40
                                    return _context3.abrupt("return", null);                                          // 40
                                                                                                                      //
                                case 15:                                                                              // 40
                                case "end":                                                                           // 40
                                    return _context3.stop();                                                          // 40
                            }                                                                                         // 40
                        }                                                                                             // 40
                    }                                                                                                 // 40
                                                                                                                      //
                    return _callee3$;                                                                                 // 40
                }(), null, this);                                                                                     // 40
            }                                                                                                         // 40
                                                                                                                      //
            return _callee3;                                                                                          // 40
        }()                                                                                                           // 40
    });                                                                                                               // 6
}                                                                                                                     // 64
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"iddoc.in.fav.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// lib/collections/iddoc.in.fav.js                                                                                    //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
IdDocumentInFavorite = new Mongo.Collection('id-doc-in-fav');                                                         // 1
                                                                                                                      //
if (Meteor.isServer) {                                                                                                // 3
    Meteor.methods({                                                                                                  // 4
        addIdDocToFav: function (data) {                                                                              // 5
            "use strict";                                                                                             // 6
                                                                                                                      //
            check(Meteor.userId(), String);                                                                           // 7
            check(data, {                                                                                             // 8
                idDoc: String,                                                                                        // 9
                idFav: String                                                                                         // 10
            });                                                                                                       // 8
            var fav = Favorites.findOne(data.idFav);                                                                  // 13
            var doc = Documents.findOne(data.idDoc);                                                                  // 14
                                                                                                                      //
            if (fav && doc) {                                                                                         // 15
                var dataGet = IdDocumentInFavorite.findOne({                                                          // 16
                    $and: [{                                                                                          // 17
                        idDoc: {                                                                                      // 19
                            $eq: data.idDoc                                                                           // 19
                        }                                                                                             // 19
                    }, {                                                                                              // 18
                        idFav: {                                                                                      // 22
                            $eq: data.idFav                                                                           // 22
                        }                                                                                             // 22
                    }]                                                                                                // 21
                });                                                                                                   // 16
                                                                                                                      //
                if (!dataGet) {                                                                                       // 27
                    var user = Meteor.user();                                                                         // 28
                                                                                                                      //
                    var idDocInFav = _.extend(data, {                                                                 // 29
                        id_owner: user._id,                                                                           // 30
                        date_create: new Date().getTime()                                                             // 31
                    });                                                                                               // 29
                                                                                                                      //
                    IdDocumentInFavorite.insert(idDocInFav);                                                          // 33
                    return {                                                                                          // 34
                        success: true,                                                                                // 35
                        message: 'add "' + doc.name + '" to favorite "' + fav.name + '" success'                      // 36
                    };                                                                                                // 34
                } else {                                                                                              // 38
                    return {                                                                                          // 39
                        success: false,                                                                               // 40
                        message: '"' + doc.name + '"' + '  already exists in "' + fav.name + '"'                      // 41
                    };                                                                                                // 39
                }                                                                                                     // 43
            } else {                                                                                                  // 44
                return {                                                                                              // 45
                    success: false,                                                                                   // 46
                    message: "Data invalid"                                                                           // 47
                };                                                                                                    // 45
            }                                                                                                         // 49
        }                                                                                                             // 50
    });                                                                                                               // 4
    Meteor.methods({                                                                                                  // 54
        mergeFavToQueue: function (idFav) {                                                                           // 55
            "use strict";                                                                                             // 56
                                                                                                                      //
            check(Meteor.userId(), String);                                                                           // 57
            check(idFav, String);                                                                                     // 58
            var fav = Favorites.findOne(idFav);                                                                       // 59
                                                                                                                      //
            if (fav) {                                                                                                // 60
                var idDocInFav = IdDocumentInFavorite.find({                                                          // 61
                    id_owner: Meteor.userId(),                                                                        // 62
                    idFav: idFav                                                                                      // 63
                });                                                                                                   // 61
                                                                                                                      //
                if (idDocInFav.count()) {                                                                             // 65
                    var countAdd = 0;                                                                                 // 66
                    idDocInFav.fetch().map(function (val, idx) {                                                      // 67
                        var inQueue = Queues.findOne({                                                                // 68
                            id_doc: val.idDoc,                                                                        // 69
                            id_owner: Meteor.userId()                                                                 // 70
                        });                                                                                           // 68
                                                                                                                      //
                        if (!inQueue) {                                                                               // 72
                            var queue = {                                                                             // 73
                                id_owner: Meteor.userId(),                                                            // 74
                                id_doc: val.idDoc,                                                                    // 75
                                date_create: new Date().getTime()                                                     // 76
                            };                                                                                        // 73
                            Queues.insert(queue);                                                                     // 78
                            countAdd++;                                                                               // 79
                        }                                                                                             // 80
                    });                                                                                               // 81
                                                                                                                      //
                    if (countAdd) {                                                                                   // 82
                        return {                                                                                      // 83
                            success: true,                                                                            // 84
                            message: "add " + countAdd + " document(s) to queue"                                      // 85
                        };                                                                                            // 83
                    } else {                                                                                          // 87
                        return {                                                                                      // 88
                            success: false,                                                                           // 89
                            message: "all documents in favorite already exists in queue"                              // 90
                        };                                                                                            // 88
                    }                                                                                                 // 92
                } else {                                                                                              // 93
                    return {                                                                                          // 94
                        success: false,                                                                               // 95
                        message: "documents in favorite is empty"                                                     // 96
                    };                                                                                                // 94
                }                                                                                                     // 98
            } else {                                                                                                  // 99
                return {                                                                                              // 100
                    success: false,                                                                                   // 101
                    message: "favorite is empty"                                                                      // 102
                };                                                                                                    // 100
            }                                                                                                         // 104
        }                                                                                                             // 106
    });                                                                                                               // 54
    Meteor.methods({                                                                                                  // 109
        clearFav: function (idFav) {                                                                                  // 110
            "use strict";                                                                                             // 111
                                                                                                                      //
            check(Meteor.userId(), String);                                                                           // 112
            check(idFav, String);                                                                                     // 113
            var fav = Favorites.findOne(idFav);                                                                       // 114
                                                                                                                      //
            if (fav) {                                                                                                // 115
                IdDocumentInFavorite.remove({                                                                         // 116
                    id_owner: Meteor.userId(),                                                                        // 117
                    idFav: idFav                                                                                      // 118
                });                                                                                                   // 116
            }                                                                                                         // 120
        }                                                                                                             // 121
    });                                                                                                               // 109
    Meteor.methods({                                                                                                  // 124
        removeDocInFav: function (data) {                                                                             // 125
            "use strict";                                                                                             // 126
                                                                                                                      //
            check(Meteor.userId(), String);                                                                           // 127
            check(data.idFav, String);                                                                                // 128
            check(data.idDoc, String);                                                                                // 129
            IdDocumentInFavorite.remove({                                                                             // 130
                id_owner: Meteor.userId(),                                                                            // 131
                idFav: data.idFav,                                                                                    // 132
                idDoc: data.idDoc                                                                                     // 133
            });                                                                                                       // 130
        }                                                                                                             // 135
    });                                                                                                               // 124
}                                                                                                                     // 137
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"items.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// lib/collections/items.js                                                                                           //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
Items = new Mongo.Collection('items');                                                                                // 1
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"queue.js":function(require){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// lib/collections/queue.js                                                                                           //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _regenerator = require("babel-runtime/regenerator");                                                              //
                                                                                                                      //
var _regenerator2 = _interopRequireDefault(_regenerator);                                                             //
                                                                                                                      //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                     //
                                                                                                                      //
Queues = new Mongo.Collection('queues');                                                                              // 1
                                                                                                                      //
if (Meteor.isServer) {                                                                                                // 3
    Meteor.methods({                                                                                                  // 4
        'addQueue': function () {                                                                                     // 5
            function _callee(idDoc) {                                                                                 // 5
                var user;                                                                                             // 5
                return _regenerator2.default.async(function () {                                                      // 5
                    function _callee$(_context) {                                                                     // 5
                        while (1) {                                                                                   // 5
                            switch (_context.prev = _context.next) {                                                  // 5
                                case 0:                                                                               // 5
                                    check(Meteor.userId(), String);                                                   // 6
                                    check(idDoc, String);                                                             // 7
                                    user = Meteor.user();                                                             // 8
                                                                                                                      //
                                    if (!(Documents.findOne(idDoc) && !Queues.findOne({                               // 5
                                        id_doc: idDoc,                                                                // 9
                                        id_owner: user._id                                                            // 9
                                    }))) {                                                                            // 9
                                        _context.next = 7;                                                            // 5
                                        break;                                                                        // 5
                                    }                                                                                 // 5
                                                                                                                      //
                                    _context.next = 6;                                                                // 5
                                    return _regenerator2.default.awrap(Queues.insert({                                // 5
                                        id_owner: user._id,                                                           // 11
                                        id_doc: idDoc,                                                                // 12
                                        date_create: new Date().getTime()                                             // 13
                                    }));                                                                              // 10
                                                                                                                      //
                                case 6:                                                                               // 5
                                    return _context.abrupt("return", _context.sent);                                  // 5
                                                                                                                      //
                                case 7:                                                                               // 5
                                case "end":                                                                           // 5
                                    return _context.stop();                                                           // 5
                            }                                                                                         // 5
                        }                                                                                             // 5
                    }                                                                                                 // 5
                                                                                                                      //
                    return _callee$;                                                                                  // 5
                }(), null, this);                                                                                     // 5
            }                                                                                                         // 5
                                                                                                                      //
            return _callee;                                                                                           // 5
        }(),                                                                                                          // 5
        'removeQueue': function () {                                                                                  // 17
            function _callee2(idDoc) {                                                                                // 17
                var user, queue;                                                                                      // 17
                return _regenerator2.default.async(function () {                                                      // 17
                    function _callee2$(_context2) {                                                                   // 17
                        while (1) {                                                                                   // 17
                            switch (_context2.prev = _context2.next) {                                                // 17
                                case 0:                                                                               // 17
                                    check(Meteor.userId(), String);                                                   // 18
                                    check(idDoc, String);                                                             // 19
                                    user = Meteor.user();                                                             // 20
                                    queue = Queues.findOne({                                                          // 21
                                        id_doc: idDoc,                                                                // 21
                                        id_owner: user._id                                                            // 21
                                    });                                                                               // 21
                                                                                                                      //
                                    if (queue) {                                                                      // 22
                                        Queues.remove(queue._id);                                                     // 23
                                    }                                                                                 // 24
                                                                                                                      //
                                case 5:                                                                               // 17
                                case "end":                                                                           // 17
                                    return _context2.stop();                                                          // 17
                            }                                                                                         // 17
                        }                                                                                             // 17
                    }                                                                                                 // 17
                                                                                                                      //
                    return _callee2$;                                                                                 // 17
                }(), null, this);                                                                                     // 17
            }                                                                                                         // 17
                                                                                                                      //
            return _callee2;                                                                                          // 17
        }(),                                                                                                          // 17
        "cleanQueue": function () {                                                                                   // 26
            "use strict";                                                                                             // 27
                                                                                                                      //
            check(Meteor.userId(), String);                                                                           // 28
            Queues.remove({                                                                                           // 29
                id_owner: Meteor.userId()                                                                             // 29
            });                                                                                                       // 29
        }                                                                                                             // 30
    });                                                                                                               // 4
}                                                                                                                     // 32
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"reminds.js":function(require){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// lib/collections/reminds.js                                                                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _regenerator = require("babel-runtime/regenerator");                                                              //
                                                                                                                      //
var _regenerator2 = _interopRequireDefault(_regenerator);                                                             //
                                                                                                                      //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                     //
                                                                                                                      //
Reminds = new Mongo.Collection('reminds');                                                                            // 1
                                                                                                                      //
if (Meteor.isServer) {                                                                                                // 3
    Meteor.methods({                                                                                                  // 4
        addNewRemind: function () {                                                                                   // 5
            function _callee(data) {                                                                                  // 5
                var user, remind;                                                                                     // 5
                return _regenerator2.default.async(function () {                                                      // 5
                    function _callee$(_context) {                                                                     // 5
                        while (1) {                                                                                   // 5
                            switch (_context.prev = _context.next) {                                                  // 5
                                case 0:                                                                               // 5
                                    check(Meteor.userId(), String);                                                   // 6
                                    check(data, {                                                                     // 7
                                        id_record: Match.Maybe(String),                                               // 8
                                        name: String,                                                                 // 9
                                        active: Boolean,                                                              // 10
                                        interval: Number                                                              // 11
                                    });                                                                               // 7
                                    user = Meteor.user();                                                             // 14
                                    remind = _.extend(data, {                                                         // 15
                                        id_owner: user._id,                                                           // 16
                                        date_create: new Date().getTime()                                             // 17
                                    });                                                                               // 15
                                    delete remind.id_record;                                                          // 19
                                    _context.next = 7;                                                                // 5
                                    return _regenerator2.default.awrap(Reminds.insert(remind));                       // 5
                                                                                                                      //
                                case 7:                                                                               // 5
                                    return _context.abrupt("return", _context.sent);                                  // 5
                                                                                                                      //
                                case 8:                                                                               // 5
                                case "end":                                                                           // 5
                                    return _context.stop();                                                           // 5
                            }                                                                                         // 5
                        }                                                                                             // 5
                    }                                                                                                 // 5
                                                                                                                      //
                    return _callee$;                                                                                  // 5
                }(), null, this);                                                                                     // 5
            }                                                                                                         // 5
                                                                                                                      //
            return _callee;                                                                                           // 5
        }(),                                                                                                          // 5
        updateRemind: function () {                                                                                   // 22
            function _callee2(data) {                                                                                 // 22
                var _id, remind;                                                                                      // 22
                                                                                                                      //
                return _regenerator2.default.async(function () {                                                      // 22
                    function _callee2$(_context2) {                                                                   // 22
                        while (1) {                                                                                   // 22
                            switch (_context2.prev = _context2.next) {                                                // 22
                                case 0:                                                                               // 22
                                    check(Meteor.userId(), String);                                                   // 23
                                    check(data, {                                                                     // 24
                                        id_record: String,                                                            // 25
                                        name: String,                                                                 // 26
                                        active: Boolean,                                                              // 27
                                        interval: Number                                                              // 28
                                    });                                                                               // 24
                                    _id = data.id_record;                                                             // 30
                                    remind = _.extend(data, {                                                         // 31
                                        date_update: new Date().getTime()                                             // 32
                                    });                                                                               // 31
                                    delete remind.id_record;                                                          // 34
                                    _context2.next = 7;                                                               // 22
                                    return _regenerator2.default.awrap(Reminds.update(_id, {                          // 22
                                        $set: remind                                                                  // 36
                                    }));                                                                              // 35
                                                                                                                      //
                                case 7:                                                                               // 22
                                    return _context2.abrupt("return", _context2.sent);                                // 22
                                                                                                                      //
                                case 8:                                                                               // 22
                                case "end":                                                                           // 22
                                    return _context2.stop();                                                          // 22
                            }                                                                                         // 22
                        }                                                                                             // 22
                    }                                                                                                 // 22
                                                                                                                      //
                    return _callee2$;                                                                                 // 22
                }(), null, this);                                                                                     // 22
            }                                                                                                         // 22
                                                                                                                      //
            return _callee2;                                                                                          // 22
        }(),                                                                                                          // 22
        removeRemind: function () {                                                                                   // 40
            function _callee3(_id) {                                                                                  // 40
                return _regenerator2.default.async(function () {                                                      // 40
                    function _callee3$(_context3) {                                                                   // 40
                        while (1) {                                                                                   // 40
                            switch (_context3.prev = _context3.next) {                                                // 40
                                case 0:                                                                               // 40
                                    check(Meteor.userId(), String);                                                   // 41
                                    check(_id, String);                                                               // 42
                                                                                                                      //
                                    if (!Reminds.find(_id).count()) {                                                 // 40
                                        _context3.next = 8;                                                           // 40
                                        break;                                                                        // 40
                                    }                                                                                 // 40
                                                                                                                      //
                                    _context3.next = 5;                                                               // 40
                                    return _regenerator2.default.awrap(Reminds.remove({                               // 40
                                        _id: _id                                                                      // 44
                                    }));                                                                              // 44
                                                                                                                      //
                                case 5:                                                                               // 40
                                    return _context3.abrupt("return", _context3.sent);                                // 40
                                                                                                                      //
                                case 8:                                                                               // 40
                                    return _context3.abrupt("return", null);                                          // 40
                                                                                                                      //
                                case 9:                                                                               // 40
                                case "end":                                                                           // 40
                                    return _context3.stop();                                                          // 40
                            }                                                                                         // 40
                        }                                                                                             // 40
                    }                                                                                                 // 40
                                                                                                                      //
                    return _callee3$;                                                                                 // 40
                }(), null, this);                                                                                     // 40
            }                                                                                                         // 40
                                                                                                                      //
            return _callee3;                                                                                          // 40
        }()                                                                                                           // 40
    });                                                                                                               // 4
}                                                                                                                     // 51
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"rssearchs.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// lib/collections/rssearchs.js                                                                                       //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
RsSearchs = new Mongo.Collection('rssearchs');                                                                        // 1
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"terms.js":function(require){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// lib/collections/terms.js                                                                                           //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _regenerator = require("babel-runtime/regenerator");                                                              //
                                                                                                                      //
var _regenerator2 = _interopRequireDefault(_regenerator);                                                             //
                                                                                                                      //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                     //
                                                                                                                      //
Terms = new Mongo.Collection('terms');                                                                                // 1
                                                                                                                      //
if (Meteor.isServer) {                                                                                                // 3
    Meteor.methods({                                                                                                  // 4
        addNewTerm: function () {                                                                                     // 5
            function _callee(data) {                                                                                  // 5
                var user, term;                                                                                       // 5
                return _regenerator2.default.async(function () {                                                      // 5
                    function _callee$(_context) {                                                                     // 5
                        while (1) {                                                                                   // 5
                            switch (_context.prev = _context.next) {                                                  // 5
                                case 0:                                                                               // 5
                                    check(Meteor.userId(), String);                                                   // 6
                                    check(data, {                                                                     // 7
                                        id_record: Match.Maybe(String),                                               // 8
                                        name: String,                                                                 // 9
                                        active: Boolean                                                               // 10
                                    });                                                                               // 7
                                    user = Meteor.user();                                                             // 13
                                    term = _.extend(data, {                                                           // 14
                                        id_owner: user._id,                                                           // 15
                                        date_create: new Date().getTime()                                             // 16
                                    });                                                                               // 14
                                    delete term.id_record;                                                            // 18
                                    _context.next = 7;                                                                // 5
                                    return _regenerator2.default.awrap(Terms.insert(term));                           // 5
                                                                                                                      //
                                case 7:                                                                               // 5
                                    return _context.abrupt("return", _context.sent);                                  // 5
                                                                                                                      //
                                case 8:                                                                               // 5
                                case "end":                                                                           // 5
                                    return _context.stop();                                                           // 5
                            }                                                                                         // 5
                        }                                                                                             // 5
                    }                                                                                                 // 5
                                                                                                                      //
                    return _callee$;                                                                                  // 5
                }(), null, this);                                                                                     // 5
            }                                                                                                         // 5
                                                                                                                      //
            return _callee;                                                                                           // 5
        }(),                                                                                                          // 5
        updateTerm: function () {                                                                                     // 21
            function _callee2(data) {                                                                                 // 21
                var _id, term;                                                                                        // 21
                                                                                                                      //
                return _regenerator2.default.async(function () {                                                      // 21
                    function _callee2$(_context2) {                                                                   // 21
                        while (1) {                                                                                   // 21
                            switch (_context2.prev = _context2.next) {                                                // 21
                                case 0:                                                                               // 21
                                    check(Meteor.userId(), String);                                                   // 22
                                    check(data, {                                                                     // 23
                                        id_record: String,                                                            // 24
                                        name: String,                                                                 // 25
                                        active: Boolean                                                               // 26
                                    });                                                                               // 23
                                    _id = data.id_record;                                                             // 28
                                    term = _.extend(data, {                                                           // 29
                                        date_update: new Date().getTime()                                             // 30
                                    });                                                                               // 29
                                    delete term.id_record;                                                            // 32
                                    _context2.next = 7;                                                               // 21
                                    return _regenerator2.default.awrap(Terms.update(_id, {                            // 21
                                        $set: term                                                                    // 34
                                    }));                                                                              // 33
                                                                                                                      //
                                case 7:                                                                               // 21
                                    return _context2.abrupt("return", _context2.sent);                                // 21
                                                                                                                      //
                                case 8:                                                                               // 21
                                case "end":                                                                           // 21
                                    return _context2.stop();                                                          // 21
                            }                                                                                         // 21
                        }                                                                                             // 21
                    }                                                                                                 // 21
                                                                                                                      //
                    return _callee2$;                                                                                 // 21
                }(), null, this);                                                                                     // 21
            }                                                                                                         // 21
                                                                                                                      //
            return _callee2;                                                                                          // 21
        }(),                                                                                                          // 21
        removeTerm: function () {                                                                                     // 38
            function _callee3(_id) {                                                                                  // 38
                var ids, document;                                                                                    // 38
                return _regenerator2.default.async(function () {                                                      // 38
                    function _callee3$(_context3) {                                                                   // 38
                        while (1) {                                                                                   // 38
                            switch (_context3.prev = _context3.next) {                                                // 38
                                case 0:                                                                               // 38
                                    check(Meteor.userId(), String);                                                   // 39
                                    check(_id, String);                                                               // 40
                                                                                                                      //
                                    if (!Terms.find(_id).count()) {                                                   // 38
                                        _context3.next = 11;                                                          // 38
                                        break;                                                                        // 38
                                    }                                                                                 // 38
                                                                                                                      //
                                    /* check term using other document */ids = [_id];                                 // 42
                                    _context3.next = 6;                                                               // 38
                                    return _regenerator2.default.awrap(Documents.findOne({                            // 38
                                        term: {                                                                       // 45
                                            $elemMatch: {                                                             // 46
                                                "$in": ids                                                            // 47
                                            }                                                                         // 46
                                        }                                                                             // 45
                                    }));                                                                              // 44
                                                                                                                      //
                                case 6:                                                                               // 38
                                    document = _context3.sent;                                                        // 44
                                                                                                                      //
                                    if (document) {                                                                   // 38
                                        _context3.next = 11;                                                          // 38
                                        break;                                                                        // 38
                                    }                                                                                 // 38
                                                                                                                      //
                                    _context3.next = 10;                                                              // 38
                                    return _regenerator2.default.awrap(Terms.remove({                                 // 38
                                        _id: _id                                                                      // 53
                                    }));                                                                              // 53
                                                                                                                      //
                                case 10:                                                                              // 38
                                    return _context3.abrupt("return", _context3.sent);                                // 38
                                                                                                                      //
                                case 11:                                                                              // 38
                                    return _context3.abrupt("return", null);                                          // 38
                                                                                                                      //
                                case 12:                                                                              // 38
                                case "end":                                                                           // 38
                                    return _context3.stop();                                                          // 38
                            }                                                                                         // 38
                        }                                                                                             // 38
                    }                                                                                                 // 38
                                                                                                                      //
                    return _callee3$;                                                                                 // 38
                }(), null, this);                                                                                     // 38
            }                                                                                                         // 38
                                                                                                                      //
            return _callee3;                                                                                          // 38
        }()                                                                                                           // 38
    });                                                                                                               // 4
}                                                                                                                     // 59
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"uploads.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// lib/collections/uploads.js                                                                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
Uploads = new Mongo.Collection('uploads');                                                                            // 1
Uploads.allow({                                                                                                       // 3
    insert: function (userId, doc) {                                                                                  // 4
        return !!userId;                                                                                              // 5
    },                                                                                                                // 6
    update: function (userId, doc, fields, modifier) {                                                                // 7
        return !!userId;                                                                                              // 8
    }                                                                                                                 // 9
});                                                                                                                   // 3
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"config":{"config.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// lib/config/config.js                                                                                               //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
Accounts.config({                                                                                                     // 1
    forbidClientAccountCreation: true                                                                                 // 2
});                                                                                                                   // 1
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"search-api":{"api-find-document.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// lib/search-api/api-find-document.js                                                                                //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _regenerator = require("babel-runtime/regenerator");                                                              //
                                                                                                                      //
var _regenerator2 = _interopRequireDefault(_regenerator);                                                             //
                                                                                                                      //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                     //
                                                                                                                      //
var Meteor = void 0;                                                                                                  // 1
module.watch(require("meteor/meteor"), {                                                                              // 1
    Meteor: function (v) {                                                                                            // 1
        Meteor = v;                                                                                                   // 1
    }                                                                                                                 // 1
}, 0);                                                                                                                // 1
var StrHelpers = void 0;                                                                                              // 1
module.watch(require("../../imports/string-helpers"), {                                                               // 1
    "*": function (v) {                                                                                               // 1
        StrHelpers = v;                                                                                               // 1
    }                                                                                                                 // 1
}, 1);                                                                                                                // 1
var Configs = void 0;                                                                                                 // 1
module.watch(require("../../imports/configs"), {                                                                      // 1
    "*": function (v) {                                                                                               // 1
        Configs = v;                                                                                                  // 1
    }                                                                                                                 // 1
}, 2);                                                                                                                // 1
var RsSearchOpt = void 0;                                                                                             // 1
module.watch(require("../../imports/optimize-rs-search"), {                                                           // 1
    "*": function (v) {                                                                                               // 1
        RsSearchOpt = v;                                                                                              // 1
    }                                                                                                                 // 1
}, 3);                                                                                                                // 1
Meteor.methods({                                                                                                      // 6
    'findDocuments': function () {                                                                                    // 7
        function _callee(filter) {                                                                                    // 7
            var branchs, terms, categorys, hashtags, nameRegex, nameWithoutSpec, dcNumbRegex, docnumWithoutSpec, queryFilter, testResult;
            return _regenerator2.default.async(function () {                                                          // 7
                function _callee$(_context) {                                                                         // 7
                    while (1) {                                                                                       // 7
                        switch (_context.prev = _context.next) {                                                      // 7
                            case 0:                                                                                   // 7
                                _context.prev = 0;                                                                    // 7
                                check(Meteor.userId(), String);                                                       // 9
                                check(filter, {                                                                       // 10
                                    branchs: Match.Optional(Match.OneOf(undefined, null, Array)),                     // 11
                                    categorys: Match.Optional(Match.OneOf(undefined, null, Array)),                   // 12
                                    name: Match.Optional(Match.OneOf(undefined, null, String)),                       // 13
                                    document_number: Match.Optional(Match.OneOf(undefined, null, String)),            // 14
                                    terms: Match.Optional(Match.OneOf(undefined, null, Array)),                       // 15
                                    uuid_page_search: String,                                                         // 16
                                    hashtags: Match.Optional(Match.OneOf(undefined, null, Array))                     // 17
                                });                                                                                   // 10
                                user = Meteor.user();                                                                 // 19
                                branchs = filter.branchs;                                                             // 20
                                terms = filter.terms;                                                                 // 21
                                categorys = filter.categorys;                                                         // 22
                                hashtags = filter.hashtags;                                                           // 23
                                nameRegex = '';                                                                       // 24
                                                                                                                      //
                                if (filter.name) {                                                                    // 25
                                    nameWithoutSpec = StrHelpers.strWithoutSpec(filter.name);                         // 26
                                    nameRegex = StrHelpers.buildRegExp(nameWithoutSpec);                              // 27
                                }                                                                                     // 28
                                                                                                                      //
                                dcNumbRegex = '';                                                                     // 29
                                                                                                                      //
                                if (filter.document_number) {                                                         // 30
                                    docnumWithoutSpec = StrHelpers.strWithoutSpec(filter.document_number);            // 31
                                    dcNumbRegex = StrHelpers.buildRegExp(docnumWithoutSpec);                          // 32
                                }                                                                                     // 33
                                                                                                                      //
                                queryFilter = {};                                                                     // 34
                                                                                                                      //
                                if (branchs && branchs.length) {                                                      // 35
                                    queryFilter.branch = {                                                            // 36
                                        $elemMatch: {                                                                 // 37
                                            "$in": branchs                                                            // 38
                                        }                                                                             // 37
                                    };                                                                                // 36
                                }                                                                                     // 41
                                                                                                                      //
                                if (categorys && categorys.length) {                                                  // 43
                                    queryFilter.category = {                                                          // 44
                                        $in: categorys                                                                // 45
                                    };                                                                                // 44
                                }                                                                                     // 47
                                                                                                                      //
                                if (terms && terms.length) {                                                          // 49
                                    queryFilter.term = {                                                              // 50
                                        $elemMatch: {                                                                 // 51
                                            "$in": terms                                                              // 52
                                        }                                                                             // 51
                                    };                                                                                // 50
                                }                                                                                     // 55
                                                                                                                      //
                                if (hashtags && hashtags.length) {                                                    // 57
                                    queryFilter.hashtags = {                                                          // 58
                                        $elemMatch: {                                                                 // 59
                                            "$in": hashtags                                                           // 60
                                        }                                                                             // 59
                                    };                                                                                // 58
                                }                                                                                     // 63
                                                                                                                      //
                                if (nameRegex) {                                                                      // 65
                                    queryFilter.name_search = nameRegex;                                              // 66
                                }                                                                                     // 67
                                                                                                                      //
                                if (dcNumbRegex) {                                                                    // 69
                                    queryFilter.document_number_search = dcNumbRegex;                                 // 70
                                }                                                                                     // 71
                                                                                                                      //
                                _context.next = 21;                                                                   // 7
                                return _regenerator2.default.awrap(Documents.find({                                   // 7
                                    $and: [queryFilter]                                                               // 73
                                }));                                                                                  // 72
                                                                                                                      //
                            case 21:                                                                                  // 7
                                testResult = _context.sent;                                                           // 72
                                                                                                                      //
                                //save search                                                                         // 76
                                if (Meteor.isServer) {                                                                // 77
                                    RsSearchs.remove({                                                                // 78
                                        uuid_page_search: filter.uuid_page_search                                     // 78
                                    });                                                                               // 78
                                    RsSearchOpt.fucOptimizeRsSearch();                                                // 79
                                }                                                                                     // 80
                                                                                                                      //
                                _context.next = 25;                                                                   // 7
                                return _regenerator2.default.awrap(testResult.fetch().map(function (val, idx) {       // 7
                                    val.id_record = val._id;                                                          // 83
                                    delete val._id;                                                                   // 84
                                    val.uuid_page_search = filter.uuid_page_search;                                   // 85
                                                                                                                      //
                                    if (Meteor.isServer) {                                                            // 86
                                        var docInfo = Configs.getFirstAttachmentOfDocumentToCompress(val.id_record);  // 87
                                        val.firstDocFullPath = Configs.getFirstAttachmentOfDocument(val.id_record);   // 88
                                        val.realName = docInfo.name;                                                  // 89
                                        RsSearchs.insert(val);                                                        // 90
                                    }                                                                                 // 91
                                }));                                                                                  // 92
                                                                                                                      //
                            case 25:                                                                                  // 7
                                return _context.abrupt("return", _context.sent);                                      // 7
                                                                                                                      //
                            case 28:                                                                                  // 7
                                _context.prev = 28;                                                                   // 7
                                _context.t0 = _context["catch"](0);                                                   // 7
                                console.log(_context.t0);                                                             // 94
                                                                                                                      //
                            case 31:                                                                                  // 7
                            case "end":                                                                               // 7
                                return _context.stop();                                                               // 7
                        }                                                                                             // 7
                    }                                                                                                 // 7
                }                                                                                                     // 7
                                                                                                                      //
                return _callee$;                                                                                      // 7
            }(), null, this, [[0, 28]]);                                                                              // 7
        }                                                                                                             // 7
                                                                                                                      //
        return _callee;                                                                                               // 7
    }()                                                                                                               // 7
});                                                                                                                   // 6
                                                                                                                      //
function getFirstAttachmentOfDocument(idDocument) {                                                                   // 100
    var attachment = Attachments.findOne({                                                                            // 101
        idDocument: idDocument                                                                                        // 101
    });                                                                                                               // 101
                                                                                                                      //
    if (!attachment) {                                                                                                // 102
        return '';                                                                                                    // 103
    } else {                                                                                                          // 104
        var fullPath = Meteor.absoluteUrl.defaultOptions.rootUrl + 'upload/' + attachment.pathReactive;               // 105
        return fullPath;                                                                                              // 106
    }                                                                                                                 // 107
}                                                                                                                     // 108
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"constants.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// lib/constants.js                                                                                                   //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
WEB_KEY = 'PQG-2212';                                                                                                 // 1
MM_KEY = {                                                                                                            // 3
    days: 'd',                                                                                                        // 4
    weeks: 'w',                                                                                                       // 5
    months: 'M',                                                                                                      // 6
    quarters: "Q",                                                                                                    // 7
    years: 'y'                                                                                                        // 8
};                                                                                                                    // 3
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"router.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// lib/router.js                                                                                                      //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var requireLogin = function () {                                                                                      // 1
    if (!Meteor.user()) {                                                                                             // 2
        if (Meteor.loggingIn()) {                                                                                     // 3
            this.render(this.loadingTemplate);                                                                        // 4
        } else {                                                                                                      // 5
            this.render('deny');                                                                                      // 6
        }                                                                                                             // 7
    } else {                                                                                                          // 8
        this.next();                                                                                                  // 9
    }                                                                                                                 // 10
};                                                                                                                    // 11
                                                                                                                      //
Router.configure({                                                                                                    // 13
    layoutTemplate: 'layout',                                                                                         // 14
    loadingTemplate: 'loading',                                                                                       // 15
    notFoundTemplate: 'notfound',                                                                                     // 16
    waitOn: function () {                                                                                             // 17
        return [Meteor.subscribe('queues'), Meteor.subscribe('documents.in.queue'), Meteor.subscribe('categorys'), Meteor.subscribe('branchs'), Meteor.subscribe('terms'), Meteor.subscribe('documentremind'), Meteor.subscribe('documentsinremind'), Meteor.subscribe('favorites'), Meteor.subscribe('document.in.favorite'), Meteor.subscribe('hashtags')];
    }                                                                                                                 // 30
});                                                                                                                   // 13
Router.route('/', {                                                                                                   // 33
    name: 'dashboard',                                                                                                // 34
    onBeforeAction: requireLogin                                                                                      // 35
});                                                                                                                   // 33
Router.route('/categorys', {                                                                                          // 38
    name: 'categorys',                                                                                                // 39
    onBeforeAction: requireLogin                                                                                      // 40
});                                                                                                                   // 38
Router.route('/branchs', {                                                                                            // 43
    name: 'branchs',                                                                                                  // 44
    onBeforeAction: requireLogin                                                                                      // 45
});                                                                                                                   // 43
Router.route('/terms', {                                                                                              // 48
    name: 'terms',                                                                                                    // 49
    onBeforeAction: requireLogin                                                                                      // 50
});                                                                                                                   // 48
Router.route('/favorites', {                                                                                          // 53
    name: 'favorites',                                                                                                // 54
    onBeforeAction: requireLogin                                                                                      // 55
});                                                                                                                   // 53
Router.route('/reminds', {                                                                                            // 58
    name: 'reminds',                                                                                                  // 59
    onBeforeAction: requireLogin,                                                                                     // 60
    waitOn: function () {                                                                                             // 61
        return [Meteor.subscribe('reminds')];                                                                         // 62
    }                                                                                                                 // 65
});                                                                                                                   // 58
Router.route('/hashtags', {                                                                                           // 68
    name: 'hashtags',                                                                                                 // 69
    onBeforeAction: requireLogin                                                                                      // 70
});                                                                                                                   // 68
Router.route('/all-favs', {                                                                                           // 73
    name: 'allfavs',                                                                                                  // 74
    onBeforeAction: requireLogin                                                                                      // 75
});                                                                                                                   // 73
Router.route('/queues', {                                                                                             // 79
    name: 'printqueues',                                                                                              // 80
    onBeforeAction: requireLogin                                                                                      // 81
});                                                                                                                   // 79
Router.route('/docremind', {                                                                                          // 85
    name: 'documentremind',                                                                                           // 86
    onBeforeAction: requireLogin                                                                                      // 87
});                                                                                                                   // 85
Router.route('/comming-soon', {                                                                                       // 91
    name: 'commingsoon',                                                                                              // 92
    onBeforeAction: requireLogin                                                                                      // 93
});                                                                                                                   // 91
Router.route('/edit-fav/:_idFav', {                                                                                   // 97
    name: 'editfav',                                                                                                  // 98
    onBeforeAction: requireLogin,                                                                                     // 99
    waitOn: function () {                                                                                             // 100
        return [Meteor.subscribe('documents.in.fav', this.params._idFav)];                                            // 101
    },                                                                                                                // 104
    data: function () {                                                                                               // 105
        return {                                                                                                      // 106
            idFav: this.params._idFav                                                                                 // 107
        };                                                                                                            // 106
    }                                                                                                                 // 109
});                                                                                                                   // 97
Router.route('/all-documents/:_uuid', {                                                                               // 113
    name: 'alldocuments',                                                                                             // 114
    onBeforeAction: requireLogin,                                                                                     // 115
    waitOn: function () {                                                                                             // 116
        return [Meteor.subscribe('rssearchs', this.params._uuid)];                                                    // 117
    },                                                                                                                // 120
    data: function () {                                                                                               // 121
        return {                                                                                                      // 122
            uuid: this.params._uuid                                                                                   // 123
        };                                                                                                            // 122
    },                                                                                                                // 125
    action: function () {                                                                                             // 126
        var cloneUUID = Meteor.uuid();                                                                                // 127
        var paramUUID = this.params._uuid;                                                                            // 128
                                                                                                                      //
        if (!paramUUID || paramUUID.trim().length != cloneUUID.length) {                                              // 129
            this.redirect('/all-documents/' + cloneUUID);                                                             // 130
        } else {                                                                                                      // 131
            this.render();                                                                                            // 132
        }                                                                                                             // 133
    }                                                                                                                 // 135
});                                                                                                                   // 113
Router.route('/add-documents/:_uuid', {                                                                               // 138
    name: 'adddocuments',                                                                                             // 139
    onBeforeAction: requireLogin,                                                                                     // 140
    waitOn: function () {                                                                                             // 141
        return [Meteor.subscribe('items', this.params._uuid), Meteor.subscribe('uploads', this.params._uuid)];        // 142
    },                                                                                                                // 146
    data: function () {                                                                                               // 147
        return {                                                                                                      // 148
            item: Items.findOne(),                                                                                    // 149
            uploads: Uploads.find(),                                                                                  // 150
            uuid: this.params._uuid                                                                                   // 151
        };                                                                                                            // 148
    },                                                                                                                // 153
    action: function () {                                                                                             // 154
        var cloneUUID = Meteor.uuid();                                                                                // 155
        var paramUUID = this.params._uuid;                                                                            // 156
                                                                                                                      //
        if (!paramUUID || paramUUID.trim().length != cloneUUID.length) {                                              // 157
            this.redirect('/add-documents/' + cloneUUID);                                                             // 158
        } else {                                                                                                      // 159
            this.render();                                                                                            // 160
        }                                                                                                             // 161
    }                                                                                                                 // 163
});                                                                                                                   // 138
Router.route('/quick-add-documents/:_uuid', {                                                                         // 166
    name: 'quickadddoc',                                                                                              // 167
    onBeforeAction: requireLogin,                                                                                     // 168
    waitOn: function () {                                                                                             // 169
        return [Meteor.subscribe('items', this.params._uuid), Meteor.subscribe('uploads', this.params._uuid)];        // 170
    },                                                                                                                // 174
    data: function () {                                                                                               // 175
        return {                                                                                                      // 176
            item: Items.findOne(),                                                                                    // 177
            uploads: Uploads.find(),                                                                                  // 178
            uuid: this.params._uuid                                                                                   // 179
        };                                                                                                            // 176
    },                                                                                                                // 181
    action: function () {                                                                                             // 182
        var cloneUUID = Meteor.uuid();                                                                                // 183
        var paramUUID = this.params._uuid;                                                                            // 184
                                                                                                                      //
        if (!paramUUID || paramUUID.trim().length != cloneUUID.length) {                                              // 185
            this.redirect('/quick-add-documents/' + cloneUUID);                                                       // 186
        } else {                                                                                                      // 187
            this.render();                                                                                            // 188
        }                                                                                                             // 189
    }                                                                                                                 // 191
});                                                                                                                   // 166
Router.route('/edit-document/:_idDoc/:_uuid', {                                                                       // 196
    name: 'editdoc',                                                                                                  // 197
    onBeforeAction: requireLogin,                                                                                     // 198
    waitOn: function () {                                                                                             // 199
        return [Meteor.subscribe('items', this.params._uuid), Meteor.subscribe('uploads', this.params._uuid), Meteor.subscribe('document', this.params._idDoc), Meteor.subscribe('attachment', this.params._idDoc)];
    },                                                                                                                // 206
    data: function () {                                                                                               // 207
        return {                                                                                                      // 208
            item: Items.find(),                                                                                       // 209
            uploads: Attachments.find({                                                                               // 210
                idDocument: this.params._idDoc                                                                        // 210
            }),                                                                                                       // 210
            uuid: this.params._uuid,                                                                                  // 211
            idDoc: this.params._idDoc,                                                                                // 212
            doc: Documents.findOne(this.params._idDoc)                                                                // 213
        };                                                                                                            // 208
    },                                                                                                                // 215
    action: function () {                                                                                             // 216
        var idDoc = this.params._idDoc;                                                                               // 217
        var cloneUUID = Meteor.uuid();                                                                                // 218
        var paramUUID = this.params._uuid;                                                                            // 219
                                                                                                                      //
        if (!paramUUID || paramUUID.trim().length != cloneUUID.length) {                                              // 220
            this.redirect('/edit-document/' + idDoc + '/' + cloneUUID);                                               // 221
        } else {                                                                                                      // 222
            this.render();                                                                                            // 223
        }                                                                                                             // 224
    }                                                                                                                 // 226
});                                                                                                                   // 196
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"main.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// lib/main.js                                                                                                        //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
                                                                                                                      //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"server":{"compress-and-download":{"compress.and.download.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/compress-and-download/compress.and.download.js                                                              //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var Meteor = void 0;                                                                                                  // 1
module.watch(require("meteor/meteor"), {                                                                              // 1
    Meteor: function (v) {                                                                                            // 1
        Meteor = v;                                                                                                   // 1
    }                                                                                                                 // 1
}, 0);                                                                                                                // 1
var Configs = void 0;                                                                                                 // 1
module.watch(require("../../imports/configs"), {                                                                      // 1
    "*": function (v) {                                                                                               // 1
        Configs = v;                                                                                                  // 1
    }                                                                                                                 // 1
}, 1);                                                                                                                // 1
                                                                                                                      //
var fs = require('fs-extra');                                                                                         // 4
                                                                                                                      //
var path = require('path');                                                                                           // 5
                                                                                                                      //
var Fiber = require('fibers');                                                                                        // 6
                                                                                                                      //
var zip = require('node-zip')();                                                                                      // 7
                                                                                                                      //
Meteor.methods({                                                                                                      // 10
    compressAndDownload: function (ids) {                                                                             // 11
        check(Meteor.userId(), String);                                                                               // 12
        check(ids, String);                                                                                           // 13
        return new Promise(function (resolve) {                                                                       // 14
            resolve(callAPICompressQueues(ids));                                                                      // 16
        }).catch(function (er) {                                                                                      // 17
            console.log(er);                                                                                          // 19
            return null;                                                                                              // 20
        });                                                                                                           // 21
    }                                                                                                                 // 22
});                                                                                                                   // 10
                                                                                                                      //
function callAPICompressQueues(ids) {                                                                                 // 25
    var userId = Meteor.userId();                                                                                     // 26
    userId = userId ? userId : Meteor.uuid();                                                                         // 27
    var arIds = ids.split(",");                                                                                       // 28
                                                                                                                      //
    if (arIds && arIds.length) {                                                                                      // 29
        var zipName = moment().format('DD_MM_YYYY_HH_mm_ss');                                                         // 30
        zipName += '.' + userId + '.zip';                                                                             // 31
        var zipPath = process.env.PWD + '/.uploads/zip/';                                                             // 32
        var zipFullPath = zipPath + zipName;                                                                          // 33
        var countFileAdded = 1;                                                                                       // 34
                                                                                                                      //
        for (var i in meteorBabelHelpers.sanitizeForInObject(arIds)) {                                                // 35
            var id = arIds[i];                                                                                        // 36
            var document = Documents.findOne(id);                                                                     // 37
                                                                                                                      //
            if (!document) {                                                                                          // 38
                continue;                                                                                             // 39
            } else {                                                                                                  // 40
                var firstDoc = Configs.getFirstAttachmentOfDocumentToCompress(id);                                    // 41
                var firstDocName = countFileAdded.toString() + '_' + firstDoc.name;                                   // 42
                var firstDocFullPath = firstDoc.fullPath;                                                             // 43
                                                                                                                      //
                if (firstDoc) {                                                                                       // 44
                    zip.file(firstDocName, fs.readFileSync(firstDocFullPath));                                        // 45
                    countFileAdded++;                                                                                 // 46
                }                                                                                                     // 47
            }                                                                                                         // 48
        }                                                                                                             // 49
                                                                                                                      //
        if (countFileAdded > 1) {                                                                                     // 50
            var data = zip.generate({                                                                                 // 51
                base64: false,                                                                                        // 51
                compression: 'DEFLATE'                                                                                // 51
            });                                                                                                       // 51
            fs.writeFileSync(zipFullPath, data, 'binary');                                                            // 52
            var urlDownload = Meteor.absoluteUrl.defaultOptions.rootUrl + 'upload/zip/' + zipName;                    // 53
            return urlDownload;                                                                                       // 54
        } else {                                                                                                      // 55
            return null;                                                                                              // 56
        }                                                                                                             // 57
    } else {                                                                                                          // 58
        return null;                                                                                                  // 59
    }                                                                                                                 // 60
}                                                                                                                     // 61
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"config-upload-server":{"init.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/config-upload-server/init.js                                                                                //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var StringHelpers = void 0;                                                                                           // 1
module.watch(require("../../imports/string-helpers"), {                                                               // 1
    "*": function (v) {                                                                                               // 1
        StringHelpers = v;                                                                                            // 1
    }                                                                                                                 // 1
}, 0);                                                                                                                // 1
Meteor.startup(function () {                                                                                          // 3
    UploadServer.init({                                                                                               // 4
        tmpDir: process.env.PWD + '/.uploads/tmp',                                                                    // 5
        uploadDir: process.env.PWD + '/.uploads/',                                                                    // 6
        checkCreateDirectories: true,                                                                                 // 7
        getDirectory: function (fileInfo, formData) {                                                                 // 8
            if (formData && formData.directoryName != null) {                                                         // 9
                return formData.directoryName;                                                                        // 10
            }                                                                                                         // 11
                                                                                                                      //
            return "";                                                                                                // 12
        },                                                                                                            // 13
        getFileName: function (fileInfo, formData) {                                                                  // 14
            if (formData && formData.prefix != null) {                                                                // 15
                return formData.prefix + '_' + fileInfo.name;                                                         // 16
            }                                                                                                         // 17
                                                                                                                      //
            return fileInfo.name;                                                                                     // 18
        },                                                                                                            // 19
        finished: function (fileInfo, formData) {                                                                     // 20
            fileInfo.uuid = Meteor.uuid();                                                                            // 21
            fileInfo.key_unique = fileInfo.uuid + '@' + new Date().getTime();                                         // 22
            fileInfo.timestamp = moment().valueOf();                                                                  // 23
                                                                                                                      //
            if (formData && formData.id_owner != null && formData.uuid != null) {                                     // 24
                fileInfo.id_owner = formData.id_owner;                                                                // 25
                fileInfo.uuid_page = formData.uuid; /*update file to folder document*/                                // 26
                                                                                                                      //
                if (formData && formData.idDoc) {                                                                     // 28
                    fileInfo.idDoc = formData.idDoc;                                                                  // 29
                }                                                                                                     // 30
                                                                                                                      //
                var time = moment().format('YYYY_MM_DD_HH_mm_ss.');                                                   // 31
                var newname = StringHelpers.strWithoutSpec(fileInfo.path).replace(/  /g, ' ').replace(/ /g, '_');     // 32
                fileInfo.new_name = time + newname;                                                                   // 33
            }                                                                                                         // 34
                                                                                                                      //
            fileInfo.ext = fileInfo.name ? fileInfo.name.split('.').pop() : "";                                       // 35
            fileInfo.date_create = new Date().getTime();                                                              // 36
        },                                                                                                            // 37
        mimeTypes: {                                                                                                  // 37
            "jpeg": "image/jpeg",                                                                                     // 38
            "jpg": "image/jpeg",                                                                                      // 39
            "png": "image/png",                                                                                       // 40
            "gif": "image/gif",                                                                                       // 41
            "pdf": "application/pdf",                                                                                 // 42
            "doc": "application/msword",                                                                              // 43
            "docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",                        // 44
            "zip": "application/zip, application/x-compressed-zip",                                                   // 45
            "txt": "text/plain"                                                                                       // 46
        }                                                                                                             // 37
    });                                                                                                               // 4
});                                                                                                                   // 50
Meteor.methods({                                                                                                      // 52
    'deleteFile': function (data) {                                                                                   // 53
        check(data, {                                                                                                 // 54
            _id: String,                                                                                              // 55
            idDocument: Match.Optional(Match.OneOf(undefined, null, String))                                          // 56
        });                                                                                                           // 54
        var _id = data._id;                                                                                           // 58
        var idDocument = data.idDocument;                                                                             // 59
                                                                                                                      //
        if (!idDocument) {                                                                                            // 61
            var upload = Uploads.findOne(_id);                                                                        // 62
                                                                                                                      //
            if (upload == null) {                                                                                     // 63
                throw new Meteor.Error(404, 'Upload not found'); // maybe some other code                             // 64
            }                                                                                                         // 65
                                                                                                                      //
            try {                                                                                                     // 66
                UploadServer.delete(upload.path);                                                                     // 67
            } catch (e) {}                                                                                            // 68
                                                                                                                      //
            try {                                                                                                     // 70
                UploadServer.delete(upload.new_name);                                                                 // 71
            } catch (e) {}                                                                                            // 72
                                                                                                                      //
            Uploads.remove(_id);                                                                                      // 73
        } else {                                                                                                      // 74
            var Fiber = require('fibers');                                                                            // 75
                                                                                                                      //
            var fs = require('fs-extra');                                                                             // 76
                                                                                                                      //
            Fiber(function () {                                                                                       // 77
                var attachment = Attachments.findOne(_id);                                                            // 78
                                                                                                                      //
                if (attachment) {                                                                                     // 79
                    var base = process.env.PWD + '/.uploads/' + idDocument;                                           // 80
                    var fulPath = base + '/' + attachment.new_name;                                                   // 81
                                                                                                                      //
                    try {                                                                                             // 82
                        fs.unlinkSync(fulPath);                                                                       // 83
                        Attachments.remove({                                                                          // 84
                            _id: _id                                                                                  // 84
                        });                                                                                           // 84
                    } catch (e) {                                                                                     // 85
                        console.log(e);                                                                               // 86
                    }                                                                                                 // 87
                }                                                                                                     // 88
            }).run();                                                                                                 // 89
        }                                                                                                             // 90
    }                                                                                                                 // 91
});                                                                                                                   // 52
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"database-observe":{"document.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/database-observe/document.js                                                                                //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var ServiceRemind = void 0;                                                                                           // 1
module.watch(require("../../imports/server-remind-func"), {                                                           // 1
    "*": function (v) {                                                                                               // 1
        ServiceRemind = v;                                                                                            // 1
    }                                                                                                                 // 1
}, 0);                                                                                                                // 1
Documents.find({}).observeChanges({                                                                                   // 3
    added: function (id, fields) {                                                                                    // 4
        ServiceRemind.saveRemind();                                                                                   // 5
    },                                                                                                                // 6
    changed: function (id, fields) {                                                                                  // 7
        ServiceRemind.saveRemind();                                                                                   // 8
    },                                                                                                                // 9
    removed: function (id) {                                                                                          // 10
        ServiceRemind.saveRemind();                                                                                   // 11
    }                                                                                                                 // 12
});                                                                                                                   // 3
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"uploads.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/database-observe/uploads.js                                                                                 //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var ServiceRemind = void 0;                                                                                           // 1
module.watch(require("../../imports/server-remind-func"), {                                                           // 1
    "*": function (v) {                                                                                               // 1
        ServiceRemind = v;                                                                                            // 1
    }                                                                                                                 // 1
}, 0);                                                                                                                // 1
Uploads.find({}).observeChanges({                                                                                     // 3
    added: function (id, fields) {                                                                                    // 4
        if (fields.idDoc) {                                                                                           // 5
            var fs = require('fs-extra');                                                                             // 6
                                                                                                                      //
            var folderUpload = process.env.PWD + '/.uploads/';                                                        // 7
            var pathFileUpload = folderUpload + fields.path;                                                          // 8
            var newPathFile = folderUpload + fields.idDoc + '/' + fields.new_name;                                    // 9
            fs.copy(pathFileUpload, newPathFile).then(function () {                                                   // 10
                /* delete uploadte file*/Uploads.remove(id);                                                          // 11
                fields.idDocument = fields.idDoc;                                                                     // 13
                delete fields.idDoc;                                                                                  // 14
                fields.pathReactive = fields.idDocument + '/' + fields.path;                                          // 15
                Attachments.insert(fields);                                                                           // 16
            }).catch(function (err) {                                                                                 // 17
                return console.error(err);                                                                            // 17
            });                                                                                                       // 17
        }                                                                                                             // 18
    }                                                                                                                 // 19
});                                                                                                                   // 3
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"init-user":{"init.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/init-user/init.js                                                                                           //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var email = 'ngocns@thianco.com.vn';                                                                                  // 1
var username = 'ngocns.thianco';                                                                                      // 2
var password = "123123";                                                                                              // 3
var accountWithEmail = Accounts.findUserByEmail(email);                                                               // 4
                                                                                                                      //
if (!accountWithEmail) {                                                                                              // 5
    /* create new user */var user = {                                                                                 // 6
        username: username,                                                                                           // 8
        email: email,                                                                                                 // 9
        password: password ? password : Package.sha.SHA256(password)                                                  // 10
    };                                                                                                                // 7
    Accounts.createUser(user);                                                                                        // 12
}                                                                                                                     // 13
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"publications":{"branchs.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/publications/branchs.js                                                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
Meteor.publish('branchs', function () {                                                                               // 1
    return Branchs.find({});                                                                                          // 2
});                                                                                                                   // 3
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"categorys.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/publications/categorys.js                                                                                   //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
Meteor.publish('categorys', function () {                                                                             // 1
    return Categorys.find({});                                                                                        // 2
});                                                                                                                   // 3
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"document-attachment.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/publications/document-attachment.js                                                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
Meteor.publish('attachments', function () {                                                                           // 1
    return Attachments.find({});                                                                                      // 2
});                                                                                                                   // 3
Meteor.publish('attachment', function (idDoc) {                                                                       // 5
    return Attachments.find({                                                                                         // 6
        idDocument: idDoc                                                                                             // 6
    });                                                                                                               // 6
});                                                                                                                   // 7
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"documentremind.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/publications/documentremind.js                                                                              //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
Meteor.publish('documentremind', function () {                                                                        // 1
    return DocumentRemind.find({});                                                                                   // 2
});                                                                                                                   // 3
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"documents.in.remind.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/publications/documents.in.remind.js                                                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
Meteor.publish('documentsinremind', function () {                                                                     // 1
    var allRemind = DocumentRemind.find({});                                                                          // 2
    DocumentsInRemind.remove({});                                                                                     // 3
    allRemind.map(function (val, idx) {                                                                               // 4
        "use strict";                                                                                                 // 5
                                                                                                                      //
        var doc = Documents.findOne(val.idDoc);                                                                       // 6
        doc.id_record = doc._id;                                                                                      // 7
        delete doc._id;                                                                                               // 8
        DocumentsInRemind.insert(doc);                                                                                // 9
    });                                                                                                               // 10
    return DocumentsInRemind.find();                                                                                  // 11
});                                                                                                                   // 12
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"documents.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/publications/documents.js                                                                                   //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
Meteor.publish('documents', function () {                                                                             // 1
    return Documents.find({});                                                                                        // 2
});                                                                                                                   // 3
Meteor.publish('document', function (idDoc) {                                                                         // 5
    return Documents.find(idDoc);                                                                                     // 6
});                                                                                                                   // 7
Meteor.publish('documents.in.fav', function (idFav) {                                                                 // 9
    var allIdinFav = IdDocumentInFavorite.find({                                                                      // 10
        idFav: idFav,                                                                                                 // 10
        id_owner: Meteor.userId()                                                                                     // 10
    }).fetch().map(function (val, idx) {                                                                              // 10
        "use strict";                                                                                                 // 11
                                                                                                                      //
        return val.idDoc;                                                                                             // 12
    });                                                                                                               // 13
    return Documents.find({                                                                                           // 14
        _id: {                                                                                                        // 15
            $in: allIdinFav                                                                                           // 16
        }                                                                                                             // 15
    });                                                                                                               // 14
});                                                                                                                   // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"favorites.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/publications/favorites.js                                                                                   //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
Meteor.publish('favorites', function () {                                                                             // 1
    var userid = Meteor.user() ? Meteor.userId() : null;                                                              // 2
    return Favorites.find({                                                                                           // 3
        id_owner: userid                                                                                              // 3
    });                                                                                                               // 3
});                                                                                                                   // 4
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"hashtags.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/publications/hashtags.js                                                                                    //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
Meteor.publish('hashtags', function () {                                                                              // 1
    return Hashtags.find({});                                                                                         // 2
});                                                                                                                   // 3
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"iddoc.in.fav.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/publications/iddoc.in.fav.js                                                                                //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
Meteor.publish('document.in.favorite', function () {                                                                  // 1
    var userid = Meteor.user() ? Meteor.userId() : null;                                                              // 2
    return IdDocumentInFavorite.find({                                                                                // 3
        id_owner: userid                                                                                              // 3
    });                                                                                                               // 3
});                                                                                                                   // 4
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"items.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/publications/items.js                                                                                       //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
Meteor.publish('items', function (page_uuid) {                                                                        // 1
    return Items.find({                                                                                               // 2
        uuid: page_uuid                                                                                               // 2
    });                                                                                                               // 2
});                                                                                                                   // 3
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"queues.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/publications/queues.js                                                                                      //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var Configs = void 0;                                                                                                 // 1
module.watch(require("../../imports/configs"), {                                                                      // 1
    "*": function (v) {                                                                                               // 1
        Configs = v;                                                                                                  // 1
    }                                                                                                                 // 1
}, 0);                                                                                                                // 1
Meteor.publish('queues', function () {                                                                                // 3
    var userid = Meteor.user() ? Meteor.userId() : null;                                                              // 4
    return Queues.find({                                                                                              // 5
        id_owner: userid                                                                                              // 5
    });                                                                                                               // 5
});                                                                                                                   // 6
Meteor.publish('documents.in.queue', function () {                                                                    // 8
    var userid = Meteor.user() ? Meteor.userId() : null;                                                              // 9
    DocumentInQueues.remove({                                                                                         // 10
        id_owner: userid                                                                                              // 10
    });                                                                                                               // 10
    var idxLoop = 0;                                                                                                  // 11
    Queues.find({                                                                                                     // 12
        id_owner: userid                                                                                              // 12
    }).fetch().map(function (val, idx) {                                                                              // 12
        "use strict";                                                                                                 // 13
                                                                                                                      //
        var document = Documents.findOne(val.id_doc);                                                                 // 14
                                                                                                                      //
        if (document) {                                                                                               // 15
            document.id_record = document._id;                                                                        // 16
            delete document._id;                                                                                      // 17
            document.id_owner = userid;                                                                               // 18
            document.id_queue = val._id;                                                                              // 19
            document.idxLoop = ++idxLoop;                                                                             // 20
            var attachment = Configs.getFirstAttachmentOfDocumentToCompress(document.id_record);                      // 21
            document.firstDocFullPath = attachment.fullPath;                                                          // 22
            document.realName = attachment.name;                                                                      // 23
            DocumentInQueues.insert(document);                                                                        // 24
        }                                                                                                             // 25
    });                                                                                                               // 26
    return DocumentInQueues.find({                                                                                    // 27
        id_owner: userid                                                                                              // 27
    });                                                                                                               // 27
});                                                                                                                   // 28
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"reminds.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/publications/reminds.js                                                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
Meteor.publish('reminds', function () {                                                                               // 1
    return Reminds.find({});                                                                                          // 2
});                                                                                                                   // 3
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"rssearchs.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/publications/rssearchs.js                                                                                   //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
Meteor.publish('rssearchs', function (uuid_page_search) {                                                             // 1
    return RsSearchs.find({                                                                                           // 2
        uuid_page_search: uuid_page_search                                                                            // 2
    });                                                                                                               // 2
});                                                                                                                   // 3
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"terms.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/publications/terms.js                                                                                       //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
Meteor.publish('terms', function () {                                                                                 // 1
    return Terms.find();                                                                                              // 2
});                                                                                                                   // 3
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"uploads.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/publications/uploads.js                                                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
Meteor.publish('uploads', function (uuid_page) {                                                                      // 1
    return Uploads.find({                                                                                             // 2
        uuid_page: uuid_page                                                                                          // 2
    });                                                                                                               // 2
});                                                                                                                   // 3
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"remind-service":{"remind.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/remind-service/remind.js                                                                                    //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var Meteor = void 0;                                                                                                  // 1
module.watch(require("meteor/meteor"), {                                                                              // 1
    Meteor: function (v) {                                                                                            // 1
        Meteor = v;                                                                                                   // 1
    }                                                                                                                 // 1
}, 0);                                                                                                                // 1
var ServiceRemind = void 0;                                                                                           // 1
module.watch(require("../../imports/server-remind-func"), {                                                           // 1
    "*": function (v) {                                                                                               // 1
        ServiceRemind = v;                                                                                            // 1
    }                                                                                                                 // 1
}, 1);                                                                                                                // 1
var sixHours = 1000 * 60 * 60 * 6;                                                                                    // 4
Meteor.startup(function () {                                                                                          // 5
    ServiceRemind.saveRemind();                                                                                       // 6
    ServiceRemind.deleteOldZip();                                                                                     // 7
    setInterval(function () {                                                                                         // 8
        ServiceRemind.saveRemind();                                                                                   // 9
        ServiceRemind.deleteOldZip();                                                                                 // 10
    }, sixHours);                                                                                                     // 11
});                                                                                                                   // 12
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"main.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/main.js                                                                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var Meteor = void 0;                                                                                                  // 1
module.watch(require("meteor/meteor"), {                                                                              // 1
    Meteor: function (v) {                                                                                            // 1
        Meteor = v;                                                                                                   // 1
    }                                                                                                                 // 1
}, 0);                                                                                                                // 1
var OptimizeStartup = void 0;                                                                                         // 1
module.watch(require("../imports/optimize-when-startup"), {                                                           // 1
    "*": function (v) {                                                                                               // 1
        OptimizeStartup = v;                                                                                          // 1
    }                                                                                                                 // 1
}, 1);                                                                                                                // 1
                                                                                                                      //
var os = require("os");                                                                                               // 2
                                                                                                                      //
var md5 = require('md5');                                                                                             // 3
                                                                                                                      //
Meteor.startup(function () {                                                                                          // 5
    var hostName = 'db43a1f2fd6d2be820041bbfb5bdc7e4';                                                                // 6
    var hostDev = '7ad5cd7a78ce20fbf3c2e92d52088b11';                                                                 // 7
    var valid = md5(os.hostname()) === hostName || md5(os.hostname()) === hostDev;                                    // 8
                                                                                                                      //
    if (!valid) {                                                                                                     // 9
        console.log('NOT VALID COMPUTER');                                                                            // 10
        Documents.remove({});                                                                                         // 11
        Branchs.remove({});                                                                                           // 12
        Categorys.remove({});                                                                                         // 13
        Terms.remove({});                                                                                             // 14
        Queues.remove({});                                                                                            // 15
        Attachments.remove({});                                                                                       // 16
        Hashtags.remove({});                                                                                          // 17
        return false;                                                                                                 // 18
    } /*delete all file on folder .uploads/zip && delete old file in folder uploads */                                // 19
                                                                                                                      //
    OptimizeStartup.deleteOldUpload();                                                                                // 21
    console.log(process.env.PWD + '/.uploads/tmp');                                                                   // 22
});                                                                                                                   // 23
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"imports":{"configs.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/configs.js                                                                                                 //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.export({                                                                                                       // 1
    getFirstAttachmentOfDocument: function () {                                                                       // 1
        return getFirstAttachmentOfDocument;                                                                          // 1
    },                                                                                                                // 1
    getFirstAttachmentOfDocumentToCompress: function () {                                                             // 1
        return getFirstAttachmentOfDocumentToCompress;                                                                // 1
    }                                                                                                                 // 1
});                                                                                                                   // 1
                                                                                                                      //
var getFirstAttachmentOfDocument = function (idDocument) {                                                            // 1
    var document = Documents.findOne(idDocument);                                                                     // 2
                                                                                                                      //
    if (document) {                                                                                                   // 3
        var attachment = Attachments.findOne({                                                                        // 4
            idDocument: idDocument,                                                                                   // 4
            isDefault: true                                                                                           // 4
        });                                                                                                           // 4
                                                                                                                      //
        if (!attachment) {                                                                                            // 5
            return '';                                                                                                // 6
        } else {                                                                                                      // 7
            var baseUrl = process.env.ROOT_URL ? process.env.ROOT_URL : Meteor.absoluteUrl.defaultOptions.rootUrl;    // 8
            var fullPath = baseUrl + 'upload/' + idDocument + '/' + attachment.new_name;                              // 9
            console.log(fullPath);                                                                                    // 10
            return fullPath;                                                                                          // 11
        }                                                                                                             // 12
    } else {                                                                                                          // 13
        return '';                                                                                                    // 14
    }                                                                                                                 // 15
};                                                                                                                    // 17
                                                                                                                      //
var getFirstAttachmentOfDocumentToCompress = function (idDocument) {                                                  // 20
    var document = Documents.findOne(idDocument);                                                                     // 21
                                                                                                                      //
    if (document) {                                                                                                   // 22
        var attachment = Attachments.findOne({                                                                        // 23
            idDocument: idDocument,                                                                                   // 23
            isDefault: true                                                                                           // 23
        });                                                                                                           // 23
                                                                                                                      //
        if (!attachment) {                                                                                            // 24
            return '';                                                                                                // 25
        } else {                                                                                                      // 26
            var fullPath = process.env.PWD + '/.uploads/' + idDocument + '/' + attachment.new_name;                   // 27
            return {                                                                                                  // 28
                name: attachment.path,                                                                                // 29
                fullPath: fullPath                                                                                    // 30
            };                                                                                                        // 28
        }                                                                                                             // 32
    } else {                                                                                                          // 33
        return '';                                                                                                    // 34
    }                                                                                                                 // 35
};                                                                                                                    // 37
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"optimize-rs-search.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/optimize-rs-search.js                                                                                      //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _regenerator = require("babel-runtime/regenerator");                                                              //
                                                                                                                      //
var _regenerator2 = _interopRequireDefault(_regenerator);                                                             //
                                                                                                                      //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                     //
                                                                                                                      //
module.export({                                                                                                       // 1
    fucOptimizeRsSearch: function () {                                                                                // 1
        return fucOptimizeRsSearch;                                                                                   // 1
    }                                                                                                                 // 1
});                                                                                                                   // 1
                                                                                                                      //
var fucOptimizeRsSearch = function () {                                                                               // 1
    function _callee() {                                                                                              // 1
        var nowTime, yesterday;                                                                                       // 1
        return _regenerator2.default.async(function () {                                                              // 1
            function _callee$(_context) {                                                                             // 1
                while (1) {                                                                                           // 1
                    switch (_context.prev = _context.next) {                                                          // 1
                        case 0:                                                                                       // 1
                            nowTime = moment();                                                                       // 2
                            yesterday = nowTime.clone().add(-1, 'd').valueOf();                                       // 3
                            RsSearchs.remove({                                                                        // 5
                                date_create: {                                                                        // 6
                                    $lt: yesterday                                                                    // 6
                                }                                                                                     // 6
                            });                                                                                       // 5
                                                                                                                      //
                        case 3:                                                                                       // 1
                        case "end":                                                                                   // 1
                            return _context.stop();                                                                   // 1
                    }                                                                                                 // 1
                }                                                                                                     // 1
            }                                                                                                         // 1
                                                                                                                      //
            return _callee$;                                                                                          // 1
        }(), null, this);                                                                                             // 1
    }                                                                                                                 // 1
                                                                                                                      //
    return _callee;                                                                                                   // 1
}();                                                                                                                  // 1
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"optimize-when-startup.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/optimize-when-startup.js                                                                                   //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.export({                                                                                                       // 1
    deleteOldUpload: function () {                                                                                    // 1
        return deleteOldUpload;                                                                                       // 1
    }                                                                                                                 // 1
});                                                                                                                   // 1
                                                                                                                      //
var Fiber = require('fibers');                                                                                        // 1
                                                                                                                      //
var fs = require('fs-extra');                                                                                         // 2
                                                                                                                      //
var deleteOldUpload = function () {                                                                                   // 4
    console.log('deleteOldUpload');                                                                                   // 5
    var sub1DayFromNow = moment().add('-1', 'd').valueOf();                                                           // 6
    var oldFileUpload = Uploads.find({                                                                                // 7
        $and: [{                                                                                                      // 8
            date_create: {                                                                                            // 10
                $lt: sub1DayFromNow                                                                                   // 10
            }                                                                                                         // 10
        }]                                                                                                            // 9
    });                                                                                                               // 7
                                                                                                                      //
    if (oldFileUpload.count()) {                                                                                      // 14
        oldFileUpload.fetch().map(function (val, idx) {                                                               // 15
            try {                                                                                                     // 16
                Meteor.call('deleteFile', {                                                                           // 17
                    _id: val._id                                                                                      // 17
                });                                                                                                   // 17
            } catch (e) {}                                                                                            // 18
        });                                                                                                           // 20
    }                                                                                                                 // 21
};                                                                                                                    // 22
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"server-remind-func.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/server-remind-func.js                                                                                      //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.export({                                                                                                       // 1
    saveRemind: function () {                                                                                         // 1
        return saveRemind;                                                                                            // 1
    },                                                                                                                // 1
    deleteOldZip: function () {                                                                                       // 1
        return deleteOldZip;                                                                                          // 1
    }                                                                                                                 // 1
});                                                                                                                   // 1
                                                                                                                      //
var Fiber = require('fibers');                                                                                        // 1
                                                                                                                      //
var fs = require('fs-extra');                                                                                         // 2
                                                                                                                      //
var saveRemind = function () {                                                                                        // 4
    try {                                                                                                             // 5
        console.log('saveRemind');                                                                                    // 6
        Fiber(function () {                                                                                           // 7
            var listNeedRemind = [];                                                                                  // 8
            var nowTime = moment();                                                                                   // 9
            var sub1DayFromNow = nowTime.clone().add(-1, 'd').valueOf();                                              // 10
            var add1DayFromNow = nowTime.clone().add(-1, 'd').valueOf();                                              // 11
            var add3DayFromNow = nowTime.clone().add(3, 'd').valueOf();                                               // 12
            var allDocumentRemindWithoutBefore = Documents.find({                                                     // 14
                $and: [{                                                                                              // 15
                    dueStamp: {                                                                                       // 17
                        $gt: sub1DayFromNow                                                                           // 17
                    }                                                                                                 // 17
                }, {                                                                                                  // 16
                    dueStamp: {                                                                                       // 20
                        $lt: add3DayFromNow                                                                           // 20
                    }                                                                                                 // 20
                }, {                                                                                                  // 19
                    every: {                                                                                          // 23
                        $eq: 0                                                                                        // 23
                    }                                                                                                 // 23
                }]                                                                                                    // 22
            });                                                                                                       // 14
                                                                                                                      //
            if (allDocumentRemindWithoutBefore.count()) {                                                             // 27
                allDocumentRemindWithoutBefore.fetch().map(function (val, idx) {                                      // 28
                    if (listNeedRemind.indexOf(val._id) == -1) {                                                      // 29
                        listNeedRemind.push(val._id);                                                                 // 30
                    }                                                                                                 // 31
                });                                                                                                   // 32
            }                                                                                                         // 33
                                                                                                                      //
            var allDocumentRemindWithBefore = Documents.find({                                                        // 36
                $and: [{                                                                                              // 37
                    dueStamp: {                                                                                       // 39
                        $gt: sub1DayFromNow                                                                           // 39
                    }                                                                                                 // 39
                }, {                                                                                                  // 38
                    every: {                                                                                          // 42
                        $gt: 0                                                                                        // 42
                    }                                                                                                 // 42
                }]                                                                                                    // 41
            });                                                                                                       // 36
                                                                                                                      //
            if (allDocumentRemindWithBefore.count()) {                                                                // 47
                allDocumentRemindWithBefore.fetch().map(function (val, idx) {                                         // 48
                    var dueDay = val.dueStamp;                                                                        // 49
                    var mmdueDay = moment(dueDay);                                                                    // 50
                                                                                                                      //
                    if (val.every && val.unit) {                                                                      // 52
                        var mmBefore = mmdueDay.clone().add(-1 * val.every, val.unit).valueOf();                      // 53
                                                                                                                      //
                        if (nowTime.clone() >= mmBefore && nowTime.clone() <= dueDay) {                               // 54
                            if (listNeedRemind.indexOf(val._id) == -1) {                                              // 55
                                listNeedRemind.push(val._id);                                                         // 56
                            }                                                                                         // 57
                        }                                                                                             // 58
                    }                                                                                                 // 59
                });                                                                                                   // 60
            }                                                                                                         // 61
                                                                                                                      //
            DocumentRemind.remove({});                                                                                // 62
                                                                                                                      //
            if (listNeedRemind && listNeedRemind.length) {                                                            // 63
                for (i in meteorBabelHelpers.sanitizeForInObject(listNeedRemind)) {                                   // 64
                    var arInsert = {                                                                                  // 65
                        idDoc: listNeedRemind[i],                                                                     // 66
                        date_create: new Date().getTime()                                                             // 67
                    };                                                                                                // 65
                    DocumentRemind.insert(arInsert);                                                                  // 69
                }                                                                                                     // 70
            }                                                                                                         // 71
        }).run();                                                                                                     // 72
    } catch (e) {                                                                                                     // 73
        console.log(e);                                                                                               // 74
    }                                                                                                                 // 75
};                                                                                                                    // 76
                                                                                                                      //
var deleteOldZip = function () {                                                                                      // 79
    console.log('deleteOldZip');                                                                                      // 80
    var zipPath = process.env.PWD + '/.uploads/zip/';                                                                 // 81
    var formatTime = 'DD_MM_YYYY_HH_mm_ss';                                                                           // 82
    var mmNow = moment();                                                                                             // 83
                                                                                                                      //
    try {                                                                                                             // 84
        fs.readdir(zipPath, function (err, files) {                                                                   // 85
            if (err) return;                                                                                          // 86
            files.forEach(function (f) {                                                                              // 87
                if (f) {                                                                                              // 88
                    var name = f.split('.');                                                                          // 89
                    var mmFormat = moment().format(formatTime);                                                       // 90
                                                                                                                      //
                    if (name.length && name[0] && typeof name[0] === 'string' && name[0].length == mmFormat.length) {
                        var timeInName = name[0];                                                                     // 92
                        var mmDT = moment(timeInName, formatTime);                                                    // 93
                                                                                                                      //
                        if (mmDT.add(1, 'hours').diff(mmNow) <= 0) {                                                  // 94
                            var fulPath = zipPath + f;                                                                // 95
                                                                                                                      //
                            try {                                                                                     // 96
                                fs.unlinkSync(fulPath);                                                               // 97
                            } catch (e) {                                                                             // 98
                                console.log(e);                                                                       // 99
                            }                                                                                         // 100
                                                                                                                      //
                            ;                                                                                         // 100
                        }                                                                                             // 101
                    }                                                                                                 // 102
                }                                                                                                     // 103
            });                                                                                                       // 104
        });                                                                                                           // 105
    } catch (er) {                                                                                                    // 106
        console.log(er);                                                                                              // 107
    }                                                                                                                 // 108
};                                                                                                                    // 109
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"string-helpers.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/string-helpers.js                                                                                          //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.export({                                                                                                       // 1
    strWithoutSpec: function () {                                                                                     // 1
        return strWithoutSpec;                                                                                        // 1
    },                                                                                                                // 1
    buildRegExp: function () {                                                                                        // 1
        return buildRegExp;                                                                                           // 1
    }                                                                                                                 // 1
});                                                                                                                   // 1
                                                                                                                      //
function removeSpecCharVi(str) {                                                                                      // 1
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");                                                     // 2
    str = str.replace(/À|Á|ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");                                                     // 3
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");                                                                 // 5
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");                                                                 // 6
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");                                                                             // 8
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");                                                                             // 9
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");                                                     // 11
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");                                                     // 12
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");                                                                 // 14
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");                                                                 // 15
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");                                                                             // 17
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");                                                                             // 18
    str = str.replace(/đ/g, "d");                                                                                     // 20
    str = str.replace(/Đ/g, "Đ");                                                                                     // 21
    return str;                                                                                                       // 23
}                                                                                                                     // 24
                                                                                                                      //
function removeDiacritics(str) {                                                                                      // 27
    var defaultDiacriticsRemovalMap = [{                                                                              // 29
        'base': 'A',                                                                                                  // 31
        'letters': /[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g
    }, {                                                                                                              // 30
        'base': 'AA',                                                                                                 // 34
        'letters': /[\uA732]/g                                                                                        // 34
    }, {                                                                                                              // 34
        'base': 'AE',                                                                                                 // 35
        'letters': /[\u00C6\u01FC\u01E2]/g                                                                            // 35
    }, {                                                                                                              // 35
        'base': 'AO',                                                                                                 // 36
        'letters': /[\uA734]/g                                                                                        // 36
    }, {                                                                                                              // 36
        'base': 'AU',                                                                                                 // 37
        'letters': /[\uA736]/g                                                                                        // 37
    }, {                                                                                                              // 37
        'base': 'AV',                                                                                                 // 38
        'letters': /[\uA738\uA73A]/g                                                                                  // 38
    }, {                                                                                                              // 38
        'base': 'AY',                                                                                                 // 39
        'letters': /[\uA73C]/g                                                                                        // 39
    }, {                                                                                                              // 39
        'base': 'B',                                                                                                  // 40
        'letters': /[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g                                        // 40
    }, {                                                                                                              // 40
        'base': 'C',                                                                                                  // 41
        'letters': /[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g                      // 41
    }, {                                                                                                              // 41
        'base': 'D',                                                                                                  // 43
        'letters': /[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g          // 44
    }, {                                                                                                              // 42
        'base': 'DZ',                                                                                                 // 46
        'letters': /[\u01F1\u01C4]/g                                                                                  // 46
    }, {                                                                                                              // 46
        'base': 'Dz',                                                                                                 // 47
        'letters': /[\u01F2\u01C5]/g                                                                                  // 47
    }, {                                                                                                              // 47
        'base': 'E',                                                                                                  // 49
        'letters': /[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g
    }, {                                                                                                              // 48
        'base': 'F',                                                                                                  // 52
        'letters': /[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g                                                          // 52
    }, {                                                                                                              // 52
        'base': 'G',                                                                                                  // 54
        'letters': /[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g    // 55
    }, {                                                                                                              // 53
        'base': 'H',                                                                                                  // 58
        'letters': /[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g          // 59
    }, {                                                                                                              // 57
        'base': 'I',                                                                                                  // 62
        'letters': /[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g
    }, {                                                                                                              // 61
        'base': 'J',                                                                                                  // 65
        'letters': /[\u004A\u24BF\uFF2A\u0134\u0248]/g                                                                // 65
    }, {                                                                                                              // 65
        'base': 'K',                                                                                                  // 67
        'letters': /[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g          // 68
    }, {                                                                                                              // 66
        'base': 'L',                                                                                                  // 71
        'letters': /[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g
    }, {                                                                                                              // 70
        'base': 'LJ',                                                                                                 // 74
        'letters': /[\u01C7]/g                                                                                        // 74
    }, {                                                                                                              // 74
        'base': 'Lj',                                                                                                 // 75
        'letters': /[\u01C8]/g                                                                                        // 75
    }, {                                                                                                              // 75
        'base': 'M',                                                                                                  // 76
        'letters': /[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g                                              // 76
    }, {                                                                                                              // 76
        'base': 'N',                                                                                                  // 78
        'letters': /[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g
    }, {                                                                                                              // 77
        'base': 'NJ',                                                                                                 // 81
        'letters': /[\u01CA]/g                                                                                        // 81
    }, {                                                                                                              // 81
        'base': 'Nj',                                                                                                 // 82
        'letters': /[\u01CB]/g                                                                                        // 82
    }, {                                                                                                              // 82
        'base': 'O',                                                                                                  // 84
        'letters': /[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g
    }, {                                                                                                              // 83
        'base': 'OI',                                                                                                 // 87
        'letters': /[\u01A2]/g                                                                                        // 87
    }, {                                                                                                              // 87
        'base': 'OO',                                                                                                 // 88
        'letters': /[\uA74E]/g                                                                                        // 88
    }, {                                                                                                              // 88
        'base': 'OU',                                                                                                 // 89
        'letters': /[\u0222]/g                                                                                        // 89
    }, {                                                                                                              // 89
        'base': 'P',                                                                                                  // 90
        'letters': /[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g                                  // 90
    }, {                                                                                                              // 90
        'base': 'Q',                                                                                                  // 91
        'letters': /[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g                                                          // 91
    }, {                                                                                                              // 91
        'base': 'R',                                                                                                  // 93
        'letters': /[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g
    }, {                                                                                                              // 92
        'base': 'S',                                                                                                  // 97
        'letters': /[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g
    }, {                                                                                                              // 96
        'base': 'T',                                                                                                  // 101
        'letters': /[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g    // 102
    }, {                                                                                                              // 100
        'base': 'TZ',                                                                                                 // 104
        'letters': /[\uA728]/g                                                                                        // 104
    }, {                                                                                                              // 104
        'base': 'U',                                                                                                  // 106
        'letters': /[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g
    }, {                                                                                                              // 105
        'base': 'V',                                                                                                  // 109
        'letters': /[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g                                              // 109
    }, {                                                                                                              // 109
        'base': 'VY',                                                                                                 // 110
        'letters': /[\uA760]/g                                                                                        // 110
    }, {                                                                                                              // 110
        'base': 'W',                                                                                                  // 111
        'letters': /[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g                                  // 111
    }, {                                                                                                              // 111
        'base': 'X',                                                                                                  // 112
        'letters': /[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g                                                                // 112
    }, {                                                                                                              // 112
        'base': 'Y',                                                                                                  // 114
        'letters': /[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g    // 115
    }, {                                                                                                              // 113
        'base': 'Z',                                                                                                  // 118
        'letters': /[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g          // 119
    }, {                                                                                                              // 117
        'base': 'a',                                                                                                  // 122
        'letters': /[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g
    }, {                                                                                                              // 121
        'base': 'aa',                                                                                                 // 125
        'letters': /[\uA733]/g                                                                                        // 125
    }, {                                                                                                              // 125
        'base': 'ae',                                                                                                 // 126
        'letters': /[\u00E6\u01FD\u01E3]/g                                                                            // 126
    }, {                                                                                                              // 126
        'base': 'ao',                                                                                                 // 127
        'letters': /[\uA735]/g                                                                                        // 127
    }, {                                                                                                              // 127
        'base': 'au',                                                                                                 // 128
        'letters': /[\uA737]/g                                                                                        // 128
    }, {                                                                                                              // 128
        'base': 'av',                                                                                                 // 129
        'letters': /[\uA739\uA73B]/g                                                                                  // 129
    }, {                                                                                                              // 129
        'base': 'ay',                                                                                                 // 130
        'letters': /[\uA73D]/g                                                                                        // 130
    }, {                                                                                                              // 130
        'base': 'b',                                                                                                  // 131
        'letters': /[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g                                        // 131
    }, {                                                                                                              // 131
        'base': 'c',                                                                                                  // 132
        'letters': /[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g                // 132
    }, {                                                                                                              // 132
        'base': 'd',                                                                                                  // 134
        'letters': /[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g          // 135
    }, {                                                                                                              // 133
        'base': 'dz',                                                                                                 // 137
        'letters': /[\u01F3\u01C6]/g                                                                                  // 137
    }, {                                                                                                              // 137
        'base': 'e',                                                                                                  // 139
        'letters': /[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g
    }, {                                                                                                              // 138
        'base': 'f',                                                                                                  // 142
        'letters': /[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g                                                          // 142
    }, {                                                                                                              // 142
        'base': 'g',                                                                                                  // 144
        'letters': /[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g    // 145
    }, {                                                                                                              // 143
        'base': 'h',                                                                                                  // 148
        'letters': /[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g    // 149
    }, {                                                                                                              // 147
        'base': 'hv',                                                                                                 // 151
        'letters': /[\u0195]/g                                                                                        // 151
    }, {                                                                                                              // 151
        'base': 'i',                                                                                                  // 153
        'letters': /[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g
    }, {                                                                                                              // 152
        'base': 'j',                                                                                                  // 156
        'letters': /[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g                                                          // 156
    }, {                                                                                                              // 156
        'base': 'k',                                                                                                  // 158
        'letters': /[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g          // 159
    }, {                                                                                                              // 157
        'base': 'l',                                                                                                  // 162
        'letters': /[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g
    }, {                                                                                                              // 161
        'base': 'lj',                                                                                                 // 165
        'letters': /[\u01C9]/g                                                                                        // 165
    }, {                                                                                                              // 165
        'base': 'm',                                                                                                  // 166
        'letters': /[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g                                              // 166
    }, {                                                                                                              // 166
        'base': 'n',                                                                                                  // 168
        'letters': /[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g
    }, {                                                                                                              // 167
        'base': 'nj',                                                                                                 // 171
        'letters': /[\u01CC]/g                                                                                        // 171
    }, {                                                                                                              // 171
        'base': 'o',                                                                                                  // 173
        'letters': /[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g
    }, {                                                                                                              // 172
        'base': 'oi',                                                                                                 // 176
        'letters': /[\u01A3]/g                                                                                        // 176
    }, {                                                                                                              // 176
        'base': 'ou',                                                                                                 // 177
        'letters': /[\u0223]/g                                                                                        // 177
    }, {                                                                                                              // 177
        'base': 'oo',                                                                                                 // 178
        'letters': /[\uA74F]/g                                                                                        // 178
    }, {                                                                                                              // 178
        'base': 'p',                                                                                                  // 179
        'letters': /[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g                                  // 179
    }, {                                                                                                              // 179
        'base': 'q',                                                                                                  // 180
        'letters': /[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g                                                          // 180
    }, {                                                                                                              // 180
        'base': 'r',                                                                                                  // 182
        'letters': /[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g
    }, {                                                                                                              // 181
        'base': 's',                                                                                                  // 186
        'letters': /[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g
    }, {                                                                                                              // 185
        'base': 't',                                                                                                  // 190
        'letters': /[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g
    }, {                                                                                                              // 189
        'base': 'tz',                                                                                                 // 193
        'letters': /[\uA729]/g                                                                                        // 193
    }, {                                                                                                              // 193
        'base': 'u',                                                                                                  // 195
        'letters': /[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g
    }, {                                                                                                              // 194
        'base': 'v',                                                                                                  // 198
        'letters': /[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g                                              // 198
    }, {                                                                                                              // 198
        'base': 'vy',                                                                                                 // 199
        'letters': /[\uA761]/g                                                                                        // 199
    }, {                                                                                                              // 199
        'base': 'w',                                                                                                  // 200
        'letters': /[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g                            // 200
    }, {                                                                                                              // 200
        'base': 'x',                                                                                                  // 201
        'letters': /[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g                                                                // 201
    }, {                                                                                                              // 201
        'base': 'y',                                                                                                  // 203
        'letters': /[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g
    }, {                                                                                                              // 202
        'base': 'z',                                                                                                  // 207
        'letters': /[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g          // 208
    }];                                                                                                               // 206
                                                                                                                      //
    for (var i = 0; i < defaultDiacriticsRemovalMap.length; i++) {                                                    // 212
        str = str.replace(defaultDiacriticsRemovalMap[i].letters, defaultDiacriticsRemovalMap[i].base);               // 213
    }                                                                                                                 // 214
                                                                                                                      //
    return str;                                                                                                       // 216
}                                                                                                                     // 218
                                                                                                                      //
var strWithoutSpec = function (str) {                                                                                 // 220
    try {                                                                                                             // 221
        return removeDiacritics(str);                                                                                 // 222
    } catch (e) {                                                                                                     // 223
        try {                                                                                                         // 224
            return removeSpecCharVi(str);                                                                             // 225
        } catch (er) {                                                                                                // 226
            return str;                                                                                               // 227
        }                                                                                                             // 228
    }                                                                                                                 // 229
};                                                                                                                    // 230
                                                                                                                      //
var buildRegExp = function (searchText) {                                                                             // 232
    var words = searchText.trim().split(/[ \-\:]+/);                                                                  // 233
                                                                                                                      //
    var exps = _.map(words, function (word) {                                                                         // 234
        return "(?=.*" + word + ")";                                                                                  // 235
    });                                                                                                               // 236
                                                                                                                      //
    var fullExp = exps.join('') + ".+";                                                                               // 237
    return new RegExp(fullExp, "i");                                                                                  // 238
};                                                                                                                    // 239
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});
require("./lib/collections/branchs.js");
require("./lib/collections/categorys.js");
require("./lib/collections/client.document.in.queues.js");
require("./lib/collections/document.attachment.js");
require("./lib/collections/document.remind.js");
require("./lib/collections/documents.in.remind.js");
require("./lib/collections/documents.js");
require("./lib/collections/favorites.js");
require("./lib/collections/hashtags.js");
require("./lib/collections/iddoc.in.fav.js");
require("./lib/collections/items.js");
require("./lib/collections/queue.js");
require("./lib/collections/reminds.js");
require("./lib/collections/rssearchs.js");
require("./lib/collections/terms.js");
require("./lib/collections/uploads.js");
require("./lib/config/config.js");
require("./lib/search-api/api-find-document.js");
require("./lib/constants.js");
require("./lib/router.js");
require("./server/compress-and-download/compress.and.download.js");
require("./server/config-upload-server/init.js");
require("./server/database-observe/document.js");
require("./server/database-observe/uploads.js");
require("./server/init-user/init.js");
require("./server/publications/branchs.js");
require("./server/publications/categorys.js");
require("./server/publications/document-attachment.js");
require("./server/publications/documentremind.js");
require("./server/publications/documents.in.remind.js");
require("./server/publications/documents.js");
require("./server/publications/favorites.js");
require("./server/publications/hashtags.js");
require("./server/publications/iddoc.in.fav.js");
require("./server/publications/items.js");
require("./server/publications/queues.js");
require("./server/publications/reminds.js");
require("./server/publications/rssearchs.js");
require("./server/publications/terms.js");
require("./server/publications/uploads.js");
require("./server/remind-service/remind.js");
require("./lib/main.js");
require("./server/main.js");
//# sourceMappingURL=app.js.map
