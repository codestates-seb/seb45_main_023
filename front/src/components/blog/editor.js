import React, {useState} from 'react'
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { useRecoilValue, useRecoilState } from 'recoil';
import { authorizationTokenState } from "../../recoil/logInSignUpState";

const Editor = ({body, setBody, imageArr, setImageArr}) => {
    const [flag, setFlag] = useState(false);
    const [authorizationToken, setAuthorizationToken] = useRecoilState(authorizationTokenState);
    // const [imageArr, setImageArr] = useState([]);
    const token = useRecoilValue(
        authorizationTokenState
    );

    console.log((setImageArr));

    const customUploadAdapter = (loader, setImageArr) => { 
        return {
            upload(){
                return new Promise ((resolve, reject) => {
                    const formData = new FormData();
                    loader.file.then( (image) => {
                        formData.append("image", image);
    
                        axios.post(`${process.env.REACT_APP_SERVER_URL}/blogs/upload-images`, formData, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                'ngrok-skip-browser-warning': '69420'
                            }
                        })
                        .then(async (res) => {
                            // authorization 토큰 갱신
                            if(res.headers.get("newaccesstoken")) {
                                setAuthorizationToken(res.headers.get("newaccesstoken"));
                                localStorage.setItem('Authorization', authorizationToken ?? '');
                            }

                            if(!flag){
                                setFlag(true);
                                setImageArr(prevImageArr => [...prevImageArr, res.data.name]); 
                            }
    
                            // try {
    
                            //     const imageResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/blogs/print-image?name=${res.data.name}`, {
                            //         headers: {
                            //             Authorization: `Bearer ${token}`,
                            //             'ngrok-skip-browser-warning': '69420'
                            //         }
                            //     });


                            // authorization 토큰 갱신
                            // if(imageResponse.headers.get("newaccesstoken")) {
                            //     setAuthorizationToken(imageResponse.headers.get("newaccesstoken"));
                            //     localStorage.setItem('Authorization', authorizationToken ?? '');
                            // }

                            //     resolve({
                            //         default: imageResponse.path // 이미지 URL을 가져옴
                            //     });
                            // } catch (error) {
                            //     console.log(setImageArr);
                            // }
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
            data={body}
            onReady={(editor) => {
                if (Array.isArray(imageArr)) {
                    imageArr.forEach((image) => {
                        editor.setData(editor.getData() + `<img src="${image.path}" alt="${image.alt}">`);
                    });
                }
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