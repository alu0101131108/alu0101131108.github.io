'use strict';

class IpView {
  renderer;
  originalChart;
  resultChart;
  tempChart;
  infoElements;

  constructor() {
    this.infoElements = {
      original: {
        extension: document.getElementById('org-extension'),
        size: document.getElementById('org-size'),
        colorRange: document.getElementById('org-colorRange'),
        bright: document.getElementById('org-bright'),
        contrast: document.getElementById('org-contrast'),
        entropy: document.getElementById('org-entropy'),
        mouseXY: document.getElementById('mouseXY'),
        pixelValues: document.getElementById('pixelValues')
      },
      result: {
        extension: document.getElementById('res-extension'),
        size: document.getElementById('res-size'),
        colorRange: document.getElementById('res-colorRange'),
        bright: document.getElementById('res-bright'),
        contrast: document.getElementById('res-contrast'),
        entropy: document.getElementById('res-entropy'),
        mouseXY: document.getElementById('mouseXY'),
        pixelValues: document.getElementById('pixelValues')
      }
    }
  }

  // Recreates canvas according to new original and result images.
  updateCanvas(original, result) {
    // Canvas creation
    const CANVAS_WIDTH = result ? 
        original.size.width + result.size.width : original.size.width;
    const CANVAS_HEIGHT = result ? 
        max(original.size.height, result.size.height) : original.size.height;
    this.renderer = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    this.renderer.parent(document.getElementById('canvas'));

    // Canvas images
    background(28, 28, 33);
    image(original.p5Image, 0, 0);
    if (result) {
      image(result.p5Image, original.size.width, 0);
      document.getElementById('result-title').style.display = 'inline';
    } else {
      document.getElementById('result-title').style.display = 'none';
    }
  }

  // Updates info section based on current original image.
  updateImageInfo(originalImageData, resultImageData) {
    this.infoElements.original.extension.textContent = 
        'Extensión: ' + originalImageData.extension;
    this.infoElements.original.size.textContent = 
        'Tamaño: ' + originalImageData.size.width + ' x ' + originalImageData.size.height;
    this.infoElements.original.colorRange.textContent = 
        'Rango de colores: [' + originalImageData.colorRange.low + 
        ', ' + originalImageData.colorRange.high + ']';
    this.infoElements.original.bright.textContent = 
        'Brillo: ' + originalImageData.parameters.bright;
    this.infoElements.original.contrast.textContent = 
        'Contraste: ' + originalImageData.parameters.contrast;
    this.infoElements.original.entropy.textContent = 
        'Entropía: ' + originalImageData.parameters.entropy;
    document.getElementById('resImgInfo').style.display = 'none';
    if (resultImageData) {
      document.getElementById('resImgInfo').style.display = 'inline';
      this.infoElements.result.extension.textContent = 
          'Extensión: ' + resultImageData.extension;
      this.infoElements.result.size.textContent = 
          'Tamaño: ' + resultImageData.size.width + ' x ' + resultImageData.size.height;
      this.infoElements.result.colorRange.textContent = 
          'Rango de colores: [' + resultImageData.colorRange.low + 
          ', ' + resultImageData.colorRange.high + ']';
      this.infoElements.result.bright.textContent = 
          'Brillo: ' + resultImageData.parameters.bright;
      this.infoElements.result.contrast.textContent = 
          'Contraste: ' + resultImageData.parameters.contrast;
      this.infoElements.result.entropy.textContent = 
          'Entropía: ' + resultImageData.parameters.entropy;
    }
  }

  // Updates info section based on user input.
  updateInputInfo(inputData) {
    if (inputData.image === 'Original') {
      this.infoElements.original.mouseXY.textContent = 
      'X: ' + inputData.x + ',  Y: ' + inputData.y;
      this.infoElements.original.pixelValues.textContent = 
      'R: ' + inputData.r + ',  G: ' + inputData.g + ',  B: ' + inputData.b + ',  A: ' + 
      inputData.a + ',  Gris: ' + inputData.grey;
    } else if (inputData.image === 'Resultado') {
      this.infoElements.result.mouseXY.textContent = 
      'X: ' + inputData.x + ',  Y: ' + inputData.y;
      this.infoElements.result.pixelValues.textContent = 
      'R: ' + inputData.r + ',  G: ' + inputData.g + ',  B: ' + inputData.b + ',  A: ' + 
      inputData.a + ',  Gris: ' + inputData.grey;
    }
  }
  
