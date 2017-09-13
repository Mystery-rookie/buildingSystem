$(function(){
    
    var file_img=document.querySelector("#upload");
    console.log(file_img)
    file_img.onchange=function(){
        getPhoto(this);
    }
    var imgurl = "";  
    function getPhoto(node) {
        console.log(node);
        var imgURL = "";  
            try{  
                var file = null;  
                if(node.files && node.files[0] ){  
                    file = node.files[0];  
                }else if(node.files && node.files.item(0)) {  
                    file = node.files.item(0);  
                }  
                //Firefox 因安全性问题已无法直接通过input[file].value 获取完整的文件路径  
                try{  
                    imgURL =  file.getAsDataURL();  
                }catch(e){  
                    imgURL = window.URL.createObjectURL(file);  
                }  
            }catch(e){  
                if (node.files && node.files[0]) {  
                    var reader = new FileReader();  
                    reader.onload = function (e) {  
                        imgURL = e.target.result;  
                    };  
                    reader.readAsDataURL(node.files[0]);  
                }  
            }  
            creatImg(imgURL);  
            return imgURL;  
        }  
  
    function creatImg(imgRUL){  
        // var textHtml = "<img src='"+imgRUL+"'width='414px' height='600px'/>";
        console.log($(".i_container img"))
        $(".i_container img").attr("src",imgRUL);
    }  
})
