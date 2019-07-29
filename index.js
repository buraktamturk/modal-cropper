(function(root, factory) {
  if(typeof define === 'function' && define.amd) {
    define(['tingle.js', 'cropperjs'], factory);
  } else if(typeof exports === 'object') {
    module.exports = factory(require('tingle.js'), require('cropperjs'));
  } else {
    root.modal_cropper = factory(root.tingle, root.Cropper);
  }
})(this, function(tingle, Cropper) {
  'use strict';

  function resize_canvas(canvas, width, height) {
    if(canvas.width <= width || canvas.height <= height)
      return canvas;

    var elem = document.createElement('canvas');
    elem.width = width;
    elem.height = height;

    var ctx = elem.getContext('2d');
    ctx.drawImage(canvas, 0, 0, width, height);

    return elem;
  }

  return function(file, width, height, type) {
    if(type !== "jpg" && type !== "png") {
      return Promise.reject(new Error("invalid image type: " + type));
    }

    var ratio = width / height;

    var blob = URL.createObjectURL(file);
    var image = document.createElement('img');
    image.style.maxHeight = "500px";
    image.src = blob;

    return new Promise(function(resolve) { 
      var cropper, done, result;

      var modal = new tingle.modal({
        footer: true,
        stickyFooter: false,
        closeMethods: ['overlay', 'button', 'escape'],
        closeLabel: "Close",
        onOpen: function() {
          cropper = new Cropper(image, {
            aspectRatio: ratio,
            viewMode: 2
          });
        },
        onClose: function() {
          if(result) {
            resize_canvas(result, width, height)
              .toBlob(resolve, type == "jpg" ? "image/jpeg" : "image.png", 1);
          } else {
            resolve(null);
          }
        },
        beforeClose: function() {
          if(done) {
            result = cropper.getCroppedCanvas();
          }

          return true;
        }
      });

      var div = document.createElement("div");
      
      div.appendChild(image);

      modal.setContent(div);

      modal.addFooterBtn('Cancel', 'tingle-btn tingle-btn--danger', function() {
        modal.close();
      });

      modal.addFooterBtn('Crop', 'tingle-btn tingle-btn--primary', function() {
        done = 1;
        modal.close();
      });

      modal.open();
    });
  };
});