  // Updates histograms according to new original and result images.
  updateHistograms(original, result) {
    const normal = document.getElementById('choice-reg').checked;

    // Original image chart.
    if (this.originalChart) this.originalChart.destroy();
    this.originalChart = this.generateHistogramChart('original-chart', 
      original.histogramData[normal ? 'normal' : 'accumulated']);

    // Result image chart (optional).
    document.getElementById('result-chartbox').style.display = result ? 'block' : 'none';
    if (!result) return

    if (this.resultChart) this.resultChart.destroy();
    this.resultChart = this.generateHistogramChart('result-chart', 
    result.histogramData[normal ? 'normal' : 'accumulated']);
  }
  
  // Updates the content of the image's tab
  updateImageCards(images) {
    const imgCardsDiv = document.getElementById('imgCards');
    let children = imgCardsDiv.children;
    while(imgCardsDiv.children.length - 1) {
      imgCardsDiv.removeChild(imgCardsDiv.firstChild);
    }
    for (let image of images) {
      const newImgCard = document.createElement('div');
      newImgCard.className = "col";
      newImgCard.id = image.id;
      newImgCard.innerHTML =
      "<div class=\"card h-100\">" +
        "<div style=\"height: 150px; display: flex; justify-content: center;\">" +
          "<img src=\"" + image.p5Image.canvas.toDataURL() + "\" class=\"card-img-top\">" +
        "</div>" +
        "<div class=\"card-body text-center d-flex align-items-md flex-column\">" +
          "<h5 class=\"row justify-content-md-center card-title\">" + image.id + "</h5>" +
          "<div class = \"row justify-content-md-center row-cols-md-3 mt-auto\">" +
            "<div class = \"col col-md-auto btn-group\" role = \"group\">" +
              "<button id = \"download-btn-" + image.id + "\" type = \"button\" class = \"btn btn-dark\">" +
                "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-download\" viewBox=\"0 0 16 16\">" +
                  "<path d=\"M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z\"/>" +
                  "<path d=\"M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z\"/>" +
                "</svg>" +
              "</button>" +
              "<button id = \"delete-btn-" + image.id + "\" type = \"button\" class = \"btn btn-dark\">" +
                "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-trash\" viewBox=\"0 0 16 16\">" +
                  "<path d=\"M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z\"/>" +
                  "<path fill-rule=\"evenodd\" d=\"M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z\"/>" +
                "</svg>" +
              "</button>"+
            "</div>" +
          "</div>" +
        "</div>" +
      "</div";
      imgCardsDiv.insertBefore(newImgCard, imgCardsDiv.firstChild);
    }
  }

  updateRoiButton(state) {
    document.getElementById('roi-btn').className = state === 'roi' ? 'col btn pressed' : 'col btn';
    document.getElementById('defaultCanvas0').style.cursor = state === 'roi' ? 'crosshair' : 'auto';
  }

