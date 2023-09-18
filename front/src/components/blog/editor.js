import React, {useState} from 'react'
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useRecoilState } from "recoil";
import { authorizationTokenState } from "../../recoil/logInSignUpState";

const Editor = ({body, setBody, setImageArr}) => {
    const [flag, setFlag] = useState(false);
    const [authorizationToken, setAuthorizationToken] = useRecoilState(
		authorizationTokenState
	);
    // const [imageArr, setImageArr] = useState([]);

    const customUploadAdapter = (loader, setImageArr) => { 
        return {
            upload(){
                return new Promise ((resolve, reject) => {
                    const formData = new FormData();
                    loader.file.then( (image) => {
                        formData.append("image", image);
    
                        axios.post(`${process.env.REACT_APP_SERVER_URL}/blogs/upload-images`, formData, {
                            headers: {
                                Authorization: `Bearer ${authorizationToken}`,
                                "Content-Type": "application/json",
                                'ngrok-skip-browser-warning': '69420'
                            }
                        })

                        .then(async (res) => {
                            // authorization 토큰 갱신
                            if(res.headers.get("Authorization") !== null) {
                                const Authorization = res.headers.get("Authorization");
                                localStorage.setItem('Authorization', Authorization);
                            };

                            if(!flag){
                                setFlag(true);
                                setImageArr(prevImageArr => [...prevImageArr, res.data.name]); 
                            }
    
                            try {
                                const imageResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/blogs/print-image?name=${res.data.name}`, {
                                    headers: {
                                        Authorization: `Bearer ${authorizationToken}`,
                                        "Content-Type": "application/json",
                                        'ngrok-skip-browser-warning': '69420'
                                    }
                                });

                                // authorization 토큰 갱신
                                if(imageResponse.headers.get("Authorization") !== null) {
                                    const Authorization = imageResponse.headers.get("Authorization");
                                    localStorage.setItem('Authorization', Authorization);
                                };
    
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
               console.log( { event, editor, data } );
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