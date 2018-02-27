var require = meteorInstall({"lib":{"collections":{"branchs.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// lib/collections/branchs.js                                                                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
let Meteor;
module.watch(require("meteor/meteor"), {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
Branchs = new Mongo.Collection('branchs');

if (Meteor.isServer) {
  Meteor.methods({
    addNewBranch: function (data) {
      return Promise.asyncApply(() => {
        check(Meteor.userId(), String);
        check(data, {
          id_record: Match.Maybe(String),
          name: String,
          active: Boolean
        });
        let user = Meteor.user();

        let branch = _.extend(data, {
          id_owner: user._id,
          date_create: new Date().getTime()
        });

        delete branch.id_record;
        return Promise.await(Branchs.insert(branch));
      });
    },
    updateBranch: function (data) {
      return Promise.asyncApply(() => {
        check(Meteor.userId(), String);
        check(data, {
          id_record: String,
          name: String,
          active: Boolean
        });
        let _id = data.id_record;

        let branch = _.extend(data, {
          date_update: new Date().getTime()
        });

        delete branch.id_record;
        return Promise.await(Branchs.update(_id, {
          $set: branch
        }));
      });
    },
    removeBranch: function (_id) {
      return Promise.asyncApply(() => {
        check(Meteor.userId(), String);
        check(_id, String);
        /* check term using other document */

        let ids = [_id];
        let branch = Promise.await(Documents.findOne({
          branch: {
            $elemMatch: {
              "$in": ids
            }
          }
        }));

        if (branch) {
          return null;
        }

        if (Branchs.find(_id).count()) {
          return Promise.await(Branchs.remove({
            _id: _id
          }));
        } else {
          return null;
        }
      });
    }
  });
} // Branchs.find().observeChanges({
//     added: function(id, object) {
//     },
//     changed: function (id, object) {
//     },
//     removed: function (id, object) {
//     }
// });
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"categorys.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// lib/collections/categorys.js                                                                                      //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
let Meteor;
module.watch(require("meteor/meteor"), {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
Categorys = new Mongo.Collection('categorys');

if (Meteor.isServer) {
  Meteor.methods({
    addNewCategory: function (data) {
      return Promise.asyncApply(() => {
        check(Meteor.userId(), String);
        check(data, {
          id_record: Match.Maybe(String),
          name: String,
          active: Boolean
        });
        let user = Meteor.user();

        let category = _.extend(data, {
          id_owner: user._id,
          date_create: new Date().getTime()
        });

        delete category.id_record;
        return Promise.await(Categorys.insert(category));
      });
    },
    updateCategory: function (data) {
      return Promise.asyncApply(() => {
        check(Meteor.userId(), String);
        check(data, {
          id_record: String,
          name: String,
          active: Boolean
        });
        let _id = data.id_record;

        let category = _.extend(data, {
          date_update: new Date().getTime()
        });

        delete category.id_record;
        return Promise.await(Categorys.update(_id, {
          $set: category
        }));
      });
    },
    removeCategory: function (_id) {
      return Promise.asyncApply(() => {
        check(Meteor.userId(), String);
        check(_id, String); //check document using category

        let document = Promise.await(Documents.findOne({
          category: _id
        }));

        if (document) {
          return null;
        }

        if (Categorys.find(_id).count()) {
          return Promise.await(Categorys.remove({
            _id: _id
          }));
        } else {
          return null;
        }
      });
    }
  });
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"client.document.in.queues.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// lib/collections/client.document.in.queues.js                                                                      //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
DocumentInQueues = new Mongo.Collection('document-in-queues');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"document.attachment.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// lib/collections/document.attachment.js                                                                            //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
let Meteor;
module.watch(require("meteor/meteor"), {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
Attachments = new Mongo.Collection('attachments');

if (Meteor.isServer) {
  Meteor.methods({
    addNewAttachment: function (document) {
      return Promise.asyncApply(() => {
        return Promise.await(Attachments.insert(document));
      });
    }
  });
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"document.remind.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// lib/collections/document.remind.js                                                                                //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
DocumentRemind = new Mongo.Collection('document-remind');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"documents.in.remind.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// lib/collections/documents.in.remind.js                                                                            //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
DocumentsInRemind = new Mongo.Collection('documents-in-remind');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"documents.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// lib/collections/documents.js                                                                                      //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
let Meteor;
module.watch(require("meteor/meteor"), {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
let Configs;
module.watch(require("../../imports/configs"), {
  "*"(v) {
    Configs = v;
  }

}, 1);
Documents = new Mongo.Collection('documents');

let StrFunc = require('../../imports/string-helpers');

if (Meteor.isServer) {
  Meteor.methods({
    addNewDocument: function (document) {
      return Promise.asyncApply(() => {
        check(Meteor.userId(), String);
        console.log(document);
        check(document, {
          branch: Match.Optional(Match.OneOf(undefined, null, Array)),
          category: Match.Optional(Match.OneOf(undefined, null, String)),
          hashtags: Match.Optional(Match.OneOf(undefined, null, Array)),
          name: String,
          document_number: Match.Optional(Match.OneOf(undefined, null, String)),
          term: Match.Optional(Match.OneOf(undefined, null, Array)),
          note: Match.Optional(Match.OneOf(undefined, null, String)),
          startStamp: Match.Optional(Match.OneOf(undefined, null, Number)),
          dueStamp: Match.Optional(Match.OneOf(undefined, null, Number)),
          page_uuid: String,
          every: Number,
          unit: String,
          firstAttachment: Match.Optional(Match.OneOf(undefined, null, String))
        });
        user = Meteor.user();
        document = _.extend(document, {
          id_owner: user._id,
          date_create: new Date().getTime(),
          name_search: StrFunc.strWithoutSpec(document.name),
          document_number_search: StrFunc.strWithoutSpec(document.document_number)
        });
        let page_uuid = document.page_uuid; // create new document without attachments

        let idDocument = Promise.await(Documents.insert(document));
        let folderUpload = process.env.PWD + '/.uploads/';
        let base = process.env.PWD + '/.uploads/' + idDocument;

        var mkdirp = require('mkdirp');

        var Fiber = require('fibers');

        var fs = require('fs-extra');

        mkdirp(base, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('create new folder: ' + base); //move attachment from tmp to documents-folder

            Fiber(function () {
              let folderUploadReplace = '/upload/';
              Uploads.find({
                'uuid_page': page_uuid
              }).fetch().map((el, idx) => {
                let pathFileUpload = folderUpload + el.path;
                let newPathFile = base + '/' + el.new_name;
                fs.copy(pathFileUpload, newPathFile).then(() => {
                  // save new file to attachment
                  let attachment = el;
                  let oldImageId = attachment._id;
                  delete attachment._id;
                  attachment.pathReactive = idDocument + '/' + el.path;
                  attachment.idDocument = idDocument;
                  Meteor.call('addNewAttachment', attachment);
                  Meteor.call('deleteFile', {
                    _id: oldImageId
                  });
                }).catch(err => console.error(err));
              });
            }).run();
          } // path exists unless there was an error

        });
      });
    }
  });
  Meteor.methods({
    updateDocument: function (document) {
      return Promise.asyncApply(() => {
        check(Meteor.userId(), String);
        check(document, {
          _id: String,
          branch: Match.Optional(Match.OneOf(undefined, null, Array)),
          category: Match.Optional(Match.OneOf(undefined, null, String)),
          hashtags: Match.Optional(Match.OneOf(undefined, null, Array)),
          name: String,
          document_number: Match.Optional(Match.OneOf(undefined, null, String)),
          term: Match.Optional(Match.OneOf(undefined, null, Array)),
          note: Match.Optional(Match.OneOf(undefined, null, String)),
          startStamp: Match.Optional(Match.OneOf(undefined, null, Number)),
          dueStamp: Match.Optional(Match.OneOf(undefined, null, Number)),
          page_uuid: String,
          every: Number,
          unit: String,
          firstAttachment: Match.Optional(Match.OneOf(undefined, null, String))
        });
        user = Meteor.user();
        document.name_search = StrFunc.strWithoutSpec(document.name);
        document.document_number_search = StrFunc.strWithoutSpec(document.document_number);
        document = _.extend(document, {
          date_update: new Date().getTime()
        });
        let idDoc = document._id;
        delete document._id;
        return Promise.await(Documents.update(idDoc, {
          $set: document
        }));
      });
    }
  });
  Meteor.methods({
    setDefaultDocumentWithIdDoc: function (data) {
      return Promise.asyncApply(() => {
        check(Meteor.userId(), String);
        check(data, {
          _id: String,
          pageUUID: String,
          idDocument: String
        }); // _id is attachment id

        let idDoc = data.idDocument;
        let doc = Documents.findOne(idDoc);

        if (doc) {
          Attachments.update({
            idDocument: idDoc
          }, {
            $set: {
              isDefault: false
            }
          }, {
            multi: true
          });
          Attachments.update(data._id, {
            $set: {
              isDefault: true
            }
          });
        }
      });
    }
  });
  Meteor.methods({
    setDefaultDocumentPageUUID: function (data) {
      return Promise.asyncApply(() => {
        check(Meteor.userId(), String);
        check(data, {
          _id: String,
          pageUUID: String
        });
        Uploads.update({
          uuid_page: data.pageUUID
        }, {
          $set: {
            isDefault: false
          }
        }, {
          multi: true
        });
        Uploads.update(data._id, {
          $set: {
            isDefault: true
          }
        });
      });
    }
  });
  Meteor.methods({
    deleteDocument: function (idDoc) {
      check(Meteor.userId(), String);
      check(idDoc, String);

      try {
        var Fiber = require('fibers');

        var fs = require('fs-extra');

        Fiber(function () {
          let doc = Documents.findOne(idDoc);

          if (!doc) {
            return false;
          }

          Attachments.remove({
            idDocument: idDoc
          }, {
            multi: true
          });
          Documents.remove(idDoc);

          var fs = require('fs-extra');

          let folderUpload = process.env.PWD + '/.uploads/' + idDoc;
          deleteFolderRecursive(folderUpload, fs);
          return true;
        }).run();
      } catch (e) {
        return false;
      }
    }
  });

  function deleteFolderRecursive(path, fs) {
    try {
      if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file, index) {
          var curPath = path + "/" + file;

          if (fs.lstatSync(curPath).isDirectory()) {
            // recurse
            deleteFolderRecursive(curPath, fs);
          } else {
            // delete file
            fs.unlinkSync(curPath);
          }
        });
        fs.rmdirSync(path);
      }
    } catch (e) {}
  }

  ;
  Meteor.methods({
    addQuickDocument: function (data) {
      return Promise.asyncApply(() => {
        check(Meteor.userId(), String);
        check(data, {
          branch: Match.Optional(Match.OneOf(undefined, null, Array)),
          category: Match.Optional(Match.OneOf(undefined, null, String)),
          page_uuid: String,
          hashtags: Match.Optional(Match.OneOf(undefined, null, Array))
        });
        let user = Meteor.userId();

        var Fiber = require('fibers');

        Fiber(function () {
          //get all attachment in page uuid
          Uploads.find({
            'uuid_page': data.page_uuid
          }).fetch().map((el, idx) => {
            let name = el.path;

            let document = _.extend(data, {
              id_owner: user._id,
              date_create: new Date().getTime(),
              name: name,
              name_search: StrFunc.strWithoutSpec(name),
              firstAttachment: el.key_unique
            });

            let p = new Promise(function (rs, rj) {
              rs(Documents.insert(document));
            });
            p.then(idDoc => {
              if (idDoc) {
                let folderUpload = process.env.PWD + '/.uploads/';
                let base = process.env.PWD + '/.uploads/' + idDoc;

                var mkdirp = require('mkdirp');

                var fs = require('fs-extra');

                mkdirp(base, function (err) {
                  if (err) {
                    console.log(err);
                  } else {
                    let pathFileUpload = folderUpload + el.path;
                    let newPathFile = base + '/' + el.new_name;
                    fs.copy(pathFileUpload, newPathFile).then(() => {
                      let attachment = el;
                      let oldImageId = attachment._id;
                      delete attachment._id;
                      attachment.pathReactive = idDoc + '/' + el.path;
                      attachment.idDocument = idDoc;
                      attachment.isDefault = true;
                      Meteor.call('addNewAttachment', attachment);
                      Meteor.call('deleteFile', {
                        _id: oldImageId
                      });
                    }).catch(err => console.error(err));
                  }
                });
              }
            });
            p.catch(e => {
              console.log(e);
            });
            return p;
          });
        }).run();
      });
    }
  });
}

if (Meteor.isServer) {
  //tracker DocumentChange
  Documents.find({}).observeChanges({
    changed(idDoc, document) {
      return Promise.asyncApply(() => {
        console.log('document changed');
        const documentInRS = RsSearchs.findOne({
          id_record: idDoc
        });

        if (documentInRS) {
          documentInRS.branch = document.branch;
          documentInRS.category = document.category;
          documentInRS.hashtags = document.hashtags;
          documentInRS.name = document.name;
          documentInRS.document_number = document.document_number;
          documentInRS.term = document.term;
          documentInRS.note = document.note;
          documentInRS.startStamp = document.startStamp;
          documentInRS.dueStamp = document.dueStamp;
          documentInRS.page_uuid = document.page_uuid;
          documentInRS.every = document.every;
          documentInRS.unit = document.unit;
          documentInRS.firstAttachment = document.firstAttachment;
          documentInRS.name_search = document.name_search;
          documentInRS.document_number_search = document.document_number_search;
          documentInRS.firstDocFullPath = Configs.getFirstAttachmentOfDocument(idDoc);
          delete documentInRS._id;
          Promise.await(RsSearchs.update({
            id_record: idDoc
          }, {
            $set: documentInRS
          }));
          Promise.await(DocumentInQueues.update({
            id_record: idDoc
          }, {
            $set: documentInRS
          }));
        }
      });
    },

    removed(_idPost) {}

  });
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"favorites.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// lib/collections/favorites.js                                                                                      //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Favorites = new Mongo.Collection('favorites');

if (Meteor.isServer) {
  Meteor.methods({
    addNewFavorite: function (data) {
      return Promise.asyncApply(() => {
        check(Meteor.userId(), String);
        check(data, {
          id_record: Match.Maybe(String),
          name: String,
          active: Boolean
        });
        let user = Meteor.user();

        let favorite = _.extend(data, {
          id_owner: user._id,
          date_create: new Date().getTime()
        });

        delete favorite.id_record;
        return Promise.await(Favorites.insert(favorite));
      });
    },
    updateFavorite: function (data) {
      return Promise.asyncApply(() => {
        check(Meteor.userId(), String);
        check(data, {
          id_record: String,
          name: String,
          active: Boolean
        });
        let _id = data.id_record;

        let favorite = _.extend(data, {
          date_update: new Date().getTime()
        });

        delete favorite.id_record;
        return Promise.await(Favorites.update(_id, {
          $set: favorite
        }));
      });
    },
    removeFavorite: function (_id) {
      return Promise.asyncApply(() => {
        check(Meteor.userId(), String);
        check(_id, String);
        return Promise.await(Favorites.remove({
          _id: _id
        }));
      });
    }
  });
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"hashtags.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// lib/collections/hashtags.js                                                                                       //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
let Meteor;
module.watch(require("meteor/meteor"), {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
Hashtags = new Mongo.Collection('hashtags');

if (Meteor.isServer) {
  Meteor.methods({
    addNewHashtag: function (data) {
      return Promise.asyncApply(() => {
        check(Meteor.userId(), String);
        check(data, {
          id_record: Match.Maybe(String),
          name: String,
          active: Boolean
        });
        let user = Meteor.user();

        let hashtag = _.extend(data, {
          id_owner: user._id,
          date_create: new Date().getTime()
        });

        delete hashtag.id_record;
        return Promise.await(Hashtags.insert(hashtag));
      });
    },
    updateHashtag: function (data) {
      return Promise.asyncApply(() => {
        check(Meteor.userId(), String);
        check(data, {
          id_record: String,
          name: String,
          active: Boolean
        });
        let _id = data.id_record;

        let hashtag = _.extend(data, {
          date_update: new Date().getTime()
        });

        delete hashtag.id_record;
        return Promise.await(Hashtags.update(_id, {
          $set: hashtag
        }));
      });
    },
    removeHashtag: function (_id) {
      return Promise.asyncApply(() => {
        check(Meteor.userId(), String);
        check(_id, String);
        /* check term using other document */

        let ids = [_id];
        let hashtag = Promise.await(Documents.findOne({
          hashtag: {
            $elemMatch: {
              "$in": ids
            }
          }
        }));

        if (hashtag) {
          return null;
        }

        if (Hashtags.find(_id).count()) {
          return Promise.await(Hashtags.remove({
            _id: _id
          }));
        } else {
          return null;
        }
      });
    }
  });
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"iddoc.in.fav.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// lib/collections/iddoc.in.fav.js                                                                                   //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
IdDocumentInFavorite = new Mongo.Collection('id-doc-in-fav');

if (Meteor.isServer) {
  Meteor.methods({
    addIdDocToFav: function (data) {
      "use strict";

      check(Meteor.userId(), String);
      check(data, {
        idDoc: String,
        idFav: String
      });
      let fav = Favorites.findOne(data.idFav);
      let doc = Documents.findOne(data.idDoc);

      if (fav && doc) {
        let dataGet = IdDocumentInFavorite.findOne({
          $and: [{
            idDoc: {
              $eq: data.idDoc
            }
          }, {
            idFav: {
              $eq: data.idFav
            }
          }]
        });

        if (!dataGet) {
          let user = Meteor.user();

          let idDocInFav = _.extend(data, {
            id_owner: user._id,
            date_create: new Date().getTime()
          });

          IdDocumentInFavorite.insert(idDocInFav);
          return {
            success: true,
            message: 'add "' + doc.name + '" to favorite "' + fav.name + '" success'
          };
        } else {
          return {
            success: false,
            message: '"' + doc.name + '"' + '  already exists in "' + fav.name + '"'
          };
        }
      } else {
        return {
          success: false,
          message: "Data invalid"
        };
      }
    }
  });
  Meteor.methods({
    mergeFavToQueue: function (idFav) {
      "use strict";

      check(Meteor.userId(), String);
      check(idFav, String);
      let fav = Favorites.findOne(idFav);

      if (fav) {
        let idDocInFav = IdDocumentInFavorite.find({
          id_owner: Meteor.userId(),
          idFav: idFav
        });

        if (idDocInFav.count()) {
          let countAdd = 0;
          idDocInFav.fetch().map((val, idx) => {
            let inQueue = Queues.findOne({
              id_doc: val.idDoc,
              id_owner: Meteor.userId()
            });

            if (!inQueue) {
              let queue = {
                id_owner: Meteor.userId(),
                id_doc: val.idDoc,
                date_create: new Date().getTime()
              };
              Queues.insert(queue);
              countAdd++;
            }
          });

          if (countAdd) {
            return {
              success: true,
              message: "add " + countAdd + " document(s) to queue"
            };
          } else {
            return {
              success: false,
              message: "all documents in favorite already exists in queue"
            };
          }
        } else {
          return {
            success: false,
            message: "documents in favorite is empty"
          };
        }
      } else {
        return {
          success: false,
          message: "favorite is empty"
        };
      }
    }
  });
  Meteor.methods({
    clearFav: function (idFav) {
      "use strict";

      check(Meteor.userId(), String);
      check(idFav, String);
      let fav = Favorites.findOne(idFav);

      if (fav) {
        IdDocumentInFavorite.remove({
          id_owner: Meteor.userId(),
          idFav: idFav
        });
      }
    }
  });
  Meteor.methods({
    removeDocInFav: function (data) {
      "use strict";

      check(Meteor.userId(), String);
      check(data.idFav, String);
      check(data.idDoc, String);
      IdDocumentInFavorite.remove({
        id_owner: Meteor.userId(),
        idFav: data.idFav,
        idDoc: data.idDoc
      });
    }
  });
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"items.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// lib/collections/items.js                                                                                          //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Items = new Mongo.Collection('items');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"queue.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// lib/collections/queue.js                                                                                          //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Queues = new Mongo.Collection('queues');

if (Meteor.isServer) {
  Meteor.methods({
    'addQueue': function (idDoc) {
      return Promise.asyncApply(() => {
        check(Meteor.userId(), String);
        check(idDoc, String);
        let user = Meteor.user();

        if (Documents.findOne(idDoc) && !Queues.findOne({
          id_doc: idDoc,
          id_owner: user._id
        })) {
          return Promise.await(Queues.insert({
            id_owner: user._id,
            id_doc: idDoc,
            date_create: new Date().getTime()
          }));
        }
      });
    },
    'removeQueue': function (idDoc) {
      return Promise.asyncApply(() => {
        check(Meteor.userId(), String);
        check(idDoc, String);
        let user = Meteor.user();
        let queue = Queues.findOne({
          id_doc: idDoc,
          id_owner: user._id
        });

        if (queue) {
          Queues.remove(queue._id);
        }
      });
    },
    "cleanQueue": function () {
      "use strict";

      check(Meteor.userId(), String);
      Queues.remove({
        id_owner: Meteor.userId()
      });
    }
  });
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"reminds.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// lib/collections/reminds.js                                                                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Reminds = new Mongo.Collection('reminds');

if (Meteor.isServer) {
  Meteor.methods({
    addNewRemind: function (data) {
      return Promise.asyncApply(() => {
        check(Meteor.userId(), String);
        check(data, {
          id_record: Match.Maybe(String),
          name: String,
          active: Boolean,
          interval: Number
        });
        let user = Meteor.user();

        let remind = _.extend(data, {
          id_owner: user._id,
          date_create: new Date().getTime()
        });

        delete remind.id_record;
        return Promise.await(Reminds.insert(remind));
      });
    },
    updateRemind: function (data) {
      return Promise.asyncApply(() => {
        check(Meteor.userId(), String);
        check(data, {
          id_record: String,
          name: String,
          active: Boolean,
          interval: Number
        });
        let _id = data.id_record;

        let remind = _.extend(data, {
          date_update: new Date().getTime()
        });

        delete remind.id_record;
        return Promise.await(Reminds.update(_id, {
          $set: remind
        }));
      });
    },
    removeRemind: function (_id) {
      return Promise.asyncApply(() => {
        check(Meteor.userId(), String);
        check(_id, String);

        if (Reminds.find(_id).count()) {
          return Promise.await(Reminds.remove({
            _id: _id
          }));
        } else {
          return null;
        }
      });
    }
  });
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"rssearchs.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// lib/collections/rssearchs.js                                                                                      //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
RsSearchs = new Mongo.Collection('rssearchs');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"terms.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// lib/collections/terms.js                                                                                          //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Terms = new Mongo.Collection('terms');

if (Meteor.isServer) {
  Meteor.methods({
    addNewTerm: function (data) {
      return Promise.asyncApply(() => {
        check(Meteor.userId(), String);
        check(data, {
          id_record: Match.Maybe(String),
          name: String,
          active: Boolean
        });
        let user = Meteor.user();

        let term = _.extend(data, {
          id_owner: user._id,
          date_create: new Date().getTime()
        });

        delete term.id_record;
        return Promise.await(Terms.insert(term));
      });
    },
    updateTerm: function (data) {
      return Promise.asyncApply(() => {
        check(Meteor.userId(), String);
        check(data, {
          id_record: String,
          name: String,
          active: Boolean
        });
        let _id = data.id_record;

        let term = _.extend(data, {
          date_update: new Date().getTime()
        });

        delete term.id_record;
        return Promise.await(Terms.update(_id, {
          $set: term
        }));
      });
    },
    removeTerm: function (_id) {
      return Promise.asyncApply(() => {
        check(Meteor.userId(), String);
        check(_id, String);

        if (Terms.find(_id).count()) {
          /* check term using other document */
          let ids = [_id];
          let document = Promise.await(Documents.findOne({
            term: {
              $elemMatch: {
                "$in": ids
              }
            }
          }));

          if (!document) {
            return Promise.await(Terms.remove({
              _id: _id
            }));
          }
        }

        return null;
      });
    }
  });
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"uploads.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// lib/collections/uploads.js                                                                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Uploads = new Mongo.Collection('uploads');
Uploads.allow({
  insert: function (userId, doc) {
    return !!userId;
  },
  update: function (userId, doc, fields, modifier) {
    return !!userId;
  }
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"config":{"config.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// lib/config/config.js                                                                                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Accounts.config({
  forbidClientAccountCreation: true
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"search-api":{"api-find-document.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// lib/search-api/api-find-document.js                                                                               //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
let Meteor;
module.watch(require("meteor/meteor"), {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
let StrHelpers;
module.watch(require("../../imports/string-helpers"), {
  "*"(v) {
    StrHelpers = v;
  }

}, 1);
let Configs;
module.watch(require("../../imports/configs"), {
  "*"(v) {
    Configs = v;
  }

}, 2);
let RsSearchOpt;
module.watch(require("../../imports/optimize-rs-search"), {
  "*"(v) {
    RsSearchOpt = v;
  }

}, 3);
Meteor.methods({
  'findDocuments': function (filter) {
    return Promise.asyncApply(() => {
      try {
        check(Meteor.userId(), String);
        check(filter, {
          branchs: Match.Optional(Match.OneOf(undefined, null, Array)),
          categorys: Match.Optional(Match.OneOf(undefined, null, Array)),
          name: Match.Optional(Match.OneOf(undefined, null, String)),
          document_number: Match.Optional(Match.OneOf(undefined, null, String)),
          terms: Match.Optional(Match.OneOf(undefined, null, Array)),
          uuid_page_search: String,
          hashtags: Match.Optional(Match.OneOf(undefined, null, Array))
        });
        user = Meteor.user();
        let branchs = filter.branchs;
        let terms = filter.terms;
        let categorys = filter.categorys;
        let hashtags = filter.hashtags;
        let nameRegex = '';

        if (filter.name) {
          let nameWithoutSpec = StrHelpers.strWithoutSpec(filter.name);
          nameRegex = StrHelpers.buildRegExp(nameWithoutSpec);
        }

        let dcNumbRegex = '';

        if (filter.document_number) {
          let docnumWithoutSpec = StrHelpers.strWithoutSpec(filter.document_number);
          dcNumbRegex = StrHelpers.buildRegExp(docnumWithoutSpec);
        }

        let queryFilter = {};

        if (branchs && branchs.length) {
          queryFilter.branch = {
            $elemMatch: {
              "$in": branchs
            }
          };
        }

        if (categorys && categorys.length) {
          queryFilter.category = {
            $in: categorys
          };
        }

        if (terms && terms.length) {
          queryFilter.term = {
            $elemMatch: {
              "$in": terms
            }
          };
        }

        if (hashtags && hashtags.length) {
          queryFilter.hashtags = {
            $elemMatch: {
              "$in": hashtags
            }
          };
        }

        if (nameRegex) {
          queryFilter.name_search = nameRegex;
        }

        if (dcNumbRegex) {
          queryFilter.document_number_search = dcNumbRegex;
        }

        let testResult = Promise.await(Documents.find({
          $and: [queryFilter]
        }, {
          sort: {
            name: 1
          }
        })); //save search

        if (Meteor.isServer) {
          RsSearchs.remove({
            uuid_page_search: filter.uuid_page_search
          });
          RsSearchOpt.fucOptimizeRsSearch();
        }

        return Promise.await(testResult.fetch().map((val, idx) => {
          val.id_record = val._id;
          delete val._id;
          val.uuid_page_search = filter.uuid_page_search;

          if (Meteor.isServer) {
            let docInfo = Configs.getFirstAttachmentOfDocumentToCompress(val.id_record);
            val.firstDocFullPath = Configs.getFirstAttachmentOfDocument(val.id_record);
            val.realName = docInfo.name;
            RsSearchs.insert(val);
          }
        }));
      } catch (e) {
        console.log(e);
      }
    });
  }
});

function getFirstAttachmentOfDocument(idDocument) {
  let attachment = Attachments.findOne({
    idDocument: idDocument
  });

  if (!attachment) {
    return '';
  } else {
    let fullPath = Meteor.absoluteUrl.defaultOptions.rootUrl + 'upload/' + attachment.pathReactive;
    return fullPath;
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"constants.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// lib/constants.js                                                                                                  //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
WEB_KEY = 'PQG-2212';
MM_KEY = {
  days: 'd',
  weeks: 'w',
  months: 'M',
  quarters: "Q",
  years: 'y'
};
GUEST_QUEUE = 'ngocns@thianco.com.vn';
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"router.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// lib/router.js                                                                                                     //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var requireLogin = function () {
  if (!Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('deny');
    }
  } else {
    this.next();
  }
};

Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notfound',
  waitOn: function () {
    return [Meteor.subscribe('queues'), Meteor.subscribe('documents.in.queue'), Meteor.subscribe('categorys'), Meteor.subscribe('branchs'), Meteor.subscribe('terms'), Meteor.subscribe('documentremind'), Meteor.subscribe('documentsinremind'), Meteor.subscribe('favorites'), Meteor.subscribe('document.in.favorite'), Meteor.subscribe('hashtags')];
  }
});
Router.route('/', {
  name: 'dashboard',
  onBeforeAction: requireLogin
});
Router.route('/categorys', {
  name: 'categorys',
  onBeforeAction: requireLogin
});
Router.route('/branchs', {
  name: 'branchs',
  onBeforeAction: requireLogin
});
Router.route('/terms', {
  name: 'terms',
  onBeforeAction: requireLogin
});
Router.route('/favorites', {
  name: 'favorites',
  onBeforeAction: requireLogin
});
Router.route('/reminds', {
  name: 'reminds',
  onBeforeAction: requireLogin,
  waitOn: function () {
    return [Meteor.subscribe('reminds')];
  }
});
Router.route('/hashtags', {
  name: 'hashtags',
  onBeforeAction: requireLogin
});
Router.route('/all-favs', {
  name: 'allfavs',
  onBeforeAction: requireLogin
});
Router.route('/queues', {
  name: 'printqueues',
  onBeforeAction: requireLogin
});
Router.route('/docremind', {
  name: 'documentremind',
  onBeforeAction: requireLogin
});
Router.route('/comming-soon', {
  name: 'commingsoon',
  onBeforeAction: requireLogin
});
Router.route('/edit-fav/:_idFav', {
  name: 'editfav',
  onBeforeAction: requireLogin,
  waitOn: function () {
    return [Meteor.subscribe('documents.in.fav', this.params._idFav)];
  },
  data: function () {
    return {
      idFav: this.params._idFav
    };
  }
});
Router.route('/all-documents/:_uuid', {
  name: 'alldocuments',
  onBeforeAction: requireLogin,
  waitOn: function () {
    return [Meteor.subscribe('rssearchs', this.params._uuid)];
  },
  data: function () {
    return {
      uuid: this.params._uuid
    };
  },
  action: function () {
    let cloneUUID = Random.id();
    let paramUUID = this.params._uuid;

    if (!paramUUID || paramUUID.trim().length != cloneUUID.length) {
      this.redirect('/all-documents/' + cloneUUID);
    } else {
      this.render();
    }
  }
});
Router.route('/add-documents/:_uuid', {
  name: 'adddocuments',
  onBeforeAction: requireLogin,
  waitOn: function () {
    return [Meteor.subscribe('items', this.params._uuid), Meteor.subscribe('uploads', this.params._uuid)];
  },
  data: function () {
    return {
      item: Items.findOne(),
      uploads: Uploads.find(),
      uuid: this.params._uuid
    };
  },
  action: function () {
    let cloneUUID = Random.id();
    let paramUUID = this.params._uuid;

    if (!paramUUID || paramUUID.trim().length != cloneUUID.length) {
      this.redirect('/add-documents/' + cloneUUID);
    } else {
      this.render();
    }
  }
});
Router.route('/quick-add-documents/:_uuid', {
  name: 'quickadddoc',
  onBeforeAction: requireLogin,
  waitOn: function () {
    return [Meteor.subscribe('items', this.params._uuid), Meteor.subscribe('uploads', this.params._uuid)];
  },
  data: function () {
    return {
      item: Items.findOne(),
      uploads: Uploads.find(),
      uuid: this.params._uuid
    };
  },
  action: function () {
    let cloneUUID = Random.id();
    let paramUUID = this.params._uuid;

    if (!paramUUID || paramUUID.trim().length != cloneUUID.length) {
      this.redirect('/quick-add-documents/' + cloneUUID);
    } else {
      this.render();
    }
  }
});
Router.route('/edit-document/:_idDoc/:_uuid', {
  name: 'editdoc',
  onBeforeAction: requireLogin,
  waitOn: function () {
    return [Meteor.subscribe('items', this.params._uuid), Meteor.subscribe('uploads', this.params._uuid), Meteor.subscribe('document', this.params._idDoc), Meteor.subscribe('attachment', this.params._idDoc)];
  },
  data: function () {
    return {
      item: Items.find(),
      uploads: Attachments.find({
        idDocument: this.params._idDoc
      }),
      uuid: this.params._uuid,
      idDoc: this.params._idDoc,
      doc: Documents.findOne(this.params._idDoc)
    };
  },
  action: function () {
    let idDoc = this.params._idDoc;
    let cloneUUID = Random.id();
    let paramUUID = this.params._uuid;

    if (!paramUUID || paramUUID.trim().length != cloneUUID.length) {
      this.redirect('/edit-document/' + idDoc + '/' + cloneUUID);
    } else {
      this.render();
    }
  }
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"main.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// lib/main.js                                                                                                       //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"server":{"compress-and-download":{"compress.and.download.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// server/compress-and-download/compress.and.download.js                                                             //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
let Meteor;
module.watch(require("meteor/meteor"), {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
let Configs;
module.watch(require("../../imports/configs"), {
  "*"(v) {
    Configs = v;
  }

}, 1);

const fs = require('fs-extra');

var path = require('path');

var Fiber = require('fibers');

var zip = require('node-zip')();

Meteor.methods({
  compressAndDownload: function (ids) {
    check(Meteor.userId(), String);
    check(ids, String);
    return new Promise(function (resolve) {
      resolve(callAPICompressQueues(ids));
    }).catch(function (er) {
      console.log(er);
      return null;
    });
  }
});

function callAPICompressQueues(ids) {
  zip.files = {};
  let userId = Meteor.userId();
  userId = userId ? userId : Random.id();
  let arIds = ids.split(",");

  if (arIds && arIds.length) {
    let zipName = moment().format('DD_MM_YYYY_HH_mm_ss');
    zipName += '.' + userId + '.zip';
    let zipPath = process.env.PWD + '/.uploads/zip/';
    let zipFullPath = zipPath + zipName;
    let countFileAdded = 1;

    for (let i in arIds) {
      let id = arIds[i];
      let document = Documents.findOne(id);

      if (!document) {
        continue;
      } else {
        let firstDoc = Configs.getFirstAttachmentOfDocumentToCompress(id);
        let firstDocName = countFileAdded.toString() + '_' + firstDoc.name;
        let firstDocFullPath = firstDoc.fullPath;

        if (firstDoc) {
          zip.file(firstDocName, fs.readFileSync(firstDocFullPath));
          countFileAdded++;
        }
      }
    }

    if (countFileAdded > 1) {
      var data = zip.generate({
        base64: false,
        compression: 'DEFLATE'
      });
      fs.outputFileSync(zipFullPath, data, 'binary');
      let urlDownload = Meteor.absoluteUrl.defaultOptions.rootUrl + 'upload/zip/' + zipName;
      return urlDownload;
    } else {
      return null;
    }
  } else {
    return null;
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"config-upload-server":{"init.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// server/config-upload-server/init.js                                                                               //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
let StringHelpers;
module.watch(require("../../imports/string-helpers"), {
  "*"(v) {
    StringHelpers = v;
  }

}, 0);
Meteor.startup(function () {
  UploadServer.init({
    tmpDir: process.env.PWD + '/.uploads/tmp',
    uploadDir: process.env.PWD + '/.uploads/',
    checkCreateDirectories: true,
    getDirectory: function (fileInfo, formData) {
      if (formData && formData.directoryName != null) {
        return formData.directoryName;
      }

      return "";
    },
    getFileName: function (fileInfo, formData) {
      if (formData && formData.prefix != null) {
        return formData.prefix + '_' + fileInfo.name;
      }

      return fileInfo.name;
    },
    finished: function (fileInfo, formData) {
      fileInfo.uuid = Random.id();
      fileInfo.key_unique = fileInfo.uuid + '@' + new Date().getTime();
      fileInfo.timestamp = moment().valueOf();

      if (formData && formData.id_owner != null && formData.uuid != null) {
        fileInfo.id_owner = formData.id_owner;
        fileInfo.uuid_page = formData.uuid;
        /*update file to folder document*/

        if (formData && formData.idDoc) {
          fileInfo.idDoc = formData.idDoc;
        }

        let time = moment().format('YYYY_MM_DD_HH_mm_ss.');
        let newname = StringHelpers.strWithoutSpec(fileInfo.path).replace(/  /g, ' ').replace(/ /g, '_');
        fileInfo.new_name = time + newname;
      }

      fileInfo.ext = fileInfo.name ? fileInfo.name.split('.').pop() : "";
      fileInfo.date_create = new Date().getTime();
    },
    mimeTypes: {
      "jpeg": "image/jpeg",
      "jpg": "image/jpeg",
      "png": "image/png",
      "gif": "image/gif",
      "pdf": "application/pdf",
      "doc": "application/msword",
      "docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "zip": "application/zip, application/x-compressed-zip",
      "txt": "text/plain"
    }
  });
});
Meteor.methods({
  'deleteFile': function (data) {
    check(data, {
      _id: String,
      idDocument: Match.Optional(Match.OneOf(undefined, null, String))
    });
    let _id = data._id;
    let idDocument = data.idDocument;

    if (!idDocument) {
      var upload = Uploads.findOne(_id);

      if (upload == null) {
        throw new Meteor.Error(404, 'Upload not found'); // maybe some other code
      }

      try {
        UploadServer.delete(upload.path);
      } catch (e) {}

      try {
        UploadServer.delete(upload.new_name);
      } catch (e) {}

      Uploads.remove(_id);
    } else {
      var Fiber = require('fibers');

      var fs = require('fs-extra');

      Fiber(function () {
        let attachment = Attachments.findOne(_id);

        if (attachment) {
          let base = process.env.PWD + '/.uploads/' + idDocument;
          let fulPath = base + '/' + attachment.new_name;

          try {
            fs.unlinkSync(fulPath);
            Attachments.remove({
              _id: _id
            });
          } catch (e) {
            console.log(e);
          }
        }
      }).run();
    }
  }
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"database-observe":{"document.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// server/database-observe/document.js                                                                               //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
let ServiceRemind;
module.watch(require("../../imports/server-remind-func"), {
  "*"(v) {
    ServiceRemind = v;
  }

}, 0);
Documents.find({}).observeChanges({
  added: function (id, fields) {
    ServiceRemind.saveRemind();
  },
  changed: function (id, fields) {
    ServiceRemind.saveRemind();
  },
  removed: function (id) {
    ServiceRemind.saveRemind();
  }
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"uploads.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// server/database-observe/uploads.js                                                                                //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
let ServiceRemind;
module.watch(require("../../imports/server-remind-func"), {
  "*"(v) {
    ServiceRemind = v;
  }

}, 0);
Uploads.find({}).observeChanges({
  added: function (id, fields) {
    if (fields.idDoc) {
      var fs = require('fs-extra');

      let folderUpload = process.env.PWD + '/.uploads/';
      let pathFileUpload = folderUpload + fields.path;
      let newPathFile = folderUpload + fields.idDoc + '/' + fields.new_name;
      fs.copy(pathFileUpload, newPathFile).then(() => {
        /* delete uploadte file*/
        Uploads.remove(id);
        fields.idDocument = fields.idDoc;
        delete fields.idDoc;
        fields.pathReactive = fields.idDocument + '/' + fields.path;
        Attachments.insert(fields);
      }).catch(err => console.error(err));
    }
  }
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"init-user":{"init.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// server/init-user/init.js                                                                                          //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
let email = GUEST_QUEUE;
let username = 'ngocns.thianco';
let password = "123123";
let accountWithEmail = Accounts.findUserByEmail(email);

if (!accountWithEmail) {
  /* create new user */
  let user = {
    username: username,
    email: email,
    password: password ? password : Package.sha.SHA256(password)
  };
  Accounts.createUser(user);
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"publications":{"branchs.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// server/publications/branchs.js                                                                                    //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Meteor.publish('branchs', function () {
  return Branchs.find({});
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"categorys.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// server/publications/categorys.js                                                                                  //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Meteor.publish('categorys', function () {
  return Categorys.find({});
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"document-attachment.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// server/publications/document-attachment.js                                                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Meteor.publish('attachments', function () {
  return Attachments.find({});
});
Meteor.publish('attachment', function (idDoc) {
  return Attachments.find({
    idDocument: idDoc
  });
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"documentremind.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// server/publications/documentremind.js                                                                             //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Meteor.publish('documentremind', function () {
  return DocumentRemind.find({});
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"documents.in.remind.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// server/publications/documents.in.remind.js                                                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Meteor.publish('documentsinremind', function () {
  let allRemind = DocumentRemind.find({});
  DocumentsInRemind.remove({});
  allRemind.map((val, idx) => {
    "use strict";

    let doc = Documents.findOne(val.idDoc);
    doc.id_record = doc._id;
    delete doc._id;
    DocumentsInRemind.insert(doc);
  });
  return DocumentsInRemind.find();
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"documents.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// server/publications/documents.js                                                                                  //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Meteor.publish('documents', function () {
  return Documents.find({});
});
Meteor.publish('document', function (idDoc) {
  return Documents.find(idDoc);
});
Meteor.publish('documents.in.fav', function (idFav) {
  let allIdinFav = IdDocumentInFavorite.find({
    idFav: idFav,
    id_owner: Meteor.userId()
  }).fetch().map((val, idx) => {
    "use strict";

    return val.idDoc;
  });
  return Documents.find({
    _id: {
      $in: allIdinFav
    }
  });
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"favorites.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// server/publications/favorites.js                                                                                  //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Meteor.publish('favorites', function () {
  let userid = Meteor.user() ? Meteor.userId() : null;
  return Favorites.find({
    id_owner: userid
  });
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"hashtags.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// server/publications/hashtags.js                                                                                   //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Meteor.publish('hashtags', function () {
  return Hashtags.find({});
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"iddoc.in.fav.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// server/publications/iddoc.in.fav.js                                                                               //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Meteor.publish('document.in.favorite', function () {
  let userid = Meteor.user() ? Meteor.userId() : null;
  return IdDocumentInFavorite.find({
    id_owner: userid
  });
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"items.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// server/publications/items.js                                                                                      //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Meteor.publish('items', function (page_uuid) {
  return Items.find({
    uuid: page_uuid
  });
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"queues.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// server/publications/queues.js                                                                                     //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
let Configs;
module.watch(require("../../imports/configs"), {
  "*"(v) {
    Configs = v;
  }

}, 0);
Meteor.publish('queues', function () {
  let userid = Meteor.user() ? Meteor.userId() : null;

  if (!userid) {
    userid = Accounts.findUserByEmail(GUEST_QUEUE)._id;
    console.log(userid);
  }

  return Queues.find({
    id_owner: userid
  });
});
Meteor.publish('documents.in.queue', function () {
  console.log('documents.in.queue');

  try {
    let userid = Meteor.user() ? Meteor.userId() : null;

    if (!userid) {
      userid = Accounts.findUserByEmail(GUEST_QUEUE)._id;
      console.log(userid);
    }

    DocumentInQueues.remove({
      id_owner: userid
    });
    let idxLoop = 0;
    const filterQuery = userid ? {
      id_owner: userid
    } : {};
    Queues.find(filterQuery).fetch().map((val, idx) => {
      "use strict";

      let document = Documents.findOne(val.id_doc);

      if (document) {
        document.id_record = document._id;
        delete document._id;
        document.id_owner = userid;
        document.id_queue = val._id;
        document.idxLoop = ++idxLoop;
        let attachment = Configs.getFirstAttachmentOfDocumentToCompress(document.id_record);
        document.firstDocFullPath = Configs.getFirstAttachmentOfDocument(document.id_record);
        document.realName = attachment.name;
        DocumentInQueues.insert(document);
      }
    });
    return DocumentInQueues.find({
      id_owner: userid
    });
  } catch (e) {
    console.log(e);
  }
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"reminds.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// server/publications/reminds.js                                                                                    //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Meteor.publish('reminds', function () {
  return Reminds.find({});
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"rssearchs.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// server/publications/rssearchs.js                                                                                  //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Meteor.publish('rssearchs', function (uuid_page_search) {
  return RsSearchs.find({
    uuid_page_search: uuid_page_search
  });
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"terms.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// server/publications/terms.js                                                                                      //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Meteor.publish('terms', function () {
  return Terms.find();
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"uploads.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// server/publications/uploads.js                                                                                    //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Meteor.publish('uploads', function (uuid_page) {
  return Uploads.find({
    uuid_page: uuid_page
  });
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"remind-service":{"remind.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// server/remind-service/remind.js                                                                                   //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
let Meteor;
module.watch(require("meteor/meteor"), {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
let ServiceRemind;
module.watch(require("../../imports/server-remind-func"), {
  "*"(v) {
    ServiceRemind = v;
  }

}, 1);
let sixHours = 1000 * 60 * 60 * 6;
Meteor.startup(() => {
  ServiceRemind.saveRemind();
  ServiceRemind.deleteOldZip();
  setInterval(function () {
    ServiceRemind.saveRemind();
    ServiceRemind.deleteOldZip();
  }, sixHours);
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"main.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// server/main.js                                                                                                    //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
let Meteor;
module.watch(require("meteor/meteor"), {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
let OptimizeStartup;
module.watch(require("../imports/optimize-when-startup"), {
  "*"(v) {
    OptimizeStartup = v;
  }

}, 1);

var os = require("os");

var md5 = require('md5');

Meteor.startup(() => {
  let hostName = 'db43a1f2fd6d2be820041bbfb5bdc7e4';
  let hostDev = '7ad5cd7a78ce20fbf3c2e92d52088b11';
  let valid = md5(os.hostname()) === hostName || md5(os.hostname()) === hostDev;

  if (!valid) {
    console.log('NOT VALID COMPUTER');
    deleteEmailValid(); // Documents.remove({});
    // Branchs.remove({});
    // Categorys.remove({});
    // Terms.remove({});
    // Queues.remove({});
    // Attachments.remove({});
    // Hashtags.remove({});

    return false;
  }
  /*delete all file on folder .uploads/zip && delete old file in folder uploads */


  OptimizeStartup.deleteOldUpload();
  console.log(process.env.PWD + '/.uploads/tmp');
});

function deleteEmailValid() {
  return Promise.asyncApply(() => {
    const acc = Promise.await(Accounts.findUserByEmail(GUEST_QUEUE));

    if (acc && acc._id) {
      Accounts.removeEmail(acc._id, GUEST_QUEUE);
      Accounts.setUsername(acc._id, Random.id());
    }
  });
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"imports":{"configs.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/configs.js                                                                                                //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.export({
  getFirstAttachmentOfDocument: () => getFirstAttachmentOfDocument,
  getFirstAttachmentOfDocumentToCompress: () => getFirstAttachmentOfDocumentToCompress
});

let getFirstAttachmentOfDocument = function (idDocument) {
  console.log('getFirstAttachmentOfDocument');
  let document = Documents.findOne(idDocument);

  if (document) {
    let attachment = Attachments.findOne({
      idDocument: idDocument,
      isDefault: true
    });

    if (!attachment) {
      return '';
    } else {
      let fullPath = '/upload/' + idDocument + '/' + attachment.new_name;
      return fullPath;
    }
  } else {
    return '';
  }
};

let getFirstAttachmentOfDocumentToCompress = function (idDocument) {
  console.log('getFirstAttachmentOfDocumentToCompress');
  let document = Documents.findOne(idDocument);

  if (document) {
    let attachment = Attachments.findOne({
      idDocument: idDocument,
      isDefault: true
    });

    if (!attachment) {
      return '';
    } else {
      let fullPath = process.env.PWD + '/.uploads/' + idDocument + '/' + attachment.new_name;
      return {
        name: attachment.path,
        fullPath: fullPath
      };
    }
  } else {
    return '';
  }
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"optimize-rs-search.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/optimize-rs-search.js                                                                                     //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.export({
  fucOptimizeRsSearch: () => fucOptimizeRsSearch
});

let fucOptimizeRsSearch = function () {
  return Promise.asyncApply(() => {
    let nowTime = moment();
    let yesterday = nowTime.clone().add(-1, 'd').valueOf();
    RsSearchs.remove({
      date_create: {
        $lt: yesterday
      }
    });
  });
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"optimize-when-startup.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/optimize-when-startup.js                                                                                  //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.export({
  deleteOldUpload: () => deleteOldUpload
});

let deleteOldUpload = function () {
  let sub1DayFromNow = moment().add('-1', 'd').valueOf();
  let oldFileUpload = Uploads.find({
    $and: [{
      date_create: {
        $lt: sub1DayFromNow
      }
    }]
  });

  if (oldFileUpload.count()) {
    oldFileUpload.fetch().map((val, idx) => {
      try {
        Meteor.call('deleteFile', {
          _id: val._id
        });
      } catch (e) {}
    });
  }
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"server-remind-func.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/server-remind-func.js                                                                                     //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.export({
  saveRemind: () => saveRemind,
  deleteOldZip: () => deleteOldZip
});

var Fiber = require('fibers');

const fs = require('fs-extra');

let saveRemind = function () {
  try {
    Fiber(function () {
      let listNeedRemind = [];
      let nowTime = moment();
      let sub1DayFromNow = nowTime.clone().add(-1, 'd').valueOf();
      let add1DayFromNow = nowTime.clone().add(-1, 'd').valueOf();
      let add3DayFromNow = nowTime.clone().add(3, 'd').valueOf();
      let allDocumentRemindWithoutBefore = Documents.find({
        $and: [{
          dueStamp: {
            $gt: sub1DayFromNow
          }
        }, {
          dueStamp: {
            $lt: add3DayFromNow
          }
        }, {
          every: {
            $eq: 0
          }
        }]
      });

      if (allDocumentRemindWithoutBefore.count()) {
        allDocumentRemindWithoutBefore.fetch().map((val, idx) => {
          if (listNeedRemind.indexOf(val._id) == -1) {
            listNeedRemind.push(val._id);
          }
        });
      }

      let allDocumentRemindWithBefore = Documents.find({
        $and: [{
          dueStamp: {
            $gt: sub1DayFromNow
          }
        }, {
          every: {
            $gt: 0
          }
        }]
      });

      if (allDocumentRemindWithBefore.count()) {
        allDocumentRemindWithBefore.fetch().map((val, idx) => {
          let dueDay = val.dueStamp;
          let mmdueDay = moment(dueDay);

          if (val.every && val.unit) {
            let mmBefore = mmdueDay.clone().add(-1 * val.every, val.unit).valueOf();

            if (nowTime.clone() >= mmBefore && nowTime.clone() <= dueDay) {
              if (listNeedRemind.indexOf(val._id) == -1) {
                listNeedRemind.push(val._id);
              }
            }
          }
        });
      }

      DocumentRemind.remove({});

      if (listNeedRemind && listNeedRemind.length) {
        for (i in listNeedRemind) {
          let arInsert = {
            idDoc: listNeedRemind[i],
            date_create: new Date().getTime()
          };
          DocumentRemind.insert(arInsert);
        }
      }
    }).run();
  } catch (e) {
    console.log(e);
  }
};

let deleteOldZip = function () {
  let zipPath = process.env.PWD + '/.uploads/zip/';
  let formatTime = 'DD_MM_YYYY_HH_mm_ss';
  let mmNow = moment();

  try {
    fs.readdir(zipPath, function (err, files) {
      if (err) return;
      files.forEach(function (f) {
        if (f) {
          let name = f.split('.');
          let mmFormat = moment().format(formatTime);

          if (name.length && name[0] && typeof name[0] === 'string' && name[0].length == mmFormat.length) {
            let timeInName = name[0];
            let mmDT = moment(timeInName, formatTime);

            if (mmDT.add(1, 'hours').diff(mmNow) <= 0) {
              let fulPath = zipPath + f;

              try {
                fs.unlinkSync(fulPath);
              } catch (e) {
                console.log(e);
              }

              ;
            }
          }
        }
      });
    });
  } catch (er) {
    console.log(er);
  }
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"string-helpers.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/string-helpers.js                                                                                         //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.export({
  strWithoutSpec: () => strWithoutSpec,
  buildRegExp: () => buildRegExp
});

function removeSpecCharVi(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/À|Á|ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/Đ/g, "Đ");
  return str;
}

function removeDiacritics(str) {
  var defaultDiacriticsRemovalMap = [{
    'base': 'A',
    'letters': /[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g
  }, {
    'base': 'AA',
    'letters': /[\uA732]/g
  }, {
    'base': 'AE',
    'letters': /[\u00C6\u01FC\u01E2]/g
  }, {
    'base': 'AO',
    'letters': /[\uA734]/g
  }, {
    'base': 'AU',
    'letters': /[\uA736]/g
  }, {
    'base': 'AV',
    'letters': /[\uA738\uA73A]/g
  }, {
    'base': 'AY',
    'letters': /[\uA73C]/g
  }, {
    'base': 'B',
    'letters': /[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g
  }, {
    'base': 'C',
    'letters': /[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g
  }, {
    'base': 'D',
    'letters': /[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g
  }, {
    'base': 'DZ',
    'letters': /[\u01F1\u01C4]/g
  }, {
    'base': 'Dz',
    'letters': /[\u01F2\u01C5]/g
  }, {
    'base': 'E',
    'letters': /[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g
  }, {
    'base': 'F',
    'letters': /[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g
  }, {
    'base': 'G',
    'letters': /[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g
  }, {
    'base': 'H',
    'letters': /[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g
  }, {
    'base': 'I',
    'letters': /[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g
  }, {
    'base': 'J',
    'letters': /[\u004A\u24BF\uFF2A\u0134\u0248]/g
  }, {
    'base': 'K',
    'letters': /[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g
  }, {
    'base': 'L',
    'letters': /[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g
  }, {
    'base': 'LJ',
    'letters': /[\u01C7]/g
  }, {
    'base': 'Lj',
    'letters': /[\u01C8]/g
  }, {
    'base': 'M',
    'letters': /[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g
  }, {
    'base': 'N',
    'letters': /[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g
  }, {
    'base': 'NJ',
    'letters': /[\u01CA]/g
  }, {
    'base': 'Nj',
    'letters': /[\u01CB]/g
  }, {
    'base': 'O',
    'letters': /[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g
  }, {
    'base': 'OI',
    'letters': /[\u01A2]/g
  }, {
    'base': 'OO',
    'letters': /[\uA74E]/g
  }, {
    'base': 'OU',
    'letters': /[\u0222]/g
  }, {
    'base': 'P',
    'letters': /[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g
  }, {
    'base': 'Q',
    'letters': /[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g
  }, {
    'base': 'R',
    'letters': /[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g
  }, {
    'base': 'S',
    'letters': /[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g
  }, {
    'base': 'T',
    'letters': /[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g
  }, {
    'base': 'TZ',
    'letters': /[\uA728]/g
  }, {
    'base': 'U',
    'letters': /[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g
  }, {
    'base': 'V',
    'letters': /[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g
  }, {
    'base': 'VY',
    'letters': /[\uA760]/g
  }, {
    'base': 'W',
    'letters': /[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g
  }, {
    'base': 'X',
    'letters': /[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g
  }, {
    'base': 'Y',
    'letters': /[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g
  }, {
    'base': 'Z',
    'letters': /[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g
  }, {
    'base': 'a',
    'letters': /[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g
  }, {
    'base': 'aa',
    'letters': /[\uA733]/g
  }, {
    'base': 'ae',
    'letters': /[\u00E6\u01FD\u01E3]/g
  }, {
    'base': 'ao',
    'letters': /[\uA735]/g
  }, {
    'base': 'au',
    'letters': /[\uA737]/g
  }, {
    'base': 'av',
    'letters': /[\uA739\uA73B]/g
  }, {
    'base': 'ay',
    'letters': /[\uA73D]/g
  }, {
    'base': 'b',
    'letters': /[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g
  }, {
    'base': 'c',
    'letters': /[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g
  }, {
    'base': 'd',
    'letters': /[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g
  }, {
    'base': 'dz',
    'letters': /[\u01F3\u01C6]/g
  }, {
    'base': 'e',
    'letters': /[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g
  }, {
    'base': 'f',
    'letters': /[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g
  }, {
    'base': 'g',
    'letters': /[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g
  }, {
    'base': 'h',
    'letters': /[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g
  }, {
    'base': 'hv',
    'letters': /[\u0195]/g
  }, {
    'base': 'i',
    'letters': /[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g
  }, {
    'base': 'j',
    'letters': /[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g
  }, {
    'base': 'k',
    'letters': /[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g
  }, {
    'base': 'l',
    'letters': /[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g
  }, {
    'base': 'lj',
    'letters': /[\u01C9]/g
  }, {
    'base': 'm',
    'letters': /[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g
  }, {
    'base': 'n',
    'letters': /[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g
  }, {
    'base': 'nj',
    'letters': /[\u01CC]/g
  }, {
    'base': 'o',
    'letters': /[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g
  }, {
    'base': 'oi',
    'letters': /[\u01A3]/g
  }, {
    'base': 'ou',
    'letters': /[\u0223]/g
  }, {
    'base': 'oo',
    'letters': /[\uA74F]/g
  }, {
    'base': 'p',
    'letters': /[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g
  }, {
    'base': 'q',
    'letters': /[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g
  }, {
    'base': 'r',
    'letters': /[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g
  }, {
    'base': 's',
    'letters': /[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g
  }, {
    'base': 't',
    'letters': /[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g
  }, {
    'base': 'tz',
    'letters': /[\uA729]/g
  }, {
    'base': 'u',
    'letters': /[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g
  }, {
    'base': 'v',
    'letters': /[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g
  }, {
    'base': 'vy',
    'letters': /[\uA761]/g
  }, {
    'base': 'w',
    'letters': /[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g
  }, {
    'base': 'x',
    'letters': /[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g
  }, {
    'base': 'y',
    'letters': /[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g
  }, {
    'base': 'z',
    'letters': /[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g
  }];

  for (let i = 0; i < defaultDiacriticsRemovalMap.length; i++) {
    str = str.replace(defaultDiacriticsRemovalMap[i].letters, defaultDiacriticsRemovalMap[i].base);
  }

  return str;
}

let strWithoutSpec = function (str) {
  try {
    return removeDiacritics(str);
  } catch (e) {
    try {
      return removeSpecCharVi(str);
    } catch (er) {
      return str;
    }
  }
};

let buildRegExp = function (searchText) {
  var words = searchText.trim().split(/[ \-\:]+/);

  var exps = _.map(words, function (word) {
    return "(?=.*" + word + ")";
  });

  var fullExp = exps.join('') + ".+";
  return new RegExp(fullExp, "i");
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});
require("/lib/collections/branchs.js");
require("/lib/collections/categorys.js");
require("/lib/collections/client.document.in.queues.js");
require("/lib/collections/document.attachment.js");
require("/lib/collections/document.remind.js");
require("/lib/collections/documents.in.remind.js");
require("/lib/collections/documents.js");
require("/lib/collections/favorites.js");
require("/lib/collections/hashtags.js");
require("/lib/collections/iddoc.in.fav.js");
require("/lib/collections/items.js");
require("/lib/collections/queue.js");
require("/lib/collections/reminds.js");
require("/lib/collections/rssearchs.js");
require("/lib/collections/terms.js");
require("/lib/collections/uploads.js");
require("/lib/config/config.js");
require("/lib/search-api/api-find-document.js");
require("/lib/constants.js");
require("/lib/router.js");
require("/server/compress-and-download/compress.and.download.js");
require("/server/config-upload-server/init.js");
require("/server/database-observe/document.js");
require("/server/database-observe/uploads.js");
require("/server/init-user/init.js");
require("/server/publications/branchs.js");
require("/server/publications/categorys.js");
require("/server/publications/document-attachment.js");
require("/server/publications/documentremind.js");
require("/server/publications/documents.in.remind.js");
require("/server/publications/documents.js");
require("/server/publications/favorites.js");
require("/server/publications/hashtags.js");
require("/server/publications/iddoc.in.fav.js");
require("/server/publications/items.js");
require("/server/publications/queues.js");
require("/server/publications/reminds.js");
require("/server/publications/rssearchs.js");
require("/server/publications/terms.js");
require("/server/publications/uploads.js");
require("/server/remind-service/remind.js");
require("/lib/main.js");
require("/server/main.js");
//# sourceURL=meteor://💻app/app/app.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvbGliL2NvbGxlY3Rpb25zL2JyYW5jaHMuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2xpYi9jb2xsZWN0aW9ucy9jYXRlZ29yeXMuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2xpYi9jb2xsZWN0aW9ucy9jbGllbnQuZG9jdW1lbnQuaW4ucXVldWVzLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9saWIvY29sbGVjdGlvbnMvZG9jdW1lbnQuYXR0YWNobWVudC5qcyIsIm1ldGVvcjovL/CfkrthcHAvbGliL2NvbGxlY3Rpb25zL2RvY3VtZW50LnJlbWluZC5qcyIsIm1ldGVvcjovL/CfkrthcHAvbGliL2NvbGxlY3Rpb25zL2RvY3VtZW50cy5pbi5yZW1pbmQuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2xpYi9jb2xsZWN0aW9ucy9kb2N1bWVudHMuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2xpYi9jb2xsZWN0aW9ucy9mYXZvcml0ZXMuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2xpYi9jb2xsZWN0aW9ucy9oYXNodGFncy5qcyIsIm1ldGVvcjovL/CfkrthcHAvbGliL2NvbGxlY3Rpb25zL2lkZG9jLmluLmZhdi5qcyIsIm1ldGVvcjovL/CfkrthcHAvbGliL2NvbGxlY3Rpb25zL2l0ZW1zLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9saWIvY29sbGVjdGlvbnMvcXVldWUuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2xpYi9jb2xsZWN0aW9ucy9yZW1pbmRzLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9saWIvY29sbGVjdGlvbnMvcnNzZWFyY2hzLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9saWIvY29sbGVjdGlvbnMvdGVybXMuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2xpYi9jb2xsZWN0aW9ucy91cGxvYWRzLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9saWIvY29uZmlnL2NvbmZpZy5qcyIsIm1ldGVvcjovL/CfkrthcHAvbGliL3NlYXJjaC1hcGkvYXBpLWZpbmQtZG9jdW1lbnQuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2xpYi9jb25zdGFudHMuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2xpYi9yb3V0ZXIuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci9jb21wcmVzcy1hbmQtZG93bmxvYWQvY29tcHJlc3MuYW5kLmRvd25sb2FkLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9zZXJ2ZXIvY29uZmlnLXVwbG9hZC1zZXJ2ZXIvaW5pdC5qcyIsIm1ldGVvcjovL/CfkrthcHAvc2VydmVyL2RhdGFiYXNlLW9ic2VydmUvZG9jdW1lbnQuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci9kYXRhYmFzZS1vYnNlcnZlL3VwbG9hZHMuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci9pbml0LXVzZXIvaW5pdC5qcyIsIm1ldGVvcjovL/CfkrthcHAvc2VydmVyL3B1YmxpY2F0aW9ucy9icmFuY2hzLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9zZXJ2ZXIvcHVibGljYXRpb25zL2NhdGVnb3J5cy5qcyIsIm1ldGVvcjovL/CfkrthcHAvc2VydmVyL3B1YmxpY2F0aW9ucy9kb2N1bWVudC1hdHRhY2htZW50LmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9zZXJ2ZXIvcHVibGljYXRpb25zL2RvY3VtZW50cmVtaW5kLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9zZXJ2ZXIvcHVibGljYXRpb25zL2RvY3VtZW50cy5pbi5yZW1pbmQuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci9wdWJsaWNhdGlvbnMvZG9jdW1lbnRzLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9zZXJ2ZXIvcHVibGljYXRpb25zL2Zhdm9yaXRlcy5qcyIsIm1ldGVvcjovL/CfkrthcHAvc2VydmVyL3B1YmxpY2F0aW9ucy9oYXNodGFncy5qcyIsIm1ldGVvcjovL/CfkrthcHAvc2VydmVyL3B1YmxpY2F0aW9ucy9pZGRvYy5pbi5mYXYuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci9wdWJsaWNhdGlvbnMvaXRlbXMuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci9wdWJsaWNhdGlvbnMvcXVldWVzLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9zZXJ2ZXIvcHVibGljYXRpb25zL3JlbWluZHMuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci9wdWJsaWNhdGlvbnMvcnNzZWFyY2hzLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9zZXJ2ZXIvcHVibGljYXRpb25zL3Rlcm1zLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9zZXJ2ZXIvcHVibGljYXRpb25zL3VwbG9hZHMuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci9yZW1pbmQtc2VydmljZS9yZW1pbmQuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci9tYWluLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9pbXBvcnRzL2NvbmZpZ3MuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvb3B0aW1pemUtcnMtc2VhcmNoLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9pbXBvcnRzL29wdGltaXplLXdoZW4tc3RhcnR1cC5qcyIsIm1ldGVvcjovL/CfkrthcHAvaW1wb3J0cy9zZXJ2ZXItcmVtaW5kLWZ1bmMuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvc3RyaW5nLWhlbHBlcnMuanMiXSwibmFtZXMiOlsiTWV0ZW9yIiwibW9kdWxlIiwid2F0Y2giLCJyZXF1aXJlIiwidiIsIkJyYW5jaHMiLCJNb25nbyIsIkNvbGxlY3Rpb24iLCJpc1NlcnZlciIsIm1ldGhvZHMiLCJhZGROZXdCcmFuY2giLCJkYXRhIiwiY2hlY2siLCJ1c2VySWQiLCJTdHJpbmciLCJpZF9yZWNvcmQiLCJNYXRjaCIsIk1heWJlIiwibmFtZSIsImFjdGl2ZSIsIkJvb2xlYW4iLCJ1c2VyIiwiYnJhbmNoIiwiXyIsImV4dGVuZCIsImlkX293bmVyIiwiX2lkIiwiZGF0ZV9jcmVhdGUiLCJEYXRlIiwiZ2V0VGltZSIsImluc2VydCIsInVwZGF0ZUJyYW5jaCIsImRhdGVfdXBkYXRlIiwidXBkYXRlIiwiJHNldCIsInJlbW92ZUJyYW5jaCIsImlkcyIsIkRvY3VtZW50cyIsImZpbmRPbmUiLCIkZWxlbU1hdGNoIiwiZmluZCIsImNvdW50IiwicmVtb3ZlIiwiQ2F0ZWdvcnlzIiwiYWRkTmV3Q2F0ZWdvcnkiLCJjYXRlZ29yeSIsInVwZGF0ZUNhdGVnb3J5IiwicmVtb3ZlQ2F0ZWdvcnkiLCJkb2N1bWVudCIsIkRvY3VtZW50SW5RdWV1ZXMiLCJBdHRhY2htZW50cyIsImFkZE5ld0F0dGFjaG1lbnQiLCJEb2N1bWVudFJlbWluZCIsIkRvY3VtZW50c0luUmVtaW5kIiwiQ29uZmlncyIsIlN0ckZ1bmMiLCJhZGROZXdEb2N1bWVudCIsImNvbnNvbGUiLCJsb2ciLCJPcHRpb25hbCIsIk9uZU9mIiwidW5kZWZpbmVkIiwiQXJyYXkiLCJoYXNodGFncyIsImRvY3VtZW50X251bWJlciIsInRlcm0iLCJub3RlIiwic3RhcnRTdGFtcCIsIk51bWJlciIsImR1ZVN0YW1wIiwicGFnZV91dWlkIiwiZXZlcnkiLCJ1bml0IiwiZmlyc3RBdHRhY2htZW50IiwibmFtZV9zZWFyY2giLCJzdHJXaXRob3V0U3BlYyIsImRvY3VtZW50X251bWJlcl9zZWFyY2giLCJpZERvY3VtZW50IiwiZm9sZGVyVXBsb2FkIiwicHJvY2VzcyIsImVudiIsIlBXRCIsImJhc2UiLCJta2RpcnAiLCJGaWJlciIsImZzIiwiZXJyIiwiZm9sZGVyVXBsb2FkUmVwbGFjZSIsIlVwbG9hZHMiLCJmZXRjaCIsIm1hcCIsImVsIiwiaWR4IiwicGF0aEZpbGVVcGxvYWQiLCJwYXRoIiwibmV3UGF0aEZpbGUiLCJuZXdfbmFtZSIsImNvcHkiLCJ0aGVuIiwiYXR0YWNobWVudCIsIm9sZEltYWdlSWQiLCJwYXRoUmVhY3RpdmUiLCJjYWxsIiwiY2F0Y2giLCJlcnJvciIsInJ1biIsInVwZGF0ZURvY3VtZW50IiwiaWREb2MiLCJzZXREZWZhdWx0RG9jdW1lbnRXaXRoSWREb2MiLCJwYWdlVVVJRCIsImRvYyIsImlzRGVmYXVsdCIsIm11bHRpIiwic2V0RGVmYXVsdERvY3VtZW50UGFnZVVVSUQiLCJ1dWlkX3BhZ2UiLCJkZWxldGVEb2N1bWVudCIsImRlbGV0ZUZvbGRlclJlY3Vyc2l2ZSIsImUiLCJleGlzdHNTeW5jIiwicmVhZGRpclN5bmMiLCJmb3JFYWNoIiwiZmlsZSIsImluZGV4IiwiY3VyUGF0aCIsImxzdGF0U3luYyIsImlzRGlyZWN0b3J5IiwidW5saW5rU3luYyIsInJtZGlyU3luYyIsImFkZFF1aWNrRG9jdW1lbnQiLCJrZXlfdW5pcXVlIiwicCIsIlByb21pc2UiLCJycyIsInJqIiwib2JzZXJ2ZUNoYW5nZXMiLCJjaGFuZ2VkIiwiZG9jdW1lbnRJblJTIiwiUnNTZWFyY2hzIiwiZmlyc3REb2NGdWxsUGF0aCIsImdldEZpcnN0QXR0YWNobWVudE9mRG9jdW1lbnQiLCJyZW1vdmVkIiwiX2lkUG9zdCIsIkZhdm9yaXRlcyIsImFkZE5ld0Zhdm9yaXRlIiwiZmF2b3JpdGUiLCJ1cGRhdGVGYXZvcml0ZSIsInJlbW92ZUZhdm9yaXRlIiwiSGFzaHRhZ3MiLCJhZGROZXdIYXNodGFnIiwiaGFzaHRhZyIsInVwZGF0ZUhhc2h0YWciLCJyZW1vdmVIYXNodGFnIiwiSWREb2N1bWVudEluRmF2b3JpdGUiLCJhZGRJZERvY1RvRmF2IiwiaWRGYXYiLCJmYXYiLCJkYXRhR2V0IiwiJGFuZCIsIiRlcSIsImlkRG9jSW5GYXYiLCJzdWNjZXNzIiwibWVzc2FnZSIsIm1lcmdlRmF2VG9RdWV1ZSIsImNvdW50QWRkIiwidmFsIiwiaW5RdWV1ZSIsIlF1ZXVlcyIsImlkX2RvYyIsInF1ZXVlIiwiY2xlYXJGYXYiLCJyZW1vdmVEb2NJbkZhdiIsIkl0ZW1zIiwiUmVtaW5kcyIsImFkZE5ld1JlbWluZCIsImludGVydmFsIiwicmVtaW5kIiwidXBkYXRlUmVtaW5kIiwicmVtb3ZlUmVtaW5kIiwiVGVybXMiLCJhZGROZXdUZXJtIiwidXBkYXRlVGVybSIsInJlbW92ZVRlcm0iLCJhbGxvdyIsImZpZWxkcyIsIm1vZGlmaWVyIiwiQWNjb3VudHMiLCJjb25maWciLCJmb3JiaWRDbGllbnRBY2NvdW50Q3JlYXRpb24iLCJTdHJIZWxwZXJzIiwiUnNTZWFyY2hPcHQiLCJmaWx0ZXIiLCJicmFuY2hzIiwiY2F0ZWdvcnlzIiwidGVybXMiLCJ1dWlkX3BhZ2Vfc2VhcmNoIiwibmFtZVJlZ2V4IiwibmFtZVdpdGhvdXRTcGVjIiwiYnVpbGRSZWdFeHAiLCJkY051bWJSZWdleCIsImRvY251bVdpdGhvdXRTcGVjIiwicXVlcnlGaWx0ZXIiLCJsZW5ndGgiLCIkaW4iLCJ0ZXN0UmVzdWx0Iiwic29ydCIsImZ1Y09wdGltaXplUnNTZWFyY2giLCJkb2NJbmZvIiwiZ2V0Rmlyc3RBdHRhY2htZW50T2ZEb2N1bWVudFRvQ29tcHJlc3MiLCJyZWFsTmFtZSIsImZ1bGxQYXRoIiwiYWJzb2x1dGVVcmwiLCJkZWZhdWx0T3B0aW9ucyIsInJvb3RVcmwiLCJXRUJfS0VZIiwiTU1fS0VZIiwiZGF5cyIsIndlZWtzIiwibW9udGhzIiwicXVhcnRlcnMiLCJ5ZWFycyIsIkdVRVNUX1FVRVVFIiwicmVxdWlyZUxvZ2luIiwibG9nZ2luZ0luIiwicmVuZGVyIiwibG9hZGluZ1RlbXBsYXRlIiwibmV4dCIsIlJvdXRlciIsImNvbmZpZ3VyZSIsImxheW91dFRlbXBsYXRlIiwibm90Rm91bmRUZW1wbGF0ZSIsIndhaXRPbiIsInN1YnNjcmliZSIsInJvdXRlIiwib25CZWZvcmVBY3Rpb24iLCJwYXJhbXMiLCJfaWRGYXYiLCJfdXVpZCIsInV1aWQiLCJhY3Rpb24iLCJjbG9uZVVVSUQiLCJSYW5kb20iLCJpZCIsInBhcmFtVVVJRCIsInRyaW0iLCJyZWRpcmVjdCIsIml0ZW0iLCJ1cGxvYWRzIiwiX2lkRG9jIiwiemlwIiwiY29tcHJlc3NBbmREb3dubG9hZCIsInJlc29sdmUiLCJjYWxsQVBJQ29tcHJlc3NRdWV1ZXMiLCJlciIsImZpbGVzIiwiYXJJZHMiLCJzcGxpdCIsInppcE5hbWUiLCJtb21lbnQiLCJmb3JtYXQiLCJ6aXBQYXRoIiwiemlwRnVsbFBhdGgiLCJjb3VudEZpbGVBZGRlZCIsImkiLCJmaXJzdERvYyIsImZpcnN0RG9jTmFtZSIsInRvU3RyaW5nIiwicmVhZEZpbGVTeW5jIiwiZ2VuZXJhdGUiLCJiYXNlNjQiLCJjb21wcmVzc2lvbiIsIm91dHB1dEZpbGVTeW5jIiwidXJsRG93bmxvYWQiLCJTdHJpbmdIZWxwZXJzIiwic3RhcnR1cCIsIlVwbG9hZFNlcnZlciIsImluaXQiLCJ0bXBEaXIiLCJ1cGxvYWREaXIiLCJjaGVja0NyZWF0ZURpcmVjdG9yaWVzIiwiZ2V0RGlyZWN0b3J5IiwiZmlsZUluZm8iLCJmb3JtRGF0YSIsImRpcmVjdG9yeU5hbWUiLCJnZXRGaWxlTmFtZSIsInByZWZpeCIsImZpbmlzaGVkIiwidGltZXN0YW1wIiwidmFsdWVPZiIsInRpbWUiLCJuZXduYW1lIiwicmVwbGFjZSIsImV4dCIsInBvcCIsIm1pbWVUeXBlcyIsInVwbG9hZCIsIkVycm9yIiwiZGVsZXRlIiwiZnVsUGF0aCIsIlNlcnZpY2VSZW1pbmQiLCJhZGRlZCIsInNhdmVSZW1pbmQiLCJlbWFpbCIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJhY2NvdW50V2l0aEVtYWlsIiwiZmluZFVzZXJCeUVtYWlsIiwiUGFja2FnZSIsInNoYSIsIlNIQTI1NiIsImNyZWF0ZVVzZXIiLCJwdWJsaXNoIiwiYWxsUmVtaW5kIiwiYWxsSWRpbkZhdiIsInVzZXJpZCIsImlkeExvb3AiLCJmaWx0ZXJRdWVyeSIsImlkX3F1ZXVlIiwic2l4SG91cnMiLCJkZWxldGVPbGRaaXAiLCJzZXRJbnRlcnZhbCIsIk9wdGltaXplU3RhcnR1cCIsIm9zIiwibWQ1IiwiaG9zdE5hbWUiLCJob3N0RGV2IiwidmFsaWQiLCJob3N0bmFtZSIsImRlbGV0ZUVtYWlsVmFsaWQiLCJkZWxldGVPbGRVcGxvYWQiLCJhY2MiLCJyZW1vdmVFbWFpbCIsInNldFVzZXJuYW1lIiwiZXhwb3J0Iiwibm93VGltZSIsInllc3RlcmRheSIsImNsb25lIiwiYWRkIiwiJGx0Iiwic3ViMURheUZyb21Ob3ciLCJvbGRGaWxlVXBsb2FkIiwibGlzdE5lZWRSZW1pbmQiLCJhZGQxRGF5RnJvbU5vdyIsImFkZDNEYXlGcm9tTm93IiwiYWxsRG9jdW1lbnRSZW1pbmRXaXRob3V0QmVmb3JlIiwiJGd0IiwiaW5kZXhPZiIsInB1c2giLCJhbGxEb2N1bWVudFJlbWluZFdpdGhCZWZvcmUiLCJkdWVEYXkiLCJtbWR1ZURheSIsIm1tQmVmb3JlIiwiYXJJbnNlcnQiLCJmb3JtYXRUaW1lIiwibW1Ob3ciLCJyZWFkZGlyIiwiZiIsIm1tRm9ybWF0IiwidGltZUluTmFtZSIsIm1tRFQiLCJkaWZmIiwicmVtb3ZlU3BlY0NoYXJWaSIsInN0ciIsInJlbW92ZURpYWNyaXRpY3MiLCJkZWZhdWx0RGlhY3JpdGljc1JlbW92YWxNYXAiLCJsZXR0ZXJzIiwic2VhcmNoVGV4dCIsIndvcmRzIiwiZXhwcyIsIndvcmQiLCJmdWxsRXhwIiwiam9pbiIsIlJlZ0V4cCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxJQUFJQSxNQUFKO0FBQVdDLE9BQU9DLEtBQVAsQ0FBYUMsUUFBUSxlQUFSLENBQWIsRUFBc0M7QUFBQ0gsU0FBT0ksQ0FBUCxFQUFTO0FBQUNKLGFBQU9JLENBQVA7QUFBUzs7QUFBcEIsQ0FBdEMsRUFBNEQsQ0FBNUQ7QUFFWEMsVUFBVSxJQUFJQyxNQUFNQyxVQUFWLENBQXFCLFNBQXJCLENBQVY7O0FBRUEsSUFBSVAsT0FBT1EsUUFBWCxFQUFxQjtBQUNqQlIsU0FBT1MsT0FBUCxDQUFlO0FBQ1hDLGtCQUFjLFVBQWdCQyxJQUFoQjtBQUFBLHNDQUFzQjtBQUNoQ0MsY0FBTVosT0FBT2EsTUFBUCxFQUFOLEVBQXVCQyxNQUF2QjtBQUNBRixjQUFNRCxJQUFOLEVBQVk7QUFDUkkscUJBQVdDLE1BQU1DLEtBQU4sQ0FBWUgsTUFBWixDQURIO0FBRVJJLGdCQUFNSixNQUZFO0FBR1JLLGtCQUFRQztBQUhBLFNBQVo7QUFNQSxZQUFJQyxPQUFPckIsT0FBT3FCLElBQVAsRUFBWDs7QUFDQSxZQUFJQyxTQUFTQyxFQUFFQyxNQUFGLENBQVNiLElB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RSxJQUFWLEVBQWdCO0FBQ3BDLFdBQU8sVUFBVUEsSUFBVixHQUFpQixHQUF4QjtBQUNILEdBRlUsQ0FBWDs7QUFHQSxNQUFJQyxVQUFVRixLQUFLRyxJQUFMLENBQVUsRUFBVixJQUFnQixJQUE5QjtBQUNBLFNBQU8sSUFBSUMsTUFBSixDQUFXRixPQUFYLEVBQW9CLEdBQXBCLENBQVA7QUFDSCxDQVBELEMiLCJmaWxlIjoiL2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TWV0ZW9yfSBmcm9tICdtZXRlb3IvbWV0ZW9yJ1xuXG5CcmFuY2hzID0gbmV3IE1vbmdvLkNvbGxlY3Rpb24oJ2JyYW5jaHMnKTtcblxuaWYgKE1ldGVvci5pc1NlcnZlcikge1xuICAgIE1ldGVvci5tZXRob2RzKHtcbiAgICAgICAgYWRkTmV3QnJhbmNoOiBhc3luYyBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgY2hlY2soTWV0ZW9yLnVzZXJJZCgpLCBTdHJpbmcpO1xuICAgICAgICAgICAgY2hlY2soZGF0YSwge1xuICAgICAgICAgICAgICAgIGlkX3JlY29yZDogTWF0Y2guTWF5YmUoU3RyaW5nKSxcbiAgICAgICAgICAgICAgICBuYW1lOiBTdHJpbmcsXG4gICAgICAgICAgICAgICAgYWN0aXZlOiBCb29sZWFuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbGV0IHVzZXIgPSBNZXRlb3IudXNlcigpO1xuICAgICAgICAgICAgbGV0IGJyYW5jaCA9IF8uZXh0ZW5kKGRhdGEsIHtcbiAgICAgICAgICAgICAgICBpZF9vd25lcjogdXNlci5faWQsXG4gICAgICAgICAgICAgICAgZGF0ZV9jcmVhdGU6IG5ldyBEYXRlKCkuZ2V0VGltZSgpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBkZWxldGUgYnJhbmNoLmlkX3JlY29yZDtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBCcmFuY2hzLmluc2VydChicmFuY2gpO1xuICAgICAgICB9LFxuICAgICAgICB1cGRhdGVCcmFuY2g6IGFzeW5jIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICBjaGVjayhNZXRlb3IudXNlcklkKCksIFN0cmluZyk7XG4gICAgICAgICAgICBjaGVjayhkYXRhLCB7XG4gICAgICAgICAgICAgICAgaWRfcmVjb3JkOiBTdHJpbmcsXG4gICAgICAgICAgICAgICAgbmFtZTogU3RyaW5nLFxuICAgICAgICAgICAgICAgIGFjdGl2ZTogQm9vbGVhblxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBsZXQgX2lkID0gZGF0YS5pZF9yZWNvcmQ7XG4gICAgICAgICAgICBsZXQgYnJhbmNoID0gXy5leHRlbmQoZGF0YSwge1xuICAgICAgICAgICAgICAgIGRhdGVfdXBkYXRlOiBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZGVsZXRlIGJyYW5jaC5pZF9yZWNvcmQ7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgIEJyYW5jaHMudXBkYXRlKF9pZCwge1xuICAgICAgICAgICAgICAgICRzZXQ6IGJyYW5jaCxcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0sXG4gICAgICAgIHJlbW92ZUJyYW5jaDogYXN5bmMgZnVuY3Rpb24gKF9pZCkge1xuICAgICAgICAgICAgY2hlY2soTWV0ZW9yLnVzZXJJZCgpLCBTdHJpbmcpO1xuICAgICAgICAgICAgY2hlY2soX2lkLCBTdHJpbmcpO1xuICAgICAgICAgICAgLyogY2hlY2sgdGVybSB1c2luZyBvdGhlciBkb2N1bWVudCAqL1xuICAgICAgICAgICAgbGV0IGlkcyA9IFtfaWRdO1xuICAgICAgICAgICAgbGV0IGJyYW5jaCA9IGF3YWl0IERvY3VtZW50cy5maW5kT25lKHtcbiAgICAgICAgICAgICAgICBicmFuY2g6IHtcbiAgICAgICAgICAgICAgICAgICAgJGVsZW1NYXRjaDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCIkaW5cIjogaWRzXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYoYnJhbmNoKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKEJyYW5jaHMuZmluZChfaWQpLmNvdW50KCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgQnJhbmNocy5yZW1vdmUoe19pZDogX2lkfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59XG5cblxuLy8gQnJhbmNocy5maW5kKCkub2JzZXJ2ZUNoYW5nZXMoe1xuLy8gICAgIGFkZGVkOiBmdW5jdGlvbihpZCwgb2JqZWN0KSB7XG4vLyAgICAgfSxcbi8vICAgICBjaGFuZ2VkOiBmdW5jdGlvbiAoaWQsIG9iamVjdCkge1xuLy8gICAgIH0sXG4vLyAgICAgcmVtb3ZlZDogZnVuY3Rpb24gKGlkLCBvYmplY3QpIHtcbi8vICAgICB9XG4vLyB9KTtcbiIsImltcG9ydCB7TWV0ZW9yfSBmcm9tICdtZXRlb3IvbWV0ZW9yJ1xuXG5DYXRlZ29yeXMgPSBuZXcgTW9uZ28uQ29sbGVjdGlvbignY2F0ZWdvcnlzJyk7XG5cbmlmIChNZXRlb3IuaXNTZXJ2ZXIpIHtcbiAgICBNZXRlb3IubWV0aG9kcyh7XG4gICAgICAgIGFkZE5ld0NhdGVnb3J5OiBhc3luYyBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgY2hlY2soTWV0ZW9yLnVzZXJJZCgpLCBTdHJpbmcpO1xuICAgICAgICAgICAgY2hlY2soZGF0YSwge1xuICAgICAgICAgICAgICAgIGlkX3JlY29yZDogTWF0Y2guTWF5YmUoU3RyaW5nKSxcbiAgICAgICAgICAgICAgICBuYW1lOiBTdHJpbmcsXG4gICAgICAgICAgICAgICAgYWN0aXZlOiBCb29sZWFuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbGV0IHVzZXIgPSBNZXRlb3IudXNlcigpO1xuICAgICAgICAgICAgbGV0IGNhdGVnb3J5ID0gXy5leHRlbmQoZGF0YSwge1xuICAgICAgICAgICAgICAgIGlkX293bmVyOiB1c2VyLl9pZCxcbiAgICAgICAgICAgICAgICBkYXRlX2NyZWF0ZTogbmV3IERhdGUoKS5nZXRUaW1lKCksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGRlbGV0ZSBjYXRlZ29yeS5pZF9yZWNvcmQ7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgQ2F0ZWdvcnlzLmluc2VydChjYXRlZ29yeSk7XG4gICAgICAgIH0sXG4gICAgICAgIHVwZGF0ZUNhdGVnb3J5OiBhc3luYyBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgY2hlY2soTWV0ZW9yLnVzZXJJZCgpLCBTdHJpbmcpO1xuICAgICAgICAgICAgY2hlY2soZGF0YSwge1xuICAgICAgICAgICAgICAgIGlkX3JlY29yZDogU3RyaW5nLFxuICAgICAgICAgICAgICAgIG5hbWU6IFN0cmluZyxcbiAgICAgICAgICAgICAgICBhY3RpdmU6IEJvb2xlYW5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbGV0IF9pZCA9IGRhdGEuaWRfcmVjb3JkO1xuICAgICAgICAgICAgbGV0IGNhdGVnb3J5ID0gXy5leHRlbmQoZGF0YSwge1xuICAgICAgICAgICAgICAgIGRhdGVfdXBkYXRlOiBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZGVsZXRlIGNhdGVnb3J5LmlkX3JlY29yZDtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCAgQ2F0ZWdvcnlzLnVwZGF0ZShfaWQsIHtcbiAgICAgICAgICAgICAgICAkc2V0OiBjYXRlZ29yeSxcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0sXG4gICAgICAgIHJlbW92ZUNhdGVnb3J5OiBhc3luYyBmdW5jdGlvbiAoX2lkKSB7XG4gICAgICAgICAgICBjaGVjayhNZXRlb3IudXNlcklkKCksIFN0cmluZyk7XG4gICAgICAgICAgICBjaGVjayhfaWQsIFN0cmluZyk7XG4gICAgICAgICAgICAvL2NoZWNrIGRvY3VtZW50IHVzaW5nIGNhdGVnb3J5XG4gICAgICAgICAgICBsZXQgZG9jdW1lbnQgPSBhd2FpdCBEb2N1bWVudHMuZmluZE9uZSh7Y2F0ZWdvcnk6IF9pZH0pO1xuICAgICAgICAgICAgaWYoZG9jdW1lbnQpe1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKENhdGVnb3J5cy5maW5kKF9pZCkuY291bnQoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCBDYXRlZ29yeXMucmVtb3ZlKHtfaWQ6IF9pZH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5cblxuIiwiRG9jdW1lbnRJblF1ZXVlcyA9IG5ldyBNb25nby5Db2xsZWN0aW9uKCdkb2N1bWVudC1pbi1xdWV1ZXMnKTtcbiIsImltcG9ydCB7TWV0ZW9yfSBmcm9tICdtZXRlb3IvbWV0ZW9yJ1xuXG5BdHRhY2htZW50cyA9IG5ldyBNb25nby5Db2xsZWN0aW9uKCdhdHRhY2htZW50cycpO1xuXG5pZiAoTWV0ZW9yLmlzU2VydmVyKSB7XG4gICAgTWV0ZW9yLm1ldGhvZHMoe1xuICAgICAgICBhZGROZXdBdHRhY2htZW50OiBhc3luYyBmdW5jdGlvbiAoZG9jdW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBBdHRhY2htZW50cy5pbnNlcnQoZG9jdW1lbnQpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbiIsIkRvY3VtZW50UmVtaW5kID0gbmV3IE1vbmdvLkNvbGxlY3Rpb24oJ2RvY3VtZW50LXJlbWluZCcpO1xuIiwiRG9jdW1lbnRzSW5SZW1pbmQgPSBuZXcgTW9uZ28uQ29sbGVjdGlvbignZG9jdW1lbnRzLWluLXJlbWluZCcpO1xuIiwiaW1wb3J0IHtNZXRlb3J9IGZyb20gJ21ldGVvci9tZXRlb3InXG5pbXBvcnQgKiBhcyBDb25maWdzIGZyb20gXCIuLi8uLi9pbXBvcnRzL2NvbmZpZ3NcIjtcbkRvY3VtZW50cyA9IG5ldyBNb25nby5Db2xsZWN0aW9uKCdkb2N1bWVudHMnKTtcbmxldCBTdHJGdW5jID0gcmVxdWlyZSgnLi4vLi4vaW1wb3J0cy9zdHJpbmctaGVscGVycycpO1xuXG5cbmlmIChNZXRlb3IuaXNTZXJ2ZXIpIHtcbiAgICBNZXRlb3IubWV0aG9kcyh7XG4gICAgICAgIGFkZE5ld0RvY3VtZW50OiBhc3luYyBmdW5jdGlvbiAoZG9jdW1lbnQpIHtcbiAgICAgICAgICAgIGNoZWNrKE1ldGVvci51c2VySWQoKSwgU3RyaW5nKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRvY3VtZW50KTtcbiAgICAgICAgICAgIGNoZWNrKGRvY3VtZW50LCB7XG4gICAgICAgICAgICAgICAgYnJhbmNoOiBNYXRjaC5PcHRpb25hbChNYXRjaC5PbmVPZih1bmRlZmluZWQsIG51bGwsIEFycmF5KSksXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6IE1hdGNoLk9wdGlvbmFsKE1hdGNoLk9uZU9mKHVuZGVmaW5lZCwgbnVsbCwgU3RyaW5nKSksXG4gICAgICAgICAgICAgICAgaGFzaHRhZ3M6IE1hdGNoLk9wdGlvbmFsKE1hdGNoLk9uZU9mKHVuZGVmaW5lZCwgbnVsbCwgQXJyYXkpKSxcbiAgICAgICAgICAgICAgICBuYW1lOiBTdHJpbmcsXG4gICAgICAgICAgICAgICAgZG9jdW1lbnRfbnVtYmVyOiBNYXRjaC5PcHRpb25hbChNYXRjaC5PbmVPZih1bmRlZmluZWQsIG51bGwsIFN0cmluZykpLFxuICAgICAgICAgICAgICAgIHRlcm06IE1hdGNoLk9wdGlvbmFsKE1hdGNoLk9uZU9mKHVuZGVmaW5lZCwgbnVsbCwgQXJyYXkpKSxcbiAgICAgICAgICAgICAgICBub3RlOiBNYXRjaC5PcHRpb25hbChNYXRjaC5PbmVPZih1bmRlZmluZWQsIG51bGwsIFN0cmluZykpLFxuICAgICAgICAgICAgICAgIHN0YXJ0U3RhbXA6IE1hdGNoLk9wdGlvbmFsKE1hdGNoLk9uZU9mKHVuZGVmaW5lZCwgbnVsbCwgTnVtYmVyKSksXG4gICAgICAgICAgICAgICAgZHVlU3RhbXA6IE1hdGNoLk9wdGlvbmFsKE1hdGNoLk9uZU9mKHVuZGVmaW5lZCwgbnVsbCwgTnVtYmVyKSksXG4gICAgICAgICAgICAgICAgcGFnZV91dWlkOiBTdHJpbmcsXG4gICAgICAgICAgICAgICAgZXZlcnk6IE51bWJlcixcbiAgICAgICAgICAgICAgICB1bml0OiBTdHJpbmcsXG4gICAgICAgICAgICAgICAgZmlyc3RBdHRhY2htZW50OiBNYXRjaC5PcHRpb25hbChNYXRjaC5PbmVPZih1bmRlZmluZWQsIG51bGwsIFN0cmluZykpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB1c2VyID0gTWV0ZW9yLnVzZXIoKTtcbiAgICAgICAgICAgIGRvY3VtZW50ID0gXy5leHRlbmQoZG9jdW1lbnQsIHtcbiAgICAgICAgICAgICAgICBpZF9vd25lcjogdXNlci5faWQsXG4gICAgICAgICAgICAgICAgZGF0ZV9jcmVhdGU6IG5ldyBEYXRlKCkuZ2V0VGltZSgpLFxuICAgICAgICAgICAgICAgIG5hbWVfc2VhcmNoOiBTdHJGdW5jLnN0cldpdGhvdXRTcGVjKGRvY3VtZW50Lm5hbWUpLFxuICAgICAgICAgICAgICAgIGRvY3VtZW50X251bWJlcl9zZWFyY2g6IFN0ckZ1bmMuc3RyV2l0aG91dFNwZWMoZG9jdW1lbnQuZG9jdW1lbnRfbnVtYmVyKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBsZXQgcGFnZV91dWlkID0gZG9jdW1lbnQucGFnZV91dWlkO1xuICAgICAgICAgICAgLy8gY3JlYXRlIG5ldyBkb2N1bWVudCB3aXRob3V0IGF0dGFjaG1lbnRzXG4gICAgICAgICAgICBsZXQgaWREb2N1bWVudCA9IGF3YWl0IERvY3VtZW50cy5pbnNlcnQoZG9jdW1lbnQpO1xuICAgICAgICAgICAgbGV0IGZvbGRlclVwbG9hZCA9IHByb2Nlc3MuZW52LlBXRCArICcvLnVwbG9hZHMvJztcbiAgICAgICAgICAgIGxldCBiYXNlID0gcHJvY2Vzcy5lbnYuUFdEICsgJy8udXBsb2Fkcy8nICsgaWREb2N1bWVudDtcbiAgICAgICAgICAgIHZhciBta2RpcnAgPSByZXF1aXJlKCdta2RpcnAnKTtcbiAgICAgICAgICAgIHZhciBGaWJlciA9IHJlcXVpcmUoJ2ZpYmVycycpO1xuICAgICAgICAgICAgdmFyIGZzID0gcmVxdWlyZSgnZnMtZXh0cmEnKVxuICAgICAgICAgICAgbWtkaXJwKGJhc2UsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2NyZWF0ZSBuZXcgZm9sZGVyOiAnICsgYmFzZSk7XG4gICAgICAgICAgICAgICAgICAgIC8vbW92ZSBhdHRhY2htZW50IGZyb20gdG1wIHRvIGRvY3VtZW50cy1mb2xkZXJcbiAgICAgICAgICAgICAgICAgICAgRmliZXIoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZvbGRlclVwbG9hZFJlcGxhY2UgPSAnL3VwbG9hZC8nO1xuICAgICAgICAgICAgICAgICAgICAgICAgVXBsb2Fkcy5maW5kKHsndXVpZF9wYWdlJzogcGFnZV91dWlkfSkuZmV0Y2goKS5tYXAoKGVsLCBpZHgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcGF0aEZpbGVVcGxvYWQgPSAoZm9sZGVyVXBsb2FkICsgZWwucGF0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld1BhdGhGaWxlID0gYmFzZSArICcvJyArIGVsLm5ld19uYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZzLmNvcHkocGF0aEZpbGVVcGxvYWQsIG5ld1BhdGhGaWxlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzYXZlIG5ldyBmaWxlIHRvIGF0dGFjaG1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhdHRhY2htZW50ID0gZWw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgb2xkSW1hZ2VJZCA9IGF0dGFjaG1lbnQuX2lkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGF0dGFjaG1lbnQuX2lkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0YWNobWVudC5wYXRoUmVhY3RpdmUgPSBpZERvY3VtZW50ICsgJy8nICsgZWwucGF0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dGFjaG1lbnQuaWREb2N1bWVudCA9IGlkRG9jdW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNZXRlb3IuY2FsbCgnYWRkTmV3QXR0YWNobWVudCcsIGF0dGFjaG1lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTWV0ZW9yLmNhbGwoJ2RlbGV0ZUZpbGUnLCB7X2lkOiBvbGRJbWFnZUlkfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiBjb25zb2xlLmVycm9yKGVycikpXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSkucnVuKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIHBhdGggZXhpc3RzIHVubGVzcyB0aGVyZSB3YXMgYW4gZXJyb3JcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgIH0pO1xuXG4gICAgTWV0ZW9yLm1ldGhvZHMoe1xuICAgICAgICB1cGRhdGVEb2N1bWVudDogYXN5bmMgZnVuY3Rpb24gKGRvY3VtZW50KSB7XG4gICAgICAgICAgICBjaGVjayhNZXRlb3IudXNlcklkKCksIFN0cmluZyk7XG4gICAgICAgICAgICBjaGVjayhkb2N1bWVudCwge1xuICAgICAgICAgICAgICAgIF9pZDogU3RyaW5nLFxuICAgICAgICAgICAgICAgIGJyYW5jaDogTWF0Y2guT3B0aW9uYWwoTWF0Y2guT25lT2YodW5kZWZpbmVkLCBudWxsLCBBcnJheSkpLFxuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiBNYXRjaC5PcHRpb25hbChNYXRjaC5PbmVPZih1bmRlZmluZWQsIG51bGwsIFN0cmluZykpLFxuICAgICAgICAgICAgICAgIGhhc2h0YWdzOiBNYXRjaC5PcHRpb25hbChNYXRjaC5PbmVPZih1bmRlZmluZWQsIG51bGwsIEFycmF5KSksXG4gICAgICAgICAgICAgICAgbmFtZTogU3RyaW5nLFxuICAgICAgICAgICAgICAgIGRvY3VtZW50X251bWJlcjogTWF0Y2guT3B0aW9uYWwoTWF0Y2guT25lT2YodW5kZWZpbmVkLCBudWxsLCBTdHJpbmcpKSxcbiAgICAgICAgICAgICAgICB0ZXJtOiBNYXRjaC5PcHRpb25hbChNYXRjaC5PbmVPZih1bmRlZmluZWQsIG51bGwsIEFycmF5KSksXG4gICAgICAgICAgICAgICAgbm90ZTogTWF0Y2guT3B0aW9uYWwoTWF0Y2guT25lT2YodW5kZWZpbmVkLCBudWxsLCBTdHJpbmcpKSxcbiAgICAgICAgICAgICAgICBzdGFydFN0YW1wOiBNYXRjaC5PcHRpb25hbChNYXRjaC5PbmVPZih1bmRlZmluZWQsIG51bGwsIE51bWJlcikpLFxuICAgICAgICAgICAgICAgIGR1ZVN0YW1wOiBNYXRjaC5PcHRpb25hbChNYXRjaC5PbmVPZih1bmRlZmluZWQsIG51bGwsIE51bWJlcikpLFxuICAgICAgICAgICAgICAgIHBhZ2VfdXVpZDogU3RyaW5nLFxuICAgICAgICAgICAgICAgIGV2ZXJ5OiBOdW1iZXIsXG4gICAgICAgICAgICAgICAgdW5pdDogU3RyaW5nLFxuICAgICAgICAgICAgICAgIGZpcnN0QXR0YWNobWVudDogTWF0Y2guT3B0aW9uYWwoTWF0Y2guT25lT2YodW5kZWZpbmVkLCBudWxsLCBTdHJpbmcpKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdXNlciA9IE1ldGVvci51c2VyKCk7XG4gICAgICAgICAgICBkb2N1bWVudC5uYW1lX3NlYXJjaCA9IFN0ckZ1bmMuc3RyV2l0aG91dFNwZWMoZG9jdW1lbnQubmFtZSk7XG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudF9udW1iZXJfc2VhcmNoID0gU3RyRnVuYy5zdHJXaXRob3V0U3BlYyhkb2N1bWVudC5kb2N1bWVudF9udW1iZXIpO1xuICAgICAgICAgICAgZG9jdW1lbnQgPSBfLmV4dGVuZChkb2N1bWVudCwge1xuICAgICAgICAgICAgICAgIGRhdGVfdXBkYXRlOiBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbGV0IGlkRG9jID0gZG9jdW1lbnQuX2lkO1xuICAgICAgICAgICAgZGVsZXRlIGRvY3VtZW50Ll9pZDtcblxuICAgICAgICAgICAgcmV0dXJuIGF3YWl0ICBEb2N1bWVudHMudXBkYXRlKGlkRG9jLCB7XG4gICAgICAgICAgICAgICAgJHNldDogZG9jdW1lbnQsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICB9KTtcblxuXG4gICAgTWV0ZW9yLm1ldGhvZHMoe1xuICAgICAgICBzZXREZWZhdWx0RG9jdW1lbnRXaXRoSWREb2M6IGFzeW5jIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICBjaGVjayhNZXRlb3IudXNlcklkKCksIFN0cmluZyk7XG4gICAgICAgICAgICBjaGVjayhkYXRhLCB7XG4gICAgICAgICAgICAgICAgX2lkOiBTdHJpbmcsXG4gICAgICAgICAgICAgICAgcGFnZVVVSUQ6IFN0cmluZyxcbiAgICAgICAgICAgICAgICBpZERvY3VtZW50OiBTdHJpbmcsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIF9pZCBpcyBhdHRhY2htZW50IGlkXG4gICAgICAgICAgICBsZXQgaWREb2MgPSBkYXRhLmlkRG9jdW1lbnQ7XG4gICAgICAgICAgICBsZXQgZG9jID0gRG9jdW1lbnRzLmZpbmRPbmUoaWREb2MpO1xuICAgICAgICAgICAgaWYoZG9jKXtcbiAgICAgICAgICAgICAgICBBdHRhY2htZW50cy51cGRhdGUoe2lkRG9jdW1lbnQ6IGlkRG9jfSwge1xuICAgICAgICAgICAgICAgICAgICAkc2V0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc0RlZmF1bHQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwge211bHRpOiB0cnVlfSk7XG4gICAgICAgICAgICAgICAgQXR0YWNobWVudHMudXBkYXRlKGRhdGEuX2lkLCB7XG4gICAgICAgICAgICAgICAgICAgICRzZXQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzRGVmYXVsdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuXG4gICAgTWV0ZW9yLm1ldGhvZHMoe1xuICAgICAgICBzZXREZWZhdWx0RG9jdW1lbnRQYWdlVVVJRDogYXN5bmMgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIGNoZWNrKE1ldGVvci51c2VySWQoKSwgU3RyaW5nKTtcbiAgICAgICAgICAgIGNoZWNrKGRhdGEsIHtcbiAgICAgICAgICAgICAgICBfaWQ6IFN0cmluZyxcbiAgICAgICAgICAgICAgICBwYWdlVVVJRDogU3RyaW5nLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBVcGxvYWRzLnVwZGF0ZSh7dXVpZF9wYWdlOiBkYXRhLnBhZ2VVVUlEfSwge1xuICAgICAgICAgICAgICAgICRzZXQ6IHtcbiAgICAgICAgICAgICAgICAgICAgaXNEZWZhdWx0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCB7bXVsdGk6IHRydWV9KTtcbiAgICAgICAgICAgIFVwbG9hZHMudXBkYXRlKGRhdGEuX2lkLCB7XG4gICAgICAgICAgICAgICAgJHNldDoge1xuICAgICAgICAgICAgICAgICAgICBpc0RlZmF1bHQ6IHRydWUsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICBNZXRlb3IubWV0aG9kcyh7XG4gICAgICAgIGRlbGV0ZURvY3VtZW50OiBmdW5jdGlvbiAoaWREb2MpIHtcbiAgICAgICAgICAgIGNoZWNrKE1ldGVvci51c2VySWQoKSwgU3RyaW5nKTtcbiAgICAgICAgICAgIGNoZWNrKGlkRG9jLCBTdHJpbmcpO1xuICAgICAgICAgICAgdHJ5e1xuICAgICAgICAgICAgICAgIHZhciBGaWJlciA9IHJlcXVpcmUoJ2ZpYmVycycpO1xuICAgICAgICAgICAgICAgIHZhciBmcyA9IHJlcXVpcmUoJ2ZzLWV4dHJhJyk7XG4gICAgICAgICAgICAgICAgRmliZXIoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZG9jID0gRG9jdW1lbnRzLmZpbmRPbmUoaWREb2MpO1xuICAgICAgICAgICAgICAgICAgICBpZighZG9jKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBBdHRhY2htZW50cy5yZW1vdmUoe2lkRG9jdW1lbnQ6IGlkRG9jfSwge211bHRpOiB0cnVlfSk7XG4gICAgICAgICAgICAgICAgICAgIERvY3VtZW50cy5yZW1vdmUoaWREb2MpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZnMgPSByZXF1aXJlKCdmcy1leHRyYScpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZm9sZGVyVXBsb2FkID0gcHJvY2Vzcy5lbnYuUFdEICsgJy8udXBsb2Fkcy8nICsgaWREb2M7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZUZvbGRlclJlY3Vyc2l2ZShmb2xkZXJVcGxvYWQsIGZzKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfSkucnVuKCk7XG4gICAgICAgICAgICB9Y2F0Y2ggKGUpe1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gZGVsZXRlRm9sZGVyUmVjdXJzaXZlKHBhdGgsIGZzKSB7XG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgIGlmIChmcy5leGlzdHNTeW5jKHBhdGgpKSB7XG4gICAgICAgICAgICAgICAgZnMucmVhZGRpclN5bmMocGF0aCkuZm9yRWFjaChmdW5jdGlvbiAoZmlsZSwgaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGN1clBhdGggPSBwYXRoICsgXCIvXCIgKyBmaWxlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZnMubHN0YXRTeW5jKGN1clBhdGgpLmlzRGlyZWN0b3J5KCkpIHsgLy8gcmVjdXJzZVxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlRm9sZGVyUmVjdXJzaXZlKGN1clBhdGgsIGZzKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHsgLy8gZGVsZXRlIGZpbGVcbiAgICAgICAgICAgICAgICAgICAgICAgIGZzLnVubGlua1N5bmMoY3VyUGF0aCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBmcy5ybWRpclN5bmMocGF0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1jYXRjaCAoZSl7fVxuICAgIH07XG5cbiAgICBNZXRlb3IubWV0aG9kcyh7XG4gICAgICAgIGFkZFF1aWNrRG9jdW1lbnQ6IGFzeW5jIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICBjaGVjayhNZXRlb3IudXNlcklkKCksIFN0cmluZyk7XG4gICAgICAgICAgICBjaGVjayhkYXRhLCB7XG4gICAgICAgICAgICAgICAgYnJhbmNoOiBNYXRjaC5PcHRpb25hbChNYXRjaC5PbmVPZih1bmRlZmluZWQsIG51bGwsIEFycmF5KSksXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6IE1hdGNoLk9wdGlvbmFsKE1hdGNoLk9uZU9mKHVuZGVmaW5lZCwgbnVsbCwgU3RyaW5nKSksXG4gICAgICAgICAgICAgICAgcGFnZV91dWlkOiBTdHJpbmcsXG4gICAgICAgICAgICAgICAgaGFzaHRhZ3M6IE1hdGNoLk9wdGlvbmFsKE1hdGNoLk9uZU9mKHVuZGVmaW5lZCwgbnVsbCwgQXJyYXkpKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbGV0IHVzZXIgPSBNZXRlb3IudXNlcklkKCk7XG4gICAgICAgICAgICB2YXIgRmliZXIgPSByZXF1aXJlKCdmaWJlcnMnKTtcbiAgICAgICAgICAgIEZpYmVyKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAvL2dldCBhbGwgYXR0YWNobWVudCBpbiBwYWdlIHV1aWRcbiAgICAgICAgICAgICAgICBVcGxvYWRzLmZpbmQoeyd1dWlkX3BhZ2UnOiBkYXRhLnBhZ2VfdXVpZH0pLmZldGNoKCkubWFwKChlbCwgaWR4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBuYW1lID0gZWwucGF0aDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRvY3VtZW50ID0gXy5leHRlbmQoZGF0YSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWRfb3duZXI6IHVzZXIuX2lkLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZV9jcmVhdGU6IG5ldyBEYXRlKCkuZ2V0VGltZSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWVfc2VhcmNoOiBTdHJGdW5jLnN0cldpdGhvdXRTcGVjKG5hbWUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RBdHRhY2htZW50OiBlbC5rZXlfdW5pcXVlXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBsZXQgcCA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChycywgcmopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJzKERvY3VtZW50cy5pbnNlcnQoZG9jdW1lbnQpKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgcC50aGVuKGlkRG9jID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGlkRG9jKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZm9sZGVyVXBsb2FkID0gcHJvY2Vzcy5lbnYuUFdEICsgJy8udXBsb2Fkcy8nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBiYXNlID0gcHJvY2Vzcy5lbnYuUFdEICsgJy8udXBsb2Fkcy8nICsgaWREb2M7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1rZGlycCA9IHJlcXVpcmUoJ21rZGlycCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmcyA9IHJlcXVpcmUoJ2ZzLWV4dHJhJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWtkaXJwKGJhc2UsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwYXRoRmlsZVVwbG9hZCA9IChmb2xkZXJVcGxvYWQgKyBlbC5wYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXdQYXRoRmlsZSA9IGJhc2UgKyAnLycgKyBlbC5uZXdfbmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZzLmNvcHkocGF0aEZpbGVVcGxvYWQsIG5ld1BhdGhGaWxlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGF0dGFjaG1lbnQgPSBlbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9sZEltYWdlSWQgPSBhdHRhY2htZW50Ll9pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGF0dGFjaG1lbnQuX2lkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRhY2htZW50LnBhdGhSZWFjdGl2ZSA9IGlkRG9jICsgJy8nICsgZWwucGF0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0YWNobWVudC5pZERvY3VtZW50ID0gaWREb2M7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dGFjaG1lbnQuaXNEZWZhdWx0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTWV0ZW9yLmNhbGwoJ2FkZE5ld0F0dGFjaG1lbnQnLCBhdHRhY2htZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTWV0ZW9yLmNhbGwoJ2RlbGV0ZUZpbGUnLCB7X2lkOiBvbGRJbWFnZUlkfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IGNvbnNvbGUuZXJyb3IoZXJyKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBwLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSkucnVuKCk7XG4gICAgICAgIH1cbiAgICB9KVxufVxuXG5pZihNZXRlb3IuaXNTZXJ2ZXIpe1xuXHQvL3RyYWNrZXIgRG9jdW1lbnRDaGFuZ2Vcblx0RG9jdW1lbnRzLmZpbmQoe30pLm9ic2VydmVDaGFuZ2VzKHtcblx0XHRhc3luYyBjaGFuZ2VkKGlkRG9jLCBkb2N1bWVudCkge1xuXHRcdCAgICBjb25zb2xlLmxvZygnZG9jdW1lbnQgY2hhbmdlZCcpO1xuXHRcdFx0Y29uc3QgZG9jdW1lbnRJblJTID0gUnNTZWFyY2hzLmZpbmRPbmUoe1xuXHRcdFx0XHRpZF9yZWNvcmQ6IGlkRG9jXG5cdFx0XHR9KTtcblx0XHRcdGlmIChkb2N1bWVudEluUlMpIHtcblx0XHRcdFx0ZG9jdW1lbnRJblJTLmJyYW5jaCA9IGRvY3VtZW50LmJyYW5jaDtcblx0XHRcdFx0ZG9jdW1lbnRJblJTLmNhdGVnb3J5ID0gZG9jdW1lbnQuY2F0ZWdvcnk7XG5cdFx0XHRcdGRvY3VtZW50SW5SUy5oYXNodGFncyA9IGRvY3VtZW50Lmhhc2h0YWdzO1xuXHRcdFx0XHRkb2N1bWVudEluUlMubmFtZSA9IGRvY3VtZW50Lm5hbWU7XG5cdFx0XHRcdGRvY3VtZW50SW5SUy5kb2N1bWVudF9udW1iZXIgPSBkb2N1bWVudC5kb2N1bWVudF9udW1iZXI7XG5cdFx0XHRcdGRvY3VtZW50SW5SUy50ZXJtID0gZG9jdW1lbnQudGVybTtcblx0XHRcdFx0ZG9jdW1lbnRJblJTLm5vdGUgPSBkb2N1bWVudC5ub3RlO1xuXHRcdFx0XHRkb2N1bWVudEluUlMuc3RhcnRTdGFtcCA9IGRvY3VtZW50LnN0YXJ0U3RhbXA7XG5cdFx0XHRcdGRvY3VtZW50SW5SUy5kdWVTdGFtcCA9IGRvY3VtZW50LmR1ZVN0YW1wO1xuXHRcdFx0XHRkb2N1bWVudEluUlMucGFnZV91dWlkID0gZG9jdW1lbnQucGFnZV91dWlkO1xuXHRcdFx0XHRkb2N1bWVudEluUlMuZXZlcnkgPSBkb2N1bWVudC5ldmVyeTtcblx0XHRcdFx0ZG9jdW1lbnRJblJTLnVuaXQgPSBkb2N1bWVudC51bml0O1xuXHRcdFx0XHRkb2N1bWVudEluUlMuZmlyc3RBdHRhY2htZW50ID0gZG9jdW1lbnQuZmlyc3RBdHRhY2htZW50O1xuXHRcdFx0XHRkb2N1bWVudEluUlMubmFtZV9zZWFyY2ggPSBkb2N1bWVudC5uYW1lX3NlYXJjaDtcblx0XHRcdFx0ZG9jdW1lbnRJblJTLmRvY3VtZW50X251bWJlcl9zZWFyY2ggPSBkb2N1bWVudC5kb2N1bWVudF9udW1iZXJfc2VhcmNoO1xuXHRcdFx0XHRkb2N1bWVudEluUlMuZmlyc3REb2NGdWxsUGF0aCA9IENvbmZpZ3MuZ2V0Rmlyc3RBdHRhY2htZW50T2ZEb2N1bWVudChpZERvYyk7XG5cdFx0XHRcdGRlbGV0ZSBkb2N1bWVudEluUlMuX2lkO1xuXHRcdFx0XHRhd2FpdCAgUnNTZWFyY2hzLnVwZGF0ZSh7aWRfcmVjb3JkOiBpZERvY30sIHtcblx0XHRcdFx0XHQkc2V0OiBkb2N1bWVudEluUlMsXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGF3YWl0ICBEb2N1bWVudEluUXVldWVzLnVwZGF0ZSh7aWRfcmVjb3JkOiBpZERvY30sIHtcblx0XHRcdFx0XHQkc2V0OiBkb2N1bWVudEluUlMsXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0cmVtb3ZlZChfaWRQb3N0KSB7XG5cdFx0fSxcblx0fSk7XG59XG5cbiIsIkZhdm9yaXRlcyA9IG5ldyBNb25nby5Db2xsZWN0aW9uKCdmYXZvcml0ZXMnKTtcblxuaWYgKE1ldGVvci5pc1NlcnZlcikge1xuICAgIE1ldGVvci5tZXRob2RzKHtcbiAgICAgICAgYWRkTmV3RmF2b3JpdGU6IGFzeW5jIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICBjaGVjayhNZXRlb3IudXNlcklkKCksIFN0cmluZyk7XG4gICAgICAgICAgICBjaGVjayhkYXRhLCB7XG4gICAgICAgICAgICAgICAgaWRfcmVjb3JkOiBNYXRjaC5NYXliZShTdHJpbmcpLFxuICAgICAgICAgICAgICAgIG5hbWU6IFN0cmluZyxcbiAgICAgICAgICAgICAgICBhY3RpdmU6IEJvb2xlYW4sXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbGV0IHVzZXIgPSBNZXRlb3IudXNlcigpO1xuICAgICAgICAgICAgbGV0IGZhdm9yaXRlID0gXy5leHRlbmQoZGF0YSwge1xuICAgICAgICAgICAgICAgIGlkX293bmVyOiB1c2VyLl9pZCxcbiAgICAgICAgICAgICAgICBkYXRlX2NyZWF0ZTogbmV3IERhdGUoKS5nZXRUaW1lKCksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGRlbGV0ZSBmYXZvcml0ZS5pZF9yZWNvcmQ7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgRmF2b3JpdGVzLmluc2VydChmYXZvcml0ZSk7XG4gICAgICAgIH0sXG4gICAgICAgIHVwZGF0ZUZhdm9yaXRlOiBhc3luYyBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgY2hlY2soTWV0ZW9yLnVzZXJJZCgpLCBTdHJpbmcpO1xuICAgICAgICAgICAgY2hlY2soZGF0YSwge1xuICAgICAgICAgICAgICAgIGlkX3JlY29yZDogU3RyaW5nLFxuICAgICAgICAgICAgICAgIG5hbWU6IFN0cmluZyxcbiAgICAgICAgICAgICAgICBhY3RpdmU6IEJvb2xlYW4sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGxldCBfaWQgPSBkYXRhLmlkX3JlY29yZDtcbiAgICAgICAgICAgIGxldCBmYXZvcml0ZSA9IF8uZXh0ZW5kKGRhdGEsIHtcbiAgICAgICAgICAgICAgICBkYXRlX3VwZGF0ZTogbmV3IERhdGUoKS5nZXRUaW1lKCksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGRlbGV0ZSBmYXZvcml0ZS5pZF9yZWNvcmQ7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgIEZhdm9yaXRlcy51cGRhdGUoX2lkLCB7XG4gICAgICAgICAgICAgICAgJHNldDogZmF2b3JpdGUsXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9LFxuICAgICAgICByZW1vdmVGYXZvcml0ZTogYXN5bmMgZnVuY3Rpb24gKF9pZCkge1xuICAgICAgICAgICAgY2hlY2soTWV0ZW9yLnVzZXJJZCgpLCBTdHJpbmcpO1xuICAgICAgICAgICAgY2hlY2soX2lkLCBTdHJpbmcpO1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IEZhdm9yaXRlcy5yZW1vdmUoe19pZDogX2lkfSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbiIsImltcG9ydCB7TWV0ZW9yfSBmcm9tICdtZXRlb3IvbWV0ZW9yJ1xuXG5IYXNodGFncyA9IG5ldyBNb25nby5Db2xsZWN0aW9uKCdoYXNodGFncycpO1xuXG5pZiAoTWV0ZW9yLmlzU2VydmVyKSB7XG4gICAgTWV0ZW9yLm1ldGhvZHMoe1xuICAgICAgICBhZGROZXdIYXNodGFnOiBhc3luYyBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgY2hlY2soTWV0ZW9yLnVzZXJJZCgpLCBTdHJpbmcpO1xuICAgICAgICAgICAgY2hlY2soZGF0YSwge1xuICAgICAgICAgICAgICAgIGlkX3JlY29yZDogTWF0Y2guTWF5YmUoU3RyaW5nKSxcbiAgICAgICAgICAgICAgICBuYW1lOiBTdHJpbmcsXG4gICAgICAgICAgICAgICAgYWN0aXZlOiBCb29sZWFuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbGV0IHVzZXIgPSBNZXRlb3IudXNlcigpO1xuICAgICAgICAgICAgbGV0IGhhc2h0YWcgPSBfLmV4dGVuZChkYXRhLCB7XG4gICAgICAgICAgICAgICAgaWRfb3duZXI6IHVzZXIuX2lkLFxuICAgICAgICAgICAgICAgIGRhdGVfY3JlYXRlOiBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZGVsZXRlIGhhc2h0YWcuaWRfcmVjb3JkO1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IEhhc2h0YWdzLmluc2VydChoYXNodGFnKTtcbiAgICAgICAgfSxcbiAgICAgICAgdXBkYXRlSGFzaHRhZzogYXN5bmMgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIGNoZWNrKE1ldGVvci51c2VySWQoKSwgU3RyaW5nKTtcbiAgICAgICAgICAgIGNoZWNrKGRhdGEsIHtcbiAgICAgICAgICAgICAgICBpZF9yZWNvcmQ6IFN0cmluZyxcbiAgICAgICAgICAgICAgICBuYW1lOiBTdHJpbmcsXG4gICAgICAgICAgICAgICAgYWN0aXZlOiBCb29sZWFuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGxldCBfaWQgPSBkYXRhLmlkX3JlY29yZDtcbiAgICAgICAgICAgIGxldCBoYXNodGFnID0gXy5leHRlbmQoZGF0YSwge1xuICAgICAgICAgICAgICAgIGRhdGVfdXBkYXRlOiBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZGVsZXRlIGhhc2h0YWcuaWRfcmVjb3JkO1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0ICBIYXNodGFncy51cGRhdGUoX2lkLCB7XG4gICAgICAgICAgICAgICAgJHNldDogaGFzaHRhZyxcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0sXG4gICAgICAgIHJlbW92ZUhhc2h0YWc6IGFzeW5jIGZ1bmN0aW9uIChfaWQpIHtcbiAgICAgICAgICAgIGNoZWNrKE1ldGVvci51c2VySWQoKSwgU3RyaW5nKTtcbiAgICAgICAgICAgIGNoZWNrKF9pZCwgU3RyaW5nKTtcbiAgICAgICAgICAgIC8qIGNoZWNrIHRlcm0gdXNpbmcgb3RoZXIgZG9jdW1lbnQgKi9cbiAgICAgICAgICAgIGxldCBpZHMgPSBbX2lkXTtcbiAgICAgICAgICAgIGxldCBoYXNodGFnID0gYXdhaXQgRG9jdW1lbnRzLmZpbmRPbmUoe1xuICAgICAgICAgICAgICAgIGhhc2h0YWc6IHtcbiAgICAgICAgICAgICAgICAgICAgJGVsZW1NYXRjaDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCIkaW5cIjogaWRzXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYoaGFzaHRhZyl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChIYXNodGFncy5maW5kKF9pZCkuY291bnQoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCBIYXNodGFncy5yZW1vdmUoe19pZDogX2lkfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59XG4iLCJJZERvY3VtZW50SW5GYXZvcml0ZSA9IG5ldyBNb25nby5Db2xsZWN0aW9uKCdpZC1kb2MtaW4tZmF2Jyk7XG5cbmlmIChNZXRlb3IuaXNTZXJ2ZXIpIHtcbiAgICBNZXRlb3IubWV0aG9kcyh7XG4gICAgICAgIGFkZElkRG9jVG9GYXY6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgICAgIGNoZWNrKE1ldGVvci51c2VySWQoKSwgU3RyaW5nKTtcbiAgICAgICAgICAgIGNoZWNrKGRhdGEsIHtcbiAgICAgICAgICAgICAgICBpZERvYzogU3RyaW5nLFxuICAgICAgICAgICAgICAgIGlkRmF2OiBTdHJpbmcsXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbGV0IGZhdiA9IEZhdm9yaXRlcy5maW5kT25lKGRhdGEuaWRGYXYpO1xuICAgICAgICAgICAgbGV0IGRvYyA9IERvY3VtZW50cy5maW5kT25lKGRhdGEuaWREb2MpO1xuICAgICAgICAgICAgaWYgKGZhdiAmJiBkb2MpIHtcbiAgICAgICAgICAgICAgICBsZXQgZGF0YUdldCA9IElkRG9jdW1lbnRJbkZhdm9yaXRlLmZpbmRPbmUoe1xuICAgICAgICAgICAgICAgICAgICAkYW5kOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWREb2M6IHskZXE6IGRhdGEuaWREb2N9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkRmF2OiB7JGVxOiBkYXRhLmlkRmF2fVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWRhdGFHZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHVzZXIgPSBNZXRlb3IudXNlcigpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgaWREb2NJbkZhdiA9IF8uZXh0ZW5kKGRhdGEsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkX293bmVyOiB1c2VyLl9pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGVfY3JlYXRlOiBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIElkRG9jdW1lbnRJbkZhdm9yaXRlLmluc2VydChpZERvY0luRmF2KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiAnYWRkIFwiJyArIGRvYy5uYW1lICsgJ1wiIHRvIGZhdm9yaXRlIFwiJyArIGZhdi5uYW1lICsgJ1wiIHN1Y2Nlc3MnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiAnXCInICsgZG9jLm5hbWUgKyAnXCInICsgJyAgYWxyZWFkeSBleGlzdHMgaW4gXCInICsgZmF2Lm5hbWUgKyAnXCInLFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJEYXRhIGludmFsaWRcIixcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuXG4gICAgTWV0ZW9yLm1ldGhvZHMoe1xuICAgICAgICBtZXJnZUZhdlRvUXVldWU6IGZ1bmN0aW9uIChpZEZhdikge1xuICAgICAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgICAgICBjaGVjayhNZXRlb3IudXNlcklkKCksIFN0cmluZyk7XG4gICAgICAgICAgICBjaGVjayhpZEZhdiwgU3RyaW5nKTtcbiAgICAgICAgICAgIGxldCBmYXYgPSBGYXZvcml0ZXMuZmluZE9uZShpZEZhdik7XG4gICAgICAgICAgICBpZiAoZmF2KSB7XG4gICAgICAgICAgICAgICAgbGV0IGlkRG9jSW5GYXYgPSBJZERvY3VtZW50SW5GYXZvcml0ZS5maW5kKHtcbiAgICAgICAgICAgICAgICAgICAgaWRfb3duZXI6IE1ldGVvci51c2VySWQoKSxcbiAgICAgICAgICAgICAgICAgICAgaWRGYXY6IGlkRmF2XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKGlkRG9jSW5GYXYuY291bnQoKSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgY291bnRBZGQgPSAwO1xuICAgICAgICAgICAgICAgICAgICBpZERvY0luRmF2LmZldGNoKCkubWFwKCh2YWwsIGlkeCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGluUXVldWUgPSBRdWV1ZXMuZmluZE9uZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWRfZG9jOiB2YWwuaWREb2MsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWRfb3duZXI6IE1ldGVvci51c2VySWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWluUXVldWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcXVldWUgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkX293bmVyOiBNZXRlb3IudXNlcklkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkX2RvYzogdmFsLmlkRG9jLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRlX2NyZWF0ZTogbmV3IERhdGUoKS5nZXRUaW1lKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFF1ZXVlcy5pbnNlcnQocXVldWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50QWRkKys7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY291bnRBZGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcImFkZCBcIiArIGNvdW50QWRkICsgXCIgZG9jdW1lbnQocykgdG8gcXVldWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJhbGwgZG9jdW1lbnRzIGluIGZhdm9yaXRlIGFscmVhZHkgZXhpc3RzIGluIHF1ZXVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcImRvY3VtZW50cyBpbiBmYXZvcml0ZSBpcyBlbXB0eVwiXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJmYXZvcml0ZSBpcyBlbXB0eVwiXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBNZXRlb3IubWV0aG9kcyh7XG4gICAgICAgIGNsZWFyRmF2OiBmdW5jdGlvbiAoaWRGYXYpIHtcbiAgICAgICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICAgICAgY2hlY2soTWV0ZW9yLnVzZXJJZCgpLCBTdHJpbmcpO1xuICAgICAgICAgICAgY2hlY2soaWRGYXYsIFN0cmluZyk7XG4gICAgICAgICAgICBsZXQgZmF2ID0gRmF2b3JpdGVzLmZpbmRPbmUoaWRGYXYpO1xuICAgICAgICAgICAgaWYgKGZhdikge1xuICAgICAgICAgICAgICAgIElkRG9jdW1lbnRJbkZhdm9yaXRlLnJlbW92ZSh7XG4gICAgICAgICAgICAgICAgICAgIGlkX293bmVyOiBNZXRlb3IudXNlcklkKCksXG4gICAgICAgICAgICAgICAgICAgIGlkRmF2OiBpZEZhdlxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBNZXRlb3IubWV0aG9kcyh7XG4gICAgICAgIHJlbW92ZURvY0luRmF2OiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgICAgICBjaGVjayhNZXRlb3IudXNlcklkKCksIFN0cmluZyk7XG4gICAgICAgICAgICBjaGVjayhkYXRhLmlkRmF2LCBTdHJpbmcpO1xuICAgICAgICAgICAgY2hlY2soZGF0YS5pZERvYywgU3RyaW5nKTtcbiAgICAgICAgICAgIElkRG9jdW1lbnRJbkZhdm9yaXRlLnJlbW92ZSh7XG4gICAgICAgICAgICAgICAgaWRfb3duZXI6IE1ldGVvci51c2VySWQoKSxcbiAgICAgICAgICAgICAgICBpZEZhdjogZGF0YS5pZEZhdixcbiAgICAgICAgICAgICAgICBpZERvYzogZGF0YS5pZERvYyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4iLCJJdGVtcyA9IG5ldyBNb25nby5Db2xsZWN0aW9uKCdpdGVtcycpO1xuIiwiUXVldWVzID0gbmV3IE1vbmdvLkNvbGxlY3Rpb24oJ3F1ZXVlcycpO1xuXG5pZiAoTWV0ZW9yLmlzU2VydmVyKSB7XG4gICAgTWV0ZW9yLm1ldGhvZHMoe1xuICAgICAgICAnYWRkUXVldWUnOiBhc3luYyBmdW5jdGlvbiAoaWREb2MpIHtcbiAgICAgICAgICAgIGNoZWNrKE1ldGVvci51c2VySWQoKSwgU3RyaW5nKTtcbiAgICAgICAgICAgIGNoZWNrKGlkRG9jLCBTdHJpbmcpO1xuICAgICAgICAgICAgbGV0IHVzZXIgPSBNZXRlb3IudXNlcigpO1xuICAgICAgICAgICAgaWYgKERvY3VtZW50cy5maW5kT25lKGlkRG9jKSAmJiAhUXVldWVzLmZpbmRPbmUoe2lkX2RvYzogaWREb2MsIGlkX293bmVyOiB1c2VyLl9pZH0pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IFF1ZXVlcy5pbnNlcnQoe1xuICAgICAgICAgICAgICAgICAgICBpZF9vd25lcjogdXNlci5faWQsXG4gICAgICAgICAgICAgICAgICAgIGlkX2RvYzogaWREb2MsXG4gICAgICAgICAgICAgICAgICAgIGRhdGVfY3JlYXRlOiBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgJ3JlbW92ZVF1ZXVlJzogYXN5bmMgZnVuY3Rpb24gKGlkRG9jKSB7XG4gICAgICAgICAgICBjaGVjayhNZXRlb3IudXNlcklkKCksIFN0cmluZyk7XG4gICAgICAgICAgICBjaGVjayhpZERvYywgU3RyaW5nKTtcbiAgICAgICAgICAgIGxldCB1c2VyID0gTWV0ZW9yLnVzZXIoKTtcbiAgICAgICAgICAgIGxldCBxdWV1ZSA9IFF1ZXVlcy5maW5kT25lKHtpZF9kb2M6IGlkRG9jLCBpZF9vd25lcjogdXNlci5faWR9KTtcbiAgICAgICAgICAgIGlmIChxdWV1ZSkge1xuICAgICAgICAgICAgICAgIFF1ZXVlcy5yZW1vdmUocXVldWUuX2lkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJjbGVhblF1ZXVlXCI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICAgICAgY2hlY2soTWV0ZW9yLnVzZXJJZCgpLCBTdHJpbmcpO1xuICAgICAgICAgICAgUXVldWVzLnJlbW92ZSh7aWRfb3duZXI6IE1ldGVvci51c2VySWQoKX0pO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4iLCJSZW1pbmRzID0gbmV3IE1vbmdvLkNvbGxlY3Rpb24oJ3JlbWluZHMnKTtcblxuaWYgKE1ldGVvci5pc1NlcnZlcikge1xuICAgIE1ldGVvci5tZXRob2RzKHtcbiAgICAgICAgYWRkTmV3UmVtaW5kOiBhc3luYyBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgY2hlY2soTWV0ZW9yLnVzZXJJZCgpLCBTdHJpbmcpO1xuICAgICAgICAgICAgY2hlY2soZGF0YSwge1xuICAgICAgICAgICAgICAgIGlkX3JlY29yZDogTWF0Y2guTWF5YmUoU3RyaW5nKSxcbiAgICAgICAgICAgICAgICBuYW1lOiBTdHJpbmcsXG4gICAgICAgICAgICAgICAgYWN0aXZlOiBCb29sZWFuLFxuICAgICAgICAgICAgICAgIGludGVydmFsOiBOdW1iZXIsXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbGV0IHVzZXIgPSBNZXRlb3IudXNlcigpO1xuICAgICAgICAgICAgbGV0IHJlbWluZCA9IF8uZXh0ZW5kKGRhdGEsIHtcbiAgICAgICAgICAgICAgICBpZF9vd25lcjogdXNlci5faWQsXG4gICAgICAgICAgICAgICAgZGF0ZV9jcmVhdGU6IG5ldyBEYXRlKCkuZ2V0VGltZSgpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBkZWxldGUgcmVtaW5kLmlkX3JlY29yZDtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBSZW1pbmRzLmluc2VydChyZW1pbmQpO1xuICAgICAgICB9LFxuICAgICAgICB1cGRhdGVSZW1pbmQ6IGFzeW5jIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICBjaGVjayhNZXRlb3IudXNlcklkKCksIFN0cmluZyk7XG4gICAgICAgICAgICBjaGVjayhkYXRhLCB7XG4gICAgICAgICAgICAgICAgaWRfcmVjb3JkOiBTdHJpbmcsXG4gICAgICAgICAgICAgICAgbmFtZTogU3RyaW5nLFxuICAgICAgICAgICAgICAgIGFjdGl2ZTogQm9vbGVhbixcbiAgICAgICAgICAgICAgICBpbnRlcnZhbDogTnVtYmVyLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBsZXQgX2lkID0gZGF0YS5pZF9yZWNvcmQ7XG4gICAgICAgICAgICBsZXQgcmVtaW5kID0gXy5leHRlbmQoZGF0YSwge1xuICAgICAgICAgICAgICAgIGRhdGVfdXBkYXRlOiBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZGVsZXRlIHJlbWluZC5pZF9yZWNvcmQ7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgIFJlbWluZHMudXBkYXRlKF9pZCwge1xuICAgICAgICAgICAgICAgICRzZXQ6IHJlbWluZCxcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0sXG4gICAgICAgIHJlbW92ZVJlbWluZDogYXN5bmMgZnVuY3Rpb24gKF9pZCkge1xuICAgICAgICAgICAgY2hlY2soTWV0ZW9yLnVzZXJJZCgpLCBTdHJpbmcpO1xuICAgICAgICAgICAgY2hlY2soX2lkLCBTdHJpbmcpO1xuICAgICAgICAgICAgaWYgKFJlbWluZHMuZmluZChfaWQpLmNvdW50KCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgUmVtaW5kcy5yZW1vdmUoe19pZDogX2lkfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbn1cblxuXG4iLCJSc1NlYXJjaHMgPSBuZXcgTW9uZ28uQ29sbGVjdGlvbigncnNzZWFyY2hzJyk7XG4iLCJUZXJtcyA9IG5ldyBNb25nby5Db2xsZWN0aW9uKCd0ZXJtcycpO1xuXG5pZiAoTWV0ZW9yLmlzU2VydmVyKSB7XG4gICAgTWV0ZW9yLm1ldGhvZHMoe1xuICAgICAgICBhZGROZXdUZXJtOiBhc3luYyBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgY2hlY2soTWV0ZW9yLnVzZXJJZCgpLCBTdHJpbmcpO1xuICAgICAgICAgICAgY2hlY2soZGF0YSwge1xuICAgICAgICAgICAgICAgIGlkX3JlY29yZDogTWF0Y2guTWF5YmUoU3RyaW5nKSxcbiAgICAgICAgICAgICAgICBuYW1lOiBTdHJpbmcsXG4gICAgICAgICAgICAgICAgYWN0aXZlOiBCb29sZWFuLFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGxldCB1c2VyID0gTWV0ZW9yLnVzZXIoKTtcbiAgICAgICAgICAgIGxldCB0ZXJtID0gXy5leHRlbmQoZGF0YSwge1xuICAgICAgICAgICAgICAgIGlkX293bmVyOiB1c2VyLl9pZCxcbiAgICAgICAgICAgICAgICBkYXRlX2NyZWF0ZTogbmV3IERhdGUoKS5nZXRUaW1lKCksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGRlbGV0ZSB0ZXJtLmlkX3JlY29yZDtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBUZXJtcy5pbnNlcnQodGVybSk7XG4gICAgICAgIH0sXG4gICAgICAgIHVwZGF0ZVRlcm06IGFzeW5jIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICBjaGVjayhNZXRlb3IudXNlcklkKCksIFN0cmluZyk7XG4gICAgICAgICAgICBjaGVjayhkYXRhLCB7XG4gICAgICAgICAgICAgICAgaWRfcmVjb3JkOiBTdHJpbmcsXG4gICAgICAgICAgICAgICAgbmFtZTogU3RyaW5nLFxuICAgICAgICAgICAgICAgIGFjdGl2ZTogQm9vbGVhbixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbGV0IF9pZCA9IGRhdGEuaWRfcmVjb3JkO1xuICAgICAgICAgICAgbGV0IHRlcm0gPSBfLmV4dGVuZChkYXRhLCB7XG4gICAgICAgICAgICAgICAgZGF0ZV91cGRhdGU6IG5ldyBEYXRlKCkuZ2V0VGltZSgpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBkZWxldGUgdGVybS5pZF9yZWNvcmQ7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgIFRlcm1zLnVwZGF0ZShfaWQsIHtcbiAgICAgICAgICAgICAgICAkc2V0OiB0ZXJtLFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSxcbiAgICAgICAgcmVtb3ZlVGVybTogYXN5bmMgZnVuY3Rpb24gKF9pZCkge1xuICAgICAgICAgICAgY2hlY2soTWV0ZW9yLnVzZXJJZCgpLCBTdHJpbmcpO1xuICAgICAgICAgICAgY2hlY2soX2lkLCBTdHJpbmcpO1xuICAgICAgICAgICAgaWYgKFRlcm1zLmZpbmQoX2lkKS5jb3VudCgpKSB7XG4gICAgICAgICAgICAgICAgLyogY2hlY2sgdGVybSB1c2luZyBvdGhlciBkb2N1bWVudCAqL1xuICAgICAgICAgICAgICAgIGxldCBpZHMgPSBbX2lkXTtcbiAgICAgICAgICAgICAgICBsZXQgZG9jdW1lbnQgPSBhd2FpdCBEb2N1bWVudHMuZmluZE9uZSh7XG4gICAgICAgICAgICAgICAgICAgIHRlcm06IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRlbGVtTWF0Y2g6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiRpblwiOiBpZHNcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFkb2N1bWVudCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgVGVybXMucmVtb3ZlKHtfaWQ6IF9pZH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cblxuXG4iLCJVcGxvYWRzID0gbmV3IE1vbmdvLkNvbGxlY3Rpb24oJ3VwbG9hZHMnKTtcblxuVXBsb2Fkcy5hbGxvdyh7XG4gICAgaW5zZXJ0OiBmdW5jdGlvbiAodXNlcklkLCBkb2MpIHtcbiAgICAgICAgcmV0dXJuICEhdXNlcklkO1xuICAgIH0sXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAodXNlcklkLCBkb2MsIGZpZWxkcywgbW9kaWZpZXIpIHtcbiAgICAgICAgcmV0dXJuICEhdXNlcklkO1xuICAgIH1cbn0pO1xuIiwiQWNjb3VudHMuY29uZmlnKHtcbiAgICBmb3JiaWRDbGllbnRBY2NvdW50Q3JlYXRpb246IHRydWVcbn0pO1xuIiwiaW1wb3J0IHtNZXRlb3J9IGZyb20gJ21ldGVvci9tZXRlb3InXG5pbXBvcnQgKiBhcyBTdHJIZWxwZXJzIGZyb20gJy4uLy4uL2ltcG9ydHMvc3RyaW5nLWhlbHBlcnMnXG5pbXBvcnQgKiBhcyBDb25maWdzIGZyb20gJy4uLy4uL2ltcG9ydHMvY29uZmlncydcbmltcG9ydCAqIGFzIFJzU2VhcmNoT3B0IGZyb20gJy4uLy4uL2ltcG9ydHMvb3B0aW1pemUtcnMtc2VhcmNoJ1xuXG5NZXRlb3IubWV0aG9kcyh7XG4gICAgJ2ZpbmREb2N1bWVudHMnOiBhc3luYyBmdW5jdGlvbiAoZmlsdGVyKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjaGVjayhNZXRlb3IudXNlcklkKCksIFN0cmluZyk7XG4gICAgICAgICAgICBjaGVjayhmaWx0ZXIsIHtcbiAgICAgICAgICAgICAgICBicmFuY2hzOiBNYXRjaC5PcHRpb25hbChNYXRjaC5PbmVPZih1bmRlZmluZWQsIG51bGwsIEFycmF5KSksXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnlzOiBNYXRjaC5PcHRpb25hbChNYXRjaC5PbmVPZih1bmRlZmluZWQsIG51bGwsIEFycmF5KSksXG4gICAgICAgICAgICAgICAgbmFtZTogTWF0Y2guT3B0aW9uYWwoTWF0Y2guT25lT2YodW5kZWZpbmVkLCBudWxsLCBTdHJpbmcpKSxcbiAgICAgICAgICAgICAgICBkb2N1bWVudF9udW1iZXI6IE1hdGNoLk9wdGlvbmFsKE1hdGNoLk9uZU9mKHVuZGVmaW5lZCwgbnVsbCwgU3RyaW5nKSksXG4gICAgICAgICAgICAgICAgdGVybXM6IE1hdGNoLk9wdGlvbmFsKE1hdGNoLk9uZU9mKHVuZGVmaW5lZCwgbnVsbCwgQXJyYXkpKSxcbiAgICAgICAgICAgICAgICB1dWlkX3BhZ2Vfc2VhcmNoOiBTdHJpbmcsXG4gICAgICAgICAgICAgICAgaGFzaHRhZ3M6IE1hdGNoLk9wdGlvbmFsKE1hdGNoLk9uZU9mKHVuZGVmaW5lZCwgbnVsbCwgQXJyYXkpKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdXNlciA9IE1ldGVvci51c2VyKCk7XG4gICAgICAgICAgICBsZXQgYnJhbmNocyA9IGZpbHRlci5icmFuY2hzO1xuICAgICAgICAgICAgbGV0IHRlcm1zID0gZmlsdGVyLnRlcm1zO1xuICAgICAgICAgICAgbGV0IGNhdGVnb3J5cyA9IGZpbHRlci5jYXRlZ29yeXM7XG4gICAgICAgICAgICBsZXQgaGFzaHRhZ3MgPSBmaWx0ZXIuaGFzaHRhZ3M7XG4gICAgICAgICAgICBsZXQgbmFtZVJlZ2V4ID0gJyc7XG4gICAgICAgICAgICBpZiAoZmlsdGVyLm5hbWUpIHtcbiAgICAgICAgICAgICAgICBsZXQgbmFtZVdpdGhvdXRTcGVjID0gU3RySGVscGVycy5zdHJXaXRob3V0U3BlYyhmaWx0ZXIubmFtZSk7XG4gICAgICAgICAgICAgICAgbmFtZVJlZ2V4ID0gU3RySGVscGVycy5idWlsZFJlZ0V4cChuYW1lV2l0aG91dFNwZWMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGRjTnVtYlJlZ2V4ID0gJyc7XG4gICAgICAgICAgICBpZiAoZmlsdGVyLmRvY3VtZW50X251bWJlcikge1xuICAgICAgICAgICAgICAgIGxldCBkb2NudW1XaXRob3V0U3BlYyA9IFN0ckhlbHBlcnMuc3RyV2l0aG91dFNwZWMoZmlsdGVyLmRvY3VtZW50X251bWJlcik7XG4gICAgICAgICAgICAgICAgZGNOdW1iUmVnZXggPSBTdHJIZWxwZXJzLmJ1aWxkUmVnRXhwKGRvY251bVdpdGhvdXRTcGVjKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBxdWVyeUZpbHRlciA9IHt9O1xuICAgICAgICAgICAgaWYgKGJyYW5jaHMgJiYgYnJhbmNocy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBxdWVyeUZpbHRlci5icmFuY2ggPSB7XG4gICAgICAgICAgICAgICAgICAgICRlbGVtTWF0Y2g6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiJGluXCI6IGJyYW5jaHNcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGNhdGVnb3J5cyAmJiBjYXRlZ29yeXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcXVlcnlGaWx0ZXIuY2F0ZWdvcnkgPSB7XG4gICAgICAgICAgICAgICAgICAgICRpbjogY2F0ZWdvcnlzXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGVybXMgJiYgdGVybXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcXVlcnlGaWx0ZXIudGVybSA9IHtcbiAgICAgICAgICAgICAgICAgICAgJGVsZW1NYXRjaDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCIkaW5cIjogdGVybXNcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGhhc2h0YWdzICYmIGhhc2h0YWdzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHF1ZXJ5RmlsdGVyLmhhc2h0YWdzID0ge1xuICAgICAgICAgICAgICAgICAgICAkZWxlbU1hdGNoOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcIiRpblwiOiBoYXNodGFnc1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobmFtZVJlZ2V4KSB7XG4gICAgICAgICAgICAgICAgcXVlcnlGaWx0ZXIubmFtZV9zZWFyY2ggPSBuYW1lUmVnZXg7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChkY051bWJSZWdleCkge1xuICAgICAgICAgICAgICAgIHF1ZXJ5RmlsdGVyLmRvY3VtZW50X251bWJlcl9zZWFyY2ggPSBkY051bWJSZWdleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCB0ZXN0UmVzdWx0ID0gYXdhaXQgRG9jdW1lbnRzLmZpbmQoe1xuICAgICAgICAgICAgICAgICRhbmQ6IFtxdWVyeUZpbHRlcl1cbiAgICAgICAgICAgIH0sIHtzb3J0OiB7bmFtZTogMX19KTtcblxuICAgICAgICAgICAgLy9zYXZlIHNlYXJjaFxuICAgICAgICAgICAgaWYgKE1ldGVvci5pc1NlcnZlcikge1xuICAgICAgICAgICAgICAgIFJzU2VhcmNocy5yZW1vdmUoe3V1aWRfcGFnZV9zZWFyY2g6IGZpbHRlci51dWlkX3BhZ2Vfc2VhcmNofSk7XG4gICAgICAgICAgICAgICAgUnNTZWFyY2hPcHQuZnVjT3B0aW1pemVSc1NlYXJjaCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGVzdFJlc3VsdC5mZXRjaCgpLm1hcCgodmFsLCBpZHgpID0+IHtcbiAgICAgICAgICAgICAgICB2YWwuaWRfcmVjb3JkID0gdmFsLl9pZDtcbiAgICAgICAgICAgICAgICBkZWxldGUgdmFsLl9pZDtcbiAgICAgICAgICAgICAgICB2YWwudXVpZF9wYWdlX3NlYXJjaCA9IGZpbHRlci51dWlkX3BhZ2Vfc2VhcmNoO1xuICAgICAgICAgICAgICAgIGlmIChNZXRlb3IuaXNTZXJ2ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRvY0luZm8gPSBDb25maWdzLmdldEZpcnN0QXR0YWNobWVudE9mRG9jdW1lbnRUb0NvbXByZXNzKHZhbC5pZF9yZWNvcmQpO1xuICAgICAgICAgICAgICAgICAgICB2YWwuZmlyc3REb2NGdWxsUGF0aCA9IENvbmZpZ3MuZ2V0Rmlyc3RBdHRhY2htZW50T2ZEb2N1bWVudCh2YWwuaWRfcmVjb3JkKTtcbiAgICAgICAgICAgICAgICAgICAgdmFsLnJlYWxOYW1lID0gZG9jSW5mby5uYW1lO1xuICAgICAgICAgICAgICAgICAgICBSc1NlYXJjaHMuaW5zZXJ0KHZhbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cblxuZnVuY3Rpb24gZ2V0Rmlyc3RBdHRhY2htZW50T2ZEb2N1bWVudChpZERvY3VtZW50KSB7XG4gICAgbGV0IGF0dGFjaG1lbnQgPSBBdHRhY2htZW50cy5maW5kT25lKHtpZERvY3VtZW50OiBpZERvY3VtZW50fSk7XG4gICAgaWYgKCFhdHRhY2htZW50KSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgZnVsbFBhdGggPSBNZXRlb3IuYWJzb2x1dGVVcmwuZGVmYXVsdE9wdGlvbnMucm9vdFVybCArICd1cGxvYWQvJyArIGF0dGFjaG1lbnQucGF0aFJlYWN0aXZlO1xuICAgICAgICByZXR1cm4gZnVsbFBhdGg7XG4gICAgfVxufVxuIiwiV0VCX0tFWSA9ICdQUUctMjIxMic7XG5cbk1NX0tFWSA9IHtcbiAgICBkYXlzOiAnZCcsXG4gICAgd2Vla3M6ICd3JyxcbiAgICBtb250aHM6ICdNJyxcbiAgICBxdWFydGVyczogXCJRXCIsXG4gICAgeWVhcnM6ICd5Jyxcbn07XG5cbkdVRVNUX1FVRVVFID0gJ25nb2Nuc0B0aGlhbmNvLmNvbS52bic7XG4iLCJ2YXIgcmVxdWlyZUxvZ2luID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICghTWV0ZW9yLnVzZXIoKSkge1xuICAgICAgICBpZiAoTWV0ZW9yLmxvZ2dpbmdJbigpKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcih0aGlzLmxvYWRpbmdUZW1wbGF0ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcignZGVueScpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5uZXh0KCk7XG4gICAgfVxufVxuXG5Sb3V0ZXIuY29uZmlndXJlKHtcbiAgICBsYXlvdXRUZW1wbGF0ZTogJ2xheW91dCcsXG4gICAgbG9hZGluZ1RlbXBsYXRlOiAnbG9hZGluZycsXG4gICAgbm90Rm91bmRUZW1wbGF0ZTogJ25vdGZvdW5kJyxcbiAgICB3YWl0T246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIE1ldGVvci5zdWJzY3JpYmUoJ3F1ZXVlcycpLFxuICAgICAgICAgICAgTWV0ZW9yLnN1YnNjcmliZSgnZG9jdW1lbnRzLmluLnF1ZXVlJyksXG4gICAgICAgICAgICBNZXRlb3Iuc3Vic2NyaWJlKCdjYXRlZ29yeXMnKSxcbiAgICAgICAgICAgIE1ldGVvci5zdWJzY3JpYmUoJ2JyYW5jaHMnKSxcbiAgICAgICAgICAgIE1ldGVvci5zdWJzY3JpYmUoJ3Rlcm1zJyksXG4gICAgICAgICAgICBNZXRlb3Iuc3Vic2NyaWJlKCdkb2N1bWVudHJlbWluZCcpLFxuICAgICAgICAgICAgTWV0ZW9yLnN1YnNjcmliZSgnZG9jdW1lbnRzaW5yZW1pbmQnKSxcbiAgICAgICAgICAgIE1ldGVvci5zdWJzY3JpYmUoJ2Zhdm9yaXRlcycpLFxuICAgICAgICAgICAgTWV0ZW9yLnN1YnNjcmliZSgnZG9jdW1lbnQuaW4uZmF2b3JpdGUnKSxcbiAgICAgICAgICAgIE1ldGVvci5zdWJzY3JpYmUoJ2hhc2h0YWdzJyksXG4gICAgICAgIF1cbiAgICB9XG59KTtcblxuUm91dGVyLnJvdXRlKCcvJywge1xuICAgIG5hbWU6ICdkYXNoYm9hcmQnLFxuICAgIG9uQmVmb3JlQWN0aW9uOiByZXF1aXJlTG9naW4sXG59KTtcblxuUm91dGVyLnJvdXRlKCcvY2F0ZWdvcnlzJywge1xuICAgIG5hbWU6ICdjYXRlZ29yeXMnLFxuICAgIG9uQmVmb3JlQWN0aW9uOiByZXF1aXJlTG9naW4sXG59KTtcblxuUm91dGVyLnJvdXRlKCcvYnJhbmNocycsIHtcbiAgICBuYW1lOiAnYnJhbmNocycsXG4gICAgb25CZWZvcmVBY3Rpb246IHJlcXVpcmVMb2dpbixcbn0pO1xuXG5Sb3V0ZXIucm91dGUoJy90ZXJtcycsIHtcbiAgICBuYW1lOiAndGVybXMnLFxuICAgIG9uQmVmb3JlQWN0aW9uOiByZXF1aXJlTG9naW4sXG59KTtcblxuUm91dGVyLnJvdXRlKCcvZmF2b3JpdGVzJywge1xuICAgIG5hbWU6ICdmYXZvcml0ZXMnLFxuICAgIG9uQmVmb3JlQWN0aW9uOiByZXF1aXJlTG9naW4sXG59KTtcblxuUm91dGVyLnJvdXRlKCcvcmVtaW5kcycsIHtcbiAgICBuYW1lOiAncmVtaW5kcycsXG4gICAgb25CZWZvcmVBY3Rpb246IHJlcXVpcmVMb2dpbixcbiAgICB3YWl0T246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIE1ldGVvci5zdWJzY3JpYmUoJ3JlbWluZHMnKVxuICAgICAgICBdXG4gICAgfVxufSk7XG5cblJvdXRlci5yb3V0ZSgnL2hhc2h0YWdzJywge1xuICAgIG5hbWU6ICdoYXNodGFncycsXG4gICAgb25CZWZvcmVBY3Rpb246IHJlcXVpcmVMb2dpbixcbn0pO1xuXG5Sb3V0ZXIucm91dGUoJy9hbGwtZmF2cycsIHtcbiAgICBuYW1lOiAnYWxsZmF2cycsXG4gICAgb25CZWZvcmVBY3Rpb246IHJlcXVpcmVMb2dpbixcbn0pO1xuXG5cblJvdXRlci5yb3V0ZSgnL3F1ZXVlcycsIHtcbiAgICBuYW1lOiAncHJpbnRxdWV1ZXMnLFxuICAgIG9uQmVmb3JlQWN0aW9uOiByZXF1aXJlTG9naW4sXG59KTtcblxuXG5Sb3V0ZXIucm91dGUoJy9kb2NyZW1pbmQnLCB7XG4gICAgbmFtZTogJ2RvY3VtZW50cmVtaW5kJyxcbiAgICBvbkJlZm9yZUFjdGlvbjogcmVxdWlyZUxvZ2luLFxufSk7XG5cblxuUm91dGVyLnJvdXRlKCcvY29tbWluZy1zb29uJywge1xuICAgIG5hbWU6ICdjb21taW5nc29vbicsXG4gICAgb25CZWZvcmVBY3Rpb246IHJlcXVpcmVMb2dpbixcbn0pO1xuXG5cblJvdXRlci5yb3V0ZSgnL2VkaXQtZmF2LzpfaWRGYXYnLCB7XG4gICAgbmFtZTogJ2VkaXRmYXYnLFxuICAgIG9uQmVmb3JlQWN0aW9uOiByZXF1aXJlTG9naW4sXG4gICAgd2FpdE9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBNZXRlb3Iuc3Vic2NyaWJlKCdkb2N1bWVudHMuaW4uZmF2JywgdGhpcy5wYXJhbXMuX2lkRmF2KSxcbiAgICAgICAgXVxuICAgIH0sXG4gICAgZGF0YTogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaWRGYXY6IHRoaXMucGFyYW1zLl9pZEZhdixcbiAgICAgICAgfVxuICAgIH0sXG59KTtcblxuXG5Sb3V0ZXIucm91dGUoJy9hbGwtZG9jdW1lbnRzLzpfdXVpZCcsIHtcbiAgICBuYW1lOiAnYWxsZG9jdW1lbnRzJyxcbiAgICBvbkJlZm9yZUFjdGlvbjogcmVxdWlyZUxvZ2luLFxuICAgIHdhaXRPbjogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgTWV0ZW9yLnN1YnNjcmliZSgncnNzZWFyY2hzJywgdGhpcy5wYXJhbXMuX3V1aWQpLFxuICAgICAgICBdXG4gICAgfSxcbiAgICBkYXRhOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB1dWlkOiB0aGlzLnBhcmFtcy5fdXVpZCxcbiAgICAgICAgfVxuICAgIH0sXG4gICAgYWN0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBjbG9uZVVVSUQgPSBSYW5kb20uaWQoKTtcbiAgICAgICAgbGV0IHBhcmFtVVVJRCA9IHRoaXMucGFyYW1zLl91dWlkO1xuICAgICAgICBpZiAoIXBhcmFtVVVJRCB8fCBwYXJhbVVVSUQudHJpbSgpLmxlbmd0aCAhPSBjbG9uZVVVSUQubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnJlZGlyZWN0KCcvYWxsLWRvY3VtZW50cy8nICsgY2xvbmVVVUlEKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cblxuICAgIH1cbn0pO1xuXG5Sb3V0ZXIucm91dGUoJy9hZGQtZG9jdW1lbnRzLzpfdXVpZCcsIHtcbiAgICBuYW1lOiAnYWRkZG9jdW1lbnRzJyxcbiAgICBvbkJlZm9yZUFjdGlvbjogcmVxdWlyZUxvZ2luLFxuICAgIHdhaXRPbjogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgTWV0ZW9yLnN1YnNjcmliZSgnaXRlbXMnLCB0aGlzLnBhcmFtcy5fdXVpZCksXG4gICAgICAgICAgICBNZXRlb3Iuc3Vic2NyaWJlKCd1cGxvYWRzJywgdGhpcy5wYXJhbXMuX3V1aWQpLFxuICAgICAgICBdXG4gICAgfSxcbiAgICBkYXRhOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpdGVtOiBJdGVtcy5maW5kT25lKCksXG4gICAgICAgICAgICB1cGxvYWRzOiBVcGxvYWRzLmZpbmQoKSxcbiAgICAgICAgICAgIHV1aWQ6IHRoaXMucGFyYW1zLl91dWlkLFxuICAgICAgICB9XG4gICAgfSxcbiAgICBhY3Rpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IGNsb25lVVVJRCA9IFJhbmRvbS5pZCgpO1xuICAgICAgICBsZXQgcGFyYW1VVUlEID0gdGhpcy5wYXJhbXMuX3V1aWQ7XG4gICAgICAgIGlmICghcGFyYW1VVUlEIHx8IHBhcmFtVVVJRC50cmltKCkubGVuZ3RoICE9IGNsb25lVVVJRC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMucmVkaXJlY3QoJy9hZGQtZG9jdW1lbnRzLycgKyBjbG9uZVVVSUQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuXG4gICAgfVxufSk7XG5cblJvdXRlci5yb3V0ZSgnL3F1aWNrLWFkZC1kb2N1bWVudHMvOl91dWlkJywge1xuICAgIG5hbWU6ICdxdWlja2FkZGRvYycsXG4gICAgb25CZWZvcmVBY3Rpb246IHJlcXVpcmVMb2dpbixcbiAgICB3YWl0T246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIE1ldGVvci5zdWJzY3JpYmUoJ2l0ZW1zJywgdGhpcy5wYXJhbXMuX3V1aWQpLFxuICAgICAgICAgICAgTWV0ZW9yLnN1YnNjcmliZSgndXBsb2FkcycsIHRoaXMucGFyYW1zLl91dWlkKSxcbiAgICAgICAgXVxuICAgIH0sXG4gICAgZGF0YTogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaXRlbTogSXRlbXMuZmluZE9uZSgpLFxuICAgICAgICAgICAgdXBsb2FkczogVXBsb2Fkcy5maW5kKCksXG4gICAgICAgICAgICB1dWlkOiB0aGlzLnBhcmFtcy5fdXVpZCxcbiAgICAgICAgfVxuICAgIH0sXG4gICAgYWN0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBjbG9uZVVVSUQgPSBSYW5kb20uaWQoKTtcbiAgICAgICAgbGV0IHBhcmFtVVVJRCA9IHRoaXMucGFyYW1zLl91dWlkO1xuICAgICAgICBpZiAoIXBhcmFtVVVJRCB8fCBwYXJhbVVVSUQudHJpbSgpLmxlbmd0aCAhPSBjbG9uZVVVSUQubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnJlZGlyZWN0KCcvcXVpY2stYWRkLWRvY3VtZW50cy8nICsgY2xvbmVVVUlEKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cblxuICAgIH1cbn0pO1xuXG5cblxuUm91dGVyLnJvdXRlKCcvZWRpdC1kb2N1bWVudC86X2lkRG9jLzpfdXVpZCcsIHtcbiAgICBuYW1lOiAnZWRpdGRvYycsXG4gICAgb25CZWZvcmVBY3Rpb246IHJlcXVpcmVMb2dpbixcbiAgICB3YWl0T246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIE1ldGVvci5zdWJzY3JpYmUoJ2l0ZW1zJywgdGhpcy5wYXJhbXMuX3V1aWQpLFxuICAgICAgICAgICAgTWV0ZW9yLnN1YnNjcmliZSgndXBsb2FkcycsIHRoaXMucGFyYW1zLl91dWlkKSxcbiAgICAgICAgICAgIE1ldGVvci5zdWJzY3JpYmUoJ2RvY3VtZW50JywgdGhpcy5wYXJhbXMuX2lkRG9jKSxcbiAgICAgICAgICAgIE1ldGVvci5zdWJzY3JpYmUoJ2F0dGFjaG1lbnQnLCB0aGlzLnBhcmFtcy5faWREb2MpLFxuICAgICAgICBdXG4gICAgfSxcbiAgICBkYXRhOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpdGVtOiBJdGVtcy5maW5kKCksXG4gICAgICAgICAgICB1cGxvYWRzOiBBdHRhY2htZW50cy5maW5kKHtpZERvY3VtZW50OiB0aGlzLnBhcmFtcy5faWREb2N9KSxcbiAgICAgICAgICAgIHV1aWQ6IHRoaXMucGFyYW1zLl91dWlkLFxuICAgICAgICAgICAgaWREb2M6IHRoaXMucGFyYW1zLl9pZERvYyxcbiAgICAgICAgICAgIGRvYzogRG9jdW1lbnRzLmZpbmRPbmUodGhpcy5wYXJhbXMuX2lkRG9jKVxuICAgICAgICB9XG4gICAgfSxcbiAgICBhY3Rpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IGlkRG9jID0gdGhpcy5wYXJhbXMuX2lkRG9jO1xuICAgICAgICBsZXQgY2xvbmVVVUlEID0gUmFuZG9tLmlkKCk7XG4gICAgICAgIGxldCBwYXJhbVVVSUQgPSB0aGlzLnBhcmFtcy5fdXVpZDtcbiAgICAgICAgaWYgKCFwYXJhbVVVSUQgfHwgcGFyYW1VVUlELnRyaW0oKS5sZW5ndGggIT0gY2xvbmVVVUlELmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5yZWRpcmVjdCgnL2VkaXQtZG9jdW1lbnQvJyArIGlkRG9jICsgJy8nICsgY2xvbmVVVUlEKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cblxuICAgIH1cbn0pO1xuIiwiaW1wb3J0IHtNZXRlb3J9IGZyb20gJ21ldGVvci9tZXRlb3InO1xuaW1wb3J0ICogYXMgQ29uZmlncyBmcm9tICcuLi8uLi9pbXBvcnRzL2NvbmZpZ3MnXG5cbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMtZXh0cmEnKTtcbnZhciBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xudmFyIEZpYmVyID0gcmVxdWlyZSgnZmliZXJzJyk7XG52YXIgemlwID0gcmVxdWlyZSgnbm9kZS16aXAnKSgpO1xuXG5cbk1ldGVvci5tZXRob2RzKHtcbiAgICBjb21wcmVzc0FuZERvd25sb2FkOiBmdW5jdGlvbiAoaWRzKSB7XG4gICAgICAgIGNoZWNrKE1ldGVvci51c2VySWQoKSwgU3RyaW5nKTtcbiAgICAgICAgY2hlY2soaWRzLCBTdHJpbmcpO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoXG4gICAgICAgICAgICBmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoY2FsbEFQSUNvbXByZXNzUXVldWVzKGlkcykpO1xuICAgICAgICAgICAgfVxuICAgICAgICApLmNhdGNoKGZ1bmN0aW9uIChlcikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXIpO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH0pO1xuICAgIH1cbn0pO1xuXG5mdW5jdGlvbiBjYWxsQVBJQ29tcHJlc3NRdWV1ZXMoaWRzKSB7XG4gICAgemlwLmZpbGVzID0ge307XG4gICAgbGV0IHVzZXJJZCA9IE1ldGVvci51c2VySWQoKTtcbiAgICB1c2VySWQgPSB1c2VySWQgPyB1c2VySWQgOiBSYW5kb20uaWQoKTtcbiAgICBsZXQgYXJJZHMgPSBpZHMuc3BsaXQoXCIsXCIpO1xuICAgIGlmIChhcklkcyAmJiBhcklkcy5sZW5ndGgpIHtcbiAgICAgICAgbGV0IHppcE5hbWUgPSBtb21lbnQoKS5mb3JtYXQoJ0REX01NX1lZWVlfSEhfbW1fc3MnKTtcbiAgICAgICAgemlwTmFtZSArPSAnLicgKyB1c2VySWQgKyAnLnppcCc7XG4gICAgICAgIGxldCB6aXBQYXRoID0gcHJvY2Vzcy5lbnYuUFdEICsgJy8udXBsb2Fkcy96aXAvJztcbiAgICAgICAgbGV0IHppcEZ1bGxQYXRoID0gemlwUGF0aCArIHppcE5hbWU7XG4gICAgICAgIGxldCBjb3VudEZpbGVBZGRlZCA9IDE7XG4gICAgICAgIGZvciAobGV0IGkgaW4gYXJJZHMpIHtcbiAgICAgICAgICAgIGxldCBpZCA9IGFySWRzW2ldO1xuICAgICAgICAgICAgbGV0IGRvY3VtZW50ID0gRG9jdW1lbnRzLmZpbmRPbmUoaWQpO1xuICAgICAgICAgICAgaWYgKCFkb2N1bWVudCkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgZmlyc3REb2MgPSBDb25maWdzLmdldEZpcnN0QXR0YWNobWVudE9mRG9jdW1lbnRUb0NvbXByZXNzKGlkKTtcbiAgICAgICAgICAgICAgICBsZXQgZmlyc3REb2NOYW1lID0gY291bnRGaWxlQWRkZWQudG9TdHJpbmcoKSArICdfJyArIGZpcnN0RG9jLm5hbWU7XG4gICAgICAgICAgICAgICAgbGV0IGZpcnN0RG9jRnVsbFBhdGggPSBmaXJzdERvYy5mdWxsUGF0aDtcbiAgICAgICAgICAgICAgICBpZiAoZmlyc3REb2MpIHtcbiAgICAgICAgICAgICAgICAgICAgemlwLmZpbGUoZmlyc3REb2NOYW1lLCBmcy5yZWFkRmlsZVN5bmMoZmlyc3REb2NGdWxsUGF0aCkpO1xuICAgICAgICAgICAgICAgICAgICBjb3VudEZpbGVBZGRlZCsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoY291bnRGaWxlQWRkZWQgPiAxKSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IHppcC5nZW5lcmF0ZSh7YmFzZTY0OiBmYWxzZSwgY29tcHJlc3Npb246ICdERUZMQVRFJ30pO1xuICAgICAgICAgICAgZnMub3V0cHV0RmlsZVN5bmMoemlwRnVsbFBhdGgsIGRhdGEsICdiaW5hcnknKTtcbiAgICAgICAgICAgIGxldCB1cmxEb3dubG9hZCA9IE1ldGVvci5hYnNvbHV0ZVVybC5kZWZhdWx0T3B0aW9ucy5yb290VXJsICsgJ3VwbG9hZC96aXAvJyArIHppcE5hbWU7XG4gICAgICAgICAgICByZXR1cm4gdXJsRG93bmxvYWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbn1cblxuIiwiaW1wb3J0ICogYXMgU3RyaW5nSGVscGVycyBmcm9tICAnLi4vLi4vaW1wb3J0cy9zdHJpbmctaGVscGVycydcblxuTWV0ZW9yLnN0YXJ0dXAoZnVuY3Rpb24gKCkge1xuICAgIFVwbG9hZFNlcnZlci5pbml0KHtcbiAgICAgICAgdG1wRGlyOiBwcm9jZXNzLmVudi5QV0QgKyAnLy51cGxvYWRzL3RtcCcsXG4gICAgICAgIHVwbG9hZERpcjogcHJvY2Vzcy5lbnYuUFdEICsgJy8udXBsb2Fkcy8nLFxuICAgICAgICBjaGVja0NyZWF0ZURpcmVjdG9yaWVzOiB0cnVlLFxuICAgICAgICBnZXREaXJlY3Rvcnk6IGZ1bmN0aW9uIChmaWxlSW5mbywgZm9ybURhdGEpIHtcbiAgICAgICAgICAgIGlmIChmb3JtRGF0YSAmJiBmb3JtRGF0YS5kaXJlY3RvcnlOYW1lICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9ybURhdGEuZGlyZWN0b3J5TmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9LFxuICAgICAgICBnZXRGaWxlTmFtZTogZnVuY3Rpb24gKGZpbGVJbmZvLCBmb3JtRGF0YSkge1xuICAgICAgICAgICAgaWYgKGZvcm1EYXRhICYmIGZvcm1EYXRhLnByZWZpeCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvcm1EYXRhLnByZWZpeCArICdfJyArIGZpbGVJbmZvLm5hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmlsZUluZm8ubmFtZTtcbiAgICAgICAgfSxcbiAgICAgICAgZmluaXNoZWQ6IGZ1bmN0aW9uIChmaWxlSW5mbywgZm9ybURhdGEpIHtcbiAgICAgICAgICAgIGZpbGVJbmZvLnV1aWQgPSBSYW5kb20uaWQoKTtcbiAgICAgICAgICAgIGZpbGVJbmZvLmtleV91bmlxdWUgPSBmaWxlSW5mby51dWlkICsgJ0AnICsgbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgICAgICBmaWxlSW5mby50aW1lc3RhbXAgPSBtb21lbnQoKS52YWx1ZU9mKCk7XG4gICAgICAgICAgICBpZiAoZm9ybURhdGEgJiYgZm9ybURhdGEuaWRfb3duZXIgIT0gbnVsbCAmJiBmb3JtRGF0YS51dWlkICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBmaWxlSW5mby5pZF9vd25lciA9IGZvcm1EYXRhLmlkX293bmVyO1xuICAgICAgICAgICAgICAgIGZpbGVJbmZvLnV1aWRfcGFnZSA9IGZvcm1EYXRhLnV1aWQ7XG4gICAgICAgICAgICAgICAgLyp1cGRhdGUgZmlsZSB0byBmb2xkZXIgZG9jdW1lbnQqL1xuICAgICAgICAgICAgICAgIGlmKGZvcm1EYXRhICYmIGZvcm1EYXRhLmlkRG9jKXtcbiAgICAgICAgICAgICAgICAgICAgZmlsZUluZm8uaWREb2MgPSAgZm9ybURhdGEuaWREb2M7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCB0aW1lID0gbW9tZW50KCkuZm9ybWF0KCdZWVlZX01NX0REX0hIX21tX3NzLicpO1xuICAgICAgICAgICAgICAgIGxldCBuZXduYW1lID0gU3RyaW5nSGVscGVycy5zdHJXaXRob3V0U3BlYyhmaWxlSW5mby5wYXRoKS5yZXBsYWNlKC8gIC9nLCAnICcpLnJlcGxhY2UoLyAvZywgJ18nKTtcbiAgICAgICAgICAgICAgICBmaWxlSW5mby5uZXdfbmFtZSA9IHRpbWUgKyBuZXduYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmlsZUluZm8uZXh0ID0gZmlsZUluZm8ubmFtZSA/IGZpbGVJbmZvLm5hbWUuc3BsaXQoJy4nKS5wb3AoKSA6IFwiXCI7XG4gICAgICAgICAgICBmaWxlSW5mby5kYXRlX2NyZWF0ZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICB9LCBtaW1lVHlwZXM6IHtcbiAgICAgICAgICAgIFwianBlZ1wiOiBcImltYWdlL2pwZWdcIixcbiAgICAgICAgICAgIFwianBnXCI6IFwiaW1hZ2UvanBlZ1wiLFxuICAgICAgICAgICAgXCJwbmdcIjogXCJpbWFnZS9wbmdcIixcbiAgICAgICAgICAgIFwiZ2lmXCI6IFwiaW1hZ2UvZ2lmXCIsXG4gICAgICAgICAgICBcInBkZlwiOiBcImFwcGxpY2F0aW9uL3BkZlwiLFxuICAgICAgICAgICAgXCJkb2NcIjogXCJhcHBsaWNhdGlvbi9tc3dvcmRcIixcbiAgICAgICAgICAgIFwiZG9jeFwiOiBcImFwcGxpY2F0aW9uL3ZuZC5vcGVueG1sZm9ybWF0cy1vZmZpY2Vkb2N1bWVudC53b3JkcHJvY2Vzc2luZ21sLmRvY3VtZW50XCIsXG4gICAgICAgICAgICBcInppcFwiOiBcImFwcGxpY2F0aW9uL3ppcCwgYXBwbGljYXRpb24veC1jb21wcmVzc2VkLXppcFwiLFxuICAgICAgICAgICAgXCJ0eHRcIjogXCJ0ZXh0L3BsYWluXCJcbiAgICAgICAgfVxuXG4gICAgfSk7XG59KTtcblxuTWV0ZW9yLm1ldGhvZHMoe1xuICAgICdkZWxldGVGaWxlJzogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgY2hlY2soZGF0YSwge1xuICAgICAgICAgICAgX2lkOiBTdHJpbmcsXG4gICAgICAgICAgICBpZERvY3VtZW50OiBNYXRjaC5PcHRpb25hbChNYXRjaC5PbmVPZih1bmRlZmluZWQsIG51bGwsIFN0cmluZykpLFxuICAgICAgICB9KTtcbiAgICAgICAgbGV0IF9pZCA9IGRhdGEuX2lkO1xuICAgICAgICBsZXQgaWREb2N1bWVudCA9IGRhdGEuaWREb2N1bWVudDtcblxuICAgICAgICBpZiAoIWlkRG9jdW1lbnQpIHtcbiAgICAgICAgICAgIHZhciB1cGxvYWQgPSBVcGxvYWRzLmZpbmRPbmUoX2lkKTtcbiAgICAgICAgICAgIGlmICh1cGxvYWQgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoNDA0LCAnVXBsb2FkIG5vdCBmb3VuZCcpOyAvLyBtYXliZSBzb21lIG90aGVyIGNvZGVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRyeXtcbiAgICAgICAgICAgICAgICBVcGxvYWRTZXJ2ZXIuZGVsZXRlKHVwbG9hZC5wYXRoKTtcbiAgICAgICAgICAgIH1jYXRjaCAoZSl7fVxuXG4gICAgICAgICAgICB0cnl7XG4gICAgICAgICAgICAgICAgVXBsb2FkU2VydmVyLmRlbGV0ZSh1cGxvYWQubmV3X25hbWUpO1xuICAgICAgICAgICAgfWNhdGNoIChlKXt9XG4gICAgICAgICAgICBVcGxvYWRzLnJlbW92ZShfaWQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIEZpYmVyID0gcmVxdWlyZSgnZmliZXJzJyk7XG4gICAgICAgICAgICB2YXIgZnMgPSByZXF1aXJlKCdmcy1leHRyYScpO1xuICAgICAgICAgICAgRmliZXIoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGxldCBhdHRhY2htZW50ID0gQXR0YWNobWVudHMuZmluZE9uZShfaWQpXG4gICAgICAgICAgICAgICAgaWYgKGF0dGFjaG1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJhc2UgPSBwcm9jZXNzLmVudi5QV0QgKyAnLy51cGxvYWRzLycgKyBpZERvY3VtZW50O1xuICAgICAgICAgICAgICAgICAgICBsZXQgZnVsUGF0aCA9IGJhc2UgKyAnLycgKyBhdHRhY2htZW50Lm5ld19uYW1lO1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZnMudW5saW5rU3luYyhmdWxQYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIEF0dGFjaG1lbnRzLnJlbW92ZSh7X2lkOiBfaWR9KTtcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLnJ1bigpO1xuICAgICAgICB9XG4gICAgfVxufSlcbiIsImltcG9ydCAqIGFzIFNlcnZpY2VSZW1pbmQgZnJvbSAnLi4vLi4vaW1wb3J0cy9zZXJ2ZXItcmVtaW5kLWZ1bmMnXG5cbkRvY3VtZW50cy5maW5kKHt9KS5vYnNlcnZlQ2hhbmdlcyh7XG4gICAgYWRkZWQ6IGZ1bmN0aW9uIChpZCwgZmllbGRzKSB7XG4gICAgICAgIFNlcnZpY2VSZW1pbmQuc2F2ZVJlbWluZCgpO1xuICAgIH0sXG4gICAgY2hhbmdlZDogZnVuY3Rpb24gKGlkLCBmaWVsZHMpIHtcbiAgICAgICAgU2VydmljZVJlbWluZC5zYXZlUmVtaW5kKCk7XG4gICAgfSxcbiAgICByZW1vdmVkOiBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgU2VydmljZVJlbWluZC5zYXZlUmVtaW5kKCk7XG4gICAgfVxufSk7XG4iLCJpbXBvcnQgKiBhcyBTZXJ2aWNlUmVtaW5kIGZyb20gJy4uLy4uL2ltcG9ydHMvc2VydmVyLXJlbWluZC1mdW5jJ1xuXG5VcGxvYWRzLmZpbmQoe30pLm9ic2VydmVDaGFuZ2VzKHtcbiAgICBhZGRlZDogZnVuY3Rpb24gKGlkLCBmaWVsZHMpIHtcbiAgICAgICAgaWYgKGZpZWxkcy5pZERvYykge1xuICAgICAgICAgICAgdmFyIGZzID0gcmVxdWlyZSgnZnMtZXh0cmEnKTtcbiAgICAgICAgICAgIGxldCBmb2xkZXJVcGxvYWQgPSBwcm9jZXNzLmVudi5QV0QgKyAnLy51cGxvYWRzLyc7XG4gICAgICAgICAgICBsZXQgIHBhdGhGaWxlVXBsb2FkID0gZm9sZGVyVXBsb2FkICsgZmllbGRzLnBhdGg7XG4gICAgICAgICAgICBsZXQgbmV3UGF0aEZpbGUgPSBmb2xkZXJVcGxvYWQgKyBmaWVsZHMuaWREb2MgKyAnLycgKyBmaWVsZHMubmV3X25hbWU7XG4gICAgICAgICAgICBmcy5jb3B5KHBhdGhGaWxlVXBsb2FkLCBuZXdQYXRoRmlsZSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgLyogZGVsZXRlIHVwbG9hZHRlIGZpbGUqL1xuICAgICAgICAgICAgICAgIFVwbG9hZHMucmVtb3ZlKGlkKTtcbiAgICAgICAgICAgICAgICBmaWVsZHMuaWREb2N1bWVudCA9IGZpZWxkcy5pZERvYztcbiAgICAgICAgICAgICAgICBkZWxldGUgZmllbGRzLmlkRG9jO1xuICAgICAgICAgICAgICAgIGZpZWxkcy5wYXRoUmVhY3RpdmUgPSBmaWVsZHMuaWREb2N1bWVudCArICcvJyArIGZpZWxkcy5wYXRoO1xuICAgICAgICAgICAgICAgIEF0dGFjaG1lbnRzLmluc2VydChmaWVsZHMpO1xuICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IGNvbnNvbGUuZXJyb3IoZXJyKSk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcbiIsImxldCBlbWFpbCA9IEdVRVNUX1FVRVVFO1xubGV0IHVzZXJuYW1lID0gJ25nb2Nucy50aGlhbmNvJztcbmxldCBwYXNzd29yZCA9IFwiMTIzMTIzXCI7XG5sZXQgYWNjb3VudFdpdGhFbWFpbCA9IEFjY291bnRzLmZpbmRVc2VyQnlFbWFpbChlbWFpbCk7XG5pZiAoIWFjY291bnRXaXRoRW1haWwpIHtcbiAgICAvKiBjcmVhdGUgbmV3IHVzZXIgKi9cbiAgICBsZXQgdXNlciA9IHtcbiAgICAgICAgdXNlcm5hbWU6IHVzZXJuYW1lLFxuICAgICAgICBlbWFpbDogZW1haWwsXG4gICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZD9wYXNzd29yZDpQYWNrYWdlLnNoYS5TSEEyNTYocGFzc3dvcmQpXG4gICAgfVxuICAgIEFjY291bnRzLmNyZWF0ZVVzZXIodXNlcik7XG59XG4iLCJNZXRlb3IucHVibGlzaCgnYnJhbmNocycsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gQnJhbmNocy5maW5kKHt9KTtcbn0pO1xuIiwiTWV0ZW9yLnB1Ymxpc2goJ2NhdGVnb3J5cycsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gQ2F0ZWdvcnlzLmZpbmQoe30pO1xufSk7XG4iLCJNZXRlb3IucHVibGlzaCgnYXR0YWNobWVudHMnLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIEF0dGFjaG1lbnRzLmZpbmQoe30pO1xufSk7XG5cbk1ldGVvci5wdWJsaXNoKCdhdHRhY2htZW50JywgZnVuY3Rpb24gKGlkRG9jKSB7XG4gICAgcmV0dXJuIEF0dGFjaG1lbnRzLmZpbmQoe2lkRG9jdW1lbnQ6IGlkRG9jfSk7XG59KTtcbiIsIk1ldGVvci5wdWJsaXNoKCdkb2N1bWVudHJlbWluZCcsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gRG9jdW1lbnRSZW1pbmQuZmluZCh7fSk7XG59KTtcbiIsIk1ldGVvci5wdWJsaXNoKCdkb2N1bWVudHNpbnJlbWluZCcsIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgYWxsUmVtaW5kID0gRG9jdW1lbnRSZW1pbmQuZmluZCh7fSk7XG4gICAgRG9jdW1lbnRzSW5SZW1pbmQucmVtb3ZlKHt9KTtcbiAgICBhbGxSZW1pbmQubWFwKCh2YWwsIGlkeCkgPT4ge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgbGV0IGRvYyA9IERvY3VtZW50cy5maW5kT25lKHZhbC5pZERvYyk7XG4gICAgICAgIGRvYy5pZF9yZWNvcmQgPSBkb2MuX2lkO1xuICAgICAgICBkZWxldGUgZG9jLl9pZDtcbiAgICAgICAgRG9jdW1lbnRzSW5SZW1pbmQuaW5zZXJ0KGRvYyk7XG4gICAgfSk7XG4gICAgcmV0dXJuIERvY3VtZW50c0luUmVtaW5kLmZpbmQoKTtcbn0pO1xuIiwiTWV0ZW9yLnB1Ymxpc2goJ2RvY3VtZW50cycsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gRG9jdW1lbnRzLmZpbmQoe30pO1xufSk7XG5cbk1ldGVvci5wdWJsaXNoKCdkb2N1bWVudCcsIGZ1bmN0aW9uIChpZERvYykge1xuICAgIHJldHVybiBEb2N1bWVudHMuZmluZChpZERvYyk7XG59KVxuXG5NZXRlb3IucHVibGlzaCgnZG9jdW1lbnRzLmluLmZhdicsIGZ1bmN0aW9uIChpZEZhdikge1xuICAgIGxldCBhbGxJZGluRmF2ID0gSWREb2N1bWVudEluRmF2b3JpdGUuZmluZCh7aWRGYXY6IGlkRmF2LCBpZF9vd25lcjogTWV0ZW9yLnVzZXJJZCgpfSkuZmV0Y2goKS5tYXAoKHZhbCwgaWR4KSA9PiB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICByZXR1cm4gdmFsLmlkRG9jO1xuICAgIH0pO1xuICAgIHJldHVybiBEb2N1bWVudHMuZmluZCh7XG4gICAgICAgIF9pZDoge1xuICAgICAgICAgICAgJGluOiBhbGxJZGluRmF2XG4gICAgICAgIH1cbiAgICB9KTtcbn0pO1xuIiwiTWV0ZW9yLnB1Ymxpc2goJ2Zhdm9yaXRlcycsIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgdXNlcmlkID0gTWV0ZW9yLnVzZXIoKSA/IE1ldGVvci51c2VySWQoKSA6IG51bGw7XG4gICAgcmV0dXJuIEZhdm9yaXRlcy5maW5kKHtpZF9vd25lcjogdXNlcmlkfSk7XG59KTtcbiIsIk1ldGVvci5wdWJsaXNoKCdoYXNodGFncycsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gSGFzaHRhZ3MuZmluZCh7fSk7XG59KTtcbiIsIk1ldGVvci5wdWJsaXNoKCdkb2N1bWVudC5pbi5mYXZvcml0ZScsIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgdXNlcmlkID0gTWV0ZW9yLnVzZXIoKSA/IE1ldGVvci51c2VySWQoKSA6IG51bGw7XG4gICAgcmV0dXJuIElkRG9jdW1lbnRJbkZhdm9yaXRlLmZpbmQoe2lkX293bmVyOiB1c2VyaWR9KTtcbn0pO1xuXG4iLCJNZXRlb3IucHVibGlzaCgnaXRlbXMnLCBmdW5jdGlvbiAocGFnZV91dWlkKSB7XG4gICAgcmV0dXJuIEl0ZW1zLmZpbmQoe3V1aWQ6IHBhZ2VfdXVpZH0pO1xufSk7XG4iLCJpbXBvcnQgKiBhcyBDb25maWdzIGZyb20gJy4uLy4uL2ltcG9ydHMvY29uZmlncydcblxuTWV0ZW9yLnB1Ymxpc2goJ3F1ZXVlcycsIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgdXNlcmlkID0gTWV0ZW9yLnVzZXIoKSA/IE1ldGVvci51c2VySWQoKSA6IG51bGw7XG5cdGlmKCF1c2VyaWQpe1xuXHRcdHVzZXJpZCA9IEFjY291bnRzLmZpbmRVc2VyQnlFbWFpbChHVUVTVF9RVUVVRSkuX2lkO1xuXHRcdGNvbnNvbGUubG9nKHVzZXJpZCk7XG5cdH1cblx0cmV0dXJuIFF1ZXVlcy5maW5kKHtpZF9vd25lcjogdXNlcmlkfSk7XG59KTtcblxuTWV0ZW9yLnB1Ymxpc2goJ2RvY3VtZW50cy5pbi5xdWV1ZScsIGZ1bmN0aW9uICgpIHtcblx0Y29uc29sZS5sb2coJ2RvY3VtZW50cy5pbi5xdWV1ZScpO1xuXHR0cnl7XG5cdFx0bGV0IHVzZXJpZCA9IE1ldGVvci51c2VyKCkgPyBNZXRlb3IudXNlcklkKCkgOiBudWxsO1xuXHRcdGlmKCF1c2VyaWQpe1xuXHRcdFx0dXNlcmlkID0gQWNjb3VudHMuZmluZFVzZXJCeUVtYWlsKEdVRVNUX1FVRVVFKS5faWQ7XG5cdFx0XHRjb25zb2xlLmxvZyh1c2VyaWQpO1xuXHRcdH1cblx0XHREb2N1bWVudEluUXVldWVzLnJlbW92ZSh7aWRfb3duZXI6IHVzZXJpZH0pO1xuXHRcdGxldCBpZHhMb29wID0gMDtcblx0XHRjb25zdCBmaWx0ZXJRdWVyeSA9IHVzZXJpZD8ge2lkX293bmVyOiB1c2VyaWR9Ont9O1xuXHRcdFF1ZXVlcy5maW5kKGZpbHRlclF1ZXJ5KS5mZXRjaCgpLm1hcCgodmFsLCBpZHgpID0+IHtcblx0XHRcdFwidXNlIHN0cmljdFwiO1xuXHRcdFx0bGV0IGRvY3VtZW50ID0gRG9jdW1lbnRzLmZpbmRPbmUodmFsLmlkX2RvYyk7XG5cdFx0XHRpZiAoZG9jdW1lbnQpIHtcblx0XHRcdFx0ZG9jdW1lbnQuaWRfcmVjb3JkID0gZG9jdW1lbnQuX2lkO1xuXHRcdFx0XHRkZWxldGUgZG9jdW1lbnQuX2lkO1xuXHRcdFx0XHRkb2N1bWVudC5pZF9vd25lciA9IHVzZXJpZDtcblx0XHRcdFx0ZG9jdW1lbnQuaWRfcXVldWUgPSB2YWwuX2lkO1xuXHRcdFx0XHRkb2N1bWVudC5pZHhMb29wID0gKytpZHhMb29wO1xuXHRcdFx0XHRsZXQgYXR0YWNobWVudCA9IENvbmZpZ3MuZ2V0Rmlyc3RBdHRhY2htZW50T2ZEb2N1bWVudFRvQ29tcHJlc3MoZG9jdW1lbnQuaWRfcmVjb3JkKTtcblx0XHRcdFx0ZG9jdW1lbnQuZmlyc3REb2NGdWxsUGF0aCA9IENvbmZpZ3MuZ2V0Rmlyc3RBdHRhY2htZW50T2ZEb2N1bWVudChkb2N1bWVudC5pZF9yZWNvcmQpO1xuXHRcdFx0XHRkb2N1bWVudC5yZWFsTmFtZSA9IGF0dGFjaG1lbnQubmFtZTtcblx0XHRcdFx0RG9jdW1lbnRJblF1ZXVlcy5pbnNlcnQoZG9jdW1lbnQpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHJldHVybiBEb2N1bWVudEluUXVldWVzLmZpbmQoe2lkX293bmVyOiB1c2VyaWR9KTtcblx0fWNhdGNoIChlKXtcblx0XHRjb25zb2xlLmxvZyhlKTtcblx0fVxuXG59KVxuIiwiTWV0ZW9yLnB1Ymxpc2goJ3JlbWluZHMnLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIFJlbWluZHMuZmluZCh7fSk7XG59KTtcbiIsIk1ldGVvci5wdWJsaXNoKCdyc3NlYXJjaHMnLCBmdW5jdGlvbiAodXVpZF9wYWdlX3NlYXJjaCkge1xuICAgIHJldHVybiBSc1NlYXJjaHMuZmluZCh7dXVpZF9wYWdlX3NlYXJjaDogdXVpZF9wYWdlX3NlYXJjaH0pO1xufSk7XG4iLCJNZXRlb3IucHVibGlzaCgndGVybXMnLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIFRlcm1zLmZpbmQoKTtcbn0pO1xuIiwiTWV0ZW9yLnB1Ymxpc2goJ3VwbG9hZHMnLCBmdW5jdGlvbiAodXVpZF9wYWdlKSB7XG4gICAgcmV0dXJuIFVwbG9hZHMuZmluZCh7dXVpZF9wYWdlOiB1dWlkX3BhZ2V9KTtcbn0pO1xuIiwiaW1wb3J0IHtNZXRlb3J9IGZyb20gJ21ldGVvci9tZXRlb3InO1xuaW1wb3J0ICogYXMgU2VydmljZVJlbWluZCBmcm9tICcuLi8uLi9pbXBvcnRzL3NlcnZlci1yZW1pbmQtZnVuYydcblxubGV0IHNpeEhvdXJzID0gMTAwMCAqIDYwICogNjAgKiA2O1xuTWV0ZW9yLnN0YXJ0dXAoKCkgPT4ge1xuICAgIFNlcnZpY2VSZW1pbmQuc2F2ZVJlbWluZCgpO1xuICAgIFNlcnZpY2VSZW1pbmQuZGVsZXRlT2xkWmlwKCk7XG4gICAgc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICBTZXJ2aWNlUmVtaW5kLnNhdmVSZW1pbmQoKTtcbiAgICAgICAgU2VydmljZVJlbWluZC5kZWxldGVPbGRaaXAoKTtcbiAgICB9LCBzaXhIb3Vycyk7XG59KTtcbiIsImltcG9ydCB7TWV0ZW9yfSBmcm9tICdtZXRlb3IvbWV0ZW9yJztcblxudmFyIG9zID0gcmVxdWlyZShcIm9zXCIpO1xudmFyIG1kNSA9IHJlcXVpcmUoJ21kNScpO1xuaW1wb3J0ICogYXMgT3B0aW1pemVTdGFydHVwIGZyb20gJy4uL2ltcG9ydHMvb3B0aW1pemUtd2hlbi1zdGFydHVwJ1xuXG5NZXRlb3Iuc3RhcnR1cCgoKSA9PiB7XG5cdGxldCBob3N0TmFtZSA9ICdkYjQzYTFmMmZkNmQyYmU4MjAwNDFiYmZiNWJkYzdlNCc7XG5cdGxldCBob3N0RGV2ID0gJzdhZDVjZDdhNzhjZTIwZmJmM2MyZTkyZDUyMDg4YjExJztcblx0bGV0IHZhbGlkID0gbWQ1KG9zLmhvc3RuYW1lKCkpID09PSBob3N0TmFtZSB8fCBtZDUob3MuaG9zdG5hbWUoKSkgPT09IGhvc3REZXY7XG5cdGlmICghdmFsaWQpIHtcblx0XHRjb25zb2xlLmxvZygnTk9UIFZBTElEIENPTVBVVEVSJyk7XG5cdFx0ZGVsZXRlRW1haWxWYWxpZCgpO1xuXHRcdC8vIERvY3VtZW50cy5yZW1vdmUoe30pO1xuXHRcdC8vIEJyYW5jaHMucmVtb3ZlKHt9KTtcblx0XHQvLyBDYXRlZ29yeXMucmVtb3ZlKHt9KTtcblx0XHQvLyBUZXJtcy5yZW1vdmUoe30pO1xuXHRcdC8vIFF1ZXVlcy5yZW1vdmUoe30pO1xuXHRcdC8vIEF0dGFjaG1lbnRzLnJlbW92ZSh7fSk7XG5cdFx0Ly8gSGFzaHRhZ3MucmVtb3ZlKHt9KTtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0LypkZWxldGUgYWxsIGZpbGUgb24gZm9sZGVyIC51cGxvYWRzL3ppcCAmJiBkZWxldGUgb2xkIGZpbGUgaW4gZm9sZGVyIHVwbG9hZHMgKi9cblx0T3B0aW1pemVTdGFydHVwLmRlbGV0ZU9sZFVwbG9hZCgpO1xuXHRjb25zb2xlLmxvZyhwcm9jZXNzLmVudi5QV0QgKyAnLy51cGxvYWRzL3RtcCcpO1xufSk7XG5cbmFzeW5jIGZ1bmN0aW9uIGRlbGV0ZUVtYWlsVmFsaWQoKSB7XG5cdGNvbnN0IGFjYyAgPSBhd2FpdCBBY2NvdW50cy5maW5kVXNlckJ5RW1haWwoR1VFU1RfUVVFVUUpO1xuXHRpZihhY2MgJiYgYWNjLl9pZCl7XG5cdFx0QWNjb3VudHMucmVtb3ZlRW1haWwoYWNjLl9pZCwgR1VFU1RfUVVFVUUpO1xuXHRcdEFjY291bnRzLnNldFVzZXJuYW1lKGFjYy5faWQsIFJhbmRvbS5pZCgpKTtcblx0fVxufVxuIiwibGV0IGdldEZpcnN0QXR0YWNobWVudE9mRG9jdW1lbnQgPSBmdW5jdGlvbiAoaWREb2N1bWVudCkge1xuICAgIGNvbnNvbGUubG9nKCdnZXRGaXJzdEF0dGFjaG1lbnRPZkRvY3VtZW50JylcbiAgICBsZXQgZG9jdW1lbnQgPSBEb2N1bWVudHMuZmluZE9uZShpZERvY3VtZW50KTtcbiAgICBpZiAoZG9jdW1lbnQpIHtcbiAgICAgICAgbGV0IGF0dGFjaG1lbnQgPSBBdHRhY2htZW50cy5maW5kT25lKHtpZERvY3VtZW50OiBpZERvY3VtZW50LCBpc0RlZmF1bHQ6IHRydWV9KTtcbiAgICAgICAgaWYgKCFhdHRhY2htZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgZnVsbFBhdGggPSAnL3VwbG9hZC8nICtpZERvY3VtZW50ICsgJy8nICsgYXR0YWNobWVudC5uZXdfbmFtZTtcbiAgICAgICAgICAgIHJldHVybiBmdWxsUGF0aDtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbn1cblxuXG5sZXQgZ2V0Rmlyc3RBdHRhY2htZW50T2ZEb2N1bWVudFRvQ29tcHJlc3MgPSBmdW5jdGlvbiAoaWREb2N1bWVudCkge1xuICAgIGNvbnNvbGUubG9nKCdnZXRGaXJzdEF0dGFjaG1lbnRPZkRvY3VtZW50VG9Db21wcmVzcycpO1xuICAgIGxldCBkb2N1bWVudCA9IERvY3VtZW50cy5maW5kT25lKGlkRG9jdW1lbnQpO1xuICAgIGlmIChkb2N1bWVudCkge1xuICAgICAgICBsZXQgYXR0YWNobWVudCA9IEF0dGFjaG1lbnRzLmZpbmRPbmUoe2lkRG9jdW1lbnQ6IGlkRG9jdW1lbnQsIGlzRGVmYXVsdDogdHJ1ZX0pO1xuICAgICAgICBpZiAoIWF0dGFjaG1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBmdWxsUGF0aCA9IHByb2Nlc3MuZW52LlBXRCArICcvLnVwbG9hZHMvJyArIGlkRG9jdW1lbnQgKyAnLycgKyBhdHRhY2htZW50Lm5ld19uYW1lO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBuYW1lOiBhdHRhY2htZW50LnBhdGgsXG4gICAgICAgICAgICAgICAgZnVsbFBhdGg6IGZ1bGxQYXRoLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbn1cblxuZXhwb3J0IHtnZXRGaXJzdEF0dGFjaG1lbnRPZkRvY3VtZW50LCBnZXRGaXJzdEF0dGFjaG1lbnRPZkRvY3VtZW50VG9Db21wcmVzc307XG4iLCJsZXQgZnVjT3B0aW1pemVSc1NlYXJjaCA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgbm93VGltZSA9IG1vbWVudCgpO1xuICAgIGxldCB5ZXN0ZXJkYXkgPSBub3dUaW1lLmNsb25lKCkuYWRkKC0xLCAnZCcpLnZhbHVlT2YoKTtcblxuICAgIFJzU2VhcmNocy5yZW1vdmUoe1xuICAgICAgICBkYXRlX2NyZWF0ZTogeyRsdDogeWVzdGVyZGF5fVxuICAgIH0pO1xufVxuXG5leHBvcnQge2Z1Y09wdGltaXplUnNTZWFyY2h9O1xuXG5cbiIsImxldCBkZWxldGVPbGRVcGxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IHN1YjFEYXlGcm9tTm93ID0gbW9tZW50KCkuYWRkKCctMScsICdkJykudmFsdWVPZigpO1xuICAgIGxldCBvbGRGaWxlVXBsb2FkID0gVXBsb2Fkcy5maW5kKHtcbiAgICAgICAgJGFuZDogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGRhdGVfY3JlYXRlOiB7JGx0OiBzdWIxRGF5RnJvbU5vd31cbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0pO1xuICAgIGlmKG9sZEZpbGVVcGxvYWQuY291bnQoKSl7XG4gICAgICAgIG9sZEZpbGVVcGxvYWQuZmV0Y2goKS5tYXAoKHZhbCwgaWR4KSA9PiB7XG4gICAgICAgICAgICB0cnl7XG4gICAgICAgICAgICAgICAgTWV0ZW9yLmNhbGwoJ2RlbGV0ZUZpbGUnLCB7X2lkOiB2YWwuX2lkfSk7XG4gICAgICAgICAgICB9Y2F0Y2ggKGUpe31cblxuICAgICAgICB9KVxuICAgIH1cbn1cblxuZXhwb3J0IHtkZWxldGVPbGRVcGxvYWR9O1xuIiwidmFyIEZpYmVyID0gcmVxdWlyZSgnZmliZXJzJyk7XG5jb25zdCBmcyA9IHJlcXVpcmUoJ2ZzLWV4dHJhJyk7XG5cbmxldCBzYXZlUmVtaW5kID0gZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIEZpYmVyKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGxldCBsaXN0TmVlZFJlbWluZCA9IFtdO1xuICAgICAgICAgICAgbGV0IG5vd1RpbWUgPSBtb21lbnQoKTtcbiAgICAgICAgICAgIGxldCBzdWIxRGF5RnJvbU5vdyA9IG5vd1RpbWUuY2xvbmUoKS5hZGQoLTEsICdkJykudmFsdWVPZigpO1xuICAgICAgICAgICAgbGV0IGFkZDFEYXlGcm9tTm93ID0gbm93VGltZS5jbG9uZSgpLmFkZCgtMSwgJ2QnKS52YWx1ZU9mKCk7XG4gICAgICAgICAgICBsZXQgYWRkM0RheUZyb21Ob3cgPSBub3dUaW1lLmNsb25lKCkuYWRkKDMsICdkJykudmFsdWVPZigpO1xuXG4gICAgICAgICAgICBsZXQgYWxsRG9jdW1lbnRSZW1pbmRXaXRob3V0QmVmb3JlID0gRG9jdW1lbnRzLmZpbmQoe1xuICAgICAgICAgICAgICAgICRhbmQ6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgZHVlU3RhbXA6IHskZ3Q6IHN1YjFEYXlGcm9tTm93fVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkdWVTdGFtcDogeyRsdDogYWRkM0RheUZyb21Ob3d9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZXJ5OiB7JGVxOiAwfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoYWxsRG9jdW1lbnRSZW1pbmRXaXRob3V0QmVmb3JlLmNvdW50KCkpIHtcbiAgICAgICAgICAgICAgICBhbGxEb2N1bWVudFJlbWluZFdpdGhvdXRCZWZvcmUuZmV0Y2goKS5tYXAoKHZhbCwgaWR4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsaXN0TmVlZFJlbWluZC5pbmRleE9mKHZhbC5faWQpID09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0TmVlZFJlbWluZC5wdXNoKHZhbC5faWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBsZXQgYWxsRG9jdW1lbnRSZW1pbmRXaXRoQmVmb3JlID0gRG9jdW1lbnRzLmZpbmQoe1xuICAgICAgICAgICAgICAgICRhbmQ6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgZHVlU3RhbXA6IHskZ3Q6IHN1YjFEYXlGcm9tTm93fVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVyeTogeyRndDogMH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoYWxsRG9jdW1lbnRSZW1pbmRXaXRoQmVmb3JlLmNvdW50KCkpIHtcbiAgICAgICAgICAgICAgICBhbGxEb2N1bWVudFJlbWluZFdpdGhCZWZvcmUuZmV0Y2goKS5tYXAoKHZhbCwgaWR4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBkdWVEYXkgPSB2YWwuZHVlU3RhbXA7XG4gICAgICAgICAgICAgICAgICAgIGxldCBtbWR1ZURheSA9IG1vbWVudChkdWVEYXkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWwuZXZlcnkgJiYgdmFsLnVuaXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtbUJlZm9yZSA9IG1tZHVlRGF5LmNsb25lKCkuYWRkKCgtMSkgKiAodmFsLmV2ZXJ5KSwgdmFsLnVuaXQpLnZhbHVlT2YoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChub3dUaW1lLmNsb25lKCkgPj0gbW1CZWZvcmUgJiYgbm93VGltZS5jbG9uZSgpIDw9IGR1ZURheSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsaXN0TmVlZFJlbWluZC5pbmRleE9mKHZhbC5faWQpID09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3ROZWVkUmVtaW5kLnB1c2godmFsLl9pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIERvY3VtZW50UmVtaW5kLnJlbW92ZSh7fSk7XG4gICAgICAgICAgICBpZiAobGlzdE5lZWRSZW1pbmQgJiYgbGlzdE5lZWRSZW1pbmQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgZm9yIChpIGluIGxpc3ROZWVkUmVtaW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBhckluc2VydCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkRG9jOiBsaXN0TmVlZFJlbWluZFtpXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGVfY3JlYXRlOiBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBEb2N1bWVudFJlbWluZC5pbnNlcnQoYXJJbnNlcnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkucnVuKCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICB9XG59XG5cblxubGV0IGRlbGV0ZU9sZFppcCA9IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgemlwUGF0aCA9IHByb2Nlc3MuZW52LlBXRCArICcvLnVwbG9hZHMvemlwLyc7XG4gICAgbGV0IGZvcm1hdFRpbWUgPSAnRERfTU1fWVlZWV9ISF9tbV9zcyc7XG4gICAgbGV0IG1tTm93ID0gbW9tZW50KCk7XG4gICAgdHJ5IHtcbiAgICAgICAgZnMucmVhZGRpcih6aXBQYXRoLCBmdW5jdGlvbiAoZXJyLCBmaWxlcykge1xuICAgICAgICAgICAgaWYgKGVycikgcmV0dXJuO1xuICAgICAgICAgICAgZmlsZXMuZm9yRWFjaChmdW5jdGlvbiAoZikge1xuICAgICAgICAgICAgICAgIGlmIChmKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBuYW1lID0gZi5zcGxpdCgnLicpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgbW1Gb3JtYXQgPSBtb21lbnQoKS5mb3JtYXQoZm9ybWF0VGltZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuYW1lLmxlbmd0aCAmJiBuYW1lWzBdICYmIHR5cGVvZiBuYW1lWzBdID09PSAnc3RyaW5nJyAmJiBuYW1lWzBdLmxlbmd0aCA9PSBtbUZvcm1hdC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0aW1lSW5OYW1lID0gbmFtZVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtbURUID0gbW9tZW50KHRpbWVJbk5hbWUsIGZvcm1hdFRpbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1tRFQuYWRkKDEsICdob3VycycpLmRpZmYobW1Ob3cpIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZnVsUGF0aCA9IHppcFBhdGggKyBmO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZzLnVubGlua1N5bmMoZnVsUGF0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXIpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXIpO1xuICAgIH1cbn1cblxuZXhwb3J0IHtzYXZlUmVtaW5kLCBkZWxldGVPbGRaaXB9O1xuIiwiZnVuY3Rpb24gcmVtb3ZlU3BlY0NoYXJWaShzdHIpIHtcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvw6B8w6F84bqhfOG6o3zDo3zDonzhuqd84bqlfOG6rXzhuql84bqrfMSDfOG6sXzhuq984bq3fOG6s3zhurUvZywgXCJhXCIpO1xuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC/DgHzDgXzhuqF84bqifMODfMOCfOG6pnzhuqR84bqsfOG6qHzhuqp8xIJ84bqwfOG6rnzhurZ84bqyfOG6tC9nLCBcIkFcIik7XG5cbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvw6h8w6l84bq5fOG6u3zhur18w6p84buBfOG6v3zhu4d84buDfOG7hS9nLCBcImVcIik7XG4gICAgc3RyID0gc3RyLnJlcGxhY2UoL8OIfMOJfOG6uHzhurp84bq8fMOKfOG7gHzhur584buGfOG7gnzhu4QvZywgXCJFXCIpO1xuXG4gICAgc3RyID0gc3RyLnJlcGxhY2UoL8OsfMOtfOG7i3zhu4l8xKkvZywgXCJpXCIpO1xuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC/DjHzDjXzhu4p84buIfMSoL2csIFwiSVwiKTtcblxuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC/DsnzDs3zhu4184buPfMO1fMO0fOG7k3zhu5F84buZfOG7lXzhu5d8xqF84budfOG7m3zhu6N84buffOG7oS9nLCBcIm9cIik7XG4gICAgc3RyID0gc3RyLnJlcGxhY2UoL8OSfMOTfOG7jHzhu458w5V8w5R84buSfOG7kHzhu5h84buUfOG7lnzGoHzhu5x84buafOG7onzhu5584bugL2csIFwiT1wiKTtcblxuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC/DuXzDunzhu6V84bunfMWpfMawfOG7q3zhu6l84buxfOG7rXzhu68vZywgXCJ1XCIpO1xuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC/DmXzDmnzhu6R84bumfMWofMavfOG7qnzhu6h84buwfOG7rHzhu64vZywgXCJVXCIpO1xuXG4gICAgc3RyID0gc3RyLnJlcGxhY2UoL+G7s3zDvXzhu7V84bu3fOG7uS9nLCBcInlcIik7XG4gICAgc3RyID0gc3RyLnJlcGxhY2UoL+G7snzDnXzhu7R84bu2fOG7uC9nLCBcIllcIik7XG5cbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvxJEvZywgXCJkXCIpO1xuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC/EkC9nLCBcIsSQXCIpO1xuXG4gICAgcmV0dXJuIHN0cjtcbn1cblxuXG5mdW5jdGlvbiByZW1vdmVEaWFjcml0aWNzKHN0cikge1xuXG4gICAgdmFyIGRlZmF1bHREaWFjcml0aWNzUmVtb3ZhbE1hcCA9IFtcbiAgICAgICAge1xuICAgICAgICAgICAgJ2Jhc2UnOiAnQScsXG4gICAgICAgICAgICAnbGV0dGVycyc6IC9bXFx1MDA0MVxcdTI0QjZcXHVGRjIxXFx1MDBDMFxcdTAwQzFcXHUwMEMyXFx1MUVBNlxcdTFFQTRcXHUxRUFBXFx1MUVBOFxcdTAwQzNcXHUwMTAwXFx1MDEwMlxcdTFFQjBcXHUxRUFFXFx1MUVCNFxcdTFFQjJcXHUwMjI2XFx1MDFFMFxcdTAwQzRcXHUwMURFXFx1MUVBMlxcdTAwQzVcXHUwMUZBXFx1MDFDRFxcdTAyMDBcXHUwMjAyXFx1MUVBMFxcdTFFQUNcXHUxRUI2XFx1MUUwMFxcdTAxMDRcXHUwMjNBXFx1MkM2Rl0vZ1xuICAgICAgICB9LFxuICAgICAgICB7J2Jhc2UnOiAnQUEnLCAnbGV0dGVycyc6IC9bXFx1QTczMl0vZ30sXG4gICAgICAgIHsnYmFzZSc6ICdBRScsICdsZXR0ZXJzJzogL1tcXHUwMEM2XFx1MDFGQ1xcdTAxRTJdL2d9LFxuICAgICAgICB7J2Jhc2UnOiAnQU8nLCAnbGV0dGVycyc6IC9bXFx1QTczNF0vZ30sXG4gICAgICAgIHsnYmFzZSc6ICdBVScsICdsZXR0ZXJzJzogL1tcXHVBNzM2XS9nfSxcbiAgICAgICAgeydiYXNlJzogJ0FWJywgJ2xldHRlcnMnOiAvW1xcdUE3MzhcXHVBNzNBXS9nfSxcbiAgICAgICAgeydiYXNlJzogJ0FZJywgJ2xldHRlcnMnOiAvW1xcdUE3M0NdL2d9LFxuICAgICAgICB7J2Jhc2UnOiAnQicsICdsZXR0ZXJzJzogL1tcXHUwMDQyXFx1MjRCN1xcdUZGMjJcXHUxRTAyXFx1MUUwNFxcdTFFMDZcXHUwMjQzXFx1MDE4MlxcdTAxODFdL2d9LFxuICAgICAgICB7J2Jhc2UnOiAnQycsICdsZXR0ZXJzJzogL1tcXHUwMDQzXFx1MjRCOFxcdUZGMjNcXHUwMTA2XFx1MDEwOFxcdTAxMEFcXHUwMTBDXFx1MDBDN1xcdTFFMDhcXHUwMTg3XFx1MDIzQlxcdUE3M0VdL2d9LFxuICAgICAgICB7XG4gICAgICAgICAgICAnYmFzZSc6ICdEJyxcbiAgICAgICAgICAgICdsZXR0ZXJzJzogL1tcXHUwMDQ0XFx1MjRCOVxcdUZGMjRcXHUxRTBBXFx1MDEwRVxcdTFFMENcXHUxRTEwXFx1MUUxMlxcdTFFMEVcXHUwMTEwXFx1MDE4QlxcdTAxOEFcXHUwMTg5XFx1QTc3OV0vZ1xuICAgICAgICB9LFxuICAgICAgICB7J2Jhc2UnOiAnRFonLCAnbGV0dGVycyc6IC9bXFx1MDFGMVxcdTAxQzRdL2d9LFxuICAgICAgICB7J2Jhc2UnOiAnRHonLCAnbGV0dGVycyc6IC9bXFx1MDFGMlxcdTAxQzVdL2d9LFxuICAgICAgICB7XG4gICAgICAgICAgICAnYmFzZSc6ICdFJyxcbiAgICAgICAgICAgICdsZXR0ZXJzJzogL1tcXHUwMDQ1XFx1MjRCQVxcdUZGMjVcXHUwMEM4XFx1MDBDOVxcdTAwQ0FcXHUxRUMwXFx1MUVCRVxcdTFFQzRcXHUxRUMyXFx1MUVCQ1xcdTAxMTJcXHUxRTE0XFx1MUUxNlxcdTAxMTRcXHUwMTE2XFx1MDBDQlxcdTFFQkFcXHUwMTFBXFx1MDIwNFxcdTAyMDZcXHUxRUI4XFx1MUVDNlxcdTAyMjhcXHUxRTFDXFx1MDExOFxcdTFFMThcXHUxRTFBXFx1MDE5MFxcdTAxOEVdL2dcbiAgICAgICAgfSxcbiAgICAgICAgeydiYXNlJzogJ0YnLCAnbGV0dGVycyc6IC9bXFx1MDA0NlxcdTI0QkJcXHVGRjI2XFx1MUUxRVxcdTAxOTFcXHVBNzdCXS9nfSxcbiAgICAgICAge1xuICAgICAgICAgICAgJ2Jhc2UnOiAnRycsXG4gICAgICAgICAgICAnbGV0dGVycyc6IC9bXFx1MDA0N1xcdTI0QkNcXHVGRjI3XFx1MDFGNFxcdTAxMUNcXHUxRTIwXFx1MDExRVxcdTAxMjBcXHUwMUU2XFx1MDEyMlxcdTAxRTRcXHUwMTkzXFx1QTdBMFxcdUE3N0RcXHVBNzdFXS9nXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgICdiYXNlJzogJ0gnLFxuICAgICAgICAgICAgJ2xldHRlcnMnOiAvW1xcdTAwNDhcXHUyNEJEXFx1RkYyOFxcdTAxMjRcXHUxRTIyXFx1MUUyNlxcdTAyMUVcXHUxRTI0XFx1MUUyOFxcdTFFMkFcXHUwMTI2XFx1MkM2N1xcdTJDNzVcXHVBNzhEXS9nXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgICdiYXNlJzogJ0knLFxuICAgICAgICAgICAgJ2xldHRlcnMnOiAvW1xcdTAwNDlcXHUyNEJFXFx1RkYyOVxcdTAwQ0NcXHUwMENEXFx1MDBDRVxcdTAxMjhcXHUwMTJBXFx1MDEyQ1xcdTAxMzBcXHUwMENGXFx1MUUyRVxcdTFFQzhcXHUwMUNGXFx1MDIwOFxcdTAyMEFcXHUxRUNBXFx1MDEyRVxcdTFFMkNcXHUwMTk3XS9nXG4gICAgICAgIH0sXG4gICAgICAgIHsnYmFzZSc6ICdKJywgJ2xldHRlcnMnOiAvW1xcdTAwNEFcXHUyNEJGXFx1RkYyQVxcdTAxMzRcXHUwMjQ4XS9nfSxcbiAgICAgICAge1xuICAgICAgICAgICAgJ2Jhc2UnOiAnSycsXG4gICAgICAgICAgICAnbGV0dGVycyc6IC9bXFx1MDA0QlxcdTI0QzBcXHVGRjJCXFx1MUUzMFxcdTAxRThcXHUxRTMyXFx1MDEzNlxcdTFFMzRcXHUwMTk4XFx1MkM2OVxcdUE3NDBcXHVBNzQyXFx1QTc0NFxcdUE3QTJdL2dcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgJ2Jhc2UnOiAnTCcsXG4gICAgICAgICAgICAnbGV0dGVycyc6IC9bXFx1MDA0Q1xcdTI0QzFcXHVGRjJDXFx1MDEzRlxcdTAxMzlcXHUwMTNEXFx1MUUzNlxcdTFFMzhcXHUwMTNCXFx1MUUzQ1xcdTFFM0FcXHUwMTQxXFx1MDIzRFxcdTJDNjJcXHUyQzYwXFx1QTc0OFxcdUE3NDZcXHVBNzgwXS9nXG4gICAgICAgIH0sXG4gICAgICAgIHsnYmFzZSc6ICdMSicsICdsZXR0ZXJzJzogL1tcXHUwMUM3XS9nfSxcbiAgICAgICAgeydiYXNlJzogJ0xqJywgJ2xldHRlcnMnOiAvW1xcdTAxQzhdL2d9LFxuICAgICAgICB7J2Jhc2UnOiAnTScsICdsZXR0ZXJzJzogL1tcXHUwMDREXFx1MjRDMlxcdUZGMkRcXHUxRTNFXFx1MUU0MFxcdTFFNDJcXHUyQzZFXFx1MDE5Q10vZ30sXG4gICAgICAgIHtcbiAgICAgICAgICAgICdiYXNlJzogJ04nLFxuICAgICAgICAgICAgJ2xldHRlcnMnOiAvW1xcdTAwNEVcXHUyNEMzXFx1RkYyRVxcdTAxRjhcXHUwMTQzXFx1MDBEMVxcdTFFNDRcXHUwMTQ3XFx1MUU0NlxcdTAxNDVcXHUxRTRBXFx1MUU0OFxcdTAyMjBcXHUwMTlEXFx1QTc5MFxcdUE3QTRdL2dcbiAgICAgICAgfSxcbiAgICAgICAgeydiYXNlJzogJ05KJywgJ2xldHRlcnMnOiAvW1xcdTAxQ0FdL2d9LFxuICAgICAgICB7J2Jhc2UnOiAnTmonLCAnbGV0dGVycyc6IC9bXFx1MDFDQl0vZ30sXG4gICAgICAgIHtcbiAgICAgICAgICAgICdiYXNlJzogJ08nLFxuICAgICAgICAgICAgJ2xldHRlcnMnOiAvW1xcdTAwNEZcXHUyNEM0XFx1RkYyRlxcdTAwRDJcXHUwMEQzXFx1MDBENFxcdTFFRDJcXHUxRUQwXFx1MUVENlxcdTFFRDRcXHUwMEQ1XFx1MUU0Q1xcdTAyMkNcXHUxRTRFXFx1MDE0Q1xcdTFFNTBcXHUxRTUyXFx1MDE0RVxcdTAyMkVcXHUwMjMwXFx1MDBENlxcdTAyMkFcXHUxRUNFXFx1MDE1MFxcdTAxRDFcXHUwMjBDXFx1MDIwRVxcdTAxQTBcXHUxRURDXFx1MUVEQVxcdTFFRTBcXHUxRURFXFx1MUVFMlxcdTFFQ0NcXHUxRUQ4XFx1MDFFQVxcdTAxRUNcXHUwMEQ4XFx1MDFGRVxcdTAxODZcXHUwMTlGXFx1QTc0QVxcdUE3NENdL2dcbiAgICAgICAgfSxcbiAgICAgICAgeydiYXNlJzogJ09JJywgJ2xldHRlcnMnOiAvW1xcdTAxQTJdL2d9LFxuICAgICAgICB7J2Jhc2UnOiAnT08nLCAnbGV0dGVycyc6IC9bXFx1QTc0RV0vZ30sXG4gICAgICAgIHsnYmFzZSc6ICdPVScsICdsZXR0ZXJzJzogL1tcXHUwMjIyXS9nfSxcbiAgICAgICAgeydiYXNlJzogJ1AnLCAnbGV0dGVycyc6IC9bXFx1MDA1MFxcdTI0QzVcXHVGRjMwXFx1MUU1NFxcdTFFNTZcXHUwMUE0XFx1MkM2M1xcdUE3NTBcXHVBNzUyXFx1QTc1NF0vZ30sXG4gICAgICAgIHsnYmFzZSc6ICdRJywgJ2xldHRlcnMnOiAvW1xcdTAwNTFcXHUyNEM2XFx1RkYzMVxcdUE3NTZcXHVBNzU4XFx1MDI0QV0vZ30sXG4gICAgICAgIHtcbiAgICAgICAgICAgICdiYXNlJzogJ1InLFxuICAgICAgICAgICAgJ2xldHRlcnMnOiAvW1xcdTAwNTJcXHUyNEM3XFx1RkYzMlxcdTAxNTRcXHUxRTU4XFx1MDE1OFxcdTAyMTBcXHUwMjEyXFx1MUU1QVxcdTFFNUNcXHUwMTU2XFx1MUU1RVxcdTAyNENcXHUyQzY0XFx1QTc1QVxcdUE3QTZcXHVBNzgyXS9nXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgICdiYXNlJzogJ1MnLFxuICAgICAgICAgICAgJ2xldHRlcnMnOiAvW1xcdTAwNTNcXHUyNEM4XFx1RkYzM1xcdTFFOUVcXHUwMTVBXFx1MUU2NFxcdTAxNUNcXHUxRTYwXFx1MDE2MFxcdTFFNjZcXHUxRTYyXFx1MUU2OFxcdTAyMThcXHUwMTVFXFx1MkM3RVxcdUE3QThcXHVBNzg0XS9nXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgICdiYXNlJzogJ1QnLFxuICAgICAgICAgICAgJ2xldHRlcnMnOiAvW1xcdTAwNTRcXHUyNEM5XFx1RkYzNFxcdTFFNkFcXHUwMTY0XFx1MUU2Q1xcdTAyMUFcXHUwMTYyXFx1MUU3MFxcdTFFNkVcXHUwMTY2XFx1MDFBQ1xcdTAxQUVcXHUwMjNFXFx1QTc4Nl0vZ1xuICAgICAgICB9LFxuICAgICAgICB7J2Jhc2UnOiAnVFonLCAnbGV0dGVycyc6IC9bXFx1QTcyOF0vZ30sXG4gICAgICAgIHtcbiAgICAgICAgICAgICdiYXNlJzogJ1UnLFxuICAgICAgICAgICAgJ2xldHRlcnMnOiAvW1xcdTAwNTVcXHUyNENBXFx1RkYzNVxcdTAwRDlcXHUwMERBXFx1MDBEQlxcdTAxNjhcXHUxRTc4XFx1MDE2QVxcdTFFN0FcXHUwMTZDXFx1MDBEQ1xcdTAxREJcXHUwMUQ3XFx1MDFENVxcdTAxRDlcXHUxRUU2XFx1MDE2RVxcdTAxNzBcXHUwMUQzXFx1MDIxNFxcdTAyMTZcXHUwMUFGXFx1MUVFQVxcdTFFRThcXHUxRUVFXFx1MUVFQ1xcdTFFRjBcXHUxRUU0XFx1MUU3MlxcdTAxNzJcXHUxRTc2XFx1MUU3NFxcdTAyNDRdL2dcbiAgICAgICAgfSxcbiAgICAgICAgeydiYXNlJzogJ1YnLCAnbGV0dGVycyc6IC9bXFx1MDA1NlxcdTI0Q0JcXHVGRjM2XFx1MUU3Q1xcdTFFN0VcXHUwMUIyXFx1QTc1RVxcdTAyNDVdL2d9LFxuICAgICAgICB7J2Jhc2UnOiAnVlknLCAnbGV0dGVycyc6IC9bXFx1QTc2MF0vZ30sXG4gICAgICAgIHsnYmFzZSc6ICdXJywgJ2xldHRlcnMnOiAvW1xcdTAwNTdcXHUyNENDXFx1RkYzN1xcdTFFODBcXHUxRTgyXFx1MDE3NFxcdTFFODZcXHUxRTg0XFx1MUU4OFxcdTJDNzJdL2d9LFxuICAgICAgICB7J2Jhc2UnOiAnWCcsICdsZXR0ZXJzJzogL1tcXHUwMDU4XFx1MjRDRFxcdUZGMzhcXHUxRThBXFx1MUU4Q10vZ30sXG4gICAgICAgIHtcbiAgICAgICAgICAgICdiYXNlJzogJ1knLFxuICAgICAgICAgICAgJ2xldHRlcnMnOiAvW1xcdTAwNTlcXHUyNENFXFx1RkYzOVxcdTFFRjJcXHUwMEREXFx1MDE3NlxcdTFFRjhcXHUwMjMyXFx1MUU4RVxcdTAxNzhcXHUxRUY2XFx1MUVGNFxcdTAxQjNcXHUwMjRFXFx1MUVGRV0vZ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICAnYmFzZSc6ICdaJyxcbiAgICAgICAgICAgICdsZXR0ZXJzJzogL1tcXHUwMDVBXFx1MjRDRlxcdUZGM0FcXHUwMTc5XFx1MUU5MFxcdTAxN0JcXHUwMTdEXFx1MUU5MlxcdTFFOTRcXHUwMUI1XFx1MDIyNFxcdTJDN0ZcXHUyQzZCXFx1QTc2Ml0vZ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICAnYmFzZSc6ICdhJyxcbiAgICAgICAgICAgICdsZXR0ZXJzJzogL1tcXHUwMDYxXFx1MjREMFxcdUZGNDFcXHUxRTlBXFx1MDBFMFxcdTAwRTFcXHUwMEUyXFx1MUVBN1xcdTFFQTVcXHUxRUFCXFx1MUVBOVxcdTAwRTNcXHUwMTAxXFx1MDEwM1xcdTFFQjFcXHUxRUFGXFx1MUVCNVxcdTFFQjNcXHUwMjI3XFx1MDFFMVxcdTAwRTRcXHUwMURGXFx1MUVBM1xcdTAwRTVcXHUwMUZCXFx1MDFDRVxcdTAyMDFcXHUwMjAzXFx1MUVBMVxcdTFFQURcXHUxRUI3XFx1MUUwMVxcdTAxMDVcXHUyQzY1XFx1MDI1MF0vZ1xuICAgICAgICB9LFxuICAgICAgICB7J2Jhc2UnOiAnYWEnLCAnbGV0dGVycyc6IC9bXFx1QTczM10vZ30sXG4gICAgICAgIHsnYmFzZSc6ICdhZScsICdsZXR0ZXJzJzogL1tcXHUwMEU2XFx1MDFGRFxcdTAxRTNdL2d9LFxuICAgICAgICB7J2Jhc2UnOiAnYW8nLCAnbGV0dGVycyc6IC9bXFx1QTczNV0vZ30sXG4gICAgICAgIHsnYmFzZSc6ICdhdScsICdsZXR0ZXJzJzogL1tcXHVBNzM3XS9nfSxcbiAgICAgICAgeydiYXNlJzogJ2F2JywgJ2xldHRlcnMnOiAvW1xcdUE3MzlcXHVBNzNCXS9nfSxcbiAgICAgICAgeydiYXNlJzogJ2F5JywgJ2xldHRlcnMnOiAvW1xcdUE3M0RdL2d9LFxuICAgICAgICB7J2Jhc2UnOiAnYicsICdsZXR0ZXJzJzogL1tcXHUwMDYyXFx1MjREMVxcdUZGNDJcXHUxRTAzXFx1MUUwNVxcdTFFMDdcXHUwMTgwXFx1MDE4M1xcdTAyNTNdL2d9LFxuICAgICAgICB7J2Jhc2UnOiAnYycsICdsZXR0ZXJzJzogL1tcXHUwMDYzXFx1MjREMlxcdUZGNDNcXHUwMTA3XFx1MDEwOVxcdTAxMEJcXHUwMTBEXFx1MDBFN1xcdTFFMDlcXHUwMTg4XFx1MDIzQ1xcdUE3M0ZcXHUyMTg0XS9nfSxcbiAgICAgICAge1xuICAgICAgICAgICAgJ2Jhc2UnOiAnZCcsXG4gICAgICAgICAgICAnbGV0dGVycyc6IC9bXFx1MDA2NFxcdTI0RDNcXHVGRjQ0XFx1MUUwQlxcdTAxMEZcXHUxRTBEXFx1MUUxMVxcdTFFMTNcXHUxRTBGXFx1MDExMVxcdTAxOENcXHUwMjU2XFx1MDI1N1xcdUE3N0FdL2dcbiAgICAgICAgfSxcbiAgICAgICAgeydiYXNlJzogJ2R6JywgJ2xldHRlcnMnOiAvW1xcdTAxRjNcXHUwMUM2XS9nfSxcbiAgICAgICAge1xuICAgICAgICAgICAgJ2Jhc2UnOiAnZScsXG4gICAgICAgICAgICAnbGV0dGVycyc6IC9bXFx1MDA2NVxcdTI0RDRcXHVGRjQ1XFx1MDBFOFxcdTAwRTlcXHUwMEVBXFx1MUVDMVxcdTFFQkZcXHUxRUM1XFx1MUVDM1xcdTFFQkRcXHUwMTEzXFx1MUUxNVxcdTFFMTdcXHUwMTE1XFx1MDExN1xcdTAwRUJcXHUxRUJCXFx1MDExQlxcdTAyMDVcXHUwMjA3XFx1MUVCOVxcdTFFQzdcXHUwMjI5XFx1MUUxRFxcdTAxMTlcXHUxRTE5XFx1MUUxQlxcdTAyNDdcXHUwMjVCXFx1MDFERF0vZ1xuICAgICAgICB9LFxuICAgICAgICB7J2Jhc2UnOiAnZicsICdsZXR0ZXJzJzogL1tcXHUwMDY2XFx1MjRENVxcdUZGNDZcXHUxRTFGXFx1MDE5MlxcdUE3N0NdL2d9LFxuICAgICAgICB7XG4gICAgICAgICAgICAnYmFzZSc6ICdnJyxcbiAgICAgICAgICAgICdsZXR0ZXJzJzogL1tcXHUwMDY3XFx1MjRENlxcdUZGNDdcXHUwMUY1XFx1MDExRFxcdTFFMjFcXHUwMTFGXFx1MDEyMVxcdTAxRTdcXHUwMTIzXFx1MDFFNVxcdTAyNjBcXHVBN0ExXFx1MUQ3OVxcdUE3N0ZdL2dcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgJ2Jhc2UnOiAnaCcsXG4gICAgICAgICAgICAnbGV0dGVycyc6IC9bXFx1MDA2OFxcdTI0RDdcXHVGRjQ4XFx1MDEyNVxcdTFFMjNcXHUxRTI3XFx1MDIxRlxcdTFFMjVcXHUxRTI5XFx1MUUyQlxcdTFFOTZcXHUwMTI3XFx1MkM2OFxcdTJDNzZcXHUwMjY1XS9nXG4gICAgICAgIH0sXG4gICAgICAgIHsnYmFzZSc6ICdodicsICdsZXR0ZXJzJzogL1tcXHUwMTk1XS9nfSxcbiAgICAgICAge1xuICAgICAgICAgICAgJ2Jhc2UnOiAnaScsXG4gICAgICAgICAgICAnbGV0dGVycyc6IC9bXFx1MDA2OVxcdTI0RDhcXHVGRjQ5XFx1MDBFQ1xcdTAwRURcXHUwMEVFXFx1MDEyOVxcdTAxMkJcXHUwMTJEXFx1MDBFRlxcdTFFMkZcXHUxRUM5XFx1MDFEMFxcdTAyMDlcXHUwMjBCXFx1MUVDQlxcdTAxMkZcXHUxRTJEXFx1MDI2OFxcdTAxMzFdL2dcbiAgICAgICAgfSxcbiAgICAgICAgeydiYXNlJzogJ2onLCAnbGV0dGVycyc6IC9bXFx1MDA2QVxcdTI0RDlcXHVGRjRBXFx1MDEzNVxcdTAxRjBcXHUwMjQ5XS9nfSxcbiAgICAgICAge1xuICAgICAgICAgICAgJ2Jhc2UnOiAnaycsXG4gICAgICAgICAgICAnbGV0dGVycyc6IC9bXFx1MDA2QlxcdTI0REFcXHVGRjRCXFx1MUUzMVxcdTAxRTlcXHUxRTMzXFx1MDEzN1xcdTFFMzVcXHUwMTk5XFx1MkM2QVxcdUE3NDFcXHVBNzQzXFx1QTc0NVxcdUE3QTNdL2dcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgJ2Jhc2UnOiAnbCcsXG4gICAgICAgICAgICAnbGV0dGVycyc6IC9bXFx1MDA2Q1xcdTI0REJcXHVGRjRDXFx1MDE0MFxcdTAxM0FcXHUwMTNFXFx1MUUzN1xcdTFFMzlcXHUwMTNDXFx1MUUzRFxcdTFFM0JcXHUwMTdGXFx1MDE0MlxcdTAxOUFcXHUwMjZCXFx1MkM2MVxcdUE3NDlcXHVBNzgxXFx1QTc0N10vZ1xuICAgICAgICB9LFxuICAgICAgICB7J2Jhc2UnOiAnbGonLCAnbGV0dGVycyc6IC9bXFx1MDFDOV0vZ30sXG4gICAgICAgIHsnYmFzZSc6ICdtJywgJ2xldHRlcnMnOiAvW1xcdTAwNkRcXHUyNERDXFx1RkY0RFxcdTFFM0ZcXHUxRTQxXFx1MUU0M1xcdTAyNzFcXHUwMjZGXS9nfSxcbiAgICAgICAge1xuICAgICAgICAgICAgJ2Jhc2UnOiAnbicsXG4gICAgICAgICAgICAnbGV0dGVycyc6IC9bXFx1MDA2RVxcdTI0RERcXHVGRjRFXFx1MDFGOVxcdTAxNDRcXHUwMEYxXFx1MUU0NVxcdTAxNDhcXHUxRTQ3XFx1MDE0NlxcdTFFNEJcXHUxRTQ5XFx1MDE5RVxcdTAyNzJcXHUwMTQ5XFx1QTc5MVxcdUE3QTVdL2dcbiAgICAgICAgfSxcbiAgICAgICAgeydiYXNlJzogJ25qJywgJ2xldHRlcnMnOiAvW1xcdTAxQ0NdL2d9LFxuICAgICAgICB7XG4gICAgICAgICAgICAnYmFzZSc6ICdvJyxcbiAgICAgICAgICAgICdsZXR0ZXJzJzogL1tcXHUwMDZGXFx1MjRERVxcdUZGNEZcXHUwMEYyXFx1MDBGM1xcdTAwRjRcXHUxRUQzXFx1MUVEMVxcdTFFRDdcXHUxRUQ1XFx1MDBGNVxcdTFFNERcXHUwMjJEXFx1MUU0RlxcdTAxNERcXHUxRTUxXFx1MUU1M1xcdTAxNEZcXHUwMjJGXFx1MDIzMVxcdTAwRjZcXHUwMjJCXFx1MUVDRlxcdTAxNTFcXHUwMUQyXFx1MDIwRFxcdTAyMEZcXHUwMUExXFx1MUVERFxcdTFFREJcXHUxRUUxXFx1MUVERlxcdTFFRTNcXHUxRUNEXFx1MUVEOVxcdTAxRUJcXHUwMUVEXFx1MDBGOFxcdTAxRkZcXHUwMjU0XFx1QTc0QlxcdUE3NERcXHUwMjc1XS9nXG4gICAgICAgIH0sXG4gICAgICAgIHsnYmFzZSc6ICdvaScsICdsZXR0ZXJzJzogL1tcXHUwMUEzXS9nfSxcbiAgICAgICAgeydiYXNlJzogJ291JywgJ2xldHRlcnMnOiAvW1xcdTAyMjNdL2d9LFxuICAgICAgICB7J2Jhc2UnOiAnb28nLCAnbGV0dGVycyc6IC9bXFx1QTc0Rl0vZ30sXG4gICAgICAgIHsnYmFzZSc6ICdwJywgJ2xldHRlcnMnOiAvW1xcdTAwNzBcXHUyNERGXFx1RkY1MFxcdTFFNTVcXHUxRTU3XFx1MDFBNVxcdTFEN0RcXHVBNzUxXFx1QTc1M1xcdUE3NTVdL2d9LFxuICAgICAgICB7J2Jhc2UnOiAncScsICdsZXR0ZXJzJzogL1tcXHUwMDcxXFx1MjRFMFxcdUZGNTFcXHUwMjRCXFx1QTc1N1xcdUE3NTldL2d9LFxuICAgICAgICB7XG4gICAgICAgICAgICAnYmFzZSc6ICdyJyxcbiAgICAgICAgICAgICdsZXR0ZXJzJzogL1tcXHUwMDcyXFx1MjRFMVxcdUZGNTJcXHUwMTU1XFx1MUU1OVxcdTAxNTlcXHUwMjExXFx1MDIxM1xcdTFFNUJcXHUxRTVEXFx1MDE1N1xcdTFFNUZcXHUwMjREXFx1MDI3RFxcdUE3NUJcXHVBN0E3XFx1QTc4M10vZ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICAnYmFzZSc6ICdzJyxcbiAgICAgICAgICAgICdsZXR0ZXJzJzogL1tcXHUwMDczXFx1MjRFMlxcdUZGNTNcXHUwMERGXFx1MDE1QlxcdTFFNjVcXHUwMTVEXFx1MUU2MVxcdTAxNjFcXHUxRTY3XFx1MUU2M1xcdTFFNjlcXHUwMjE5XFx1MDE1RlxcdTAyM0ZcXHVBN0E5XFx1QTc4NVxcdTFFOUJdL2dcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgJ2Jhc2UnOiAndCcsXG4gICAgICAgICAgICAnbGV0dGVycyc6IC9bXFx1MDA3NFxcdTI0RTNcXHVGRjU0XFx1MUU2QlxcdTFFOTdcXHUwMTY1XFx1MUU2RFxcdTAyMUJcXHUwMTYzXFx1MUU3MVxcdTFFNkZcXHUwMTY3XFx1MDFBRFxcdTAyODhcXHUyQzY2XFx1QTc4N10vZ1xuICAgICAgICB9LFxuICAgICAgICB7J2Jhc2UnOiAndHonLCAnbGV0dGVycyc6IC9bXFx1QTcyOV0vZ30sXG4gICAgICAgIHtcbiAgICAgICAgICAgICdiYXNlJzogJ3UnLFxuICAgICAgICAgICAgJ2xldHRlcnMnOiAvW1xcdTAwNzVcXHUyNEU0XFx1RkY1NVxcdTAwRjlcXHUwMEZBXFx1MDBGQlxcdTAxNjlcXHUxRTc5XFx1MDE2QlxcdTFFN0JcXHUwMTZEXFx1MDBGQ1xcdTAxRENcXHUwMUQ4XFx1MDFENlxcdTAxREFcXHUxRUU3XFx1MDE2RlxcdTAxNzFcXHUwMUQ0XFx1MDIxNVxcdTAyMTdcXHUwMUIwXFx1MUVFQlxcdTFFRTlcXHUxRUVGXFx1MUVFRFxcdTFFRjFcXHUxRUU1XFx1MUU3M1xcdTAxNzNcXHUxRTc3XFx1MUU3NVxcdTAyODldL2dcbiAgICAgICAgfSxcbiAgICAgICAgeydiYXNlJzogJ3YnLCAnbGV0dGVycyc6IC9bXFx1MDA3NlxcdTI0RTVcXHVGRjU2XFx1MUU3RFxcdTFFN0ZcXHUwMjhCXFx1QTc1RlxcdTAyOENdL2d9LFxuICAgICAgICB7J2Jhc2UnOiAndnknLCAnbGV0dGVycyc6IC9bXFx1QTc2MV0vZ30sXG4gICAgICAgIHsnYmFzZSc6ICd3JywgJ2xldHRlcnMnOiAvW1xcdTAwNzdcXHUyNEU2XFx1RkY1N1xcdTFFODFcXHUxRTgzXFx1MDE3NVxcdTFFODdcXHUxRTg1XFx1MUU5OFxcdTFFODlcXHUyQzczXS9nfSxcbiAgICAgICAgeydiYXNlJzogJ3gnLCAnbGV0dGVycyc6IC9bXFx1MDA3OFxcdTI0RTdcXHVGRjU4XFx1MUU4QlxcdTFFOERdL2d9LFxuICAgICAgICB7XG4gICAgICAgICAgICAnYmFzZSc6ICd5JyxcbiAgICAgICAgICAgICdsZXR0ZXJzJzogL1tcXHUwMDc5XFx1MjRFOFxcdUZGNTlcXHUxRUYzXFx1MDBGRFxcdTAxNzdcXHUxRUY5XFx1MDIzM1xcdTFFOEZcXHUwMEZGXFx1MUVGN1xcdTFFOTlcXHUxRUY1XFx1MDFCNFxcdTAyNEZcXHUxRUZGXS9nXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgICdiYXNlJzogJ3onLFxuICAgICAgICAgICAgJ2xldHRlcnMnOiAvW1xcdTAwN0FcXHUyNEU5XFx1RkY1QVxcdTAxN0FcXHUxRTkxXFx1MDE3Q1xcdTAxN0VcXHUxRTkzXFx1MUU5NVxcdTAxQjZcXHUwMjI1XFx1MDI0MFxcdTJDNkNcXHVBNzYzXS9nXG4gICAgICAgIH1cbiAgICBdO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkZWZhdWx0RGlhY3JpdGljc1JlbW92YWxNYXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgc3RyID0gc3RyLnJlcGxhY2UoZGVmYXVsdERpYWNyaXRpY3NSZW1vdmFsTWFwW2ldLmxldHRlcnMsIGRlZmF1bHREaWFjcml0aWNzUmVtb3ZhbE1hcFtpXS5iYXNlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RyO1xuXG59XG5cbmxldCBzdHJXaXRob3V0U3BlYyA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gcmVtb3ZlRGlhY3JpdGljcyhzdHIpXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIHJlbW92ZVNwZWNDaGFyVmkoc3RyKTtcbiAgICAgICAgfSBjYXRjaCAoZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBzdHI7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmxldCBidWlsZFJlZ0V4cCA9IGZ1bmN0aW9uIChzZWFyY2hUZXh0KSB7XG4gICAgdmFyIHdvcmRzID0gc2VhcmNoVGV4dC50cmltKCkuc3BsaXQoL1sgXFwtXFw6XSsvKTtcbiAgICB2YXIgZXhwcyA9IF8ubWFwKHdvcmRzLCBmdW5jdGlvbiAod29yZCkge1xuICAgICAgICByZXR1cm4gXCIoPz0uKlwiICsgd29yZCArIFwiKVwiO1xuICAgIH0pO1xuICAgIHZhciBmdWxsRXhwID0gZXhwcy5qb2luKCcnKSArIFwiLitcIjtcbiAgICByZXR1cm4gbmV3IFJlZ0V4cChmdWxsRXhwLCBcImlcIik7XG59XG5cbmV4cG9ydCB7c3RyV2l0aG91dFNwZWMsIGJ1aWxkUmVnRXhwfTtcbiJdfQ==
