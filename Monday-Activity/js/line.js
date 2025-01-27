class LineChart {

  constructor(_config, _data) {
    this.config = {
      parentElement: _config.parentElement,
      containerWidth: _config.containerWidth || 500,
      containerHeight: _config.containerHeight || 140,
      margin: { top: 10, bottom: 30, right: 10, left: 30 }
    }

    this.data = _data;

    // Call a class function
    this.initVis();
  }

  initVis() {
      
    //TO DO - make a line chart here 


      //this.updateVis(); //leave this empty for now...
  }


 //  //leave this empty for now
 // updateVis() { 
   
 //   this.renderVis(); 

 // }


 // //leave this empty for now...
 // renderVis() { 

 //  }



}