# modal-cropper

Promise-based, simplified, single-function library for very basic image crop operation on browser side and in modal.

This library depends on [Tingle](https://github.com/robinparisi/tingle) and [Cropper.js](https://fengyuanchen.github.io/cropperjs/).

Actually all this library do is to wrap this two libraries into very simple function that just work for specific purpose.

## Installation and Usage

1. Install the package with your favorite package manager:

```shell
npm install --save modal-cropper
```

2. Include css files of dependencies:

```css
@import url('~tingle.js/dist/tingle.css');
@import url('~cropperjs/dist/cropper.css');
```

3. Import and call the library:

```js
var cropper = require('modal-cropper');

async function someFunction() {
  // assuming user choose an image from input
  // var file = file_input[0].files[0];
  // or you have a Blob object with 

  // and you want 1920x1080 JPG image from it
  try {
    var result = await cropper(file, 1920, 1080, 'jpg');
    if(result) {
      // call your favorite http client to upload the picture
    } else {
      // user cancelled the operation
    }
  } catch(e) {
    // some exception occur
  }
}
```

This library supports CommonJS and AMD specs, if you do not use a proper CommonJS or AMD loader, you need to include [Tingle](https://github.com/robinparisi/tingle), [Cropper.js](https://fengyuanchen.github.io/cropperjs/) and index.js and use window.modal_cropper in your code.

If you use ES5 syntax in your project, instead of using await, you can use .then to get the results from this library.

## Contributing

Pull requests and issues are welcome!

## License

© 2018 [Burak Tamturk](https://buraktamturk.org/)
© 2018 [Robin Parisi](https://github.com/robinparisi)  
© 2015 [Chen Fengyuan](https://chenfengyuan.com/)

Released under the [MIT LICENSE](http://opensource.org/licenses/MIT)