  updateTransformationChart(canvas, LUTall, LUTred, LUTgreen, LUTblue, altStyle) {
    if (typeof (canvas) === 'string') canvas = document.getElementById(canvas);

    let altBorderColor = 'rgba(255,255,255,1)';
    let altBackgroundColor = 'rgba(255,255,0,1)';
    if (LUTall) {
      LUTred = LUTall;
      LUTgreen = LUTall;
      LUTblue = LUTall;
    }
    
    const datasets = {
      labels: Array.from(Array(256).keys()),
      datasets: [{
        label: 'red',
        data: LUTred,
        borderColor: (altStyle ? altBorderColor : 'rgba(255,255,255,1)'),
        backgroundColor: (altStyle ? altBackgroundColor : 'rgba(255,0,0,1)'),
        borderDash: [5, 5],
      },
      {
        label: 'green',
        data: LUTgreen,
        borderColor: (altStyle ? altBorderColor : 'rgba(255,255,255,1)'),
        backgroundColor: (altStyle ? altBackgroundColor : 'rgba(0,255,0,1)'),
        borderDash: [5, 5],
      },
      {
        label: 'blue',
        data: LUTblue,
        borderColor: (altStyle ? altBorderColor : 'rgba(255,255,255,1)'),
        backgroundColor: (altStyle ? altBackgroundColor : 'rgba(0,0,255,1)'),
        borderDash: [5, 5],
      }
    ]
    };

    const configuration = {
      type: 'line',
      data: datasets,
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'RGB in'
            },
            max: 255,
            min: 0,
            beginAtZero: true
          },
          y: {
            title: {
              display: true,
              text: 'RGB out'
            },
            max: 255,
            min: 0,
            beginAtZero: true
          }
        },
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        }
      }
    };

    if (this.tempChart) this.tempChart.destroy();
    this.tempChart = new Chart(canvas, configuration);

    canvas.parentElement.style.display = 'block';
  }

  updateImagesSelector(id, images, filter) {
    let selector = document.getElementById(id);
    while (selector.firstChild) selector.removeChild(selector.firstChild);
    for (let image of images) {
      if (filter) {
        image.updateData();
        if (!filter(image)) continue;
      } 
      let option = document.createElement('option');
      option.text = image.id;
      selector.appendChild(option);
    }
  }

  updateOperationInterfaceHistogram(canvas, data) {
    if (typeof (canvas) === 'string') canvas = document.getElementById(canvas);
    if (this.tempChart) this.tempChart.destroy();
    if (!data) data = {red: [], green: [], blue: []};
    this.tempChart = this.generateHistogramChart(canvas, data);
  }

  generateHistogramChart(canvas, data) {
    if (typeof (canvas) === 'string') canvas = document.getElementById(canvas);

    const datasets = {
      labels: Array.from(Array(256).keys()),
      datasets: [{
        label: 'Red',
        data: data.red,
        backgroundColor: 'rgba(255, 0, 0, 1)',
        hidden: true
      },
      {
        label: 'Green',
        data: data.green,
        backgroundColor: 'rgba(0, 255, 0, 1)',
        hidden: true
      },
      {
        label: 'Blue',
        data: data.blue,
        backgroundColor: 'rgba(0, 0, 255, 1)',
        hidden: true
      },
      {
        label: 'Grey',
        data: data.grey,
        backgroundColor: 'rgba(150, 150, 150, 1)'
      }]
    };
    
    const configuration = {
      type: 'bar',
      data: datasets,
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Valor i'
            },
            min: 0,
            max: 255,
            beginAtZero: true
          },
          y: {
            title: {
              display: true,
              text: 'Probabilidad de i'
            },
            min: 0,
            suggestedMax: 0.1,
            beginAtZero: true
          }
        },
        maintainAspectRatio: false,
      }
    };

    return new Chart(canvas, configuration);
  }

  toggleInterface(interfaceDiv) {
    if (typeof (interfaceDiv) === 'string') interfaceDiv = document.getElementById(interfaceDiv);
    let prevDisplay = interfaceDiv.style.display;
    this.closeInterfaces();
    interfaceDiv.style.display = prevDisplay === 'block' ? 'none' : 'block';
  }
  
  closeInterfaces() {
    let interfaces = document.getElementById('interfaces').children;
    for (let i = 0; i < interfaces.length; i++) {
      interfaces[i].style.display = 'none';
    }
    document.getElementById('transformation-chartbox').style.display = 'none';
  }

  clearInputValues(ids) {
    for (let i = 0; i < ids.length; i++) {
      (typeof(ids[i]) === 'string' ? document.getElementById(ids[i]) : ids[i]).value = '';
    }
  }

  startSpinner() {
    document.getElementById('loading-spinner').style.display = 'block';
  }

  stopSpinner() {
    document.getElementById('loading-spinner').style.display = 'none';
  }

  setColorPicker(colorPickerButton, defaultColor, changeHandler) {
    if (typeof (colorPickerButton) === 'string') colorPickerButton = document.getElementById(colorPickerButton);
    const colorPicker = new Picker(colorPickerButton);
    colorPicker.setOptions({
      color: defaultColor,
      alpha: false,
      editor: false
    });
    colorPicker.onChange = changeHandler;
  }
}

export {IpView};
