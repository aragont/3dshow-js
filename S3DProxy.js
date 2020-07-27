/* global console */
/* jshint browser: true */

'use strict';

/** @module S3DProxy*/
var S3DProxy=(function(my){

my.setSrc=function(srcL,srcR) {
  document.getElementById('s3dL').src=srcL;
  document.getElementById('s3dR').src=srcR;
}

my.setWidth=function(width) {
  switch(width){ 
  case 'fit_window':
    my.width=100;
    my.widthUnit='%';
    break;
  default:
    my.width=width;
    my.widthUnit='px';
    break;
  }
  my.setSrcFormat(my.srcFormat);
}

my.setSrcFormat=function(format) {
  my.srcFormat=format;
  switch(format){
  case 'L+R':
    my.srcOffsetR=0;
    my.srcOffsetL=0;
    my.imgWidth=my.width/2;
    document.getElementById('s3dL').style.clipPath='';
    document.getElementById('s3dR').style.clipPath='';
    break;
  case 'RL':
    my.srcOffsetR=0;
    my.srcOffsetL=my.width/2;
    my.imgWidth=my.width;
    document.getElementById('s3dR').style.clipPath='polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%)';
    document.getElementById('s3dL').style.clipPath='polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)';
    break;
  case 'LR':
  default:
    my.srcFormat='LR';
    my.srcOffsetL=0;
    my.srcOffsetR=my.width/2;
    my.imgWidth=my.width;
    document.getElementById('s3dL').style.clipPath='polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%)';
    document.getElementById('s3dR').style.clipPath='polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)';
    break;
  }
  my.setOutputFormat(my.outputFormat);
}

my.setOutputFormat=function(format) {

  my.outputFormat = format;

//clear filters
  document.getElementById('s3dL').style.filter='';
  document.getElementById('s3dR').style.filter='';
  document.getElementById('s3dR').style.opacity=1;

//for all anaglyphe type
  my.offsetL=my.width/2;
  my.offsetR=my.width/2;
  document.getElementById('s3dL').style.width=(my.imgWidth*2).toString()+my.widthUnit;
  document.getElementById('s3dR').style.width=(my.imgWidth*2).toString()+my.widthUnit;
  document.getElementById('s3dL').style.marginLeft=(-my.srcOffsetL*2-my.offsetL).toString()+my.widthUnit;
  document.getElementById('s3dR').style.marginLeft=(-my.srcOffsetR*2-my.offsetR).toString()+my.widthUnit;

  switch(format){
  case 'red-cyan':
    document.getElementById('s3dL').style.filter='url(#s3dcyan)';
    document.getElementById('s3dR').style.filter='url(#s3dred)';
    document.getElementById('s3dR').style.opacity=0.5;
    break;
  case 'green-magenta':
    document.getElementById('s3dL').style.filter='url(#s3dmagenta)';
    document.getElementById('s3dR').style.filter='url(#s3dgreen)';
    document.getElementById('s3dR').style.opacity=0.5;
    break;
  case 'cross':
    my.offsetL=0;
    my.offsetR=my.width/2;
    document.getElementById('s3dL').style.width=my.width.toString()+my.widthUnit;
    document.getElementById('s3dR').style.width=my.width.toString()+my.widthUnit;
    document.getElementById('s3dL').style.marginLeft=(-my.srcOffsetL-my.offsetL).toString()+my.widthUnit;
    document.getElementById('s3dR').style.marginLeft=(-my.srcOffsetR-my.offsetR).toString()+my.widthUnit;
    break;
  case 'parallel':
  default:
    my.outputFormat = 'parallel';
    my.offsetR=0;
    my.offsetL=my.width/2;
    document.getElementById('s3dL').style.width=my.width.toString()+my.widthUnit;
    document.getElementById('s3dR').style.width=my.width.toString()+my.widthUnit;
    document.getElementById('s3dL').style.marginLeft=(-my.srcOffsetL-my.offsetL).toString()+my.widthUnit;
    document.getElementById('s3dR').style.marginLeft=(-my.srcOffsetR-my.offsetR).toString()+my.widthUnit;
  }
}


my.Init=function() {

  //document.body.appendChild(canvas2);
  var container = document.getElementById('s3d_container');
  if(container == null){
     container = document.createElement('div');
     container.style.cssText = 'position:relative; width:100%;';
     container.id='s3d_container';
     document.body.appendChild(container);
  }
  var imgL = document.createElement('img');
  var imgR = document.createElement('img');
  imgL.id = 's3dL';
  imgR.id = 's3dR';
  imgL.style.position ='absolute';
  imgR.style.position ='absolute';
  imgL.style.left='50%';
  imgR.style.left='50%';
  container.appendChild(imgL);
  container.appendChild(imgR);


  var urlParts = document.URL.split('#');
  if ( urlParts.length == 1) {
    my.srcL = 'example.jpg';
    my.srcR = 'example.jpg'; 
    my.srcFormat='LR';
    my.outputFormat='P';
  } 
  my.srcL = (urlParts.length > 1) ? urlParts[1] : 'example.jpg';
  my.srcR = (urlParts.length > 2) ? urlParts[2] : srcL;
  my.srcFormat=(urlParts.length > 3) ? urlParts[3] : 'LR';
  my.outputFormat=(urlParts.length > 4) ? urlParts[4] : 'P';
  my.setSrc(srcL,srcR);
  my.setWidth('fit_window');
  my.HandleImg();
}

my.HandleImg=function () {

}

return my;

}(S3DProxy||{}));
