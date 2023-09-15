import React, {useState} from 'react'
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const Editor = ({body, setBody, setImageArr}) => {
    const [flag, setFlag] = useState(false);
    // const [imageArr, setImageArr] = useState([]);

    const customUploadAdapter = (loader, setImageArr) => { 
        return {
            upload(){
                return new Promise ((resolve, reject) => {
                    const formData = new FormData();
                    loader.file.then( (image) => {
                        formData.append("image", image);
    
                        axios.post(`https://b95e-116-126-166-12.ngrok-free.app/blogs/upload-images`, formData, {
                            headers: {
                                'ngrok-skip-browser-warning': '69420'
                            }
                        })
                        .then(async (res) => {
                            if(!flag){
                                setFlag(true);
                                setImageArr(prevImageArr => [...prevImageArr, res.data.name]); 
                            }
    
                            try {
    
                                const imageResponse = await axios.get(`https://b95e-116-126-166-12.ngrok-free.app/blogs/print-image?name=${res.data.name}`, {
                                    headers: {
                                        'ngrok-skip-browser-warning': '69420'
                                    }
                                });
    
                                resolve({
                                    default: imageResponse.path // 이미지 URL을 가져옴
                                });
                            } catch (error) {
                                console.log(setImageArr);
                            }
                            console.log(res.data.name);
                        })
                        .catch((err) => reject(err));
                    });
                })
            }
        }
    }
    
    
    

    function uploadPlugin (editor){ 
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return customUploadAdapter(loader, setImageArr);
        }
    }

    return (
        <CKEditor
            editor={ClassicEditor}
            config={{
                extraPlugins: [uploadPlugin],
            }}
            data=''
            onReady={(editor) => {
                
            }}
            onChange={(event, editor) => {
                const data = editor.getData();
                setBody(data);
               // console.log( { event, editor, data } );
            }}
            onBlur={(event, editor) => {
                //console.log('Blur.', editor);
            }}
            onFocus={(event, editor) => {
                //console.log('Focus.', editor);
            }}/>
    )
}

export default Editor;